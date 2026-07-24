using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Entities;

public class Strategy
{
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("positioning")]
    public string Positioning { get; set; } = string.Empty;

    [JsonPropertyName("skuPlan")]
    public string SkuPlan { get; set; } = string.Empty;

    [JsonPropertyName("packaging")]
    public string Packaging { get; set; } = string.Empty;

    [JsonPropertyName("pricing")]
    public string Pricing { get; set; } = string.Empty;

    [JsonPropertyName("channels")]
    public string Channels { get; set; } = string.Empty;

    [JsonPropertyName("roadmap")]
    public string Roadmap { get; set; } = string.Empty;

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Project Project { get; set; } = null!;
}
