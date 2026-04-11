namespace WorldCup.Api.Models;

public class Match
{
    public string Id { get; set; } = string.Empty;
    public string HomeTeamId { get; set; } = string.Empty;
    public string AwayTeamId { get; set; } = string.Empty;
    public string CityId { get; set; } = string.Empty;
    public string Kickoff { get; set; } = string.Empty;
    public string GroupName { get; set; } = string.Empty;
    public int MatchDay { get; set; }
    public double TicketPrice { get; set; } = 100.0;

    // Navigation properties
    public City City { get; set; } = null!;
    public Team HomeTeam { get; set; } = null!;
    public Team AwayTeam { get; set; } = null!;
}
