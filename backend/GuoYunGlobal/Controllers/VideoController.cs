using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Services.Ai;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class VideoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AiOrchestrator _ai;
    private readonly ILogger<VideoController> _logger;

    public VideoController(AppDbContext context, AiOrchestrator ai, ILogger<VideoController> logger)
    {
        _context = context;
        _ai = ai;
        _logger = logger;
    }

    [HttpPost("{id}/videoScript")]
    public async Task<IActionResult> GenerateVideoScript(int id, [FromBody] GenerateVideoScriptRequest request)
    {
        var project = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        if (string.IsNullOrWhiteSpace(request.Prompt))
            return BadRequest(ApiResponse<object>.Fail("请输入视频描述"));

        var brand = project.Brand;
        var product = brand?.Products?.FirstOrDefault();

        var productContext = BuildProductContext(brand, product);

        _logger.LogInformation("[VideoScript] project={Id} style={Style}", id, request.Style);

        var fullPrompt = $"{productContext}\n\n---\n用户需求：{request.Prompt}";
        var script = await _ai.GenerateVideoScriptAsync(fullPrompt, request.Style);

        if (string.IsNullOrWhiteSpace(script))
            script = GetDemoScript(request.Style);

        return Ok(ApiResponse<VideoScriptResponse>.Ok(new VideoScriptResponse
        {
            Script = script,
            Style = request.Style,
            Prompt = request.Prompt
        }));
    }

    private static string BuildProductContext(Models.Entities.Brand? brand, Models.Entities.Product? product)
    {
        var parts = new List<string> { "【产品背景资料】" };

        if (brand != null)
        {
            parts.Add($"品牌名称：{brand.Name}");
            if (!string.IsNullOrWhiteSpace(brand.Origin)) parts.Add($"品牌产地：{brand.Origin}");
            if (!string.IsNullOrWhiteSpace(brand.History)) parts.Add($"品牌历史：{brand.History}");
            if (!string.IsNullOrWhiteSpace(brand.BrandVoice)) parts.Add($"品牌调性：{brand.BrandVoice}");
            if (brand.EstablishedYear > 0) parts.Add($"创立年份：{brand.EstablishedYear}年");
        }

        if (product != null)
        {
            parts.Add($"\n产品名称：{product.Name}");
            if (!string.IsNullOrWhiteSpace(product.Category)) parts.Add($"品类：{product.Category}");
            if (!string.IsNullOrWhiteSpace(product.Specs)) parts.Add($"规格：{product.Specs}");
            if (!string.IsNullOrWhiteSpace(product.Ingredients)) parts.Add($"原料/成分：{product.Ingredients}");
            if (!string.IsNullOrWhiteSpace(product.Process)) parts.Add($"工艺：{product.Process}");
            if (!string.IsNullOrWhiteSpace(product.Sku)) parts.Add($"SKU：{product.Sku}");
        }

        return string.Join("\n", parts);
    }

    private static string GetDemoScript(string style) => style switch
    {
        "oriental" => "[0-3s] 开场：水墨山水画卷缓缓展开，远山如黛，晨雾缭绕\n"
            + "[3-6s] 过渡：镜头穿过古巷飞檐，落在一坛陈年老酒上\n"
            + "[6-10s] 主体：酒液倒入青瓷杯中，琥珀色泽在烛光下流转\n"
            + "[10-13s] 氛围：茶室内，友人举杯对饮，窗外竹影婆娑\n"
            + "[13-15s] 收尾：品牌Logo浮现，配文「百年匠心，一壶温情」",
        _ => "[0-3s] 开场：航拍福州三坊七巷，晨光洒落古建筑\n"
            + "[3-6s] 叙事：酿酒师傅在百年酒坊中查看酒缸，岁月感\n"
            + "[6-9s] 工艺：红曲米入缸、搅拌、封坛，匠人手部特写\n"
            + "[9-12s] 产品：酒坛开封，琥珀色酒液流出，配乐渐强\n"
            + "[12-14s] 场景：现代餐桌上，中西友人共饮，文化交融\n"
            + "[14-15s] 品牌：Logo + Slogan「From Fuzhou to the World」"
    };
}
