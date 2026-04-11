namespace WorldCup.Api.Models;

public class ItineraryStop
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string ItineraryId { get; set; } = string.Empty;
    public int StopNumber { get; set; }
    public string MatchId { get; set; } = string.Empty;
    public string CityId { get; set; } = string.Empty;
    public double DistanceFromPrevious { get; set; }

    // Navigation properties
    public Itinerary Itinerary { get; set; } = null!;
    public Match Match { get; set; } = null!;
    public City City { get; set; } = null!;
}
