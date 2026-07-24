using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;
using GuoYunGlobal.Services.Demo;
using GuoYunGlobal.Services.Document;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly DemoDataService _demoDataService;
    private readonly DocumentParseService _documentParseService;

    public ProjectController(
        AppDbContext context,
        DemoDataService demoDataService,
        DocumentParseService documentParseService)
    {
        _context = context;
        _demoDataService = demoDataService;
        _documentParseService = documentParseService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProjectRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(ApiResponse<object>.Fail("项目名称不能为空"));

        if (string.IsNullOrWhiteSpace(request.BrandName))
            return BadRequest(ApiResponse<object>.Fail("品牌名称不能为空"));

        var project = new Project
        {
            Name = request.Name,
            Status = ProjectStatus.Draft,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        var brand = new Brand
        {
            ProjectId = project.Id,
            Name = request.BrandName,
            Origin = request.BrandOrigin,
            History = request.BrandHistory,
            BrandVoice = request.BrandVoice,
            ProhibitedClaims = request.ProhibitedClaims,
            EstablishedYear = request.EstablishedYear
        };

        _context.Brands.Add(brand);
        await _context.SaveChangesAsync();

        var products = new List<Product>();
        foreach (var input in request.Products)
        {
            var product = new Product
            {
                BrandId = brand.Id,
                Name = input.Name,
                Category = input.Category,
                Sku = input.Sku,
                Specs = input.Specs,
                Ingredients = input.Ingredients,
                Process = input.Process,
                DomesticPrice = input.DomesticPrice,
                ImageUrl = input.ImageUrl
            };
            products.Add(product);
        }

        _context.Products.AddRange(products);
        await _context.SaveChangesAsync();

        project.Brand = brand;
        brand.Products = products;

        var response = ProjectResponse.FromEntity(project);
        return StatusCode(201, ApiResponse<ProjectResponse>.Ok(response));
    }

    [HttpPost("demo")]
    public async Task<IActionResult> InitDemo()
    {
        var project = await _demoDataService.CreateDemoProjectAsync();

        var fullProject = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .FirstAsync(p => p.Id == project.Id);

        var response = ProjectResponse.FromEntity(fullProject);
        return StatusCode(201, ApiResponse<ProjectResponse>.Ok(response));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var response = ProjectResponse.FromEntity(project);
        return Ok(ApiResponse<ProjectResponse>.Ok(response));
    }

    [HttpPost("{id}/upload")]
    public async Task<IActionResult> Upload(int id, IFormFile file)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse<object>.Fail("请选择要上传的文件"));

        if (!_documentParseService.IsSupportedFileType(file.FileName))
            return BadRequest(ApiResponse<object>.Fail("不支持的文件格式，仅支持PDF、MD、DOC、DOCX"));

        var result = await _documentParseService.ParseAndSaveAsync(file);

        var document = new UploadedDocument
        {
            ProjectId = id,
            FileName = result.FileName,
            FileType = result.FileType,
            FilePath = result.FilePath,
            ParsedContent = result.ParsedContent,
            UploadedAt = DateTime.UtcNow
        };

        _context.UploadedDocuments.Add(document);
        await _context.SaveChangesAsync();

        var response = new UploadedDocumentResponse
        {
            Id = document.Id,
            ProjectId = document.ProjectId,
            FileName = document.FileName,
            FileType = document.FileType,
            ParsedContent = document.ParsedContent,
            UploadedAt = document.UploadedAt
        };

        return Ok(ApiResponse<UploadedDocumentResponse>.Ok(response));
    }

    [HttpGet("{id}/strategy")]
    public async Task<IActionResult> GetStrategy(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var strategy = await _context.Strategies
            .FirstOrDefaultAsync(s => s.ProjectId == id);

        if (strategy == null)
            return NotFound(ApiResponse<object>.Fail("该项目暂无策略数据"));

        var response = new StrategyResponse
        {
            Id = strategy.Id,
            ProjectId = strategy.ProjectId,
            Positioning = DeserializeJson(strategy.Positioning),
            SkuPlan = DeserializeJson(strategy.SkuPlan),
            Packaging = DeserializeJson(strategy.Packaging),
            Pricing = DeserializeJson(strategy.Pricing),
            Channels = DeserializeJson(strategy.Channels),
            Roadmap = DeserializeJson(strategy.Roadmap),
            CreatedAt = strategy.CreatedAt
        };

        return Ok(ApiResponse<StrategyResponse>.Ok(response));
    }

    private static object? DeserializeJson(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return null;

        try
        {
            return System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(json);
        }
        catch
        {
            return json;
        }
    }
}
