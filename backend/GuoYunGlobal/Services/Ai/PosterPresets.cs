namespace GuoYunGlobal.Services.Ai;

public record PosterPreset(
    string Key,
    string Label,
    string Description,
    string[] PreviewKeywords,
    string BasePrompt);

public static class PosterPresets
{
    public static readonly IReadOnlyList<PosterPreset> All = new[]
    {
        new PosterPreset(
            Key: "luxury",
            Label: "高端礼品风",
            Description: "黑金配色·极简构图·中式纹样，适合高端商超和礼盒场景",
            PreviewKeywords: new[] { "奢华", "黑金", "礼盒", "极简" },
            BasePrompt: "Luxury Chinese product poster for international premium market. Deep navy and gold color palette, " +
                        "minimalist composition with elegant negative space, traditional Chinese seal script accents, " +
                        "silk texture background with subtle brocade patterns, dramatic chiaroscuro lighting, " +
                        "high-end gift box arrangement, premium retail aesthetic. " +
                        "Ultra-realistic commercial photography style, 4K resolution."
        ),
        new PosterPreset(
            Key: "oriental",
            Label: "东方美学风",
            Description: "水墨山水·国风纹饰·传统器皿，强调文化故事性",
            PreviewKeywords: new[] { "水墨", "山水", "国风", "文化" },
            BasePrompt: "Oriental aesthetics Chinese cultural product poster for global audiences. " +
                        "Ink wash painting background with misty mountain landscape, traditional ceramic vessel, " +
                        "vermilion seal stamp, organic calligraphy brushstrokes, poetry text overlay, " +
                        "warm amber and ochre tones, aged scroll parchment texture, museum-quality art direction. " +
                        "Evocative storytelling narrative style, soft ethereal atmosphere."
        ),
        new PosterPreset(
            Key: "trendy",
            Label: "年轻潮流风",
            Description: "国潮撞色·插画风·社媒原生格式，适合TikTok和Instagram种草",
            PreviewKeywords: new[] { "国潮", "撞色", "潮流", "社媒" },
            BasePrompt: "Modern Chinese neo-traditional brand poster targeting Gen Z international consumers. " +
                        "Vibrant contrasting colors — vermilion red against electric teal or deep violet, " +
                        "bold typographic mix of Chinese characters and Latin lettering, " +
                        "dynamic diagonal composition, Chinese pop-art illustration style, " +
                        "neon accent lighting against dark background, energetic youthful vibe, " +
                        "social media native format, streetwear brand aesthetic meets traditional motifs."
        ),
        new PosterPreset(
            Key: "business",
            Label: "商务宴请风",
            Description: "简洁正式·暗调背景·宴席氛围，适合B端采购和商务礼赠",
            PreviewKeywords: new[] { "商务", "宴席", "正式", "B端" },
            BasePrompt: "Professional Chinese business banquet product poster for B2B marketing. " +
                        "Sophisticated dark charcoal background, subtle golden geometric latticework patterns, " +
                        "formal dining setting with polished mahogany table, crystal glassware and fine porcelain, " +
                        "precise symmetrical layout with restrained typography, " +
                        "corporate prestige aesthetic, understated luxury, warm candlelight ambiance. " +
                        "Suitable for enterprise procurement and formal banquet channel marketing."
        ),
    };

    public static PosterPreset? Get(string key) =>
        All.FirstOrDefault(p => p.Key == key);

    public static string BuildPrompt(string key, string brandName, string productName, string customPrompt, string referenceImageUrl = "")
    {
        var preset = Get(key);
        var base_ = preset?.BasePrompt ?? customPrompt;
        var productContext = $" Product: {productName} by {brandName}.";

        var result = string.IsNullOrWhiteSpace(customPrompt)
            ? base_ + productContext
            : $"{base_} Additional requirements: {customPrompt}.{productContext}";

        if (!string.IsNullOrWhiteSpace(referenceImageUrl))
            result += $" Use the product image from this URL as the main product in the poster: {referenceImageUrl}";

        return result;
    }
}
