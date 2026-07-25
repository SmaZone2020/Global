namespace GuoYunGlobal.Services.Demo;

public static class DemoAbTestData
{
    public static string GetVersion(string versionKey)
    {
        return versionKey switch
        {
            "heritage" => GetHeritage(),
            "wellness" => GetWellness(),
            "premium" => GetPremium(),
            "social" => GetSocial(),
            _ => GetHeritage()
        };
    }

    private static string GetHeritage()
    {
        return """
## 定位说明

以「活态文化遗产」为核心定位，将鼓山福建老酒塑造为可饮用的中国非物质文化遗产体验。强调182年不间断的酿造传承，让消费者通过一杯酒触摸真实的中国历史。

## 核心卖点

- 1842年创立，跨越三个世纪的活态酿造传承
- 唯一使用福建红曲古法的中华老字号黄酒
- 三坊七巷限定版——每瓶酒都是一张文化入场券
- 温饮仪式感——不只是喝酒，是体验中国文人的生活方式
- 入选非遗名录的酿造技艺，可追溯的文化脉络

## 目标人群

- **典型用户画像**：35-55岁文化探索型消费者，曾去过中国旅行或对东亚文化有浓厚兴趣，收藏艺术品或手工艺品
- **核心消费场景**：文化沙龙、艺术展览afterparty、精品中餐配酒、收藏与送礼
- **购买动机**：寻找authentic的文化体验产品，用于社交场合展示文化品味

## 品牌Slogan（3个候选）

1. Gushan: A Living Heritage in Every Drop / 鼓山：每一滴都是活着的遗产
2. Brewed Since 1842. Still Warming Souls. / 始酿1842，至今温暖人心
3. The Wine That Time Perfected / 时间酿就的完美

## 社媒文案（3条）

- 182 years of unbroken tradition. One sip connects you to generations of master brewers in Fuzhou's ancient lanes. 🏮 #LivingHeritage #ChineseCulture #GuShanWine
- Some wines age in cellars. Ours ages in centuries of culture. Discover Gushan — where every bottle tells a 182-year story. 📜 #HeritageWine #1842
- Before \"craft\" was trendy, our brewers were perfecting red yeast rice wine for generations. Taste what 182 years of dedication creates. #AncientCraft #RedYeast #TimelessTaste

## 产品描述（英文，100字）

Gushan Fujian Old Wine is a 182-year-old heritage rice wine brewed exclusively with Fujian's ancient red yeast technique. As a certified China Time-Honored Brand since 1842, each bottle carries the warmth of southern Chinese tradition. At a gentle 13% ABV, it's meant to be warmed and savored — a living connection to Fuzhou's legendary Sanfang Qixiang cultural district.

## 视觉风格建议

- **主色调**：墨黑 + 暗金 + 宣纸白
- **拍摄场景**：古巷实景、老酿酒坊、博物馆展柜式陈列
- **模特/道具方向**：不用模特，以器物为主角——古陶坛、毛笔、印章、红曲米、古籍
""";
    }

    private static string GetWellness()
    {
        return """
## 定位说明

以「天然发酵健康酒饮」为核心定位，突出红曲的天然保健属性和低度数特征，将鼓山老酒打造为健康生活方式的一部分，对标康普茶和天然发酵饮品赛道。

## 核心卖点

- 红曲天然发酵，零添加防腐剂，纯粮酿造
- 13度微醺，比葡萄酒更低的酒精负担
- 红曲中含天然他汀类物质，千年药食同源传统
- 纯糯米原料，无麸质，适合更多饮食需求
- 温饮促进血液循环，东方养生智慧

## 目标人群

- **典型用户画像**：28-42岁健康导向型消费者，关注有机食品、发酵饮品，练瑜伽或冥想，注重身心平衡
- **核心消费场景**：健康晚餐配酒、瑜伽后放松、周末 self-care ritual、健康礼品
- **购买动机**：寻找比葡萄酒更健康的替代选择，对发酵食品的益生菌和天然成分感兴趣

## 品牌Slogan（3个候选）

1. Nature Brews Best / 自然，是最好的酿酒师
2. Fermented by Time, Powered by Nature / 时间发酵，自然赋能
3. The Mindful Pour / 每一杯，都是正念时刻

## 社媒文案（3条）

- Red yeast + glutinous rice + time = the most natural wine you'll ever taste. No additives. No shortcuts. Just 182 years of patience. 🌿 #NaturalWine #Fermented #CleanDrinking
- Your post-yoga ritual just got an upgrade. Gushan Old Wine — 13% ABV, naturally fermented, warm it gently and feel the calm. 🧘‍♀️ #MindfulDrinking #WellnessWine
- Kombucha walked so red yeast rice wine could fly. Ancient Chinese fermentation meets modern wellness. Try Gushan. 🍶 #FermentedFoods #GutHealth #RedYeast

## 产品描述（英文，100字）

Gushan Old Wine is a naturally fermented rice wine powered by red yeast — a probiotic-rich ingredient celebrated in Chinese medicine for centuries. At just 13% ABV with zero additives, it offers a cleaner, gentler alternative to conventional wines. Warm it slightly to unlock its full character: a smooth, subtly sweet taste that pairs perfectly with mindful living.

## 视觉风格建议

- **主色调**：自然绿 + 暖蜜色 + 米白
- **拍摄场景**：晨光厨房、有机农场、瑜伽空间、户外野餐
- **模特/道具方向**：健康活力女性、新鲜食材、陶瓷器皿、绿植、亚麻桌布
""";
    }

    private static string GetPremium()
    {
        return """
## 定位说明

以「东方奢饮体验」为核心定位，将鼓山老酒提升至精品酒饮层级，强调稀缺性、手工艺和仪式感，对标日本清酒高端线和精品葡萄酒市场。

## 核心卖点

- 中华老字号认证，182年家族传承酿造
- 限量三坊七巷文化联名版，收藏级包装
- 手工红曲制作，每批次风味独特不可复制
- 东方温饮仪式——专属温酒器具配套体验
- 大师级品鉴：琥珀色泽、蜜香层次、丝滑余韵

## 目标人群

- **典型用户画像**：35-60岁高净值人群，精品酒收藏者，米其林餐厅常客，对亚洲文化有深度认知
- **核心消费场景**：高端中餐Omakase配酒、商务宴请、收藏投资、文化礼赠
- **购买动机**：寻找独特的亚洲精品酒饮，社交场合彰显品味与文化视野

## 品牌Slogan（3个候选）

1. The Art of Warming / 温酒的艺术
2. 182 Vintages of Mastery / 182年的大师技艺
3. Where Heritage Meets Luxury / 遗产与奢华的交汇

## 社媒文案（3条）

- Some wines come from vineyards. Ours comes from 182 years of mastery in Fuzhou's ancient lanes. Limited Sanfang Qixiang Edition — where heritage becomes luxury. 🏆 #LuxurySpirits #RareFind #AsianLuxury
- The Japanese have daiginjo. The French have Grand Cru. China has Gushan — a 182-year-old red yeast masterpiece. Time to discover. 🥂 #FineDining #PremiumWine #EasternLuxury
- Served warm in handcrafted ceramic. Paired with the finest Cantonese cuisine. This isn't just wine — it's a 182-year ritual of refinement. ✨ #Omakase #WinePairing #CulinaryArts

## 产品描述（英文，100字）

Gushan 1842 Reserve is a limited-edition red yeast rice wine from China's oldest certified heritage brewery. Each batch is handcrafted using techniques unchanged since 1842, yielding a luminous amber wine with notes of honey, dried fruit, and subtle umami. Best served warm at 38°C in traditional ceramic, it represents the pinnacle of Chinese brewing artistry.

## 视觉风格建议

- **主色调**：黑金 + 深琥珀 + 象牙白
- **拍摄场景**：黑色背景产品棚拍、米其林餐厅、私人酒窖、艺术画廊
- **模特/道具方向**：高端陶瓷器具、金箔元素、丝绒衬布、专业温酒器、精装木盒
""";
    }

    private static string GetSocial()
    {
        return """
## 定位说明

以「年轻社交酒饮」为核心定位，将鼓山老酒重新定义为年轻人聚会场景中的差异化选择，强调低度数、好入口、有话题性，对标精酿啤酒和低度鸡尾酒赛道。

## 核心卖点

- 13度微醺刚刚好——不醉人，够放松
- 温着喝、冰着喝、调着喝——百变喝法自由解锁
- 自带话题：182年的老酒新喝法，社交破冰神器
- 国潮新标签——不是白酒不是啤酒，是中国的Sake
- 高颜值三坊七巷联名瓶，拍照出片率100%

## 目标人群

- **典型用户画像**：22-35岁都市年轻人，社交活跃，喜欢尝试新鲜事物，活跃于小红书/Instagram
- **核心消费场景**：朋友聚餐、火锅配酒、露营野餐、居家微醺夜、打卡探店
- **购买动机**：想喝点不一样的、拍照好看、有故事可讲、价格友好

## 品牌Slogan（3个候选）

1. Old Wine, New Vibes / 老酒新喝，氛围拉满
2. Warm Your Night / 今晚，来点温度
3. 182 Years Young / 182岁，正年轻

## 社媒文案（3条）

- POV: You bring a 182-year-old wine to the party and suddenly everyone wants to know your story 🍶✨ #PartyDifferent #GuShanWine #NotYourUsualDrink
- Hot take: warm rice wine > cold beer on a winter night. Gushan hits different when you heat it up. Try it and thank me later 🔥 #WinterVibes #WarmWine #CozyNight
- Making Gushan cocktails because apparently I'm a mixologist now 🍹 Rice wine + ginger + honey + sparkling water = 😮‍💨 #WineCocktail #DIYDrinks #RiceWineRecipe

## 产品描述（英文，100字）

Gushan is China's 182-year-old answer to sake — a smooth, naturally-brewed rice wine at an easy-going 13% ABV. Made with ancient red yeast and premium glutinous rice, it's incredibly versatile: warm it for cozy nights, chill it for summer hangs, or mix it into creative cocktails. Great taste, great story, zero pretension.

## 视觉风格建议

- **主色调**：活力橙红 + 电光蓝 + 奶油白
- **拍摄场景**：屋顶派对、火锅店、露营地、ins风居家角落
- **模特/道具方向**：多元化年轻面孔、彩色灯串、潮流穿搭、创意调酒器具、手机拍照场景
""";
    }
}
