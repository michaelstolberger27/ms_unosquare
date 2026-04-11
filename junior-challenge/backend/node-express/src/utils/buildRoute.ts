// NOTE: THIS CLASS DOES NOT NEED MODIFIED

import { MatchWithCity, OptimisedRoute, ItineraryStop } from '../strategies/RouteStrategy';
import { calculateDistance } from './haversine';

/**
 * Build an OptimisedRoute from an ordered list of matches.
 *
 * This helper takes matches that have already been ordered by a strategy
 * and calculates the distances between consecutive stops.
 *
 * @param orderedMatches - Matches in the order they should be visited
 * @param strategyName  - Name of the strategy that produced this ordering
 * @returns An OptimisedRoute with stops and total distance
 */
export function buildRoute(
  orderedMatches: MatchWithCity[],
  strategyName: string
): OptimisedRoute {
  let totalDistance = 0;

  const stops: ItineraryStop[] = orderedMatches.map((match, index) => {
    let distanceFromPrevious = 0;

    if (index > 0) {
      const prevCity = orderedMatches[index - 1].city;
      const currCity = match.city;
      distanceFromPrevious = calculateDistance(
        prevCity.latitude,
        prevCity.longitude,
        currCity.latitude,
        currCity.longitude
      );
      totalDistance += distanceFromPrevious;
    }

    return {
      stopNumber: index + 1,
      city: match.city,
      match,
      distanceFromPrevious,
    };
  });

  return {
    stops,
    totalDistance,
    strategy: strategyName,
  };
}
