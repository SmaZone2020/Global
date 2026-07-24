using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using GuoYunGlobal.Services.Ai.Options;

namespace GuoYunGlobal.Services.Ai.Providers;

public class OpenAiImageProvider : IImageProvider
{
    private readonly HttpClient _http;
    private readonly ImageGenOptions _options;
    private readonly ILogger<OpenAiImageProvider> _logger;

    public OpenAiImageProvider(
        HttpClient http,
        IOptions<ImageGenOptions> options,
        ILogger<OpenAiImageProvider> logger)
    {
        _http = http;
        _options = options.Value;
        _logger = logger;

        _http.BaseAddress = new Uri(_options.Endpoint.TrimEnd('/') + "/");
        _http.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _options.ApiKey);
        _http.Timeout = TimeSpan.FromSeconds(_options.TimeoutSeconds);
    }

    public async Task<string> GenerateImageAsync(string prompt, CancellationToken ct = default)
    {
        var body = new
        {
            model = _options.Model,
            prompt,
            n = 1,
            size = _options.Size,
            response_format = "url"
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _logger.LogInformation("[IMG] REQ model={Model} body={Body}",
            _options.Model, json[..Math.Min(1000, json.Length)]);

        var response = await _http.PostAsync("v1/images/generations", content, ct);
        var responseBody = await response.Content.ReadAsStringAsync(ct);

        _logger.LogInformation("[IMG] RES status={Status} body={Body}",
            (int)response.StatusCode, responseBody[..Math.Min(1000, responseBody.Length)]);

        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"Image API returned {response.StatusCode}");

        using var doc = JsonDocument.Parse(responseBody);
        var url = doc.RootElement
            .GetProperty("data")[0]
            .GetProperty("url")
            .GetString() ?? "";

        return url;
    }
}
