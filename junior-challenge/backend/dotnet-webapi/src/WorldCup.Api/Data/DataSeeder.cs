// NOTE: THIS CLASS DOES NOT NEED MODIFIED
using System.Text.Json;
using WorldCup.Api.Models;

namespace WorldCup.Api.Data;

public static class DataSeeder
{
    public static void Seed(WorldCupDbContext context)
    {
        if (context.Cities.Any()) return; // Already seeded

        var seedPath = ResolveSeedPath();
        if (seedPath == null)
        {
            Console.WriteLine("Warning: seed-data/matches.json not found. Skipping seed.");
            return;
        }

        var json = File.ReadAllText(seedPath);
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var data = JsonSerializer.Deserialize<SeedData>(json, options);

        if (data == null)
        {
            Console.WriteLine("Warning: Failed to deserialize seed data. Skipping seed.");
            return;
        }

        context.Cities.AddRange(data.Cities.Select(c => new City
        {
            Id = c.Id,
            Name = c.Name,
            Country = c.Country,
            Latitude = c.Latitude,
            Longitude = c.Longitude,
            Stadium = c.Stadium,
            AccommodationPerNight = c.AccommodationPerNight ?? 150.0
        }));
        context.Teams.AddRange(data.Teams.Select(t => new Team
        {
            Id = t.Id,
            Name = t.Name,
            Code = t.Code,
            GroupName = t.Group
        }));
        context.Matches.AddRange(data.Matches.Select(m => new Match
        {
            Id = m.Id,
            HomeTeamId = m.HomeTeamId,
            AwayTeamId = m.AwayTeamId,
            CityId = m.CityId,
            Kickoff = m.Kickoff,
            GroupName = m.Group,
            MatchDay = m.MatchDay,
            TicketPrice = m.TicketPrice ?? 100.0
        }));

        if (data.FlightPrices != null)
        {
            context.FlightPrices.AddRange(data.FlightPrices.Select(f => new FlightPrice
            {
                Id = f.Id,
                OriginCityId = f.OriginCityId,
                DestinationCityId = f.DestinationCityId,
                PriceUsd = f.PriceUsd
            }));
        }

        context.SaveChanges();
        Console.WriteLine("Database seeded successfully!");
    }

    private static string? ResolveSeedPath()
    {
        // Try multiple paths to find seed-data/matches.json
        var candidates = new[]
        {
            // Running from dotnet-webapi directory (dotnet run --project src/WorldCup.Api)
            Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "seed-data", "matches.json"),
            // Running from project root
            Path.Combine(Directory.GetCurrentDirectory(), "seed-data", "matches.json"),
            // Running from src/WorldCup.Api directory
            Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..", "..", "seed-data", "matches.json"),
            // Running from bin output directory
            Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "..", "..", "seed-data", "matches.json"),
            // Docker / absolute fallback
            Path.Combine(AppContext.BaseDirectory, "seed-data", "matches.json"),
        };

        foreach (var candidate in candidates)
        {
            var fullPath = Path.GetFullPath(candidate);
            if (File.Exists(fullPath))
            {
                return fullPath;
            }
        }

        return null;
    }

    // --- Deserialization models (private) ---

    private record SeedData(
        List<SeedCity> Cities,
        List<SeedTeam> Teams,
        List<SeedMatch> Matches,
        List<SeedFlightPrice>? FlightPrices
    );

    private record SeedCity(
        string Id,
        string Name,
        string Country,
        double Latitude,
        double Longitude,
        string Stadium,
        double? AccommodationPerNight
    );

    private record SeedTeam(
        string Id,
        string Name,
        string Code,
        string Group
    );

    private record SeedMatch(
        string Id,
        string HomeTeamId,
        string AwayTeamId,
        string CityId,
        string Kickoff,
        string Group,
        int MatchDay,
        double? TicketPrice
    );

    private record SeedFlightPrice(
        string Id,
        string OriginCityId,
        string DestinationCityId,
        double PriceUsd
    );
}
