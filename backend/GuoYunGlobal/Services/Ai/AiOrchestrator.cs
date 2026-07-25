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
        var system = @"你是一位国际广告片导演兼制片人，拥有20年商业短片拍摄经验。你需要基于产品背景资料，生成一份完整的视频制作方案。

请严格按以下结构输出，每个板块都必须详尽，数据量要充足：

## 一、创意概述
- 视频主题与核心创意（2-3句话概括）
- 目标受众画像
- 情绪曲线设计（开头→高潮→收尾的情绪走向）
- 预期传播平台与最佳发布时机

## 二、分镜脚本
每行一个分镜，格式：[起止时间] 镜头类型 | 画面内容 | 镜头运动 | 光影氛围 | 音效/配乐
- 根据用户指定时长生成对应数量的分镜（15秒=5-6个，30秒=10-12个，60秒=18-22个）
- 每个分镜必须包含具体的镜头语言（推拉摇移跟升降、手持、航拍、微距等）

## 三、视觉设计
- 主色调方案（列出3-5个色值参考）
- 字幕/文字排版风格
- 转场方式（每个转场具体描述）
- 特效与后期处理建议

## 四、声音设计
- 配乐风格与参考曲目（至少3首参考）
- 环境音设计（每个场景的环境音）
- 旁白/对白文案（如有）
- 音效时间点标注

## 五、拍摄执行要点
- 建议拍摄器材
- 布光方案（主光、辅光、背景光）
- 场地建议（至少2个备选）
- 演员/模特要求
- 道具清单

## 六、后期制作
- 调色方向（LUT参考或色彩倾向）
- 剪辑节奏（BPM参考）
- 特效制作要求
- 输出规格（分辨率、帧率、编码）

请确保输出内容专业、详尽、可直接用于制作执行。";
        var user = prompt;
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

    public async Task<string> GenerateAbTestVersionAsync(string productContext, string versionKey, string versionLabel, CancellationToken ct = default)
    {
        var system = @"你是一位品牌出海定位专家。请为指定产品生成一个特定定位方向的完整营销方案。

输出Markdown格式，包含以下板块：

## 定位说明
用2-3句话概括这个定位方向的核心逻辑

## 核心卖点（3-5个）
每个卖点用一句话表达，要求能直接用于广告文案

## 目标人群
- 典型用户画像
- 核心消费场景
- 购买动机

## 品牌Slogan（3个候选）
中英双语

## 社媒文案（3条）
- 适合Instagram/TikTok的短文案
- 含Hashtag

## 产品描述（英文，100字）
面向海外消费者的产品一句话介绍

## 视觉风格建议
- 主色调
- 拍摄场景
- 模特/道具方向

请确保内容围绕指定的定位方向展开，不要泛化。直接输出Markdown。";

        var user = $"{productContext}\n\n请以「{versionLabel}」为定位方向生成完整营销方案。";
        try
        {
            return await _llm.ChatAsync(system, user, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "AB test version generation failed for {Key}", versionKey);
            return $"## {versionLabel}\n\n（生成失败，请重试）";
        }
    }
}
