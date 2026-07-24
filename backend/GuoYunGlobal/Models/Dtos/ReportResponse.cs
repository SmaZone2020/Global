using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class ReportResponse
{
    [JsonPropertyName("project")]
    public ProjectResponse Project { get; set; } = null!;

    [JsonPropertyName("brand")]
    public BrandResponse? Brand { get; set; }

    [JsonPropertyName("products")]
    public List<ProductResponse> Products { get; set; } = new();

    [JsonPropertyName("analysisResults")]
    public List<AnalysisResponse> AnalysisResults { get; set; } = new();

    [JsonPropertyName("strategy")]
    public StrategyResponse? Strategy { get; set; }

    [JsonPropertyName("generatedAssets")]
    public List<GeneratedAssetResponse> GeneratedAssets { get; set; } = new();

    [JsonPropertyName("sources")]
    public List<object> Sources { get; set; } = new();

    [JsonPropertyName("generatedAt")]
    public DateTime GeneratedAt { get; set; }
}
