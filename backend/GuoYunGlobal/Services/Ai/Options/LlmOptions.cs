namespace GuoYunGlobal.Services.Ai.Options;

public class LlmOptions
{
    public string Provider { get; set; } = "openai-compatible";
    public string Endpoint { get; set; } = "https://ark.cn-beijing.volces.com/api/compatible";
    public string ApiKey { get; set; } = "";
    public string Model { get; set; } = "deepseek-v4-pro";
    public int MaxTokens { get; set; } = 4096;
    public double Temperature { get; set; } = 0.7;
    public int TimeoutSeconds { get; set; } = 60;
}
