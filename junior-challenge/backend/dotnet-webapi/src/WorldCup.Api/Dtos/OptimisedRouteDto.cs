namespace WorldCup.Api.Dtos;

public class OptimisedRouteDto
{
    public List<ItineraryStopDto> Stops { get; set; } = new();
    public double TotalDistance { get; set; }
    public string Strategy { get; set; } = string.Empty;
}
