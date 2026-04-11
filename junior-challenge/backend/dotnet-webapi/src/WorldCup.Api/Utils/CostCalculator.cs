using WorldCup.Api.Dtos;
using WorldCup.Api.Models;

namespace WorldCup.Api.Utils;

/// <summary>
/// CostCalculator — YOUR TASK #5
///
/// ============================================================
/// WHAT YOU NEED TO IMPLEMENT:
/// ============================================================
///
/// The Calculate method should:
/// 1. Calculate ticket costs (sum of TicketPrice for all matches)
/// 2. Calculate flight costs (between consecutive cities + from origin)
/// 3. Calculate accommodation costs (nights × city's AccommodationPerNight rate)
/// 4. Check feasibility (total ≤ budget AND visits USA, Mexico, Canada)
/// 5. Return suggestions if not feasible
///
/// ============================================================
/// HELPER METHODS PROVIDED:
/// ============================================================
///
/// The helper methods below are already implemented for you:
/// - GetFlightPrice(): Look up flight price between two cities
/// - CalculateNightsBetween(): Calculate nights between two dates
/// - GetCountriesVisited(): Get list of unique countries from matches
/// - GetMissingCountries(): Check which required countries are missing
/// - GenerateSuggestions(): Create cost-saving suggestions
///
/// </summary>
public class CostCalculator
{
    private static readonly List<string> RequiredCountries = new() { "USA", "Mexico", "Canada" };

    /// <summary>
    /// Calculate the total cost of a trip and check if it's within budget.
    /// </summary>
    /// <param name="matches">List of matches the user wants to attend (sorted by date)</param>
    /// <param name="budget">The user's maximum budget in USD</param>
    /// <param name="originCityId">The city where the user starts their trip</param>
    /// <param name="flightPrices">All available flight prices between cities</param>
    /// <returns>BudgetResultDto containing feasibility, costs, and suggestions</returns>
    public BudgetResultDto Calculate(
        List<MatchWithCityDto> matches,
        double budget,
        string originCityId,
        List<FlightPrice> flightPrices)
    {
        // TODO: Implement cost calculation (YOUR TASK #5)
        //
        // Pseudocode:
        // 1. Calculate ticket costs:
        //    - Sum of match.TicketPrice for all matches
        //
        // 2. Calculate flight costs:
        //    - From originCityId to first match's city
        //    - Between each consecutive match city (if different)
        //    - Use GetFlightPrice() helper to look up prices
        //
        // 3. Calculate accommodation costs:
        //    - For each city visited, calculate nights stayed
        //    - Use CalculateNightsBetween() for dates
        //    - Multiply nights by city's AccommodationPerNight
        //
        // 4. Build CostBreakdownDto with all costs and total
        //
        // 5. Check country constraint:
        //    - Use GetCountriesVisited() and GetMissingCountries()
        //    - If missing countries, set Feasible = false
        //
        // 6. Check budget constraint:
        //    - If total > budget, set Feasible = false
        //    - Set MinimumBudgetRequired = total
        //
        // 7. Generate suggestions if not feasible:
        //    - Use GenerateSuggestions() helper
        //
        // 8. Return BudgetResultDto with all results

        throw new NotImplementedException("Not implemented — this is your task!");
    }

    // ============================================================
    // HELPER METHODS (Already implemented for you)
    // ============================================================

    /// <summary>
    /// Look up the flight price between two cities.
    /// Returns an estimated price if no direct flight exists.
    /// </summary>
    protected double GetFlightPrice(string fromCityId, string toCityId, List<FlightPrice> flightPrices)
    {
        if (fromCityId == toCityId) return 0;

        var price = flightPrices.FirstOrDefault(fp =>
            fp.OriginCityId == fromCityId && fp.DestinationCityId == toCityId);

        if (price != null) return price.PriceUsd;

        // If no direct flight, estimate based on average
        var avgPrice = flightPrices.Any() ? flightPrices.Average(fp => fp.PriceUsd) : 300;
        return avgPrice * 1.2; // 20% markup for indirect routes
    }

    /// <summary>
    /// Calculate the number of nights between two dates.
    /// </summary>
    protected int CalculateNightsBetween(string date1, string date2)
    {
        var d1 = DateTime.Parse(date1.Split('T')[0]);
        var d2 = DateTime.Parse(date2.Split('T')[0]);
        return Math.Max(0, (int)(d2 - d1).TotalDays);
    }

    /// <summary>
    /// Get list of unique countries visited from matches.
    /// </summary>
    protected List<string> GetCountriesVisited(List<MatchWithCityDto> matches)
    {
        return matches
            .Select(m => m.City.Country)
            .Distinct()
            .ToList();
    }

    /// <summary>
    /// Check which required countries (USA, Mexico, Canada) are missing.
    /// </summary>
    protected List<string> GetMissingCountries(List<string> countriesVisited)
    {
        return RequiredCountries
            .Where(c => !countriesVisited.Contains(c))
            .ToList();
    }

    /// <summary>
    /// Generate cost-saving suggestions when budget is exceeded.
    /// </summary>
    protected List<string> GenerateSuggestions(
        List<MatchWithCityDto> matches,
        double total,
        double budget)
    {
        var suggestions = new List<string>();
        var overage = total - budget;

        if (matches.Count > 5)
        {
            var mostExpensive = matches.OrderByDescending(m => m.TicketPrice).First();
            suggestions.Add($"Consider removing the {mostExpensive.HomeTeam.Name} vs {mostExpensive.AwayTeam.Name} match to save ${mostExpensive.TicketPrice}");
        }

        suggestions.Add($"You are ${overage:F0} over budget. Consider reducing the number of matches.");

        return suggestions;
    }
}
