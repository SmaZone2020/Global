using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Entities;

public class UploadedDocument
{
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = string.Empty;

    [JsonPropertyName("fileType")]
    public string FileType { get; set; } = string.Empty;

    [JsonPropertyName("filePath")]
    public string FilePath { get; set; } = string.Empty;

    [JsonPropertyName("parsedContent")]
    public string ParsedContent { get; set; } = string.Empty;

    [JsonPropertyName("uploadedAt")]
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Project Project { get; set; } = null!;
}
