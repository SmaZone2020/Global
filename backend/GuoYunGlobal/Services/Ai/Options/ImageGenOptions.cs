namespace GuoYunGlobal.Services.Ai.Options;

public class ImageGenOptions
{
    public string Provider { get; set; } = "openai-compatible";
    public string Endpoint { get; set; } = "https://ark.cn-beijing.volces.com/api/compatible";
    public string ApiKey { get; set; } = "";
    public string Model { get; set; } = "seedream-3";
    public string Size { get; set; } = "1024x1024";
    public int TimeoutSeconds { get; set; } = 120;
}
