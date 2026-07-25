using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;
using GuoYunGlobal.Services.Ai;
using GuoYunGlobal.Services.Demo;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class AnalysisController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AiOrchestrator _ai;

    public AnalysisController(AppDbContext context, AiOrchestrator ai)
    {
        _context = context;
        _ai = ai;
    }

    [HttpPost("{id}/analyze")]
    public async Task<IActionResult> Analyze(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var existing = await _context.AnalysisResults.Where(a => a.ProjectId == id).ToListAsync();
        if (existing.Any())
            _context.AnalysisResults.RemoveRange(existing);

        var existingMarkets = await _context.MarketCandidates.Where(m => m.ProjectId == id).ToListAsync();
        if (existingMarkets.Any())
            _context.MarketCandidates.RemoveRange(existingMarkets);

        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.ProjectId == id);
        var products = await _context.Products.Where(p => p.Brand!.ProjectId == id).ToListAsync();

        var brandInfo = brand != null
            ? $"品牌：{brand.Name}，所在地：{brand.Origin}，历史：{brand.History}，语气：{brand.BrandVoice}"
            : "无品牌信息";
        var productInfo = products.Any()
            ? string.Join("\n", products.Select(p => $"产品：{p.Name}，品类：{p.Category}，规格：{p.Specs}，原料：{p.Ingredients}，工艺：{p.Process}，价格：{p.DomesticPrice}元"))
            : "无产品信息";

        var productContent = await _ai.GenerateProductAnalysisAsync(brandInfo, productInfo);
        var cultureContent = await _ai.GenerateCultureDecodeAsync(brandInfo, productInfo);
        var marketContent = await _ai.GenerateMarketInsightAsync(brandInfo, productInfo);

        var wrapMd = (string md) => IsJson(md) ? md : JsonSerializer.Serialize(new { markdown = md });

        var results = new List<AnalysisResult>
        {
            new() { ProjectId = id, Type = AnalysisType.Product, Content = wrapMd(productContent), Sources = "[]", CreatedAt = DateTime.UtcNow },
            new() { ProjectId = id, Type = AnalysisType.Culture, Content = wrapMd(cultureContent), Sources = "[]", CreatedAt = DateTime.UtcNow },
            new() { ProjectId = id, Type = AnalysisType.Market, Content = wrapMd(marketContent), Sources = "[]", CreatedAt = DateTime.UtcNow },
        };
        _context.AnalysisResults.AddRange(results);

        var markets = ParseMarketCandidates(id, marketContent);
        if (markets.Count == 0)
            markets = GetDefaultMarketCandidates(id);
        _context.MarketCandidates.AddRange(markets);

        project.Status = ProjectStatus.AwaitingConfirm;
        project.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        var steps = new[]
        {
            new { name = "product", label = "产品力分析", status = "completed" },
            new { name = "culture", label = "文化解码", status = "completed" },
            new { name = "market", label = "市场洞察", status = "completed" },
        };

        return Ok(ApiResponse<object>.Ok(new { status = "awaitingConfirm", steps }));
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

    private static List<MarketCandidate> ParseMarketCandidates(int projectId, string marketJson)
    {
        var markets = new List<MarketCandidate>();
        try
        {
            using var doc = JsonDocument.Parse(marketJson);
            var root = doc.RootElement;
            if (root.TryGetProperty("candidates", out var candidates))
            {
                foreach (var c in candidates.EnumerateArray())
                {
                    var country = c.TryGetProperty("country", out var v) ? v.GetString() ?? "" : "";
                    var totalScore = c.TryGetProperty("totalScore", out v) && v.ValueKind == JsonValueKind.Number ? v.GetInt32() : 70;
                    var dimensionScores = c.TryGetProperty("dimensionScores", out v) ? v.GetRawText() : "{}";
                    var evidence = c.TryGetProperty("evidence", out v) ? v.GetRawText() : "[]";
                    var risks = c.TryGetProperty("risks", out v) ? v.GetRawText() : "[]";

                    if (!string.IsNullOrEmpty(country))
                    {
                        markets.Add(new MarketCandidate
                        {
                            ProjectId = projectId,
                            Country = country,
                            TotalScore = totalScore,
                            DimensionScores = dimensionScores,
                            Evidence = evidence,
                            Risks = risks,
                            IsSelected = false
                        });
                    }
                }
            }
        }
        catch { }

        if (markets.Count == 0)
        {
            markets.Add(new MarketCandidate { ProjectId = projectId, Country = "美国", TotalScore = 75, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false });
            markets.Add(new MarketCandidate { ProjectId = projectId, Country = "日本", TotalScore = 72, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false });
            markets.Add(new MarketCandidate { ProjectId = projectId, Country = "新加坡", TotalScore = 70, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false });
        }

        return markets;
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

    private static bool IsJson(string text)
    {
        var trimmed = text.TrimStart();
        return trimmed.StartsWith('{') || trimmed.StartsWith('[');
    }

    private static List<MarketCandidate> GetDefaultMarketCandidates(int projectId) => new()
    {
        new() { ProjectId = projectId, Country = "香港", TotalScore = 88, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false },
        new() { ProjectId = projectId, Country = "新加坡", TotalScore = 82, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false },
        new() { ProjectId = projectId, Country = "日本", TotalScore = 76, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false },
        new() { ProjectId = projectId, Country = "美国", TotalScore = 70, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false },
        new() { ProjectId = projectId, Country = "欧盟", TotalScore = 65, DimensionScores = "{}", Evidence = "[]", Risks = "[]", IsSelected = false },
    };
}
