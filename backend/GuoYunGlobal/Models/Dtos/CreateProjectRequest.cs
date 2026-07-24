using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class CreateProjectRequest
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("brandName")]
    public string BrandName { get; set; } = string.Empty;

    [JsonPropertyName("brandOrigin")]
    public string BrandOrigin { get; set; } = string.Empty;

    [JsonPropertyName("brandHistory")]
    public string BrandHistory { get; set; } = string.Empty;

    [JsonPropertyName("brandVoice")]
    public string BrandVoice { get; set; } = string.Empty;

    [JsonPropertyName("prohibitedClaims")]
    public string ProhibitedClaims { get; set; } = string.Empty;

    [JsonPropertyName("establishedYear")]
    public int? EstablishedYear { get; set; }

    [JsonPropertyName("products")]
    public List<ProductInput> Products { get; set; } = new();

    [JsonPropertyName("targetCountries")]
    public List<string>? TargetCountries { get; set; }
}
