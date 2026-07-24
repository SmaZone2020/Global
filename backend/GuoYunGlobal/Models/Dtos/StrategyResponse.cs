using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class StrategyResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("positioning")]
    public object? Positioning { get; set; }

    [JsonPropertyName("skuPlan")]
    public object? SkuPlan { get; set; }

    [JsonPropertyName("packaging")]
    public object? Packaging { get; set; }

    [JsonPropertyName("pricing")]
    public object? Pricing { get; set; }

    [JsonPropertyName("channels")]
    public object? Channels { get; set; }

    [JsonPropertyName("roadmap")]
    public object? Roadmap { get; set; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
}
