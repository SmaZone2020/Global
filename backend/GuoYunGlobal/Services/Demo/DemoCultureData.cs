namespace GuoYunGlobal.Services.Demo;

public static class DemoCultureData
{
    public static string GetCultureDecodeContent()
    {
        return """
        {
            "culturalAssets": [
                {
                    "asset": "红曲酿造",
                    "evidence": "品牌方资料第12页，福建省非物质文化遗产名录",
                    "sourceType": "verified",
                    "chineseExpression": "古法红曲酿造，传承百年工艺",
                    "overseasExpression": "Traditional red-yeast rice fermentation, a centuries-old craft",
                    "targetAudience": "小众发酵酒爱好者",
                    "consumerNeed": "寻找差异化发酵酒",
                    "confidence": 0.86
                },
                {
                    "asset": "宴席文化",
                    "evidence": "福建传统宴席中老酒为必备饮品，用于敬酒与暖场",
                    "sourceType": "verified",
                    "chineseExpression": "宴席必备，敬酒暖场",
                    "overseasExpression": "Shared dining traditions — the centerpiece of festive gatherings",
                    "targetAudience": "注重餐饮社交体验的消费者",
                    "consumerNeed": "寻找有仪式感的佐餐酒",
                    "confidence": 0.82
                },
                {
                    "asset": "三坊七巷",
                    "evidence": "品牌扁瓶包装以三坊七巷建筑为设计元素",
                    "sourceType": "verified",
                    "chineseExpression": "三坊七巷，千年坊巷文化",
                    "overseasExpression": "Three Lanes and Seven Alleys — the living heritage of Fuzhou",
                    "targetAudience": "文化旅行者与东方美学爱好者",
                    "consumerNeed": "有故事性和地域特色的产品",
                    "confidence": 0.79
                },
                {
                    "asset": "温饮仪式",
                    "evidence": "福建老酒传统饮用方式为加热温饮",
                    "sourceType": "verified",
                    "chineseExpression": "温酒而饮，暖胃暖心",
                    "overseasExpression": "Warm it gently, savor it slowly — the art of heated rice wine",
                    "targetAudience": "品鉴体验型消费者",
                    "consumerNeed": "独特的饮用方式和仪式感",
                    "confidence": 0.75
                }
            ],
            "prohibitedTranslations": [
                {
                    "original": "养生酒",
                    "reason": "暗示医疗功效，违反FDA/TTB法规，存在合规风险",
                    "alternative": "A comforting warming experience"
                },
                {
                    "original": "补气养血",
                    "reason": "属于中医概念，在海外构成健康声明，不可使用",
                    "alternative": "A time-honored brewing tradition"
                }
            ],
            "brandStory": "Born in the historic lanes of Fuzhou's Three Lanes and Seven Alleys, Gushan Fujian Laojiu carries over 180 years of brewing heritage. Using traditional red-yeast rice fermentation, each bottle captures the warmth of Fujian's festive tables and the craftsmanship of generations.",
            "slogans": [
                "Warm your table. Share your story.",
                "The rice wine of Fuzhou, crafted for your table.",
                "180 years of warmth, one sip at a time."
            ],
            "englishIntro": "Gushan Fujian Laojiu is a traditional Chinese aged rice wine from Fuzhou, Fujian Province. Brewed with red-yeast rice using a centuries-old fermentation method, it offers a smooth, mildly sweet flavor with 13% ABV. Best enjoyed warm, it is the centerpiece of Fujian's festive dining culture — a wine made for sharing."
        }
        """;
    }

    public static string GetCultureDecodeSources()
    {
        return """
        [
            {
                "title": "品牌方资料",
                "type": "verified",
                "excerpt": "鼓山·福建老酒，起源于1842年福州三坊七巷",
                "capturedAt": "2026-07-24"
            },
            {
                "title": "福建省非物质文化遗产名录",
                "type": "publicData",
                "excerpt": "红曲酿造技艺被列入省级非遗保护名录",
                "capturedAt": "2026-07-24"
            },
            {
                "title": "AI推断：品牌叙事优化",
                "type": "aiInference",
                "excerpt": "基于品牌历史和文化资产，生成面向海外消费者的品牌故事",
                "capturedAt": "2026-07-24"
            }
        ]
        """;
    }
}
