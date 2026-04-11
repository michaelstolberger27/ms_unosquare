using WorldCup.Api.Dtos;
using WorldCup.Api.Models;

namespace WorldCup.Api.Bonus;

/// <summary>
/// BestValueFinder — BONUS CHALLENGE #1
///
/// ============================================================
/// WHAT YOU NEED TO IMPLEMENT:
/// ============================================================
///
/// Find the best combination of matches within a given budget.
///
/// Requirements:
/// - Maximize the number of matches that fit within budget
/// - Must include at least 1 match in each country (USA, Mexico, Canada)
/// - Minimum 5 matches required
/// - Return optimised route with cost breakdown
///
/// This is a combinatorial optimisation problem. You can use:
/// - Greedy approach: Start with cheapest matches, ensure country coverage
/// - Dynamic programming: Find optimal subset within budget
/// - Heuristic approach: Start with required countries, add cheapest remaining
///
/// ============================================================
/// HELPER METHODS PROVIDED:
/// ============================================================
///
/// Use the helper methods below in your implementation:
/// - GetMatchesByCountry(): Group matches by country
/// - GetFlightPrice(): Look up flight price between cities
/// - CalculateTripCost(): Calculate total cost for a set of matches
///
/// </summary>
public class BestValueFinder
{
    private static readonly List<string> RequiredCountries = new() { "USA", "Mexico", "Canada" };

    /// <summary>
    /// Find the best value combination of matches within budget.
    /// </summary>
    /// <param name="allMatches">All available matches</param>
    /// <param name="budget">Maximum budget in USD</param>
    /// <param name="originCityId">Starting city for the trip</param>
    /// <param name="flightPrices">Available flight prices</param>
    /// <returns>BestValueResultDto with the optimal match selection</returns>
    public BestValueResultDto FindBestValue(
        List<MatchWithCityDto> allMatches,
        double budget,
        string originCityId,
        List<FlightPrice> flightPrices)
    {
        // TODO: Implement best value finder (BONUS CHALLENGE #1)
        //
        // Suggested approach (greedy):
        // 1. First, ensure country coverage:
        //    - Pick the cheapest match from each required country
        //    - This guarantees we visit USA, Mexico, and Canada
        //
        // 2. Sort remaining matches by "value" (e.g., ticket price / quality)
        //
        // 3. Greedily add matches while staying within budget:
        //    - For each candidate match, calculate if adding it keeps us in budget
        //    - Consider both ticket price AND added flight/accommodation costs
        //
        // 4. Ensure minimum 5 matches:
        //    - If we can't reach 5 matches within budget, return WithinBudget = false
        //    - Set Message explaining the constraint
        //
        // 5. Build the optimised route using NearestNeighbour
        //
        // 6. Return BestValueResultDto with:
        //    - WithinBudget: true/false
        //    - Matches: selected matches
        //    - Route: optimised travel route
        //    - CostBreakdown: detailed costs
        //    - CountriesVisited: list of countries
        //    - MatchCount: number of matches
        //    - Message: description of result

        throw new NotImplementedException("Not implemented — this is a bonus challenge!");
    }

    // ============================================================
    // HELPER METHODS (Already implemented for you)
    // ============================================================

    /// <summary>
    /// Group matches by their country.
    /// </summary>
    protected Dictionary<string, List<MatchWithCityDto>> GetMatchesByCountry(List<MatchWithCityDto> matches)
    {
        return matches
            .GroupBy(m => m.City.Country)
            .ToDictionary(g => g.Key, g => g.ToList());
    }

    /// <summary>
    /// Look up the flight price between two cities.
    /// </summary>
    protected double GetFlightPrice(string fromCityId, string toCityId, List<FlightPrice> flightPrices)
    {
        if (fromCityId == toCityId) return 0;

        var price = flightPrices.FirstOrDefault(fp =>
            fp.OriginCityId == fromCityId && fp.DestinationCityId == toCityId);

        if (price != null) return price.PriceUsd;

        var avgPrice = flightPrices.Any() ? flightPrices.Average(fp => fp.PriceUsd) : 300;
        return avgPrice * 1.2;
    }

    /// <summary>
    /// Calculate the total cost for a set of matches.
    /// </summary>
    protected double CalculateTripCost(
        List<MatchWithCityDto> matches,
        string originCityId,
        List<FlightPrice> flightPrices)
    {
        if (!matches.Any()) return 0;

        var sortedMatches = matches.OrderBy(m => m.Kickoff).ToList();

        // Ticket costs
        var ticketCost = matches.Sum(m => m.TicketPrice);

        // Flight costs
        var flightCost = GetFlightPrice(originCityId, sortedMatches[0].City.Id, flightPrices);
        for (int i = 1; i < sortedMatches.Count; i++)
        {
            flightCost += GetFlightPrice(
                sortedMatches[i - 1].City.Id,
                sortedMatches[i].City.Id,
                flightPrices);
        }

        // Accommodation costs (simplified: assume 1 night per city change + nights between matches)
        var accommodationCost = 0.0;
        for (int i = 0; i < sortedMatches.Count; i++)
        {
            var nights = 1; // At least one night per match
            if (i < sortedMatches.Count - 1)
            {
                var d1 = DateTime.Parse(sortedMatches[i].Kickoff.Split('T')[0]);
                var d2 = DateTime.Parse(sortedMatches[i + 1].Kickoff.Split('T')[0]);
                nights = Math.Max(1, (int)(d2 - d1).TotalDays);
            }
            accommodationCost += nights * sortedMatches[i].City.AccommodationPerNight;
        }

        return ticketCost + flightCost + accommodationCost;
    }
}
