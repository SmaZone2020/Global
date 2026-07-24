using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;
using GuoYunGlobal.Services.Ai;
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
    private readonly AiOrchestrator _ai;

    public ProjectController(
        AppDbContext context,
        DemoDataService demoDataService,
        DocumentParseService documentParseService,
        AiOrchestrator ai)
    {
        _context = context;
        _demoDataService = demoDataService;
        _documentParseService = documentParseService;
        _ai = ai;
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

    [HttpPost("{id}/strategy")]
    public async Task<IActionResult> GenerateStrategy(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var existing = await _context.Strategies.FirstOrDefaultAsync(s => s.ProjectId == id);
        if (existing != null)
            _context.Strategies.Remove(existing);

        var analysisResults = await _context.AnalysisResults.Where(a => a.ProjectId == id).ToListAsync();
        var analysisContext = string.Join("\n\n", analysisResults.Select(a => $"[{a.Type}]\n{a.Content}"));

        var strategy = new Strategy
        {
            ProjectId = id,
            Positioning = await _ai.GenerateStrategyAsync(analysisContext, "positioning"),
            SkuPlan = await _ai.GenerateStrategyAsync(analysisContext, "skuPlan"),
            Packaging = await _ai.GenerateStrategyAsync(analysisContext, "packaging"),
            Pricing = await _ai.GenerateStrategyAsync(analysisContext, "pricing"),
            Channels = await _ai.GenerateStrategyAsync(analysisContext, "channels"),
            Roadmap = await _ai.GenerateStrategyAsync(analysisContext, "roadmap"),
            CreatedAt = DateTime.UtcNow
        };

        _context.Strategies.Add(strategy);
        project.Status = ProjectStatus.StrategyReady;
        project.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

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

    [HttpPost("{id}/strategy/{section}")]
    public async Task<IActionResult> RegenerateStrategySection(int id, string section)
    {
        var strategy = await _context.Strategies.FirstOrDefaultAsync(s => s.ProjectId == id);
        if (strategy == null)
            return NotFound(ApiResponse<object>.Fail("该项目暂无策略数据"));

        var newContent = section switch
        {
            "positioning" => DemoStrategyData.GetPositioning(),
            "skuPlan" => DemoStrategyData.GetSkuPlan(),
            "packaging" => DemoStrategyData.GetPackaging(),
            "pricing" => DemoStrategyData.GetPricing(),
            "channels" => DemoStrategyData.GetChannels(),
            "roadmap" => DemoStrategyData.GetRoadmap(),
            _ => null
        };

        if (newContent == null)
            return BadRequest(ApiResponse<object>.Fail("无效的策略模块"));

        switch (section)
        {
            case "positioning": strategy.Positioning = newContent; break;
            case "skuPlan": strategy.SkuPlan = newContent; break;
            case "packaging": strategy.Packaging = newContent; break;
            case "pricing": strategy.Pricing = newContent; break;
            case "channels": strategy.Channels = newContent; break;
            case "roadmap": strategy.Roadmap = newContent; break;
        }

        await _context.SaveChangesAsync();
        return Ok(ApiResponse<object>.Ok(DeserializeJson(newContent)!));
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
