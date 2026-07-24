using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Services.Ai;
using GuoYunGlobal.Services.ImageBed;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class PosterController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AiOrchestrator _ai;
    private readonly IImageBedService _imageBed;
    private readonly ILogger<PosterController> _logger;

    public PosterController(
        AppDbContext context,
        AiOrchestrator ai,
        IImageBedService imageBed,
        ILogger<PosterController> logger)
    {
        _context = context;
        _ai = ai;
        _imageBed = imageBed;
        _logger = logger;
    }

    [HttpGet("poster/presets")]
    public IActionResult GetPresets()
    {
        var presets = PosterPresets.All.Select(p => new PosterPresetInfo
        {
            Key = p.Key,
            Label = p.Label,
            Description = p.Description,
            PreviewKeywords = p.PreviewKeywords.ToList()
        }).ToList();

        return Ok(ApiResponse<List<PosterPresetInfo>>.Ok(presets));
    }

    [HttpPost("{id}/poster")]
    public async Task<IActionResult> GeneratePoster(int id, [FromBody] GeneratePosterRequest request)
    {
        var project = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        if (string.IsNullOrWhiteSpace(request.StyleKey) && string.IsNullOrWhiteSpace(request.CustomPrompt))
            return BadRequest(ApiResponse<object>.Fail("请选择风格或输入自定义提示词"));

        var preset = PosterPresets.Get(request.StyleKey);
        if (!string.IsNullOrWhiteSpace(request.StyleKey) && preset == null)
            return BadRequest(ApiResponse<object>.Fail("无效的风格选项"));

        var brandName = project.Brand?.Name ?? project.Name;
        var productName = project.Brand?.Products?.FirstOrDefault()?.Name ?? project.Name;

        var finalPrompt = PosterPresets.BuildPrompt(
            request.StyleKey, brandName, productName, request.CustomPrompt, request.ReferenceImageUrl);

        var poster = new GeneratedPoster
        {
            ProjectId = id,
            StyleKey = request.StyleKey,
            StyleLabel = preset?.Label ?? "自定义",
            CustomPrompt = request.CustomPrompt,
            FinalPrompt = finalPrompt,
            Status = "generating",
            CreatedAt = DateTime.UtcNow
        };

        _context.GeneratedPosters.Add(poster);
        await _context.SaveChangesAsync();

        var imageUrl = await _ai.GenerateImageAsync(finalPrompt);

        poster.ImageUrl = imageUrl;
        poster.Status = string.IsNullOrEmpty(imageUrl) ? "failed" : "completed";
        await _context.SaveChangesAsync();

        var response = MapToResponse(poster);
        return Ok(ApiResponse<GeneratedPosterResponse>.Ok(response));
    }

    [HttpPost("{id}/poster/uploadRef")]
    public async Task<IActionResult> UploadRefImage(int id, IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse<object>.Fail("请选择图片文件"));

        using var stream = file.OpenReadStream();
        var url = await _imageBed.UploadAsync(stream, file.FileName);

        return Ok(ApiResponse<object>.Ok(new { url }));
    }

    [HttpGet("{id}/posters")]
    public async Task<IActionResult> GetPosters(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var posters = await _context.GeneratedPosters
            .Where(p => p.ProjectId == id)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        var responses = posters.Select(MapToResponse).ToList();
        return Ok(ApiResponse<List<GeneratedPosterResponse>>.Ok(responses));
    }

    private static GeneratedPosterResponse MapToResponse(GeneratedPoster p) => new()
    {
        Id = p.Id,
        ProjectId = p.ProjectId,
        StyleKey = p.StyleKey,
        StyleLabel = p.StyleLabel,
        FinalPrompt = p.FinalPrompt,
        ImageUrl = p.ImageUrl,
        Status = p.Status,
        CreatedAt = p.CreatedAt
    };
}
