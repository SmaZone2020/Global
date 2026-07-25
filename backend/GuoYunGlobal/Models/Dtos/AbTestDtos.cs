using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class GenerateAbTestRequest
{
    [JsonPropertyName("versions")]
    public List<string> Versions { get; set; } = new();
}

public class AbTestVersionResponse
{
    [JsonPropertyName("versionKey")]
    public string VersionKey { get; set; } = string.Empty;

    [JsonPropertyName("versionLabel")]
    public string VersionLabel { get; set; } = string.Empty;

    [JsonPropertyName("content")]
    public string Content { get; set; } = string.Empty;
}

public class AbTestResponse
{
    [JsonPropertyName("versions")]
    public List<AbTestVersionResponse> Versions { get; set; } = new();
}
