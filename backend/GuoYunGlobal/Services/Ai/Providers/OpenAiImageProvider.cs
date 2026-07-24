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
            stream = true,
            temperature = 0.7,
            top_p = 1,
            frequency_penalty = 0,
            presence_penalty = 0
        };

        var json = JsonSerializer.Serialize(body);
        _logger.LogInformation("[IMG] REQ model={Model} body={Body}",
            _options.Model, json[..Math.Min(1000, json.Length)]);

        using var request = new HttpRequestMessage(HttpMethod.Post, "pg/chat/completions")
        {
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.ApiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("text/event-stream"));

        using var response = await _http.SendAsync(
            request, HttpCompletionOption.ResponseHeadersRead, ct);

        _logger.LogInformation("[IMG] RES status={Status}", (int)response.StatusCode);

        if (!response.IsSuccessStatusCode)
        {
            var errBody = await response.Content.ReadAsStringAsync(ct);
            _logger.LogError("[IMG] ERR body={Body}", errBody[..Math.Min(1000, errBody.Length)]);
            throw new HttpRequestException($"Image API returned {response.StatusCode}");
        }

        var rawBody = await response.Content.ReadAsStringAsync(ct);
        _logger.LogInformation("[IMG] RAW body={Body}",
            rawBody[..Math.Min(1000, rawBody.Length)]);

        // Handle API-level errors (200 status but success=false)
        if (rawBody.Contains("\"success\":false") || rawBody.Contains("\"success\": false"))
            throw new HttpRequestException($"Image API error: {rawBody[..Math.Min(200, rawBody.Length)]}");

        var fullContent = ParseSseContent(rawBody);

        _logger.LogInformation("[IMG] SSE parsed content={Content}",
            fullContent.Length > 0 ? fullContent[..Math.Min(500, fullContent.Length)] : "(empty)");

        var match = ImageUrlRegex.Match(fullContent);
        if (!match.Success)
            throw new InvalidOperationException("No image URL found in SSE response");

        return match.Groups[1].Value;
    }

    private static string ParseSseContent(string rawBody)
    {
        var sb = new StringBuilder();

        foreach (var line in rawBody.Split('\n'))
        {
            var trimmed = line.TrimEnd('\r');
            if (!trimmed.StartsWith("data: ")) continue;

            var data = trimmed["data: ".Length..];
            if (data == "[DONE]") break;

            try
            {
                using var doc = JsonDocument.Parse(data);
                var delta = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("delta");

                if (delta.TryGetProperty("content", out var contentProp))
                {
                    var chunk = contentProp.GetString();
                    if (!string.IsNullOrEmpty(chunk))
                        sb.Append(chunk);
                }
            }
            catch (JsonException)
            {
                // skip malformed chunks
            }
        }

        return sb.ToString();
    }
}
