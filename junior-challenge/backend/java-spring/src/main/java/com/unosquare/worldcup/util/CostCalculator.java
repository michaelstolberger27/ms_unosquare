package com.unosquare.worldcup.util;

import com.unosquare.worldcup.dto.*;
import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.model.FlightPrice;
import com.unosquare.worldcup.util.BuildRouteUtil;
import org.springframework.stereotype.Component;

import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

/**
 * CostCalculator — YOUR TASK #5
 *
 * Calculates trip costs for a given set of matches.
 *
 * ============================================================
 * WHAT YOU NEED TO IMPLEMENT:
 * ============================================================
 *
 * The calculate() method — Build the budget result by:
 *   1. Finding which countries are visited and which are missing
 *   2. Calculating total costs using the helper methods
 *   3. Building the cost breakdown DTO
 *   4. Determining if the trip is feasible
 *   5. Generating suggestions if not feasible
 *   6. Building and returning the final result
 *
 * ============================================================
 * HELPER METHODS PROVIDED (no changes needed):
 * ============================================================
 *
 * - calculateTicketsCost(matches) → total ticket cost
 * - calculateFlightsCost(originCity, matches, flightPrices) → total flight cost
 * - calculateAccommodationCost(matches) → total accommodation cost
 * - getMatchTicketPrice(match) → price of a single match ticket
 * - BuildRouteUtil.buildRoute(matches, strategy) → builds the route DTO
 *
 * ============================================================
 * CONSTRAINT:
 * ============================================================
 *
 * The user must attend at least 1 match in each country (USA, Mexico, Canada).
 * If any country is missing, the trip is NOT feasible.
 *
 */
@Component
public class CostCalculator {

    private static final Set<String> REQUIRED_COUNTRIES = Set.of("USA", "Mexico", "Canada");

    // ============================================================
    //  Calculate budget result
    // ============================================================
    //
    // TODO: Implement this method
    //
    // Parameters:
    //   matches       → List of matches to include in the trip
    //   budget        → The user's budget
    //   originCityId  → ID of the starting city
    //   flightPrices  → List of flight prices between cities
    //   originCity    → The starting city object
    //
    // Steps:
    //   1. Sort matches by kickoff date
    //   2. Find countries visited (from match cities)
    //   3. Find missing countries (compare against REQUIRED_COUNTRIES)
    //   4. Calculate costs using helper methods:
    //      - ticketsCost = calculateTicketsCost(sortedMatches)
    //      - flightsCost = calculateFlightsCost(originCity, sortedMatches, flightPrices)
    //      - accommodationCost = calculateAccommodationCost(sortedMatches)
    //   5. Build CostBreakdownDTO with the costs
    //   6. Determine feasibility: no missing countries AND totalCost <= budget
    //   7. Generate suggestions using generateSuggestions() helper
    //   8. Build route using BuildRouteUtil.buildRoute(sortedMatches, "budget-optimised")
    //   9. Return BudgetResultDTO with all the data
    //
    // ============================================================
    public BudgetResultDTO calculate(
            List<MatchWithCityDTO> matches,
            Double budget,
            String originCityId,
            List<FlightPrice> flightPrices,
            City originCity
    ) {
        // TODO: Implement this method
        //
        // Steps:
        //   1. Sort matches by kickoff date
        //   2. Find countries visited (from match cities)
        //   3. Find missing countries (compare against REQUIRED_COUNTRIES)
        //   4. Calculate costs using helper methods:
        //      - ticketsCost = calculateTicketsCost(sortedMatches)
        //      - flightsCost = calculateFlightsCost(originCity, sortedMatches, flightPrices)
        //      - accommodationCost = calculateAccommodationCost(sortedMatches)
        //   5. Build CostBreakdownDTO with the costs
        //   6. Determine feasibility: no missing countries AND totalCost <= budget
        //   7. Generate suggestions using generateSuggestions() helper
        //   8. Build route using BuildRouteUtil.buildRoute(sortedMatches, "budget-optimised")
        //   9. Return BudgetResultDTO with all the data
        //
        return null;
    }

    /**
     * Generate helpful suggestions when the trip is not feasible.
     * (Provided — no changes needed)
     */
    private List<String> generateSuggestions(
            List<String> missingCountries,
            double totalCost,
            double budget,
            List<MatchWithCityDTO> matches
    ) {
        List<String> suggestions = new ArrayList<>();

        if (!missingCountries.isEmpty()) {
            suggestions.add("Add matches in: " + String.join(", ", missingCountries));
        }

        if (totalCost > budget) {
            suggestions.add(String.format("You need $%.2f more to complete this trip", totalCost - budget));

            // Find most expensive match
            Optional<MatchWithCityDTO> mostExpensive = matches.stream()
                    .max(Comparator.comparingDouble(m -> getMatchTicketPrice(m)));
            mostExpensive.ifPresent(m -> {
                double price = getMatchTicketPrice(m);
                suggestions.add(String.format("Consider removing %s vs %s to save $%.2f on tickets",
                        m.getHomeTeam().getName(), m.getAwayTeam().getName(), price));
            });
        }

        return suggestions;
    }

    private double calculateTicketsCost(List<MatchWithCityDTO> matches) {
        return matches.stream()
                .mapToDouble(this::getMatchTicketPrice)
                .sum();
    }

    private double getMatchTicketPrice(MatchWithCityDTO match) {
        Double ticketPrice = match.getTicketPrice();
        return ticketPrice != null ? ticketPrice : 150.0; // Default if not set
    }

    private double calculateFlightsCost(City originCity, List<MatchWithCityDTO> matches, List<FlightPrice> flightPrices) {
        if (matches.isEmpty()) return 0;

        double totalFlightCost = 0;

        // Flight from origin to first match
        City firstMatchCity = matches.get(0).getCity();
        totalFlightCost += getFlightPrice(originCity, firstMatchCity, flightPrices);

        // Flights between consecutive matches
        for (int i = 0; i < matches.size() - 1; i++) {
            City fromCity = matches.get(i).getCity();
            City toCity = matches.get(i + 1).getCity();
            if (!fromCity.getId().equals(toCity.getId())) {
                totalFlightCost += getFlightPrice(fromCity, toCity, flightPrices);
            }
        }

        return totalFlightCost;
    }

    private double getFlightPrice(City from, City to, List<FlightPrice> flightPrices) {
        if (from.getId().equals(to.getId())) return 0;

        // Look for exact price in flight prices
        Optional<FlightPrice> exactPrice = flightPrices.stream()
                .filter(fp -> fp.getOriginCity().getId().equals(from.getId())
                        && fp.getDestinationCity().getId().equals(to.getId()))
                .findFirst();

        if (exactPrice.isPresent()) {
            return exactPrice.get().getPriceUsd();
        }

        // Estimate based on distance if not found (roughly $0.10 per km)
        double distance = calculateDistance(
                from.getLatitude(), from.getLongitude(),
                to.getLatitude(), to.getLongitude()
        );
        return Math.round(distance * 0.10 * 100.0) / 100.0;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final double EARTH_RADIUS_KM = 6371.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    private double calculateAccommodationCost(List<MatchWithCityDTO> matches) {
        if (matches.size() < 2) {
            // At least one night for a single match
            if (matches.size() == 1) {
                return matches.get(0).getCity().getAccommodationPerNight();
            }
            return 0;
        }

        double totalAccommodation = 0;

        for (int i = 0; i < matches.size() - 1; i++) {
            MatchWithCityDTO currentMatch = matches.get(i);
            MatchWithCityDTO nextMatch = matches.get(i + 1);

            long nights = ChronoUnit.DAYS.between(
                    currentMatch.getKickoff().toLocalDate(),
                    nextMatch.getKickoff().toLocalDate()
            );

            // Ensure at least 1 night
            nights = Math.max(1, nights);

            double nightlyRate = currentMatch.getCity().getAccommodationPerNight();
            totalAccommodation += nights * nightlyRate;
        }

        // Add one night for the last city
        totalAccommodation += matches.get(matches.size() - 1).getCity().getAccommodationPerNight();

        return totalAccommodation;
    }
}
