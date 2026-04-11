namespace WorldCup.Api.Dtos;

public class BestValueResultDto
{
    public bool WithinBudget { get; set; }
    public List<MatchWithCityDto> Matches { get; set; } = new();
    public OptimisedRouteDto? Route { get; set; }
    public CostBreakdownDto CostBreakdown { get; set; } = new();
    public List<string> CountriesVisited { get; set; } = new();
    public int MatchCount { get; set; }
    public string Message { get; set; } = string.Empty;
}
