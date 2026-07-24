using System.Text.Json.Serialization;
using GuoYunGlobal.Models.Entities;
using GuoYunGlobal.Models.Enums;

namespace GuoYunGlobal.Models.Dtos;

public class ProjectResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public ProjectStatus Status { get; set; }

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; }

    [JsonPropertyName("brand")]
    public BrandResponse? Brand { get; set; }

    [JsonPropertyName("products")]
    public List<ProductResponse> Products { get; set; } = new();

    public static ProjectResponse FromEntity(Project project)
    {
        var response = new ProjectResponse
        {
            Id = project.Id,
            Name = project.Name,
            Status = project.Status,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt
        };

        if (project.Brand != null)
        {
            response.Brand = new BrandResponse
            {
                Id = project.Brand.Id,
                ProjectId = project.Brand.ProjectId,
                Name = project.Brand.Name,
                Origin = project.Brand.Origin,
                History = project.Brand.History,
                BrandVoice = project.Brand.BrandVoice,
                ProhibitedClaims = project.Brand.ProhibitedClaims,
                EstablishedYear = project.Brand.EstablishedYear
            };
        }

        var productList = project.Brand?.Products ?? project.Products;
        if (productList != null)
        {
            response.Products = productList.Select(p => new ProductResponse
            {
                Id = p.Id,
                Name = p.Name,
                Category = p.Category,
                Sku = p.Sku,
                Specs = p.Specs,
                Ingredients = p.Ingredients,
                Process = p.Process,
                DomesticPrice = p.DomesticPrice,
                ImageUrl = p.ImageUrl
            }).ToList();
        }

        return response;
    }
}

public class BrandResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("projectId")]
    public int ProjectId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("origin")]
    public string Origin { get; set; } = string.Empty;

    [JsonPropertyName("history")]
    public string History { get; set; } = string.Empty;

    [JsonPropertyName("brandVoice")]
    public string BrandVoice { get; set; } = string.Empty;

    [JsonPropertyName("prohibitedClaims")]
    public string ProhibitedClaims { get; set; } = string.Empty;

    [JsonPropertyName("establishedYear")]
    public int? EstablishedYear { get; set; }
}

public class ProductResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("category")]
    public string Category { get; set; } = string.Empty;

    [JsonPropertyName("sku")]
    public string Sku { get; set; } = string.Empty;

    [JsonPropertyName("specs")]
    public string Specs { get; set; } = string.Empty;

    [JsonPropertyName("ingredients")]
    public string Ingredients { get; set; } = string.Empty;

    [JsonPropertyName("process")]
    public string Process { get; set; } = string.Empty;

    [JsonPropertyName("domesticPrice")]
    public decimal? DomesticPrice { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;
}
