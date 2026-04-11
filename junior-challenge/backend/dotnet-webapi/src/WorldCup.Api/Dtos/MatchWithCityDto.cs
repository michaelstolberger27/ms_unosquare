using WorldCup.Api.Models;

namespace WorldCup.Api.Dtos;

public class MatchWithCityDto
{
    public string Id { get; set; } = string.Empty;
    public Team HomeTeam { get; set; } = null!;
    public Team AwayTeam { get; set; } = null!;
    public City City { get; set; } = null!;
    public string Kickoff { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty;
    public int MatchDay { get; set; }
    public double TicketPrice { get; set; }

    public static MatchWithCityDto FromEntity(Match match) => new()
    {
        Id = match.Id,
        HomeTeam = match.HomeTeam,
        AwayTeam = match.AwayTeam,
        City = match.City,
        Kickoff = match.Kickoff,
        Group = match.GroupName,
        MatchDay = match.MatchDay,
        TicketPrice = match.TicketPrice
    };
}
