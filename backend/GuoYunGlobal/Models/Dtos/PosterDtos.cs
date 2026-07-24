using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class GeneratePosterRequest
{
    [JsonPropertyName("styleKey")]
    public string StyleKey { get; set; } = string.Empty;

    [JsonPropertyName("customPrompt")]
    public string CustomPrompt { get; set; } = string.Empty;
}

public class GeneratedPosterResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("styleKey")]
    public string StyleKey { get; set; } = string.Empty;

    [JsonPropertyName("styleLabel")]
    public string StyleLabel { get; set; } = string.Empty;

    [JsonPropertyName("finalPrompt")]
    public string FinalPrompt { get; set; } = string.Empty;

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public string Status { get; set; } = string.Empty;

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
}

public class PosterPresetInfo
{
    [JsonPropertyName("key")]
    public string Key { get; set; } = string.Empty;

    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("previewKeywords")]
    public List<string> PreviewKeywords { get; set; } = new();
}
