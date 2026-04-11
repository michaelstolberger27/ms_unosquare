package com.unosquare.worldcup.strategy;

import com.unosquare.worldcup.dto.MatchWithCityDTO;
import com.unosquare.worldcup.dto.OptimisedRouteDTO;
import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.model.Team;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * NearestNeighbourStrategyTest — YOUR TASK #4
 *
 * ============================================================
 * WHAT YOU NEED TO IMPLEMENT:
 * ============================================================
 *
 * Write unit tests for the NearestNeighbourStrategy.
 * Each test has a TODO comment explaining what to test.
 *
 *
 */
class NearestNeighbourStrategyTest {

    private NearestNeighbourStrategy strategy;

    @BeforeEach
    void setUp() {
        strategy = new NearestNeighbourStrategy();
    }

    @Test
    void shouldReturnValidRouteForMultipleMatches() {
        // TODO: Implement this test
        //
        // Arrange: Create a list of matches across different cities and dates
        // - Create 3 cities (one in each country: USA, Mexico, Canada)
        // - Create 2 teams
        // - Create 3 matches (one per city, on different dates)
        //
        // Act: Call strategy.optimise(matches, null)
        //
        // Assert: Verify:
        // - result is not null
        // - result has 3 stops
        // - totalDistance > 0
        // - strategy = "nearest-neighbour"
        //
        fail("Test not implemented");
    }

    @Test
    void shouldReturnEmptyRouteForEmptyMatches() {
        // TODO: Implement this test
        //
        // Arrange: Create an empty list of matches
        //
        // Act: Call strategy.optimise(emptyList, null)
        //
        // Assert: Verify:
        // - result is not null
        // - result has empty stops
        // - totalDistance = 0
        // - feasible = false
        //
        fail("Test not implemented");
    }

    @Test
    void shouldReturnZeroDistanceForSingleMatch() {
        // TODO: Implement this test
        //
        // Arrange: Create a list with a single match
        // - Create 1 city
        // - Create 2 teams
        // - Create 1 match
        //
        // Act: Call strategy.optimise(matches, null)
        //
        // Assert: Verify:
        // - result is not null
        // - stops.size() = 1
        // - totalDistance = 0
        //
        fail("Test not implemented");
    }

}
