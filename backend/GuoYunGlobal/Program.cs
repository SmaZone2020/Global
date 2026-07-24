using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Services.Ai;
using GuoYunGlobal.Services.Ai.Options;
using GuoYunGlobal.Services.Ai.Providers;
using GuoYunGlobal.Services.Demo;
using GuoYunGlobal.Services.Document;
using GuoYunGlobal.Services.Marketing;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Controllers + JSON serialization
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
    });

// AI Services
builder.Services.Configure<LlmOptions>(builder.Configuration.GetSection("Llm"));
builder.Services.Configure<ImageGenOptions>(builder.Configuration.GetSection("ImageGen"));
builder.Services.AddHttpClient<ILlmProvider, OpenAiCompatibleProvider>();
builder.Services.AddHttpClient<IImageProvider, OpenAiImageProvider>();
builder.Services.AddScoped<AiOrchestrator>();

// Business Services
builder.Services.AddScoped<DemoDataService>();
builder.Services.AddScoped<DocumentParseService>();
builder.Services.AddScoped<MarketingContentService>();

// OpenAPI
builder.Services.AddOpenApi();

// Set listening URL
builder.WebHost.UseUrls("http://localhost:5000");

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// OpenAPI in development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.MapControllers();

app.Run();
