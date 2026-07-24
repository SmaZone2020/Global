namespace GuoYunGlobal.Services.Demo;

public static class DemoProductData
{
    public static string GetProductAnalysisContent()
    {
        return """
        {
            "tags": ["传统黄酒", "发酵酒", "家庭宴席", "福建文化", "礼赠产品"],
            "sellingPoints": [
                {
                    "point": "低度数米香发酵酒",
                    "description": "13度酒精含量，口感柔和，适合佐餐搭配中式料理，尤其适合不喜高度酒精的消费者"
                },
                {
                    "point": "温饮体验",
                    "description": "传统温饮方式带来独特饮用仪式感，区别于冷饮为主的西方酒类，提供差异化体验"
                },
                {
                    "point": "红曲工艺",
                    "description": "采用福建特有红曲酿造工艺，赋予酒体琥珀色泽与独特米香，工艺本身具有非遗文化价值"
                },
                {
                    "point": "文化属性",
                    "description": "品牌源自1842年福州三坊七巷历史街区，具备深厚的地域文化和历史叙事资源"
                }
            ],
            "swot": {
                "strengths": [
                    "1842年品牌历史，中华老字号认证",
                    "独特红曲酿造工艺，具有非遗级别文化价值",
                    "低度数米香型，口感柔和易接受",
                    "三坊七巷版包装具有文化辨识度"
                ],
                "weaknesses": [
                    "海外消费者对黄酒品类认知极低",
                    "缺乏英文品牌传播素材",
                    "国内定价偏低，海外定价空间受限",
                    "保质期和储运条件对出口有挑战"
                ],
                "opportunities": [
                    "亚洲餐饮文化在欧美持续增长",
                    "自然发酵酒品类（Natural Wine）趋势兴起",
                    "中餐出海带动佐餐酒需求",
                    "年轻消费者对文化探索型产品兴趣增加"
                ],
                "threats": [
                    "日本清酒已建立强势品类认知",
                    "酒类进口法规和标签要求严格",
                    "低价中国酒类产品的负面印象",
                    "替代品（梅酒、自然酒）竞争"
                ]
            },
            "overseasBarriers": [
                {
                    "term": "黄酒",
                    "issue": "外国消费者不理解'黄酒'的含义，容易与白酒混淆",
                    "suggestion": "Chinese Aged Rice Wine",
                    "credibility": "aiInference"
                },
                {
                    "term": "老酒",
                    "issue": "'老酒'的直译 Old Wine 可能产生负面联想",
                    "suggestion": "Heritage Rice Wine / Aged Rice Wine",
                    "credibility": "aiInference"
                },
                {
                    "term": "红曲",
                    "issue": "Red Yeast Rice 在美国有膳食补充剂的监管争议",
                    "suggestion": "Traditional Red-Yeast Fermentation Craft",
                    "credibility": "publicData"
                }
            ]
        }
        """;
    }

    public static string GetProductAnalysisSources()
    {
        return """
        [
            {
                "title": "品牌方资料",
                "type": "verified",
                "excerpt": "品牌历史可追溯至1842年，福州三坊七巷老字号",
                "capturedAt": "2026-07-24"
            },
            {
                "title": "SerpAPI: chinese rice wine US market",
                "type": "publicData",
                "excerpt": "亚洲米酒在美国市场的搜索量年增长15%",
                "capturedAt": "2026-07-24"
            },
            {
                "title": "TTB酒类进口法规数据库",
                "type": "publicData",
                "excerpt": "Rice Wine品类需TTB标签审批，需标注原产国和酒精度",
                "capturedAt": "2026-07-24"
            }
        ]
        """;
    }
}
