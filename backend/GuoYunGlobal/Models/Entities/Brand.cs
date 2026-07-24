using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Entities;

public class Brand
{
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("origin")]
    public string Origin { get; set; } = string.Empty;

    [JsonPropertyName("history")]
    public string History { get; set; } = string.Empty;

    [JsonPropertyName("brandVoice")]
    public string BrandVoice { get; set; } = string.Empty;

    [JsonPropertyName("prohibitedClaims")]
    public string ProhibitedClaims { get; set; } = string.Empty;

    [JsonPropertyName("establishedYear")]
    public int? EstablishedYear { get; set; }

    // Navigation
    public Project Project { get; set; } = null!;
    public List<Product> Products { get; set; } = new();
}
