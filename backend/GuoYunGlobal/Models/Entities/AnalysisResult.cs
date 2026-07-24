using System.Text.Json.Serialization;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Models.Entities;

public class AnalysisResult
{
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("type")]
    public AnalysisType Type { get; set; }

    [JsonPropertyName("content")]
    public string Content { get; set; } = string.Empty;

    [JsonPropertyName("sources")]
    public string Sources { get; set; } = string.Empty;

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Project Project { get; set; } = null!;
}
