namespace GuoYunGlobal.Services.Demo;

public static class DemoMarketData
{
    public static string GetMarketInsightContent()
    {
        return """
        {
            "candidates": [
                {
                    "country": "美国",
                    "totalScore": 82,
                    "dimensionScores": {
                        "demand": 80,
                        "cultureFit": 86,
                        "competition": 65,
                        "channelAccess": 78,
                        "compliance": 62,
                        "economics": 74
                    },
                    "evidence": [
                        "亚洲餐饮市场持续增长，中餐馆数量超过4.5万家",
                        "纽约、旧金山、洛杉矶亚裔人口密集",
                        "Natural Wine和手工酿造品类消费趋势上升",
                        "Amazon和亚洲超市渠道成熟"
                    ],
                    "risks": [
                        "酒类进口标签法规严格，需TTB审批",
                        "清酒品类已建立强认知，消费者教育成本高",
                        "各州酒类分销法规差异大"
                    ],
                    "recommended": true
                },
                {
                    "country": "日本",
                    "totalScore": 78,
                    "dimensionScores": {
                        "demand": 72,
                        "cultureFit": 88,
                        "competition": 55,
                        "channelAccess": 70,
                        "compliance": 68,
                        "economics": 65
                    },
                    "evidence": [
                        "日本消费者对发酵酒有深厚理解",
                        "中日饮食文化有共通性，佐餐场景天然契合",
                        "绍兴酒在日本已有一定认知基础"
                    ],
                    "risks": [
                        "日本本土清酒品类极强，市场竞争激烈",
                        "进口酒类税率较高",
                        "日本消费者对品质要求极高"
                    ],
                    "recommended": false
                },
                {
                    "country": "新加坡",
                    "totalScore": 75,
                    "dimensionScores": {
                        "demand": 68,
                        "cultureFit": 90,
                        "competition": 60,
                        "channelAccess": 72,
                        "compliance": 70,
                        "economics": 58
                    },
                    "evidence": [
                        "华人占比超75%，对黄酒品类有基本认知",
                        "东南亚华人宴席文化保留较好",
                        "新加坡作为亚洲枢纽，辐射东南亚市场"
                    ],
                    "risks": [
                        "市场体量较小，天花板有限",
                        "酒类消费税较高",
                        "本地竞品（绍兴酒）已有稳定供应"
                    ],
                    "recommended": false
                }
            ],
            "consumerPersonas": [
                {
                    "name": "Emily",
                    "age": 29,
                    "city": "纽约",
                    "profile": "亚洲文化爱好者，热衷探索异国美食和饮品",
                    "needs": "寻找与中餐搭配的新酒种，注重文化故事和仪式感",
                    "motivations": ["文化探索", "餐酒搭配", "社交分享"],
                    "barriers": ["不了解黄酒品类", "不知道饮用方式", "购买渠道有限"],
                    "scenarios": ["中餐厅点单", "家庭聚餐", "品鉴会", "送礼"]
                }
            ],
            "competitorAnalysis": [
                {
                    "name": "Gekkeikan (月桂冠清酒)",
                    "country": "日本",
                    "priceRange": "$12-25",
                    "positioning": "日常佐餐清酒，大众化定位",
                    "channels": ["亚洲超市", "电商", "餐厅", "主流超市"]
                },
                {
                    "name": "Choya (蝶矢梅酒)",
                    "country": "日本",
                    "priceRange": "$10-20",
                    "positioning": "果味利口酒，年轻化定位",
                    "channels": ["亚洲超市", "电商", "便利店"]
                },
                {
                    "name": "中低端进口葡萄酒",
                    "country": "多国",
                    "priceRange": "$10-30",
                    "positioning": "佐餐酒主流选择",
                    "channels": ["超市", "电商", "餐厅", "酒类专卖店"]
                }
            ],
            "channels": [
                {
                    "name": "亚洲餐厅",
                    "priority": "高",
                    "difficulty": "中",
                    "description": "与中餐、日料餐厅合作推广温饮体验"
                },
                {
                    "name": "亚洲超市",
                    "priority": "高",
                    "difficulty": "低",
                    "description": "进入H Mart、99 Ranch Market等连锁亚超"
                },
                {
                    "name": "电商平台",
                    "priority": "中",
                    "difficulty": "中",
                    "description": "Amazon、Weee!等平台开设品牌店铺"
                },
                {
                    "name": "精品酒类专卖店",
                    "priority": "中",
                    "difficulty": "高",
                    "description": "进入注重品类多样性的精品酒铺"
                }
            ],
            "pricingSuggestion": {
                "entryLevel": {
                    "price": "$15-20",
                    "positioning": "日常佐餐，试饮入门"
                },
                "midRange": {
                    "price": "$25-35",
                    "positioning": "品质体验，餐厅合作款"
                },
                "premium": {
                    "price": "$45-60",
                    "positioning": "礼赠收藏，限量文化款"
                }
            },
            "complianceRisks": [
                {
                    "area": "进口审批",
                    "risk": "高",
                    "detail": "需通过TTB(烟酒税务贸易局)审批，获取进口许可",
                    "note": "需由专业进口商/律师复核"
                },
                {
                    "area": "标签合规",
                    "risk": "高",
                    "detail": "需符合TTB标签规范，含酒精度、原产国、健康警示等",
                    "note": "需由专业进口商/律师复核"
                },
                {
                    "area": "健康声明",
                    "risk": "中",
                    "detail": "不可宣称养生、保健等功效，避免FDA监管风险",
                    "note": "品牌方已确认不使用保健类宣称"
                }
            ]
        }
        """;
    }

    public static string GetMarketInsightSources()
    {
        return """
        [
            {
                "title": "美国人口普查局亚裔人口数据",
                "type": "publicData",
                "excerpt": "纽约、旧金山、洛杉矶都会区亚裔人口占比超15%",
                "capturedAt": "2026-07-24"
            },
            {
                "title": "TTB进口酒类法规",
                "type": "publicData",
                "excerpt": "发酵酒类需获取基本进口许可，标签需经TTB审批",
                "capturedAt": "2026-07-24"
            },
            {
                "title": "AI推断：市场评分模型",
                "type": "aiInference",
                "excerpt": "基于多维度数据综合评估三个候选市场的进入可行性",
                "capturedAt": "2026-07-24"
            }
        ]
        """;
    }
}
