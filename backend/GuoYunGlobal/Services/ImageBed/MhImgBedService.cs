using System.Net.Http.Headers;
using System.Text.Json;

namespace GuoYunGlobal.Services.ImageBed;

public class MhImgBedService : IImageBedService
{
    private readonly HttpClient _http;
    private readonly ILogger<MhImgBedService> _logger;

    private const string Endpoint = "https://mhimg.cn/api/v1/upload";
    private const string ApiKey = "130|FkRu61VJOlU25OOsZpOb3F8D1DL3RpT5zpYGM0Cg";

    public MhImgBedService(HttpClient http, ILogger<MhImgBedService> logger)
    {
        _http = http;
        _logger = logger;
    }

    public async Task<string> UploadAsync(Stream fileStream, string fileName, CancellationToken ct = default)
    {
        using var content = new MultipartFormDataContent();
        using var streamContent = new StreamContent(fileStream);
        streamContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        content.Add(streamContent, "file", fileName);

        using var request = new HttpRequestMessage(HttpMethod.Post, Endpoint)
        {
            Content = content
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", ApiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        _logger.LogInformation("[ImageBed] Uploading {FileName}", fileName);

        var response = await _http.SendAsync(request, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        _logger.LogInformation("[ImageBed] RES status={Status} body={Body}",
            (int)response.StatusCode, body[..Math.Min(500, body.Length)]);

        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"Image bed returned {response.StatusCode}: {body}");

        using var doc = JsonDocument.Parse(body);
        var root = doc.RootElement;

        if (!root.GetProperty("status").GetBoolean())
        {
            var msg = root.GetProperty("message").GetString() ?? "unknown error";
            throw new InvalidOperationException($"Image bed upload failed: {msg}");
        }

        var url = root.GetProperty("data")
            .GetProperty("links")
            .GetProperty("url")
            .GetString() ?? "";

        return url;
    }
}
