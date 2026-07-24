namespace GuoYunGlobal.Services.Ai;

public record ChatMessage(string Role, string Content);

public interface ILlmProvider
{
    Task<string> ChatAsync(string systemPrompt, string userPrompt, CancellationToken ct = default);
    Task<string> ChatAsync(List<ChatMessage> messages, CancellationToken ct = default);
}
