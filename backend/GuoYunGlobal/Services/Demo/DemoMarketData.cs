namespace GuoYunGlobal.Services.Demo;

public static class DemoMarketData
{
    public static string GetMarketInsightContent()
    {
        return """
        {
            "candidates": [
                {
                    "country": "香港",
                    "totalScore": 92,
                    "dimensionScores": {
                        "demand": 88,
                        "cultureFit": 95,
                        "competition": 80,
                        "channelAccess": 95,
                        "compliance": 95,
                        "economics": 90
                    },
                    "evidence": [
                        "香港是自由港，对酒精浓度不高于30%的酒类已撤销牌照/许可证安排，且对一般食品进口多数无需事前批准，进入门槛极低",
                        "2024年HS2206'其他发酵饮料'进口额约4,445万美元，其中中国来源约798万美元，证明市场对亚洲发酵酒已有现实需求且中国货有进入基础",
                        "品牌在香港已有门店与华人食品店销售福建老酒，渠道教育成本不是从零开始",
                        "香港华人餐饮密集，闽菜/海鲜/补品汤水/婚宴场景对厨用老酒和饮用酒均有刚需",
                        "税负极轻，零售价可按国内建议零售价1.4-2.0倍布局，利润空间充裕"
                    ],
                    "risks": [
                        "香港市场体量有限（750万人口），需在验证模型后快速复制到新加坡和东南亚",
                        "当地已有绍兴酒和部分中国黄酒品牌占据货架，新品牌需要差异化定位突围",
                        "预包装食品标签有明确要求，需确保合规"
                    ],
                    "recommended": true
                },
                {
                    "country": "新加坡",
                    "totalScore": 78,
                    "dimensionScores": {
                        "demand": 75,
                        "cultureFit": 88,
                        "competition": 70,
                        "channelAccess": 75,
                        "compliance": 68,
                        "economics": 65
                    },
                    "evidence": [
                        "华人占总人口76%（约300万），保留深厚中式饮食文化，对黄酒品类有基本认知",
                        "作为国际贸易枢纽，FTZ可对酒类暂存30天，适合作为东南亚转口节点",
                        "超市中日本味醂、清酒、韩国米酒、华人料理酒都已有成熟货架，品类教育成本低",
                        "人均GDP超6万美元，消费力强，对品质和文化故事有付费意愿"
                    ],
                    "risks": [
                        "酒税极高：同500mL 11%vol产品，按wine line算税约SGD0.88，按liquor line可达SGD4.84，差距足以改变是否值得进入商超",
                        "新加坡海关将rice wine/cooking wine/sake均纳入liquor监管，预归类必须在签经销协议之前完成",
                        "市场体量较小（500万人口），绝对消费量天花板有限"
                    ],
                    "recommended": false
                },
                {
                    "country": "日本",
                    "totalScore": 75,
                    "dimensionScores": {
                        "demand": 78,
                        "cultureFit": 80,
                        "competition": 55,
                        "channelAccess": 65,
                        "compliance": 62,
                        "economics": 78
                    },
                    "evidence": [
                        "日本消费者对发酵酒有深厚理解和鉴赏力，对酿造工艺和品牌历史极为尊重",
                        "HS2206中国来源进口额已超千万美元，证明入口并非关闭",
                        "绍兴酒在日本已有认知基础，中国黄酒品类不需从零教育",
                        "中日地理距离近，海运周期短(5-7天)，物流成本可控",
                        "13度低酒精契合日本年轻消费者追求微醺(ほろ酔い)趋势"
                    ],
                    "risks": [
                        "本土清酒品牌（月桂冠、松竹梅、白鹤等）渠道根深蒂固，外来发酵酒极难进入主流终端",
                        "《酒税法》对进口酒有极严格分类标准和标签要求（日文表记、添加物声明等），合规流程繁琐耗时3-6个月",
                        "消费者对品质要求极高，一次负面口碑可能导致品牌永久退出市场"
                    ],
                    "recommended": false
                }
            ],
            "consumerPersonas": [
                {
                    "name": "陈太太 (Mrs. Chan)",
                    "age": 52,
                    "city": "香港 北角",
                    "profile": "福建移民第一代，家庭主妇，精通闽菜烹饪，每周至少3次使用老酒做红曲肉、海鲜汤和姜酒鸡",
                    "needs": "稳定供应品质可靠的厨用老酒，春节/中秋需要体面的饮用酒招待亲友",
                    "motivations": ["日常烹饪必需品", "家乡味道情怀", "节庆宴席体面", "女儿坐月子准备"],
                    "barriers": ["目前习惯在杂货店买绍兴酒替代", "不确定哪个品牌是正宗福建老酒", "对新品牌需要邻里口碑验证"],
                    "scenarios": ["每周煮红曲肉/海鲜汤", "春节团圆饭温酒待客", "女儿坐月子姜酒鸡", "中秋送礼给老板"],
                    "spendingPower": "月消费HKD 100-200在料理/饮用酒"
                },
                {
                    "name": "Kevin Wong",
                    "age": 34,
                    "city": "香港 中环",
                    "profile": "金融从业者，美食爱好者，常出入中高端中餐厅，对餐酒搭配有兴趣但对黄酒了解有限",
                    "needs": "在商务宴请和朋友聚餐时寻找有文化品味的非白酒选择，想尝试温酒体验",
                    "motivations": ["商务社交差异化", "文化品味展示", "餐酒搭配探索", "礼赠有面子"],
                    "barriers": ["觉得黄酒是'阿妈辈'的酒", "不知道温饮怎么操作", "担心在商务场合不够档次"],
                    "scenarios": ["中高端中餐厅点酒", "中秋/春节送客户", "周末和朋友火锅聚餐", "给父母买伴手礼"],
                    "spendingPower": "月消费HKD 500-1000在酒类"
                },
                {
                    "name": "林师傅 (Chef Lam)",
                    "age": 45,
                    "city": "香港 西环",
                    "profile": "闽菜餐厅主厨，20年烹饪经验，对食材品质要求极高，目前使用绍兴酒做菜但一直想找正宗福建老酒",
                    "needs": "稳定供应的高品质厨用老酒（红曲色泽和香气是闽菜灵魂），以及可以推荐给食客的饮用款",
                    "motivations": ["菜品品质提升", "正宗闽菜传承", "餐厅差异化卖点", "供应商稳定可靠"],
                    "barriers": ["目前批量采购绍兴酒已有稳定供应商", "更换需要确认口味一致性和供货稳定性", "餐厅对成本敏感"],
                    "scenarios": ["每日后厨大量使用（月耗50+瓶）", "设计酒单推荐给食客", "特色菜品'红曲老酒焖鲍鱼'", "节庆宴席套餐配酒"],
                    "spendingPower": "月采购HKD 2000-5000在料理酒类"
                }
            ],
            "competitorAnalysis": [
                {
                    "name": "古越龙山/女儿红 绍兴花雕",
                    "country": "中国（绍兴）",
                    "priceRange": "HKD 25-120（依年份）",
                    "positioning": "中国黄酒第一品牌，厨用+饮用兼具",
                    "channels": ["华人超市", "HKTVmall", "中餐厅", "杂货店"],
                    "strengths": "品牌知名度最高、SKU完整、渠道覆盖广",
                    "weaknesses": "品牌形象与'绍兴'深度绑定，对'福建菜'场景缺乏专属性；部分产品被视为廉价料理酒"
                },
                {
                    "name": "月桂冠/松竹梅 清酒",
                    "country": "日本",
                    "priceRange": "HKD 55-150（720mL）",
                    "positioning": "日本清酒入门至中端",
                    "channels": ["日式超市", "AEON", "百货", "日料餐厅"],
                    "strengths": "品类认知度极高、日本文化光环、进入主流零售",
                    "weaknesses": "价格带明显高于黄酒，文化距离远，无法满足华人家庭烹饪需求"
                },
                {
                    "name": "现有香港在售福建老酒",
                    "country": "中国（福建）",
                    "priceRange": "HKD 28-45",
                    "positioning": "福建老酒本品牌现有渠道销售",
                    "channels": ["通仕食品", "品牌门店", "部分华人超市"],
                    "strengths": "已有渠道基础和消费者认知",
                    "weaknesses": "SKU单一、渠道覆盖有限、品牌形象尚未系统建设"
                },
                {
                    "name": "味醂/料理酒（各品牌）",
                    "country": "日本/台湾/本地",
                    "priceRange": "HKD 15-35",
                    "positioning": "纯厨用调味品",
                    "channels": ["所有超市调味品区"],
                    "strengths": "覆盖极广、消费习惯已建立",
                    "weaknesses": "纯功能性定位，无文化溢价空间，无饮用场景"
                }
            ],
            "channels": [
                {
                    "name": "闽菜/海鲜餐厅（B2B）",
                    "priority": "最高",
                    "difficulty": "中",
                    "description": "直接进入后厨供应链，同时推动饮用款上酒单。餐厅是建立品饮体验和口碑的最佳场景。",
                    "estimatedReach": "直接影响力最大——食客体验后转化为零售购买"
                },
                {
                    "name": "华人食品零售",
                    "priority": "高",
                    "difficulty": "低",
                    "description": "华人超市、杂货店、调味品货架。进入门槛低，覆盖家庭日常购买场景。",
                    "estimatedReach": "覆盖60%目标家庭消费者"
                },
                {
                    "name": "线上电商",
                    "priority": "中高",
                    "difficulty": "低",
                    "description": "HKTVmall、品牌官网、外卖平台。适合铺货初期快速触达和数据验证。",
                    "estimatedReach": "增量渠道，年轻客群和数据收集"
                },
                {
                    "name": "礼品/节庆渠道",
                    "priority": "中",
                    "difficulty": "中",
                    "description": "精品超市礼品区、礼品店、企业团购。主推闽越红礼盒，瞄准高客单。",
                    "estimatedReach": "利润率最高，品牌价值锚点"
                }
            ],
            "pricingSuggestion": {
                "entryLevel": {
                    "price": "HKD 38-55 (485mL厨用)",
                    "positioning": "高频复购厨房必备，比绍兴酒略高但品质远超"
                },
                "midRange": {
                    "price": "HKD 68-98 (500mL饮用版)",
                    "positioning": "品牌核心款，餐厅酒单和家庭饮用"
                },
                "premium": {
                    "price": "HKD 198-388 (礼盒装)",
                    "positioning": "节庆礼赠，品牌形象天花板"
                }
            },
            "complianceRisks": [
                {
                    "area": "健康宣称风险",
                    "risk": "极高（首要解决）",
                    "detail": "官方英文站使用'60+ Chinese medicines''for pregnant women, children and the elderly'等叙述，在几乎所有海外市场都会触发酒类或食品健康宣称风险",
                    "note": "必须立即停止一切保健/适用人群描述，出口版品牌手册必须重写"
                },
                {
                    "area": "产品归类敏感",
                    "risk": "高",
                    "detail": "厨用老酒存在'酒类'与'调味品'双重归类敏感性，不同市场对含盐、是否直接饮用、是否标示cooking-only的产品给出不同处理",
                    "note": "建议将饮用型与厨用型分开处理，把'预归类/预裁定'作为进入前置动作"
                },
                {
                    "area": "香港预包装食品标签",
                    "risk": "低",
                    "detail": "香港食安中心对预包装食品标签有要求，需标注成分、过敏原、产地等信息",
                    "note": "门槛不高但需确保合规，避免被食安中心抽检后要求下架"
                },
                {
                    "area": "重金属与添加剂检测",
                    "risk": "中",
                    "detail": "美国99 Ranch已出现中国料理酒的Proposition 65 lead警示，说明海外对中式料理酒重金属极敏感",
                    "note": "出口前扩展检测至重金属、真菌毒素、添加剂、过敏原，准备英文COA"
                }
            ],
            "marketSizeData": {
                "global_HS2206_2024": "全球HS2206进口：美国约4.406亿美元、日本约7,037万美元、欧盟约6,681万美元",
                "china_export_HS2206_2024": "中国2024年HS2206出口约3,516.8万美元，前五目的地：日本、香港、越南、美国、韩国",
                "hongKong_import_2024": "香港2024年HS2206进口约4,445万美元，中国来源约798万美元",
                "conclusion": "中国产发酵酒在东亚、港澳和部分欧美华人渠道中，已存在现实的进口流，不是从零教育"
            }
        }
        """;
    }

    public static string GetMarketInsightSources()
    {
        return """
        [
            {
                "title": "World Bank WITS/UN Comtrade: HS2206全球贸易数据(2024)",
                "type": "publicData",
                "excerpt": "香港2024年HS2206进口约4,445万美元(中国来源798万)；中国出口约3,516.8万美元",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "香港海关及食安中心公开法规",
                "type": "publicData",
                "excerpt": "香港对≤30%酒精浓度酒类已撤销牌照要求；食安中心对预包装食品有标签规定",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "新加坡海关Customs/FTZ酒类法规",
                "type": "publicData",
                "excerpt": "新加坡将rice wine/cooking wine/sake纳入liquor监管，FTZ暂存30天；税负按酒精纯度分级",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "通仕食品/HKTVmall 香港在售价格数据",
                "type": "publicData",
                "excerpt": "福建老酒香港现售HKD28-45；古越龙山15年花雕HKD85-120/套",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "福建老酒公司官网及产品介绍",
                "type": "verified",
                "excerpt": "品牌可追溯至1842年下渡街大兴酒坊；产能至少3万吨/年（福州+江西）；已有香港门店",
                "capturedAt": "2026-07-25"
            }
        ]
        """;
    }
}
