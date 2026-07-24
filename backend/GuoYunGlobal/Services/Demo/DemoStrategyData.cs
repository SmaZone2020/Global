namespace GuoYunGlobal.Services.Demo;

public static class DemoStrategyData
{
    public static string GetPositioning()
    {
        return """
        {
            "targetCountry": "美国",
            "coreAudience": "亚洲料理与餐酒搭配消费者",
            "categoryReference": "清酒/自然酒/米酒",
            "differentiation": "中国唯一红曲黄酒品类，具有温饮文化和180年历史传承"
        }
        """;
    }

    public static string GetSkuPlan()
    {
        return """
        {
            "primary": {
                "name": "三坊七巷版 500mL",
                "role": "主推款",
                "reason": "饮用属性明确，包装具有文化辨识度"
            },
            "test": {
                "name": "入门款 300mL",
                "role": "市场教育",
                "reason": "降低试错成本，适合首次体验"
            },
            "premium": {
                "name": "陈年礼盒装",
                "role": "品牌形象",
                "reason": "礼赠场景，提升品牌溢价"
            }
        }
        """;
    }

    public static string GetPackaging()
    {
        return """
        {
            "volume": "500mL / 300mL",
            "labelInfo": [
                "品类名: Chinese Aged Rice Wine",
                "饮用方式: Best served warm (40-45°C)",
                "产区故事: Brewed in Fuzhou since 1842"
            ],
            "visualDirection": "现代东方美学，突出红曲琥珀色泽与福州三坊七巷建筑线条"
        }
        """;
    }

    public static string GetPricing()
    {
        return """
        {
            "strategy": "中端定位，与清酒同价格带竞争，突出文化溢价",
            "ranges": [
                {
                    "tier": "入门",
                    "range": "$15-20",
                    "channel": "超市/电商"
                },
                {
                    "tier": "中端",
                    "range": "$25-35",
                    "channel": "餐厅/专门店"
                },
                {
                    "tier": "高端",
                    "range": "$45-60",
                    "channel": "礼赠/品鉴"
                }
            ],
            "costAssumptions": "到岸成本约$8-12/瓶（含物流、关税、仓储）"
        }
        """;
    }

    public static string GetChannels()
    {
        return """
        {
            "priority": [
                {
                    "channel": "亚洲餐厅",
                    "cities": ["纽约", "旧金山", "洛杉矶"],
                    "action": "与3-5家中餐厅合作试点，提供温饮器具和培训"
                },
                {
                    "channel": "亚洲超市",
                    "cities": ["纽约", "旧金山"],
                    "action": "进入H Mart、99 Ranch Market，配合试饮推广"
                },
                {
                    "channel": "电商平台",
                    "cities": ["全国"],
                    "action": "开设Amazon品牌店铺，配合社媒内容引流"
                }
            ]
        }
        """;
    }

    public static string GetRoadmap()
    {
        return """
        {
            "phase1": {
                "period": "0-30天",
                "title": "准备与验证",
                "actions": [
                    "完成5-10位目标客群深度访谈",
                    "制作英文产品页和品牌故事页",
                    "准备样品并完成TTB标签送审",
                    "建立Instagram/TikTok品牌账号"
                ],
                "metrics": ["访谈数量", "内容点击率", "报名/询盘数"]
            },
            "phase2": {
                "period": "31-60天",
                "title": "试点测试",
                "actions": [
                    "与2-3家中餐厅合作品鉴活动",
                    "投放社媒内容，测试品牌叙事",
                    "参加1-2场亚洲美食文化活动",
                    "收集消费者反馈优化定位"
                ],
                "metrics": ["试饮人数", "口味接受度", "价格接受意愿"]
            },
            "phase3": {
                "period": "61-90天",
                "title": "小规模试销",
                "actions": [
                    "选择最佳渠道开展正式试销",
                    "与1-2家亚洲超市合作上架",
                    "收集复购数据和渠道反馈",
                    "制定下一阶段扩展计划"
                ],
                "metrics": ["转化率", "复购意向", "渠道反馈评分"]
            }
        }
        """;
    }
}
