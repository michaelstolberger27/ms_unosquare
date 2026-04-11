namespace WorldCup.Api.Dtos;

public class BudgetRequestDto
{
    public double Budget { get; set; }
    public List<string> MatchIds { get; set; } = new();
    public string OriginCityId { get; set; } = string.Empty;
}
