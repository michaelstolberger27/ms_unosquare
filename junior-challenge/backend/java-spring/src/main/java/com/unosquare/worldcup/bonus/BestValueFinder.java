package com.unosquare.worldcup.bonus;

import com.unosquare.worldcup.dto.*;
import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.model.FlightPrice;
import com.unosquare.worldcup.util.BuildRouteUtil;
import org.springframework.stereotype.Component;

import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

/**
 * BestValueFinder — BONUS CHALLENGE #1
 *
 * Finds the best value combination of matches that:
 * 1. Includes at least 5 matches
 * 2. Covers all 3 countries (USA, Mexico, Canada)
 * 3. Fits within the budget (or gets as close as possible)
 * 4. Maximizes the number of matches for the money
 */
@Component
public class BestValueFinder {

    private static final Set<String> REQUIRED_COUNTRIES = Set.of("USA", "Mexico", "Canada");
    private static final int MINIMUM_MATCHES = 5;

    /**
     * Find the best value combination of matches.
     *
     * TODO: Implement this method to find the best combination of matches within budget.
     *
     * Requirements:
     *   - Return an error result if no matches are available
     *   - Find the combination that fits the budget with the most matches
     *   - If nothing fits the budget, return the closest option
     *
     * Available helper methods:
     *   - generateValidCombinations(matches, targetSize) - generates combinations meeting country requirements
     *   - calculateTotalCost(matches, originCity, flightPrices) - calculates total cost
     *   - buildResult(combination, cost, withinBudget, budget, originCity, flightPrices) - builds success response
     *   - buildErrorResult(message) - builds error response
     *
     * @param allMatches All available matches
     * @param budget The user's budget
     * @param originCityId The starting city ID
     * @param flightPrices List of flight prices between cities
     * @param originCity The starting city
     * @return BestValueResultDTO with the best combination found
     */
    public BestValueResultDTO findBestValue(List<MatchWithCityDTO> allMatches, Double budget, String originCityId,
            List<FlightPrice> flightPrices,
            City originCity) {
        // TODO: Implement this method to find the best combination of matches within budget.
        //
        // Requirements:
        //   - Return an error result if no matches are available (use buildErrorResult())
        //   - Find the combination that fits the budget with the most matches
        //   - If nothing fits the budget, return the closest option
        //
        // Available helper methods:
        //   - generateValidCombinations(matches, targetSize) - generates combinations meeting country requirements
        //   - calculateTotalCost(matches, originCity, flightPrices) - calculates total cost
        //   - buildResult(combination, cost, withinBudget, budget, originCity, flightPrices) - builds success response
        //   - buildErrorResult(message) - builds error response
        //
        return buildErrorResult("Not implemented");
    }


    // ============================================================
    // HELPER METHODS - You can use these in your implementation
    // ============================================================

    /**
     * Build an error result when no valid combination can be found.
     */
    private BestValueResultDTO buildErrorResult(String message) {
        return new BestValueResultDTO(
                false,
                new ArrayList<>(),
                null,
                null,
                new ArrayList<>(),
                0,
                message
        );
    }

    /**
     * Build a successful result from a combination of matches.
     */
    private BestValueResultDTO buildResult(
            List<MatchWithCityDTO> combination,
            double totalCost,
            boolean withinBudget,
            double budget,
            City originCity,
            List<FlightPrice> flightPrices
    ) {
        CostBreakdownDTO costBreakdown = buildCostBreakdown(combination, originCity, flightPrices);
        OptimisedRouteDTO route = BuildRouteUtil.buildRoute(combination, "best-value");

        Set<String> countriesVisited = combination.stream()
                .map(m -> m.getCity().getCountry())
                .collect(Collectors.toSet());

        String message = withinBudget
                ? String.format("Found %d matches within your $%.2f budget!", combination.size(), budget)
                : String.format("Closest option: %d matches for $%.2f (%.2f over budget)",
                        combination.size(), totalCost, totalCost - budget);

        return new BestValueResultDTO(
                withinBudget,
                combination,
                route,
                costBreakdown,
                new ArrayList<>(countriesVisited),
                combination.size(),
                message
        );
    }

    /**
     * Generate valid combinations that meet country requirements.
     * Each combination will have at least 1 match from each required country.
     */
    private List<List<MatchWithCityDTO>> generateValidCombinations(
            List<MatchWithCityDTO> matches, int targetSize) {

        List<List<MatchWithCityDTO>> validCombinations = new ArrayList<>();

        // Group matches by country
        Map<String, List<MatchWithCityDTO>> byCountry = matches.stream()
                .collect(Collectors.groupingBy(m -> m.getCity().getCountry()));

        // Ensure we have matches in all required countries
        for (String country : REQUIRED_COUNTRIES) {
            if (!byCountry.containsKey(country) || byCountry.get(country).isEmpty()) {
                return validCombinations;
            }
        }

        List<MatchWithCityDTO> usaMatches = byCountry.getOrDefault("USA", new ArrayList<>());
        List<MatchWithCityDTO> mexicoMatches = byCountry.getOrDefault("Mexico", new ArrayList<>());
        List<MatchWithCityDTO> canadaMatches = byCountry.getOrDefault("Canada", new ArrayList<>());

        // Try different combinations of 1 from each country + fill rest with cheapest
        for (int u = 0; u < Math.min(usaMatches.size(), 3); u++) {
            for (int m = 0; m < Math.min(mexicoMatches.size(), 3); m++) {
                for (int c = 0; c < Math.min(canadaMatches.size(), 3); c++) {
                    List<MatchWithCityDTO> base = new ArrayList<>();
                    base.add(usaMatches.get(u));
                    base.add(mexicoMatches.get(m));
                    base.add(canadaMatches.get(c));

                    Set<String> usedIds = base.stream()
                            .map(MatchWithCityDTO::getId)
                            .collect(Collectors.toSet());

                    List<MatchWithCityDTO> remaining = matches.stream()
                            .filter(match -> !usedIds.contains(match.getId()))
                            .sorted(Comparator.comparingDouble(this::getMatchTicketPrice))
                            .collect(Collectors.toList());

                    int needed = targetSize - base.size();
                    if (needed <= remaining.size()) {
                        List<MatchWithCityDTO> combination = new ArrayList<>(base);
                        combination.addAll(remaining.subList(0, needed));
                        combination.sort(Comparator.comparing(MatchWithCityDTO::getKickoff));
                        validCombinations.add(combination);
                    }
                }
            }
        }

        return validCombinations;
    }

    /**
     * Calculate the total cost of a combination (tickets + flights + accommodation).
     */
    private double calculateTotalCost(List<MatchWithCityDTO> matches, City originCity, List<FlightPrice> flightPrices) {
        double tickets = calculateTicketsCost(matches);
        double flights = calculateFlightsCost(originCity, matches, flightPrices);
        double accommodation = calculateAccommodationCost(matches);
        return tickets + flights + accommodation;
    }

    /**
     * Calculate total ticket cost for all matches.
     */
    private double calculateTicketsCost(List<MatchWithCityDTO> matches) {
        return matches.stream()
                .mapToDouble(this::getMatchTicketPrice)
                .sum();
    }

    /**
     * Build the cost breakdown DTO.
     */
    private CostBreakdownDTO buildCostBreakdown(List<MatchWithCityDTO> matches, City originCity, List<FlightPrice> flightPrices) {
        double tickets = calculateTicketsCost(matches);
        double flights = calculateFlightsCost(originCity, matches, flightPrices);
        double accommodation = calculateAccommodationCost(matches);
        return new CostBreakdownDTO(flights, accommodation, tickets, tickets + flights + accommodation);
    }

    /**
     * Get the ticket price for a match (defaults to 150 if not set).
     */
    private double getMatchTicketPrice(MatchWithCityDTO match) {
        Double ticketPrice = match.getTicketPrice();
        return ticketPrice != null ? ticketPrice : 150.0;
    }

    /**
     * Calculate total flight costs for the route.
     */
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

    /**
     * Get the flight price between two cities.
     */
    private double getFlightPrice(City from, City to, List<FlightPrice> flightPrices) {
        if (from.getId().equals(to.getId())) return 0;

        Optional<FlightPrice> exactPrice = flightPrices.stream()
                .filter(fp -> fp.getOriginCity().getId().equals(from.getId())
                        && fp.getDestinationCity().getId().equals(to.getId()))
                .findFirst();

        if (exactPrice.isPresent()) {
            return exactPrice.get().getPriceUsd();
        }

        // Estimate based on distance if no direct price found
        double distance = calculateDistance(
                from.getLatitude(), from.getLongitude(),
                to.getLatitude(), to.getLongitude()
        );
        return Math.round(distance * 0.10 * 100.0) / 100.0;
    }

    /**
     * Calculate distance between two coordinates using Haversine formula.
     */
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

    /**
     * Calculate total accommodation cost for the trip.
     */
    private double calculateAccommodationCost(List<MatchWithCityDTO> matches) {
        if (matches.size() < 2) {
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
            nights = Math.max(1, nights);

            double nightlyRate = currentMatch.getCity().getAccommodationPerNight();
            totalAccommodation += nights * nightlyRate;
        }

        // Add one night for the last city
        totalAccommodation += matches.get(matches.size() - 1).getCity().getAccommodationPerNight();

        return totalAccommodation;
    }
}
