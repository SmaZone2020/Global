using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class QuickCreateRequest
{
    [JsonPropertyName("brandName")]
    public string BrandName { get; set; } = string.Empty;

    [JsonPropertyName("productName")]
    public string ProductName { get; set; } = string.Empty;
}
