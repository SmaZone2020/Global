namespace GuoYunGlobal.Services.ImageBed;

public interface IImageBedService
{
    Task<string> UploadAsync(Stream fileStream, string fileName, CancellationToken ct = default);
}
