using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Services.Ai;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class AbTestController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AiOrchestrator _ai;
    private readonly ILogger<AbTestController> _logger;

    public AbTestController(AppDbContext context, AiOrchestrator ai, ILogger<AbTestController> logger)
    {
        _context = context;
        _ai = ai;
        _logger = logger;
    }

    [HttpPost("{id}/abtest")]
    public async Task<IActionResult> GenerateAbTest(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        var brand = project.Brand;
        var product = brand?.Products?.FirstOrDefault();
        var brandName = brand?.Name ?? project.Name;
        var productName = product?.Name ?? project.Name;

        var productContext = $"品牌：{brandName}";
        if (brand != null)
        {
            if (!string.IsNullOrWhiteSpace(brand.Origin)) productContext += $"，产地：{brand.Origin}";
            if (!string.IsNullOrWhiteSpace(brand.History)) productContext += $"，历史：{brand.History}";
        }
        if (product != null)
        {
            productContext += $"\n产品：{productName}";
            if (!string.IsNullOrWhiteSpace(product.Category)) productContext += $"，品类：{product.Category}";
            if (!string.IsNullOrWhiteSpace(product.Specs)) productContext += $"，规格：{product.Specs}";
        }

        var versions = new[]
        {
            ("dining", "东方餐酒"),
            ("culture", "文化体验酒"),
            ("cooking", "中餐烹饪酒"),
            ("gift", "节庆礼赠酒"),
        };

        var tasks = versions.Select(v => GenerateVersionAsync(productContext, v.Item1, v.Item2));
        var results = await Task.WhenAll(tasks);

        return Ok(ApiResponse<AbTestResponse>.Ok(new AbTestResponse
        {
            Versions = results.ToList()
        }));
    }

    private async Task<AbTestVersionResponse> GenerateVersionAsync(string productContext, string key, string label)
    {
        var content = await _ai.GenerateAbTestVersionAsync(productContext, key, label);
        return new AbTestVersionResponse
        {
            VersionKey = key,
            VersionLabel = label,
            Content = content
        };
    }
}
