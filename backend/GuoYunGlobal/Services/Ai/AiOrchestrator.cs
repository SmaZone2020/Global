using System.Text.Json;
using GuoYunGlobal.Services.Demo;

namespace GuoYunGlobal.Services.Ai;

public class AiOrchestrator
{
    private readonly ILlmProvider _llm;
    private readonly IImageProvider _image;
    private readonly ILogger<AiOrchestrator> _logger;

    public AiOrchestrator(
        ILlmProvider llm,
        IImageProvider image,
        ILogger<AiOrchestrator> logger)
    {
        _llm = llm;
        _image = image;
        _logger = logger;
    }

    public async Task<string> GenerateProductAnalysisAsync(string brandInfo, string productInfo, CancellationToken ct = default)
    {
        var system = PromptTemplates.ProductAnalysis;
        var user = $"品牌信息：\n{brandInfo}\n\n产品信息：\n{productInfo}";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Product analysis AI failed, using demo data");
            return DemoProductData.GetProductAnalysisContent();
        }
    }

    public async Task<string> GenerateCultureDecodeAsync(string brandInfo, string productInfo, CancellationToken ct = default)
    {
        var system = PromptTemplates.CultureDecode;
        var user = $"品牌信息：\n{brandInfo}\n\n产品信息：\n{productInfo}";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Culture decode AI failed, using demo data");
            return DemoCultureData.GetCultureDecodeContent();
        }
    }

    public async Task<string> GenerateMarketInsightAsync(string brandInfo, string productInfo, CancellationToken ct = default)
    {
        var system = PromptTemplates.MarketInsight;
        var user = $"品牌信息：\n{brandInfo}\n\n产品信息：\n{productInfo}";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Market insight AI failed, using demo data");
            return DemoMarketData.GetMarketInsightContent();
        }
    }

    public async Task<string> GenerateStrategyAsync(string analysisContext, string section, CancellationToken ct = default)
    {
        var system = PromptTemplates.StrategyGenerate;
        var user = $"基于以下分析结果，生成{section}模块的出海策略（JSON格式）：\n\n{analysisContext}";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Strategy AI failed for {Section}, using demo data", section);
            return section switch
            {
                "positioning" => DemoStrategyData.GetPositioning(),
                "skuPlan" => DemoStrategyData.GetSkuPlan(),
                "packaging" => DemoStrategyData.GetPackaging(),
                "pricing" => DemoStrategyData.GetPricing(),
                "channels" => DemoStrategyData.GetChannels(),
                "roadmap" => DemoStrategyData.GetRoadmap(),
                _ => "{}"
            };
        }
    }

    public async Task<string> GenerateMarketingContentAsync(
        string brandInfo, string strategyContext, string channel, string style, string audience,
        CancellationToken ct = default)
    {
        var system = PromptTemplates.MarketingContent;
        var user = $"品牌：{brandInfo}\n策略背景：{strategyContext}\n\n"
            + $"请为以下场景生成营销内容：\n渠道：{channel}\n风格：{style}\n目标客群：{audience}\n\n"
            + "输出JSON数组，每项包含 contentType(brandStory/socialPost/videoScript/posterPrompt) 和 content 字段。";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Marketing content AI failed, using demo");
            return "";
        }
    }

    public async Task<string> GenerateImageAsync(string prompt, CancellationToken ct = default)
    {
        try
        {
            return await _image.GenerateImageAsync(prompt, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Image generation failed");
            return "";
        }
    }

    public async Task<string> GenerateVideoScriptAsync(string prompt, string style, CancellationToken ct = default)
    {
        var system = "你是一位国际广告片导演，拥有20年商业短片拍摄经验，擅长将产品故事转化为极具视觉冲击力的分镜脚本。"
            + "你精通镜头语言（推拉摇移跟升降）、光影设计、色彩心理学和叙事节奏。"
            + "\n\n输出要求："
            + "\n- 每行一个分镜，格式严格为：[起止时间] 镜头类型 | 画面内容 | 音效/配乐提示"
            + "\n- 标注镜头运动方式（如：慢推、俯拍、手持跟拍、航拍、微距特写等）"
            + "\n- 标注光线氛围（如：逆光剪影、暖色侧光、霓虹冷光等）"
            + "\n- 最后一行附上整体配乐建议和色调方案"
            + "\n- 根据用户指定的时长生成对应数量的分镜";
        var user = $"视频风格与参数：\n{prompt}\n\n请以专业导演的视角生成完整分镜脚本：";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Video script generation failed");
            return "";
        }
    }

    public async Task<string> GenerateProductInfoAsync(string brandName, string productName, CancellationToken ct = default)
    {
        var system = PromptTemplates.ProductInfoGenerate;
        var user = $"品牌名称：{brandName}\n产品名称：{productName}";
        return await _llm.ChatAsync(system, user, ct);
    }
}
