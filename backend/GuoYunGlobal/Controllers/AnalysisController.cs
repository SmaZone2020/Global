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

        var results = new List<AnalysisResult>
        {
            new() { ProjectId = id, Type = AnalysisType.Product, Content = productContent, Sources = "[]", CreatedAt = DateTime.UtcNow },
            new() { ProjectId = id, Type = AnalysisType.Culture, Content = cultureContent, Sources = "[]", CreatedAt = DateTime.UtcNow },
            new() { ProjectId = id, Type = AnalysisType.Market, Content = marketContent, Sources = "[]", CreatedAt = DateTime.UtcNow },
        };
        _context.AnalysisResults.AddRange(results);

        var markets = new List<MarketCandidate>
        {
            new() { ProjectId = id, Country = "美国", TotalScore = 82, DimensionScores = """{"demand":80,"cultureFit":86,"competition":65,"channelAccess":78,"compliance":62,"economics":74}""", Evidence = """["亚洲餐饮市场持续增长","纽约、旧金山亚裔人口密集","Natural Wine消费趋势上升"]""", Risks = """["酒类进口标签法规严格","需要TTB审批","各州分销法规差异大"]""", IsSelected = false },
            new() { ProjectId = id, Country = "日本", TotalScore = 78, DimensionScores = """{"demand":72,"cultureFit":88,"competition":55,"channelAccess":70,"compliance":68,"economics":65}""", Evidence = """["日本消费者对发酵酒有深厚理解","中日饮食文化有共通性","绍兴酒在日本已有认知基础"]""", Risks = """["本土清酒品类极强","进口酒类税率较高","消费者对品质要求极高"]""", IsSelected = false },
            new() { ProjectId = id, Country = "新加坡", TotalScore = 75, DimensionScores = """{"demand":68,"cultureFit":90,"competition":60,"channelAccess":72,"compliance":70,"economics":58}""", Evidence = """["华人占比超75%，对黄酒有基本认知","东南亚华人宴席文化保留较好","辐射东南亚市场"]""", Risks = """["市场体量较小","酒类消费税较高","本地绍兴酒已有稳定供应"]""", IsSelected = false },
        };
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
