using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;
using GuoYunGlobal.Services.Ai;
using GuoYunGlobal.Services.Marketing;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class MarketingController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly MarketingContentService _marketingContentService;
    private readonly AiOrchestrator _ai;

    public MarketingController(
        AppDbContext context,
        MarketingContentService marketingContentService,
        AiOrchestrator ai)
    {
        _context = context;
        _marketingContentService = marketingContentService;
        _ai = ai;
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

        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.ProjectId == id);
        var strategy = await _context.Strategies.FirstOrDefaultAsync(s => s.ProjectId == id);

        var brandInfo = brand != null ? $"{brand.Name} - {brand.Origin} - {brand.History}" : "福建老酒";
        var strategyContext = strategy != null ? $"定位：{strategy.Positioning}\n定价：{strategy.Pricing}" : "";

        List<GeneratedAsset> assets;

        var aiContent = await _ai.GenerateMarketingContentAsync(
            brandInfo, strategyContext, request.Channel, request.Style, request.Audience);

        if (!string.IsNullOrWhiteSpace(aiContent) && aiContent.StartsWith("["))
        {
            try
            {
                var items = JsonSerializer.Deserialize<List<MarketingItem>>(aiContent,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                assets = items?.Select(item => new GeneratedAsset
                {
                    ProjectId = id,
                    Channel = request.Channel,
                    Style = request.Style,
                    Audience = request.Audience,
                    ContentType = item.ContentType ?? "socialPost",
                    Content = item.Content ?? "",
                    ImageUrl = "",
                    Status = AssetStatus.Generated,
                    CreatedAt = DateTime.UtcNow
                }).ToList() ?? _marketingContentService.GenerateContent(id, request.Channel, request.Style, request.Audience);
            }
            catch
            {
                assets = _marketingContentService.GenerateContent(id, request.Channel, request.Style, request.Audience);
            }
        }
        else
        {
            assets = _marketingContentService.GenerateContent(id, request.Channel, request.Style, request.Audience);
        }

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

    private class MarketingItem
    {
        public string? ContentType { get; set; }
        public string? Content { get; set; }
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
