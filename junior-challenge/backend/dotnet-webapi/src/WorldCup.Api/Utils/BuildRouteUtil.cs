// NOTE: THIS CLASS DOES NOT NEED MODIFIED
using WorldCup.Api.Dtos;

namespace WorldCup.Api.Utils;

public static class BuildRouteUtil
{
    /// <summary>
    /// Build an OptimisedRouteDto from an ordered list of matches.
    /// Calculates cumulative Haversine distances between consecutive cities.
    /// </summary>
    public static OptimisedRouteDto BuildRoute(List<MatchWithCityDto> orderedMatches, string strategyName)
    {
        var stops = new List<ItineraryStopDto>();
        double totalDistance = 0;

        for (int i = 0; i < orderedMatches.Count; i++)
        {
            double distanceFromPrevious = 0;

            if (i > 0)
            {
                var prev = orderedMatches[i - 1].City;
                var curr = orderedMatches[i].City;
                distanceFromPrevious = HaversineUtil.CalculateDistance(
                    prev.Latitude, prev.Longitude, curr.Latitude, curr.Longitude);
                totalDistance += distanceFromPrevious;
            }

            stops.Add(new ItineraryStopDto
            {
                StopNumber = i + 1,
                City = orderedMatches[i].City,
                Match = orderedMatches[i],
                DistanceFromPrevious = distanceFromPrevious
            });
        }

        return new OptimisedRouteDto
        {
            Stops = stops,
            TotalDistance = totalDistance,
            Strategy = strategyName
        };
    }
}
