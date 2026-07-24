using System.Text.Json.Serialization;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Models.Dtos;

public class AnalysisResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("type")]
    public AnalysisType Type { get; set; }

    [JsonPropertyName("content")]
    public object? Content { get; set; }

    [JsonPropertyName("sources")]
    public object? Sources { get; set; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
}
