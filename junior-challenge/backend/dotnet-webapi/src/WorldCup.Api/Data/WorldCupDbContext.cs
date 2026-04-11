// NOTE: THIS CLASS DOES NOT NEED MODIFIED
using Microsoft.EntityFrameworkCore;
using WorldCup.Api.Models;

namespace WorldCup.Api.Data;

public class WorldCupDbContext : DbContext
{
    public WorldCupDbContext(DbContextOptions<WorldCupDbContext> options) : base(options) { }

    public DbSet<City> Cities => Set<City>();
    public DbSet<Team> Teams => Set<Team>();
    public DbSet<Match> Matches => Set<Match>();
    public DbSet<Itinerary> Itineraries => Set<Itinerary>();
    public DbSet<ItineraryStop> ItineraryStops => Set<ItineraryStop>();
    public DbSet<FlightPrice> FlightPrices => Set<FlightPrice>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // --- Cities ---
        modelBuilder.Entity<City>(entity =>
        {
            entity.ToTable("cities");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Country).HasColumnName("country");
            entity.Property(e => e.Latitude).HasColumnName("latitude");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.Stadium).HasColumnName("stadium");
            entity.Property(e => e.AccommodationPerNight).HasColumnName("accommodation_per_night");
        });

        // --- Teams ---
        modelBuilder.Entity<Team>(entity =>
        {
            entity.ToTable("teams");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.GroupName).HasColumnName("group_name");
        });

        // --- Matches ---
        modelBuilder.Entity<Match>(entity =>
        {
            entity.ToTable("matches");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.HomeTeamId).HasColumnName("home_team_id");
            entity.Property(e => e.AwayTeamId).HasColumnName("away_team_id");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.Kickoff).HasColumnName("kickoff");
            entity.Property(e => e.GroupName).HasColumnName("group_name");
            entity.Property(e => e.MatchDay).HasColumnName("match_day");
            entity.Property(e => e.TicketPrice).HasColumnName("ticket_price");

            entity.HasOne(e => e.City)
                .WithMany()
                .HasForeignKey(e => e.CityId);

            entity.HasOne(e => e.HomeTeam)
                .WithMany()
                .HasForeignKey(e => e.HomeTeamId);

            entity.HasOne(e => e.AwayTeam)
                .WithMany()
                .HasForeignKey(e => e.AwayTeamId);
        });

        // --- Itineraries ---
        modelBuilder.Entity<Itinerary>(entity =>
        {
            entity.ToTable("itineraries");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.Strategy).HasColumnName("strategy");
            entity.Property(e => e.TotalDistance).HasColumnName("total_distance");
        });

        // --- Itinerary Stops ---
        modelBuilder.Entity<ItineraryStop>(entity =>
        {
            entity.ToTable("itinerary_stops");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ItineraryId).HasColumnName("itinerary_id");
            entity.Property(e => e.StopNumber).HasColumnName("stop_number");
            entity.Property(e => e.MatchId).HasColumnName("match_id");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.DistanceFromPrevious).HasColumnName("distance_from_previous");

            entity.HasOne(e => e.Itinerary)
                .WithMany(i => i.Stops)
                .HasForeignKey(e => e.ItineraryId);

            entity.HasOne(e => e.Match)
                .WithMany()
                .HasForeignKey(e => e.MatchId);

            entity.HasOne(e => e.City)
                .WithMany()
                .HasForeignKey(e => e.CityId);
        });

        // --- Flight Prices ---
        modelBuilder.Entity<FlightPrice>(entity =>
        {
            entity.ToTable("flight_prices");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OriginCityId).HasColumnName("origin_city_id");
            entity.Property(e => e.DestinationCityId).HasColumnName("destination_city_id");
            entity.Property(e => e.PriceUsd).HasColumnName("price_usd");

            entity.HasOne(e => e.OriginCity)
                .WithMany()
                .HasForeignKey(e => e.OriginCityId);

            entity.HasOne(e => e.DestinationCity)
                .WithMany()
                .HasForeignKey(e => e.DestinationCityId);
        });
    }
}
