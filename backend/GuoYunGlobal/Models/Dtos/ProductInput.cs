using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class ProductInput
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("category")]
    public string Category { get; set; } = string.Empty;

    [JsonPropertyName("sku")]
    public string Sku { get; set; } = string.Empty;

    [JsonPropertyName("specs")]
    public string Specs { get; set; } = string.Empty;

    [JsonPropertyName("ingredients")]
    public string Ingredients { get; set; } = string.Empty;

    [JsonPropertyName("process")]
    public string Process { get; set; } = string.Empty;

    [JsonPropertyName("domesticPrice")]
    public decimal? DomesticPrice { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;
}
