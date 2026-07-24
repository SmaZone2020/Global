namespace GuoYunGlobal.Services.Document;

public class DocumentParseService
{
    private readonly string _uploadDir;

    public DocumentParseService(IWebHostEnvironment env)
    {
        _uploadDir = Path.Combine(env.ContentRootPath, "uploads");
        if (!Directory.Exists(_uploadDir))
        {
            Directory.CreateDirectory(_uploadDir);
        }
    }

    public async Task<DocumentParseResult> ParseAndSaveAsync(IFormFile file)
    {
        var fileName = file.FileName;
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        var fileType = extension.TrimStart('.');

        var uniqueName = $"{Guid.NewGuid():N}_{fileName}";
        var filePath = Path.Combine(_uploadDir, uniqueName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var parsedContent = await ExtractContentAsync(filePath, fileType);

        return new DocumentParseResult
        {
            FileName = fileName,
            FileType = fileType,
            FilePath = filePath,
            ParsedContent = parsedContent
        };
    }

    public bool IsSupportedFileType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        var supportedTypes = new[] { ".pdf", ".md", ".doc", ".docx" };
        return supportedTypes.Contains(extension);
    }

    private async Task<string> ExtractContentAsync(string filePath, string fileType)
    {
        return fileType switch
        {
            "md" => await File.ReadAllTextAsync(filePath),
            "pdf" => "PDF文件已上传，内容将由AI解析",
            "doc" or "docx" => "Word文件已上传，内容将由AI解析",
            _ => "不支持的文件格式"
        };
    }
}

public class DocumentParseResult
{
    public string FileName { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string ParsedContent { get; set; } = string.Empty;
}
