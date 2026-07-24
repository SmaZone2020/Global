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
        _http.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _options.ApiKey);
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

        var fullContent = await ReadSseContentAsync(response, ct);

        _logger.LogInformation("[IMG] SSE content={Content}",
            fullContent[..Math.Min(500, fullContent.Length)]);

        var match = ImageUrlRegex.Match(fullContent);
        if (!match.Success)
            throw new InvalidOperationException("No image URL found in SSE response");

        return match.Groups[1].Value;
    }

    private static async Task<string> ReadSseContentAsync(
        HttpResponseMessage response, CancellationToken ct)
    {
        var sb = new StringBuilder();
        using var stream = await response.Content.ReadAsStreamAsync(ct);
        using var reader = new StreamReader(stream, Encoding.UTF8);

        while (!ct.IsCancellationRequested)
        {
            var line = await reader.ReadLineAsync(ct);
            if (line == null) break;
            if (line == null) break;
            if (!line.StartsWith("data: ")) continue;

            var data = line["data: ".Length..];
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
