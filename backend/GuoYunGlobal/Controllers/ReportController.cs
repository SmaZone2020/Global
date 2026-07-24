using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class ReportController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReportController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}/report")]
    public async Task<IActionResult> GetReport(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .Include(p => p.AnalysisResults)
            .Include(p => p.Strategy)
            .Include(p => p.GeneratedAssets)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var projectResponse = ProjectResponse.FromEntity(project);

        var analysisResponses = project.AnalysisResults.Select(r => new AnalysisResponse
        {
            Id = r.Id,
            ProjectId = r.ProjectId,
            Type = r.Type,
            Content = DeserializeJson(r.Content),
            Sources = DeserializeJson(r.Sources),
            CreatedAt = r.CreatedAt
        }).ToList();

        StrategyResponse? strategyResponse = null;
        if (project.Strategy != null)
        {
            strategyResponse = new StrategyResponse
            {
                Id = project.Strategy.Id,
                ProjectId = project.Strategy.ProjectId,
                Positioning = DeserializeJson(project.Strategy.Positioning),
                SkuPlan = DeserializeJson(project.Strategy.SkuPlan),
                Packaging = DeserializeJson(project.Strategy.Packaging),
                Pricing = DeserializeJson(project.Strategy.Pricing),
                Channels = DeserializeJson(project.Strategy.Channels),
                Roadmap = DeserializeJson(project.Strategy.Roadmap),
                CreatedAt = project.Strategy.CreatedAt
            };
        }

        var assetResponses = project.GeneratedAssets.Select(a => new GeneratedAssetResponse
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

        var allSources = new List<object>();
        foreach (var result in project.AnalysisResults)
        {
            var sources = DeserializeJson(result.Sources);
            if (sources is JsonElement element && element.ValueKind == JsonValueKind.Array)
            {
                foreach (var item in element.EnumerateArray())
                {
                    allSources.Add(item);
                }
            }
        }

        var report = new ReportResponse
        {
            Project = projectResponse,
            Brand = projectResponse.Brand,
            Products = projectResponse.Products,
            AnalysisResults = analysisResponses,
            Strategy = strategyResponse,
            GeneratedAssets = assetResponses,
            Sources = allSources,
            GeneratedAt = DateTime.UtcNow
        };

        return Ok(ApiResponse<ReportResponse>.Ok(report));
    }

    private static object? DeserializeJson(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return null;

        try
        {
            return JsonSerializer.Deserialize<JsonElement>(json);
        }
        catch
        {
            return json;
        }
    }
}
