using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using WorldCup.Api.Data;
using WorldCup.Api.Strategies;

var builder = WebApplication.CreateBuilder(args);

// ──────────────────────────────────────────────
//  Database: PostgreSQL if DATABASE_URL is set, otherwise SQLite
// ──────────────────────────────────────────────
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
if (!string.IsNullOrEmpty(databaseUrl))
{
    builder.Services.AddDbContext<WorldCupDbContext>(options =>
        options.UseNpgsql(databaseUrl));
}
else
{
    var dbPath = Path.Combine(AppContext.BaseDirectory, "worldcup.db");
    builder.Services.AddDbContext<WorldCupDbContext>(options =>
        options.UseSqlite($"Data Source={dbPath}"));
}

// ──────────────────────────────────────────────
//  CORS — allow React frontend at localhost:5173
// ──────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// ──────────────────────────────────────────────
//  Controllers + JSON serialization (camelCase)
// ──────────────────────────────────────────────
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

// ──────────────────────────────────────────────
//  Strategy Pattern — register via DI
// ──────────────────────────────────────────────
// Default: DateOnlyStrategy (sorts by kickoff date, no distance optimisation).
// TODO: Swap to NearestNeighbourStrategy once implemented:
//   builder.Services.AddScoped<IRouteStrategy, NearestNeighbourStrategy>();
builder.Services.AddScoped<IRouteStrategy, DateOnlyStrategy>();

var app = builder.Build();

// ──────────────────────────────────────────────
//  Auto-seed on startup if tables are empty
// ──────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<WorldCupDbContext>();
    context.Database.EnsureCreated();
    DataSeeder.Seed(context);
}

app.UseCors();
app.MapControllers();

// ──────────────────────────────────────────────
//  Health endpoint
// ──────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();

// ──────────────────────────────────────────────
//  Make Program accessible for integration tests
// ──────────────────────────────────────────────
public partial class Program { }
