using System.Text.Json.Serialization;

namespace GuoYunGlobal.Models.Dtos;

public class MarketConfirmRequest
{
    [JsonPropertyName("selectedCountry")]
    public string SelectedCountry { get; set; } = string.Empty;
}
