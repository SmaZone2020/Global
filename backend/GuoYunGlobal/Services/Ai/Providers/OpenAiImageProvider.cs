using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using GuoYunGlobal.Services.Ai.Options;

namespace GuoYunGlobal.Services.Ai.Providers;

public class OpenAiImageProvider : IImageProvider
{
    private readonly HttpClient _http;
    private readonly ImageGenOptions _options;
    private readonly ILogger<OpenAiImageProvider> _logger;

    private static readonly Regex ImageUrlRegex =
        new(@"!\[image\]\((https?://[^\)]+)\)", RegexOptions.Compiled);

    public OpenAiImageProvider(
        HttpClient http,
        IOptions<ImageGenOptions> options,
        ILogger<OpenAiImageProvider> logger)
    {
        _http = http;
        _options = options.Value;

        _http.BaseAddress = new Uri(_options.Endpoint.TrimEnd('/') + "/");
        _http.Timeout = TimeSpan.FromSeconds(_options.TimeoutSeconds);
        _logger = logger;
    }

    public async Task<string> GenerateImageAsync(string prompt, CancellationToken ct = default)
    {
        var body = new
        {
            model = _options.Model,
            group = "vip_2_image",
            messages = new[] { new { role = "user", content = prompt } },
            stream = false,
            temperature = 0.7,
            top_p = 1,
            frequency_penalty = 0,
            presence_penalty = 0
        };

        var json = JsonSerializer.Serialize(body);
        _logger.LogInformation("[IMG] REQ model={Model} body={Body}",
            _options.Model, json[..Math.Min(1000, json.Length)]);

        using var request = new HttpRequestMessage(HttpMethod.Post, "v1/chat/completions")
        {
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.ApiKey);

        using var response = await _http.SendAsync(request, ct);

        var rawBody = await response.Content.ReadAsStringAsync(ct);
        _logger.LogInformation("[IMG] RES status={Status} body={Body}",
            (int)response.StatusCode, rawBody[..Math.Min(500, rawBody.Length)]);

        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"Image API returned {response.StatusCode}: {rawBody[..Math.Min(200, rawBody.Length)]}");

        if (rawBody.Contains("\"success\":false") || rawBody.Contains("\"success\": false"))
            throw new HttpRequestException($"Image API error: {rawBody[..Math.Min(200, rawBody.Length)]}");

        // Extract image URL from choices[0].message.content markdown
        using var doc = JsonDocument.Parse(rawBody);
        var content = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "";

        var match = ImageUrlRegex.Match(content);
        if (!match.Success)
            throw new InvalidOperationException($"No image URL found in response content: {content[..Math.Min(200, content.Length)]}");

        return match.Groups[1].Value;
    }
}
