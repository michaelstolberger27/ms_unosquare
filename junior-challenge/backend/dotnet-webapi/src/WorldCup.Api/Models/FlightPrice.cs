namespace WorldCup.Api.Models;

/// <summary>
/// FlightPrice entity — DO NOT MODIFY
///
/// Represents the cost of a flight between two cities.
/// Used for budget-constrained route optimisation.
/// </summary>
public class FlightPrice
{
    public string Id { get; set; } = string.Empty;
    public string OriginCityId { get; set; } = string.Empty;
    public string DestinationCityId { get; set; } = string.Empty;
    public double PriceUsd { get; set; }

    // Navigation properties
    public City OriginCity { get; set; } = null!;
    public City DestinationCity { get; set; } = null!;
}
