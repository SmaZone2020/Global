using System.Text.Json.Serialization;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Models.Dtos;

public class AnalysisResponse
{
    [JsonPropertyName("type")]
    public AnalysisType Type { get; set; }

    [JsonPropertyName("content")]
    public object? Content { get; set; }

    [JsonPropertyName("sources")]
    public List<string> Sources { get; set; } = new();

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
}
