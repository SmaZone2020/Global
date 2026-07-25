namespace GuoYunGlobal.Services.Demo;

public static class DemoProductData
{
    public static string GetProductAnalysisContent()
    {
        return """
        {
            "tags": ["中华老字号", "福建红曲黄酒", "厨用+饮用双线", "HS2206发酵饮料", "182年酿造传承", "三坊七巷文化IP", "非遗酿造技艺", "低度发酵酒"],
            "sellingPoints": [
                {
                    "point": "天然双轮产品结构",
                    "description": "品牌天然分为高频复购的厨用老酒线（485mL/750mL/1.5L）和文化溢价的饮用酒线（鼓山13度/闽越红陈酿礼盒），具备'低价SKU做进店和周转，中高价SKU做品牌和利润'的完整梯度。这个结构是很多区域黄酒品牌不具备的核心优势。"
                },
                {
                    "point": "182年品牌可追溯性",
                    "description": "1842年下渡街大兴酒坊起家，1958年注册'鼓山'商标，2011年获中华老字号称号。同时具备'第七批福州市非物质文化遗产：福建老酒传统酿制技艺'证书。品牌在'历史真实性—地方性—非遗'三条线上都具备传播资产，外部可讲述性极强。"
                },
                {
                    "point": "福建红曲工艺独一性",
                    "description": "如果只讲'我也是rice wine'会被绍兴黄酒、日本清酒、味醂、韩国米酒夹击；但讲'福建红曲—中式烹饪—福州文化—礼赠节庆'就具有独一性。红曲赋予酒体天然琥珀至玫瑰红色泽（无需人工色素），是差异化壁垒。"
                },
                {
                    "point": "产能规模保障",
                    "description": "拥有四大生产基地（福州闽侯约70亩年产1万吨、江西南丰约350亩年产2万吨、福清约110亩、安徽望江约300亩），确认披露产能至少3万吨/年，具备规模化出海的供应能力。"
                },
                {
                    "point": "香港已有销售基础",
                    "description": "品牌在香港已有门店和华人食品店销售福建老酒（通仕食品等渠道现售HKD28-45），这意味着出海不是从零开始，渠道教育成本可控，首发市场选择香港有现实基础。"
                },
                {
                    "point": "极致性价比与价格带宽度",
                    "description": "从经典款到8年陈酿到闽越红10-30年高端系列，出厂价覆盖低中高多个价格带。在香港可按国内建议零售价1.4-2.0倍布局仍具竞争力；相比日本清酒和高端绍兴酒，价格优势明显但品质不输。"
                }
            ],
            "swot": {
                "strengths": [
                    "1842年创立，182年不间断酿造历史，中华老字号+市级非遗双重官方认证",
                    "天然双线产品矩阵：厨用线（高频复购周转快）+饮用线（文化溢价利润高），出海策略灵活度高",
                    "福建红曲工艺独一无二，与绍兴麦曲形成差异化，讲'福建红曲—烹饪—文化—礼赠'时具有品类独一性",
                    "产能至少3万吨/年（四大基地），不存在供应瓶颈，可支撑规模化海外订单",
                    "香港已有门店和渠道基础（通仕食品等），首发不是冷启动",
                    "出厂价极低，即使叠加关税物流，在香港仍可保持对清酒50-60%的价格优势"
                ],
                "weaknesses": [
                    "官方英文站存在严重合规隐患：使用'60+ Chinese medicines''for pregnant women, children and the elderly'等叙述，在多数海外市场会触发健康宣称风险，必须立即重写",
                    "厨用老酒存在'酒类'与'调味品'双重归类敏感性，不同市场归类处理不同（如新加坡wine line vs liquor line税负差5倍+）",
                    "品牌国际化程度低：缺乏系统的英文品牌传播素材、海外社媒运营经验和国际化团队",
                    "当前产品包装和视觉设计偏内销导向，对海外消费者（含海外华人年轻一代）吸引力有限",
                    "海外黄酒品类认知极低，消费者不理解'黄酒'与白酒的区别，品类教育成本高",
                    "产品储运对高温和震荡敏感，饮用款尤其影响香气和色泽稳定性"
                ],
                "opportunities": [
                    "香港是自由港，≤30%酒精浓度酒类已撤销牌照要求，进入门槛极低且税负轻",
                    "2024年HS2206全球进口超5亿美元，中国出口约3,517万美元，已有现实贸易流",
                    "亚洲餐饮文化全球持续增长，中餐出海带动佐餐酒和料理酒需求",
                    "新加坡FTZ可暂存酒类30天，适合作为东南亚转口节点和区域仓",
                    "Natural Wine/手工发酵酒品类在欧美持续升温，低度发酵酒消费趋势明确",
                    "中日地理距离近（海运5-7天），日本对中国HS2206进口已超千万美元，餐饮渠道有切入点"
                ],
                "threats": [
                    "绍兴酒品牌（古越龙山等）在海外中国黄酒品类中已建立先发优势和渠道壁垒",
                    "日本清酒在'亚洲发酵酒'品类中已建立绝对认知优势，渠道根深蒂固",
                    "新加坡酒税分类敏感：如被归入liquor line而非wine line，税负可能翻5倍以上",
                    "出海产品如果被市场错误归类为'廉价料理酒'，则利润和品牌形象均无法建立",
                    "如果保健/药用宣称未清理即上市，可能面临监管处罚和产品下架风险",
                    "美国市场已出现中国料理酒Proposition 65重金属警示，行业负面印象需时间消解"
                ]
            },
            "overseasBarriers": [
                {
                    "term": "保健/药用宣称",
                    "issue": "官方英文站使用'60+ Chinese medicines''nutrition and medicinal value''for pregnant women, children and the elderly'，这在美国、欧盟、日本、新加坡等市场均会触发健康宣称风险",
                    "suggestion": "必须彻底删除，只保留'红曲发酵、低温陈酿、福建文化、烹饪适配性、节庆礼赠'等合规表达",
                    "credibility": "publicData"
                },
                {
                    "term": "产品归类模糊",
                    "issue": "厨用老酒在'酒类'与'调味品'之间归类敏感，如新加坡按liquor line(每升酒精88新元)而非wine line(每升酒精16新元)征税，差异巨大",
                    "suggestion": "将饮用型与厨用型分开申报，'预归类/预裁定'必须作为进入前置动作而非上市后补救",
                    "credibility": "publicData"
                },
                {
                    "term": "黄酒品类",
                    "issue": "海外消费者不理解'黄酒'，直译Yellow Wine产生误解，与白酒(Baijiu)混淆",
                    "suggestion": "厨用：Fujian Red Yeast Rice Cooking Wine；饮用：Fujian Heritage Fermented Rice Wine / Fukien Old Wine",
                    "credibility": "aiInference"
                },
                {
                    "term": "红曲(Red Yeast Rice)",
                    "issue": "在美国FDA有膳食补充剂监管争议（含天然Monacolin K），在标签上使用需谨慎",
                    "suggestion": "作为工艺和文化特色介绍而非功能宣称：'Traditional red yeast fermentation craft'",
                    "credibility": "publicData"
                },
                {
                    "term": "重金属与添加剂风险",
                    "issue": "美国99 Ranch已出现中国料理酒Proposition 65 lead警示，说明海外零售环境对中式料理酒极为敏感",
                    "suggestion": "出口前必须完成扩展检测（重金属、真菌毒素、添加剂、过敏原），准备英文COA和批次追溯文件",
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
                "title": "福建老酒公司及产品介绍（用户提供图册）",
                "type": "verified",
                "excerpt": "品牌可追溯至1842年，四大基地产能≥3万吨/年，产品覆盖厨用(380mL-1.5L)和饮用(鼓山/闽越红)完整矩阵",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "World Bank WITS/UN Comtrade HS2206贸易数据(2024)",
                "type": "publicData",
                "excerpt": "全球HS2206进口超5亿美元；中国出口约3,517万美元；香港进口约4,445万美元(中国来源798万)",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "福建老酒官方英文网站 fukienoldwine.com",
                "type": "verified",
                "excerpt": "网站使用'60+ Chinese medicines''for pregnant women, children and the elderly'等叙述，存在合规隐患需重写",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "香港海关/食安中心/通仕食品/HKTVmall公开数据",
                "type": "publicData",
                "excerpt": "香港对≤30%酒精酒类撤销牌照要求；福建老酒香港现售HKD28-45；古越龙山15年HKD85-120",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "新加坡海关/FairPrice/99 Ranch公开零售数据",
                "type": "publicData",
                "excerpt": "新加坡绍兴料酒SGD4.50/味醂SGD5.50-8.90/韩国马格利酒SGD6.95；美国料理酒有Prop 65警示",
                "capturedAt": "2026-07-25"
            }
        ]
        """;
    }
}
