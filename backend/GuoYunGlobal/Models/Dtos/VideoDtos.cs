using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class GenerateVideoScriptRequest
{
    [JsonPropertyName("prompt")]
    public string Prompt { get; set; } = string.Empty;

    [JsonPropertyName("style")]
    public string Style { get; set; } = string.Empty;
}

public class VideoScriptResponse
{
    [JsonPropertyName("script")]
    public string Script { get; set; } = string.Empty;

    [JsonPropertyName("style")]
    public string Style { get; set; } = string.Empty;

    [JsonPropertyName("prompt")]
    public string Prompt { get; set; } = string.Empty;
}
