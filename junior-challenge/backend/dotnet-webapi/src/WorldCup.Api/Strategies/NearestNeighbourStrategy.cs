using WorldCup.Api.Dtos;
using WorldCup.Api.Utils;

namespace WorldCup.Api.Strategies;

/// <summary>
/// NearestNeighbourStrategy — YOUR TASK #3
///
/// Optimises match order to minimise travel distance using the nearest-neighbour algorithm.
/// The pseudocode below explains the algorithm.
/// </summary>
public class NearestNeighbourStrategy : IRouteStrategy
{
    public OptimisedRouteDto Optimise(List<MatchWithCityDto> matches)
    {
        // TODO: Implement nearest-neighbour optimisation (YOUR TASK #3)
        //
        // Pseudocode:
        // 1. Sort all matches by kickoff date
        // 2. Group matches that fall on the same day
        //    Hint: match.Kickoff.Split('T')[0] gives the date string
        // 3. Start with the first match chronologically — this is your starting city
        // 4. For each subsequent day group:
        //    a. If only one match that day -> add it to the route
        //    b. If multiple matches that day -> pick the one whose city is closest
        //       to your current position (use HaversineUtil.CalculateDistance())
        // 5. Track your "current city" as you go — update it after each match
        // 6. Return BuildRouteUtil.BuildRoute(orderedMatches, "nearest-neighbour")
        //
        // Helper:
        //   HaversineUtil.CalculateDistance(lat1, lon1, lat2, lon2) -> km
        //
        // Tips:
        // - Use .GroupBy(m => m.Kickoff.Split('T')[0]) to group by date
        // - Use .MinBy() to find the closest match in a group
        // - The first match in chronological order should always be your starting point

        throw new NotImplementedException("Not implemented — this is your task!");
    }
}
