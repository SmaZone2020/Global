namespace GuoYunGlobal.Services.Demo;

public static class DemoCultureData
{
    public static string GetCultureDecodeContent()
    {
        return """
        {
            "culturalAssets": [
                {
                    "asset": "红曲酿造技艺",
                    "evidence": "福建省级非物质文化遗产名录（2009年入选），品牌方资料记载1842年即采用此工艺",
                    "sourceType": "verified",
                    "chineseExpression": "古法红曲酿造，182年匠心传承",
                    "overseasExpression": "Ancient Red Yeast Craft — 182 years of artisanal fermentation mastery, transforming simple rice into liquid amber through nature's alchemy",
                    "targetAudience": "手工酿造爱好者、Natural Wine消费群体、注重食品工艺和溯源的品质消费者",
                    "consumerNeed": "寻找有故事深度、制作工艺透明可追溯、区别于工业化产品的差异化饮品",
                    "confidence": 0.92,
                    "culturalDepth": "红曲(Monascus purpureus)是中国独有的发酵菌种，宋代《天工开物》即有记载。福建红曲与绍兴麦曲形成中国黄酒两大流派，红曲赋予酒体天然琥珀至玫瑰红色泽，无需任何人工色素。该工艺被学术界视为中国对世界发酵科学的重要贡献之一。",
                    "storytellingAngle": "从科学角度讲述微生物发酵的神奇——一种肉眼不可见的红色霉菌，如何在182年间被福州匠人驯服，将普通糯米转化为琥珀色的醇酒。"
                },
                {
                    "asset": "三坊七巷历史文化街区",
                    "evidence": "全国重点文保单位、国家5A景区、中国十大历史文化名街之首，品牌包装已使用其视觉元素",
                    "sourceType": "verified",
                    "chineseExpression": "三坊七巷，半部中国近现代史",
                    "overseasExpression": "Born in the Ancient Lanes — where China's 1,100-year-old cultural district meets 182 years of brewing tradition",
                    "targetAudience": "文化旅行者、历史爱好者、寻找有地理标识和文化背书产品的消费者",
                    "consumerNeed": "购买有明确地域文化根基、能讲述真实历史故事的产品，而非泛泛的'中国风'",
                    "confidence": 0.88,
                    "culturalDepth": "三坊七巷始建于唐末(AD 907)，占地40公顷，保存明清古建筑200余座。这里走出了林则徐、严复、冰心等影响中国近现代史的名人，被誉为'一座三坊七巷，半部中国近现代史'。品牌以此为文化根基，将'一方水土酿一方酒'的在地性表达到极致。",
                    "storytellingAngle": "不讲抽象的'中国文化'，而是锚定一个具体的、可被Google Map搜索到的真实街区——当消费者了解到他手中的酒来自一个有1100年历史的活态街区时，文化共鸣自然发生。"
                },
                {
                    "asset": "温饮仪式文化",
                    "evidence": "品牌方资料及福建地方志记载，闽地黄酒自古以温饮为正统饮法",
                    "sourceType": "verified",
                    "chineseExpression": "温酒而饮，暖胃暖心，这是中国人千年的待客之道",
                    "overseasExpression": "The Warming Ritual — heat gently to 38-45°C, watch the amber glow, breathe in the rice-honey aroma, and sip slowly. This is how Chinese families have welcomed guests for a thousand years.",
                    "targetAudience": "注重饮食仪式感和体验性的消费者、品鉴文化爱好者、Hygge/慢生活追求者",
                    "consumerNeed": "在快节奏生活中寻找有仪式感的放松时刻，饮品不仅是口味，更是一种生活方式和体验",
                    "confidence": 0.85,
                    "culturalDepth": "中国温酒文化可追溯至商周青铜爵（专用温酒器），唐代白居易'绿蚁新醅酒，红泥小火炉'描述的即是温酒场景。温饮不仅提升口感(释放酒体中的酯类香气)，更蕴含'以温暖待人'的中国式待客哲学。这一点与北欧Hygge文化、日本茶道有精神共通性。",
                    "storytellingAngle": "将温饮定位为一种'东方Hygge'——不是繁复的仪式，而是简单温暖的日常：一个小壶、一杯温酒、几个好友。用'慢饮'对抗'快世界'。"
                },
                {
                    "asset": "福建宴席与节庆酒文化",
                    "evidence": "福建地方志、品牌方口述：闽地婚宴、寿宴、春节团圆必备老酒",
                    "sourceType": "verified",
                    "chineseExpression": "无酒不成席，一杯老酒连接三代人的记忆",
                    "overseasExpression": "No celebration is complete without this wine — for 182 years, Gushan has been the toast of family reunions, weddings, and Lunar New Year feasts across Fujian",
                    "targetAudience": "海外华人家庭（尤其福建籍）、注重家庭聚餐文化的消费者、寻找节庆仪式感的群体",
                    "consumerNeed": "在海外维系中华家庭聚餐传统，用一瓶有传承感的酒让节庆更有仪式感和文化归属感",
                    "confidence": 0.90,
                    "culturalDepth": "福建酒文化强调'敬'与'暖'——宴席第一杯必为长辈斟满温酒以示敬意，这一习俗在马来西亚福建华人社群中保留完好。黄酒也是福建月子餐核心食材（红曲姜酒鸡），承载着家庭关爱和生育文化。",
                    "storytellingAngle": "从海外华人视角切入——在异国他乡的春节餐桌上，一瓶来自家乡三坊七巷的老酒，能让三代人找到共同的味觉记忆。情感牌>功能牌。"
                },
                {
                    "asset": "红曲药食同源传统",
                    "evidence": "《本草纲目》《天工开物》记载，红曲为食药两用之品",
                    "sourceType": "publicData",
                    "chineseExpression": "药食同源，红曲自古为滋补佳品",
                    "overseasExpression": "Red yeast rice has been treasured in Chinese culinary tradition for over 1,000 years — not as medicine, but as nature's gift to fermentation and flavor",
                    "targetAudience": "关注天然食品和传统食材的健康导向型消费者",
                    "consumerNeed": "寻找有天然健康属性但不做药品宣称的食品饮料",
                    "confidence": 0.78,
                    "culturalDepth": "红曲在中国有千年食用历史，被《本草纲目》列为'食药两用'，现代研究发现其含天然Monacolin K(与他汀类药物同成分)。但海外宣传时必须严格避免任何健康/功效宣称，只能从'传统食材'和'天然发酵'角度表达。",
                    "storytellingAngle": "讲述红曲作为食材的千年历史（而非保健功效），强调'祖先的智慧选择了这个神奇的菌种来酿酒'——自然、传统、时间验证。"
                }
            ],
            "prohibitedTranslations": [
                {
                    "original": "养生酒 / 保健酒",
                    "reason": "暗示医疗保健功效，在马来西亚、美国、欧盟等市场均违反食品标签法规，可能导致产品下架和法律诉讼",
                    "alternative": "A comforting warming tradition / A heritage rice wine for shared moments"
                },
                {
                    "original": "补气养血 / 活血化瘀",
                    "reason": "中医术语构成明确的健康声明(Health Claim)，在海外市场不可用于食品/饮品宣传",
                    "alternative": "Enjoyed for generations as part of a balanced lifestyle"
                },
                {
                    "original": "有机 / Organic",
                    "reason": "未经目标市场有机认证机构认证（如USDA Organic / EU Organic），不可使用有机宣称",
                    "alternative": "Naturally brewed / All-natural ingredients / Traditional fermentation"
                }
            ],
            "brandStory": "In 1842, within the ancient lanes of Fuzhou's Sanfang Qixiang — a cultural district older than most nations — a small brewery began crafting rice wine using a remarkable red yeast found only in Fujian. For 182 years and seven generations, this craft has remained unchanged: premium glutinous rice, mountain spring water, and the patient work of red yeast transforming grain into liquid amber.\n\nToday, Gushan Fujian Old Wine carries this living heritage to tables around the world. Each bottle is an invitation to slow down, warm the wine gently, and share a moment that connects you to centuries of tradition. In a world of mass production, Gushan remains stubbornly handcrafted — because some things are worth the wait.\n\nThis is not just wine. It is a letter from Fujian, written in amber.",
            "slogans": [
                "Since 1842. Still Warming Souls. — 始酿1842，至今温暖人心",
                "A Letter from Fujian, Written in Amber. — 一封琥珀色的家书",
                "Seven Generations. One Recipe. Infinite Warmth. — 七代人，一个配方，无尽温暖"
            ],
            "englishIntro": "Gushan Fujian Old Wine is a 182-year-old heritage rice wine from Fuzhou, China. Brewed exclusively with Fujian's ancient red yeast fermentation — a technique recognized as provincial-level intangible cultural heritage — it offers a smooth, subtly sweet taste with warm honey and dried fruit notes at a gentle 13% ABV. Best enjoyed warm at 38-45°C, it is the traditional centerpiece of Fujian's festive dining culture. From family reunions to quiet evenings, Gushan brings the warmth of southern China to every table it graces.",
            "matchMatrix": [
                {"dimension": "历史真实性 (Historical Authenticity)", "score": 95, "note": "1842年创立+中华老字号官方认证+省级非遗，历史脉络清晰可验证，品牌故事可信度极高"},
                {"dimension": "文化共鸣度 (Cultural Resonance)", "score": 92, "note": "三坊七巷IP+红曲酿造+温饮仪式+宴席文化，多层文化资产叠加，叙事素材丰富"},
                {"dimension": "跨文化可达性 (Cross-Cultural Accessibility)", "score": 78, "note": "米酒品类全球有认知基础，温饮仪式有北欧Hygge类比，但红曲和三坊七巷需额外教育成本"},
                {"dimension": "情感连接力 (Emotional Connection)", "score": 88, "note": "对海外华人尤其福建籍有极强的乡愁共鸣，'家书'叙事角度具有普世情感穿透力"},
                {"dimension": "视觉表达力 (Visual Storytelling)", "score": 85, "note": "琥珀色酒体、红曲米、三坊七巷建筑、温酒器具——视觉素材丰富且独特，出片率高"}
            ]
        }
        """;
    }

    public static string GetCultureDecodeSources()
    {
        return """
        [
            {
                "title": "品牌方提供资料（品牌手册/历史沿革文档）",
                "type": "verified",
                "excerpt": "鼓山·福建老酒，起源于1842年福州三坊七巷，采用福建红曲传统酿造工艺，2011年获中华老字号认证",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "福建省非物质文化遗产名录（2009年公示）",
                "type": "publicData",
                "excerpt": "红曲酿造技艺被列入福建省级非物质文化遗产保护名录，认定传承谱系完整",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "《本草纲目》李时珍 / 《天工开物》宋应星",
                "type": "publicData",
                "excerpt": "红曲'性温味甘，主治消食活血，健脾燥胃'；宋代即有系统记载红曲制作与应用",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "三坊七巷官方资料及UNESCO预备名录",
                "type": "publicData",
                "excerpt": "三坊七巷始建于唐末(907AD)，占地40公顷，现存明清古建筑200余座，为全国重点文保单位",
                "capturedAt": "2026-07-25"
            },
            {
                "title": "AI推断：品牌叙事与跨文化转化",
                "type": "aiInference",
                "excerpt": "基于品牌文化资产和目标市场消费者洞察，生成跨文化品牌故事和传播策略",
                "capturedAt": "2026-07-25"
            }
        ]
        """;
    }
}
