using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Entities;

public class MarketCandidate
{
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("country")]
    public string Country { get; set; } = string.Empty;

    [JsonPropertyName("totalScore")]
    public int TotalScore { get; set; }

    [JsonPropertyName("dimensionScores")]
    public string DimensionScores { get; set; } = string.Empty;

    [JsonPropertyName("evidence")]
    public string Evidence { get; set; } = string.Empty;

    [JsonPropertyName("risks")]
    public string Risks { get; set; } = string.Empty;

    [JsonPropertyName("isSelected")]
    public bool IsSelected { get; set; }

    // Navigation
    public Project Project { get; set; } = null!;
}
