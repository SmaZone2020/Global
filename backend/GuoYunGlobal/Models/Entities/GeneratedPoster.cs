using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Entities;

public class GeneratedPoster
{
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("styleKey")]
    public string StyleKey { get; set; } = string.Empty;

    [JsonPropertyName("styleLabel")]
    public string StyleLabel { get; set; } = string.Empty;

    [JsonPropertyName("customPrompt")]
    public string CustomPrompt { get; set; } = string.Empty;

    [JsonPropertyName("finalPrompt")]
    public string FinalPrompt { get; set; } = string.Empty;

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public string Status { get; set; } = "pending";

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Project Project { get; set; } = null!;
}
