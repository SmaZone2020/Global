using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using GuoYunGlobal.Services.Ai.Options;

namespace GuoYunGlobal.Services.Ai.Providers;

public class OpenAiCompatibleProvider : ILlmProvider
{
    private readonly HttpClient _http;
    private readonly LlmOptions _options;
    private readonly ILogger<OpenAiCompatibleProvider> _logger;

    public OpenAiCompatibleProvider(
        HttpClient http,
        IOptions<LlmOptions> options,
        ILogger<OpenAiCompatibleProvider> logger)
    {
        _http = http;
        _options = options.Value;
        _logger = logger;

        _http.BaseAddress = new Uri(_options.Endpoint.TrimEnd('/') + "/");
        _http.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _options.ApiKey);
        _http.Timeout = TimeSpan.FromSeconds(_options.TimeoutSeconds);
    }

    public Task<string> ChatAsync(string systemPrompt, string userPrompt, CancellationToken ct = default)
    {
        var messages = new List<ChatMessage>
        {
            new("system", systemPrompt),
            new("user", userPrompt)
        };
        return ChatAsync(messages, ct);
    }

    public async Task<string> ChatAsync(List<ChatMessage> messages, CancellationToken ct = default)
    {
        var body = new
        {
            model = _options.Model,
            messages = messages.Select(m => new { role = m.Role, content = m.Content }),
            max_tokens = _options.MaxTokens,
            temperature = _options.Temperature
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _logger.LogInformation("LLM request to {Model}, messages: {Count}", _options.Model, messages.Count);

        var response = await _http.PostAsync("chat/completions", content, ct);
        var responseBody = await response.Content.ReadAsStringAsync(ct);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("LLM error {Status}: {Body}", response.StatusCode, responseBody[..Math.Min(500, responseBody.Length)]);
            throw new HttpRequestException($"LLM API returned {response.StatusCode}");
        }

        using var doc = JsonDocument.Parse(responseBody);
        var result = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "";

        _logger.LogInformation("LLM response length: {Len}", result.Length);
        return result;
    }
}
