namespace WorldCup.Api.Dtos;

public class BudgetResultDto
{
    public bool Feasible { get; set; }
    public OptimisedRouteDto? Route { get; set; }
    public CostBreakdownDto CostBreakdown { get; set; } = new();
    public List<string> CountriesVisited { get; set; } = new();
    public List<string> MissingCountries { get; set; } = new();
    public double? MinimumBudgetRequired { get; set; }
    public List<string> Suggestions { get; set; } = new();
}
