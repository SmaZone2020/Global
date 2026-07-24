using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Enums;
using GuoYunGlobal.Services.Marketing;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class MarketingController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly MarketingContentService _marketingContentService;

    public MarketingController(
        AppDbContext context,
        MarketingContentService marketingContentService)
    {
        _context = context;
        _marketingContentService = marketingContentService;
    }

    [HttpPost("{id}/marketing")]
    public async Task<IActionResult> GenerateMarketing(
        int id,
        [FromBody] MarketingRequest request)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        if (string.IsNullOrWhiteSpace(request.Channel))
            return BadRequest(ApiResponse<object>.Fail("请指定营销渠道"));

        if (string.IsNullOrWhiteSpace(request.Style))
            return BadRequest(ApiResponse<object>.Fail("请指定内容风格"));

        var assets = _marketingContentService.GenerateContent(
            id, request.Channel, request.Style, request.Audience);

        _context.GeneratedAssets.AddRange(assets);

        project.Status = ProjectStatus.AssetsReady;
        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var responses = assets.Select(a => new GeneratedAssetResponse
        {
            Id = a.Id,
            ProjectId = a.ProjectId,
            Channel = a.Channel,
            Style = a.Style,
            Audience = a.Audience,
            ContentType = a.ContentType,
            Content = a.Content,
            ImageUrl = a.ImageUrl,
            Status = a.Status,
            CreatedAt = a.CreatedAt
        }).ToList();

        return Ok(ApiResponse<List<GeneratedAssetResponse>>.Ok(responses));
    }

    [HttpGet("{id}/marketing")]
    public async Task<IActionResult> GetMarketing(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var assets = await _context.GeneratedAssets
            .Where(a => a.ProjectId == id)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        var responses = assets.Select(a => new GeneratedAssetResponse
        {
            Id = a.Id,
            ProjectId = a.ProjectId,
            Channel = a.Channel,
            Style = a.Style,
            Audience = a.Audience,
            ContentType = a.ContentType,
            Content = a.Content,
            ImageUrl = a.ImageUrl,
            Status = a.Status,
            CreatedAt = a.CreatedAt
        }).ToList();

        return Ok(ApiResponse<List<GeneratedAssetResponse>>.Ok(responses));
    }
}
