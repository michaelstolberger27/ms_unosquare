using WorldCup.Api.Models;

namespace WorldCup.Api.Dtos;

public class ItineraryStopDto
{
    public int StopNumber { get; set; }
    public City City { get; set; } = null!;
    public MatchWithCityDto Match { get; set; } = null!;
    public double DistanceFromPrevious { get; set; }
}
