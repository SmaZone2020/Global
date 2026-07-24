using System.Text.Json.Serialization;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Models.Entities;

public class Project
{
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public ProjectStatus Status { get; set; } = ProjectStatus.Draft;

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Brand? Brand { get; set; }
    public List<Product> Products { get; set; } = new();
    public List<UploadedDocument> Documents { get; set; } = new();
    public List<AnalysisResult> AnalysisResults { get; set; } = new();
    public List<MarketCandidate> MarketCandidates { get; set; } = new();
    public Strategy? Strategy { get; set; }
    public List<GeneratedAsset> GeneratedAssets { get; set; } = new();
}
