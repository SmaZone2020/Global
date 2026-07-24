using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Services.Demo;

public class DemoDataService
{
    private readonly AppDbContext _context;

    public DemoDataService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Project> CreateDemoProjectAsync()
    {
        var project = new Project
        {
            Name = "福建老酒出海项目",
            Status = ProjectStatus.StrategyReady,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        var brand = CreateBrand(project.Id);
        _context.Brands.Add(brand);
        await _context.SaveChangesAsync();

        var product = CreateProduct(brand.Id);
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        CreateAnalysisResults(project.Id);
        await _context.SaveChangesAsync();

        CreateMarketCandidates(project.Id);
        await _context.SaveChangesAsync();

        CreateStrategy(project.Id);
        await _context.SaveChangesAsync();

        project.Brand = brand;
        project.Products = new List<Product> { product };

        return project;
    }

    private Brand CreateBrand(int projectId)
    {
        return new Brand
        {
            ProjectId = projectId,
            Name = "鼓山·福建老酒",
            Origin = "福建省福州市",
            History = "品牌历史可追溯至1842年，起源于福州三坊七巷历史文化街区。"
                + "作为中华老字号品牌，鼓山·福建老酒传承福建红曲酿造技艺，"
                + "以糯米、红曲为主要原料，经传统发酵工艺酿制而成。"
                + "180余年来，福建老酒始终是福建宴席文化的重要组成部分。",
            BrandVoice = "温暖、传统、有文化底蕴",
            ProhibitedClaims = "不可宣称保健功效、养生功能或医疗作用",
            EstablishedYear = 1842
        };
    }

    private Product CreateProduct(int brandId)
    {
        return new Product
        {
            BrandId = brandId,
            Name = "鼓山福建老酒（扁瓶三坊七巷版）",
            Category = "黄酒/发酵酒",
            Sku = "FJL-500-13",
            Specs = "500mL, 13度",
            Ingredients = "糯米、红曲、水",
            Process = "红曲酿造、传统发酵",
            DomesticPrice = 25.00m,
            ImageUrl = ""
        };
    }

    private void CreateAnalysisResults(int projectId)
    {
        var productAnalysis = new AnalysisResult
        {
            ProjectId = projectId,
            Type = AnalysisType.Product,
            Content = DemoProductData.GetProductAnalysisContent(),
            Sources = DemoProductData.GetProductAnalysisSources(),
            CreatedAt = DateTime.UtcNow
        };

        var cultureAnalysis = new AnalysisResult
        {
            ProjectId = projectId,
            Type = AnalysisType.Culture,
            Content = DemoCultureData.GetCultureDecodeContent(),
            Sources = DemoCultureData.GetCultureDecodeSources(),
            CreatedAt = DateTime.UtcNow
        };

        var marketAnalysis = new AnalysisResult
        {
            ProjectId = projectId,
            Type = AnalysisType.Market,
            Content = DemoMarketData.GetMarketInsightContent(),
            Sources = DemoMarketData.GetMarketInsightSources(),
            CreatedAt = DateTime.UtcNow
        };

        _context.AnalysisResults.AddRange(productAnalysis, cultureAnalysis, marketAnalysis);
    }

    private void CreateMarketCandidates(int projectId)
    {
        var usa = new MarketCandidate
        {
            ProjectId = projectId,
            Country = "美国",
            TotalScore = 82,
            DimensionScores = """{"demand":80,"cultureFit":86,"competition":65,"channelAccess":78,"compliance":62,"economics":74}""",
            Evidence = """["亚洲餐饮市场持续增长","纽约、旧金山亚裔人口密集","Natural Wine消费趋势上升"]""",
            Risks = """["酒类进口标签法规严格","需要TTB审批","各州分销法规差异大"]""",
            IsSelected = true
        };

        var japan = new MarketCandidate
        {
            ProjectId = projectId,
            Country = "日本",
            TotalScore = 78,
            DimensionScores = """{"demand":72,"cultureFit":88,"competition":55,"channelAccess":70,"compliance":68,"economics":65}""",
            Evidence = """["日本消费者对发酵酒有深厚理解","中日饮食文化有共通性","绍兴酒在日本已有认知基础"]""",
            Risks = """["本土清酒品类极强","进口酒类税率较高","消费者对品质要求极高"]""",
            IsSelected = false
        };

        var singapore = new MarketCandidate
        {
            ProjectId = projectId,
            Country = "新加坡",
            TotalScore = 75,
            DimensionScores = """{"demand":68,"cultureFit":90,"competition":60,"channelAccess":72,"compliance":70,"economics":58}""",
            Evidence = """["华人占比超75%，对黄酒有基本认知","东南亚华人宴席文化保留较好","辐射东南亚市场"]""",
            Risks = """["市场体量较小","酒类消费税较高","本地绍兴酒已有稳定供应"]""",
            IsSelected = false
        };

        _context.MarketCandidates.AddRange(usa, japan, singapore);
    }

    private void CreateStrategy(int projectId)
    {
        var strategy = new Strategy
        {
            ProjectId = projectId,
            Positioning = DemoStrategyData.GetPositioning(),
            SkuPlan = DemoStrategyData.GetSkuPlan(),
            Packaging = DemoStrategyData.GetPackaging(),
            Pricing = DemoStrategyData.GetPricing(),
            Channels = DemoStrategyData.GetChannels(),
            Roadmap = DemoStrategyData.GetRoadmap(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Strategies.Add(strategy);
    }
}
