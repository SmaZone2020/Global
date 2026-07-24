namespace GuoYunGlobal.Services.Ai;

public interface IImageProvider
{
    Task<string> GenerateImageAsync(string prompt, CancellationToken ct = default);
}
