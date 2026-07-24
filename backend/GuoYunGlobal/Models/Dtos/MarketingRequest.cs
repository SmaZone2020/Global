using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class MarketingRequest
{
    [JsonPropertyName("channel")]
    public string Channel { get; set; } = string.Empty;

    [JsonPropertyName("style")]
    public string Style { get; set; } = string.Empty;

    [JsonPropertyName("audience")]
    public string Audience { get; set; } = string.Empty;
}
