using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class AnalysisController : ControllerBase
{
    private readonly AppDbContext _context;

    public AnalysisController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}/analysis")]
    public async Task<IActionResult> GetAnalysis(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var results = await _context.AnalysisResults
            .Where(a => a.ProjectId == id)
            .OrderBy(a => a.Type)
            .ToListAsync();

        var responses = results.Select(r => new AnalysisResponse
        {
            Id = r.Id,
            ProjectId = r.ProjectId,
            Type = r.Type,
            Content = DeserializeJson(r.Content),
            Sources = DeserializeJson(r.Sources),
            CreatedAt = r.CreatedAt
        }).ToList();

        return Ok(ApiResponse<List<AnalysisResponse>>.Ok(responses));
    }

    [HttpPost("{id}/confirmMarket")]
    public async Task<IActionResult> ConfirmMarket(
        int id,
        [FromBody] MarketConfirmRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.SelectedCountry))
            return BadRequest(ApiResponse<object>.Fail("请选择目标国家"));

        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var candidates = await _context.MarketCandidates
            .Where(m => m.ProjectId == id)
            .ToListAsync();

        if (!candidates.Any())
            return BadRequest(ApiResponse<object>.Fail("该项目没有候选市场数据"));

        var target = candidates.FirstOrDefault(
            c => c.Country == request.SelectedCountry);

        if (target == null)
            return BadRequest(ApiResponse<object>.Fail(
                $"候选市场中不存在国家: {request.SelectedCountry}"));

        foreach (var candidate in candidates)
        {
            candidate.IsSelected = candidate.Country == request.SelectedCountry;
        }

        project.Status = ProjectStatus.StrategyReady;
        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var result = new
        {
            Status = project.Status,
            SelectedCountry = request.SelectedCountry
        };

        return Ok(ApiResponse<object>.Ok(result));
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
