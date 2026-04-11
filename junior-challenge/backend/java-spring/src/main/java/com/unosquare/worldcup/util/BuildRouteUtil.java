// NOTE: THIS CLASS DOES NOT NEED MODIFIED

package com.unosquare.worldcup.util;

import com.unosquare.worldcup.dto.ItineraryStopDTO;
import com.unosquare.worldcup.dto.MatchWithCityDTO;
import com.unosquare.worldcup.dto.OptimisedRouteDTO;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility to build an OptimisedRoute from an ordered list of matches.
 *
 * This helper takes matches that have already been ordered by a strategy
 * and calculates the distances between consecutive stops.
 */
public final class BuildRouteUtil {

    private BuildRouteUtil() {
        // Prevent instantiation
    }

    /**
     * Build an optimised route from ordered matches.
     *
     * @param orderedMatches Matches in the order they should be visited
     * @param strategyName   Name of the strategy that produced this ordering
     * @return An OptimisedRouteDTO with stops and total distance
     */
    public static OptimisedRouteDTO buildRoute(List<MatchWithCityDTO> orderedMatches, String strategyName) {
        List<ItineraryStopDTO> stops = new ArrayList<>();
        double totalDistance = 0;

        for (int i = 0; i < orderedMatches.size(); i++) {
            MatchWithCityDTO match = orderedMatches.get(i);
            double distanceFromPrevious = 0;

            if (i > 0) {
                var prevCity = orderedMatches.get(i - 1).getCity();
                var currCity = match.getCity();
                distanceFromPrevious = HaversineUtil.calculateDistance(
                        prevCity.getLatitude(), prevCity.getLongitude(),
                        currCity.getLatitude(), currCity.getLongitude()
                );
                totalDistance += distanceFromPrevious;
            }

            stops.add(new ItineraryStopDTO(i + 1, match.getCity(), match, distanceFromPrevious));
        }

        return new OptimisedRouteDTO(stops, totalDistance, strategyName);
    }
}
