using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Services.Marketing;

public class MarketingContentService
{
    public List<GeneratedAsset> GenerateContent(
        int projectId,
        string channel,
        string style,
        string audience)
    {
        var now = DateTime.UtcNow;
        var contents = GetPresetContents(channel, style, audience);

        return contents.Select(c => new GeneratedAsset
        {
            ProjectId = projectId,
            Channel = channel,
            Style = style,
            Audience = audience,
            ContentType = c.ContentType,
            Content = c.Content,
            ImageUrl = "",
            Status = AssetStatus.Generated,
            CreatedAt = now
        }).ToList();
    }

    private List<PresetContent> GetPresetContents(
        string channel,
        string style,
        string audience)
    {
        var key = $"{channel}|{style}";

        if (key == "instagram|premium")
        {
            return GetInstagramPremiumContents();
        }

        return GetDefaultContents(channel, style, audience);
    }

    private List<PresetContent> GetInstagramPremiumContents()
    {
        return new List<PresetContent>
        {
            new()
            {
                ContentType = "brandStory",
                Content = "Born in the historic Three Lanes and Seven Alleys of Fuzhou, "
                    + "Gushan Fujian Laojiu carries over 180 years of tradition in every drop. "
                    + "Crafted with red yeast rice and glutinous rice using time-honored fermentation techniques, "
                    + "this Chinese aged rice wine offers a warm, amber-hued experience unlike any other. "
                    + "Where sake meets simplicity, Fujian Laojiu embraces depth — "
                    + "a gentle warmth that pairs perfectly with rich Asian cuisine. "
                    + "Each bottle tells the story of Fuzhou's cultural heritage, "
                    + "from the ancient brewing masters to your modern table. "
                    + "Discover a wine that doesn't just complement your meal — it completes the moment."
            },
            new()
            {
                ContentType = "socialPost",
                Content = "Post 1:\n"
                    + "Not sake. Not wine. Something older, warmer, and deeply rooted in tradition.\n"
                    + "Gushan Fujian Laojiu — 180 years of craft in every sip.\n"
                    + "#ChineseWine #RiceWine #FujianLaojiu #AsianCuisine #WarmWine #CulturalHeritage\n\n"
                    + "Post 2:\n"
                    + "The secret to a perfect dumpling dinner? A glass of warm Fujian Laojiu.\n"
                    + "Best served at 40-45 degrees C, this centuries-old rice wine transforms any meal.\n"
                    + "#FoodPairing #ChineseFood #RiceWine #DinnerGoals #FujianCulture\n\n"
                    + "Post 3:\n"
                    + "From Fuzhou's Three Lanes and Seven Alleys to your table.\n"
                    + "Red yeast rice, glutinous rice, pure mountain water — craft at its finest.\n"
                    + "#Craftsmanship #TraditionalBrewing #RedYeastRice #GuShan #AgedWine"
            },
            new()
            {
                ContentType = "videoScript",
                Content = "[0-3s] Close-up: Amber liquid being poured into a warm ceramic cup, steam rising gently.\n"
                    + "[3-6s] Cut to: Historic alleyway in Fuzhou, lanterns glowing at dusk.\n"
                    + "[6-9s] Text overlay: \"180 Years of Tradition\" — hands crafting with red yeast rice.\n"
                    + "[9-12s] Scene: Friends sharing dishes at a modern Asian restaurant, clinking cups.\n"
                    + "[12-15s] Product shot with text: \"Gushan Fujian Laojiu — Warm Your Table, Share Your Story.\"\n"
                    + "Music: Soft guzheng melody transitioning to modern lo-fi beat."
            },
            new()
            {
                ContentType = "posterPrompt",
                Content = "A premium product photography poster of Chinese aged rice wine bottle "
                    + "with amber-colored liquid, placed on a dark wooden table with traditional red yeast rice grains "
                    + "scattered artfully nearby. Background features soft-focus lanterns and ancient Fuzhou architecture. "
                    + "Warm golden lighting, cinematic composition, luxury beverage advertisement style. "
                    + "Text space reserved at top. Shot on medium format camera, shallow depth of field. "
                    + "Color palette: deep amber, burgundy red, warm gold, dark wood tones."
            }
        };
    }

    private List<PresetContent> GetDefaultContents(
        string channel,
        string style,
        string audience)
    {
        return new List<PresetContent>
        {
            new()
            {
                ContentType = "brandStory",
                Content = $"[{channel}/{style}] Gushan Fujian Laojiu is a traditional Chinese aged rice wine "
                    + "with over 180 years of heritage. Brewed with red yeast rice in Fuzhou, "
                    + "it offers a unique warm drinking experience that bridges ancient tradition and modern taste."
            },
            new()
            {
                ContentType = "socialPost",
                Content = $"[{channel}/{style}] Discover Gushan Fujian Laojiu — "
                    + "a 180-year-old craft rice wine from Fuzhou, China. "
                    + "Best served warm, perfect with Asian cuisine. "
                    + $"#FujianLaojiu #RiceWine #{channel}"
            },
            new()
            {
                ContentType = "videoScript",
                Content = $"[{channel}/{style}] [0-5s] Product reveal with warm lighting. "
                    + "[5-10s] Heritage story montage. "
                    + "[10-15s] Modern dining scene with product placement and call to action."
            },
            new()
            {
                ContentType = "posterPrompt",
                Content = $"A {style} styled product poster for Chinese aged rice wine, "
                    + $"targeting {audience}, suitable for {channel} platform. "
                    + "Warm amber tones, cultural elements, premium feel."
            }
        };
    }
}

internal class PresetContent
{
    public string ContentType { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}
