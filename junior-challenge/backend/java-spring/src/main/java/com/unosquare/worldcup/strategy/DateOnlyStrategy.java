// NOTE: THIS CLASS DOES NOT NEED MODIFIED
package com.unosquare.worldcup.strategy;

import com.unosquare.worldcup.dto.MatchWithCityDTO;
import com.unosquare.worldcup.dto.OptimisedRouteDTO;
import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.util.BuildRouteUtil;
import com.unosquare.worldcup.util.HaversineUtil;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DateOnlyStrategy — A naive route optimisation that simply sorts by date.
 *
 * This strategy produces valid routes but doesn't consider geographic distance.
 * It's provided as a working example so you can test your endpoints before
 * implementing NearestNeighbourStrategy.
 */
@Component("dateOnly")
public class DateOnlyStrategy implements RouteStrategy {

    @Override
    public OptimisedRouteDTO optimise(List<MatchWithCityDTO> matches, City originCity) {
        // Simply sort matches by kickoff time — no distance optimisation
        List<MatchWithCityDTO> sorted = matches.stream()
                .sorted(Comparator.comparing(MatchWithCityDTO::getKickoff))
                .collect(Collectors.toList());

        OptimisedRouteDTO route = BuildRouteUtil.buildRoute(sorted, "date-only");

        // Add distance from origin city to first match
        if (originCity != null && !route.getStops().isEmpty()) {
            var firstStop = route.getStops().get(0);
            double distanceFromOrigin = HaversineUtil.calculateDistance(
                    originCity.getLatitude(), originCity.getLongitude(),
                    firstStop.getCity().getLatitude(), firstStop.getCity().getLongitude()
            );
            firstStop.setDistanceFromPrevious(distanceFromOrigin);
            route.setTotalDistance(route.getTotalDistance() + distanceFromOrigin);
        }

        return route;
    }
}
