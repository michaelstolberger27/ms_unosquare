namespace WorldCup.Api.Models;

public class Itinerary
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
    public string Strategy { get; set; } = string.Empty;
    public double TotalDistance { get; set; }
    public List<ItineraryStop> Stops { get; set; } = new();
}
