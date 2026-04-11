package com.unosquare.worldcup.strategy;

import com.unosquare.worldcup.dto.MatchWithCityDTO;
import com.unosquare.worldcup.dto.OptimisedRouteDTO;
import com.unosquare.worldcup.model.City;

import java.util.List;

/**
 * RouteStrategy.
 *
 * Every route optimisation must implement this interface.
 * This allows different algorithms to be swapped in without changing the calling code.
 */
public interface RouteStrategy {

    /**
     * Optimise the order of matches to minimise travel distance.
     *
     * @param matches List of matches with full city data
     * @param originCity The starting city
     * @return An optimised route with ordered stops and total distance
     */
    OptimisedRouteDTO optimise(List<MatchWithCityDTO> matches, City originCity);
}
