namespace GuoYunGlobal.Services.Demo;

public static class DemoQuickCreateData
{
    public static string GetProductInfo()
    {
        return """
        {
            "brand": {
                "name": "鼓山",
                "origin": "中国福建福州",
                "history": "鼓山酒业创立于1842年，源于福州三坊七巷的传统酿酒坊，是福建省历史最悠久的黄酒酿造企业之一。2011年获得'中华老字号'认证。",
                "brandVoice": "传承古法，温暖人心",
                "establishedYear": 1842
            },
            "product": {
                "name": "福建老酒",
                "category": "黄酒/米酒",
                "sku": "三坊七巷限定版 500ml",
                "specs": "500ml/瓶，酒精度13%vol",
                "ingredients": "糯米、红曲、水",
                "process": "传统红曲发酵工艺，陶坛陈酿",
                "domesticPrice": "25元/瓶"
            }
        }
        """;
    }
}
