using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Models.Entities;

namespace GuoYunGlobal.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<UploadedDocument> UploadedDocuments => Set<UploadedDocument>();
    public DbSet<AnalysisResult> AnalysisResults => Set<AnalysisResult>();
    public DbSet<MarketCandidate> MarketCandidates => Set<MarketCandidate>();
    public DbSet<Strategy> Strategies => Set<Strategy>();
    public DbSet<GeneratedAsset> GeneratedAssets => Set<GeneratedAsset>();
    public DbSet<GeneratedPoster> GeneratedPosters => Set<GeneratedPoster>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Brand>()
            .HasOne(b => b.Project)
            .WithOne(p => p.Brand)
            .HasForeignKey<Brand>(b => b.ProjectId);

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Brand)
            .WithMany(b => b.Products)
            .HasForeignKey(p => p.BrandId);

        modelBuilder.Entity<Strategy>()
            .HasOne(s => s.Project)
            .WithOne(p => p.Strategy)
            .HasForeignKey<Strategy>(s => s.ProjectId);
    }
}
