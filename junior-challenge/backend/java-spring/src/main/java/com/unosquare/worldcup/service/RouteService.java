package com.unosquare.worldcup.service;

import com.unosquare.worldcup.bonus.BestValueFinder;
import com.unosquare.worldcup.dto.BestValueResultDTO;
import com.unosquare.worldcup.dto.BudgetResultDTO;
import com.unosquare.worldcup.dto.MatchWithCityDTO;
import com.unosquare.worldcup.dto.OptimisedRouteDTO;
import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.model.FlightPrice;
import com.unosquare.worldcup.repository.CityRepository;
import com.unosquare.worldcup.repository.FlightPriceRepository;
import com.unosquare.worldcup.repository.MatchRepository;
import com.unosquare.worldcup.strategy.NearestNeighbourStrategy;
import com.unosquare.worldcup.util.CostCalculator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * RouteService — YOUR TASK #3.1
 *
 * This service coordinates the route optimisation process.
 * It fetches matches from the database, converts them to DTOs,
 * and delegates to a RouteStrategy implementation.
 */
@Service
public class RouteService {

    private final MatchRepository matchRepository;
    private final CityRepository cityRepository;
    private final FlightPriceRepository flightPriceRepository;
    private final NearestNeighbourStrategy nearestNeighbourStrategy;
    private final CostCalculator costCalculator;
    private final BestValueFinder bestValueFinder;

    public RouteService(MatchRepository matchRepository,
                        CityRepository cityRepository,
                        FlightPriceRepository flightPriceRepository,
                        NearestNeighbourStrategy nearestNeighbourStrategy,
                        CostCalculator costCalculator,
                        BestValueFinder bestValueFinder) {
        this.matchRepository = matchRepository;
        this.cityRepository = cityRepository;
        this.flightPriceRepository = flightPriceRepository;
        this.nearestNeighbourStrategy = nearestNeighbourStrategy;
        this.costCalculator = costCalculator;
        this.bestValueFinder = bestValueFinder;
    }

    // ============================================================
    //  Optimise a route for the given match IDs
    // ============================================================
    //
    // TODO: Implement this method
    //
    // Steps:
    //   1. Fetch matches from the database
    //   2. Convert Match entities to MatchWithCityDTO
    //   3. Fetch origin city if provided
    //   4. Call nearestNeighbourStrategy.optimise(matchDTOs, originCity)
    //   5. Return the result as Optim
    //
    // ============================================================
    public OptimisedRouteDTO optimise(List<String> matchIds, String originCityId) {
        // TODO: Implement this method
        //
        // Steps:
        //   1. Fetch matches from the database using matchRepository.findByIdIn(matchIds)
        //   2. Convert Match entities to MatchWithCityDTO using MatchWithCityDTO.fromEntity()
        //   3. Fetch origin city if provided using cityRepository.findById(originCityId)
        //   4. Call nearestNeighbourStrategy.optimise(matches, originCity)
        //   5. Return the result
        //
        return null;
    }

    /**
     * Calculate the budget breakdown for a set of matches.
     */
    public BudgetResultDTO calculateBudget(List<String> matchIds, Double budget, String originCityId) {
        // 1. Fetch matches by IDs
        List<MatchWithCityDTO> matches = matchRepository.findByIdIn(matchIds)
                .stream()
                .map(MatchWithCityDTO::fromEntity)
                .toList();

        // 2. Fetch all flight prices
        List<FlightPrice> flightPrices = flightPriceRepository.findAll();

        // 3. Fetch origin city
        City originCity = cityRepository.findById(originCityId)
                .orElseThrow(() -> new RuntimeException("Origin city not found: " + originCityId));

        // 4. Calculate costs
        return costCalculator.calculate(matches, budget, originCityId, flightPrices, originCity);
    }

    /**
     * Find the best value combination of matches within budget.
     */
    public BestValueResultDTO findBestValue(Double budget, String originCityId) {
        List<MatchWithCityDTO> allMatches = matchRepository.findAll()
                .stream()
                .map(MatchWithCityDTO::fromEntity)
                .toList();
        List<FlightPrice> flightPrices = flightPriceRepository.findAll();
        City originCity = cityRepository.findById(originCityId)
                .orElseThrow(() -> new RuntimeException("Origin city not found: " + originCityId));

        return bestValueFinder.findBestValue(
                allMatches,
                budget,
                originCityId,
                flightPrices,
                originCity
        );
    }
}
