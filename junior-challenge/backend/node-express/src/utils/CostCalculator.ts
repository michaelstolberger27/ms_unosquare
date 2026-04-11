import {
  MatchWithCity,
  FlightPrice,
  BudgetResult,
  CostBreakdown,
  City,
} from '../strategies/RouteStrategy';
import { buildRoute } from './buildRoute';
import { calculateDistance } from './haversine';

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
 *   3. Building the cost breakdown
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
 * - getFlightPrice(from, to, flightPrices) → price of a single flight
 * - generateSuggestions(...) → helpful suggestions when over budget
 * - buildRoute(matches, strategy) → builds the route DTO
 *
 * ============================================================
 * CONSTRAINT:
 * ============================================================
 *
 * The user must attend at least 1 match in each country (USA, Mexico, Canada).
 * If any country is missing, the trip is NOT feasible.
 *
 */

const REQUIRED_COUNTRIES = ['USA', 'Mexico', 'Canada'];

// ============================================================
//  Calculate budget result
// ============================================================
//
// TODO: Implement this function
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
//   5. Build CostBreakdown with the costs
//   6. Determine feasibility: no missing countries AND totalCost <= budget
//   7. Generate suggestions using generateSuggestions() helper
//   8. Build route using buildRoute(sortedMatches, 'budget-optimised')
//   9. Return BudgetResult with all the data
//
// ============================================================

export function calculate(
  matches: MatchWithCity[],
  budget: number,
  originCityId: string,
  flightPrices: FlightPrice[],
  originCity: City
): BudgetResult {
  // TODO: Your implementation here
  return {
    feasible: false,
    costBreakdown: { flights: 0, accommodation: 0, tickets: 0, total: 0 },
    countriesVisited: [],
    missingCountries: [...REQUIRED_COUNTRIES],
    suggestions: ['Not implemented yet'],
  };
}

// ============================================================
//  Helper Methods (provided - no changes needed)
// ============================================================

/**
 * Generate helpful suggestions when the trip is not feasible.
 */
function generateSuggestions(
  missingCountries: string[],
  totalCost: number,
  budget: number,
  matches: MatchWithCity[]
): string[] {
  const suggestions: string[] = [];

  if (missingCountries.length > 0) {
    suggestions.push(`Add matches in: ${missingCountries.join(', ')}`);
  }

  if (totalCost > budget) {
    suggestions.push(`You need $${(totalCost - budget).toFixed(2)} more to complete this trip`);

    // Find most expensive match
    const sortedByPrice = [...matches].sort(
      (a, b) => getMatchTicketPrice(b) - getMatchTicketPrice(a)
    );
    if (sortedByPrice.length > 0) {
      const mostExpensive = sortedByPrice[0];
      const price = getMatchTicketPrice(mostExpensive);
      suggestions.push(
        `Consider removing ${mostExpensive.homeTeam.name} vs ${mostExpensive.awayTeam.name} to save $${price.toFixed(2)} on tickets`
      );
    }
  }

  return suggestions;
}

function calculateTicketsCost(matches: MatchWithCity[]): number {
  return matches.reduce((sum, match) => sum + getMatchTicketPrice(match), 0);
}

function getMatchTicketPrice(match: MatchWithCity): number {
  return match.ticketPrice ?? 150.0; // Default if not set
}

function calculateFlightsCost(
  originCity: City,
  matches: MatchWithCity[],
  flightPrices: FlightPrice[]
): number {
  if (matches.length === 0) return 0;

  let totalFlightCost = 0;

  // Flight from origin to first match
  const firstMatchCity = matches[0].city;
  totalFlightCost += getFlightPrice(originCity, firstMatchCity, flightPrices);

  // Flights between consecutive matches
  for (let i = 0; i < matches.length - 1; i++) {
    const fromCity = matches[i].city;
    const toCity = matches[i + 1].city;
    if (fromCity.id !== toCity.id) {
      totalFlightCost += getFlightPrice(fromCity, toCity, flightPrices);
    }
  }

  return totalFlightCost;
}

function getFlightPrice(from: City, to: City, flightPrices: FlightPrice[]): number {
  if (from.id === to.id) return 0;

  // Look for exact price in flight prices
  const exactPrice = flightPrices.find(
    (fp) => fp.origin_city_id === from.id && fp.destination_city_id === to.id
  );

  if (exactPrice) {
    return exactPrice.price_usd;
  }

  // Estimate based on distance if not found (roughly $0.10 per km)
  const distance = calculateDistance(from.latitude, from.longitude, to.latitude, to.longitude);
  return Math.round(distance * 0.1 * 100) / 100;
}

function calculateAccommodationCost(matches: MatchWithCity[]): number {
  if (matches.length < 2) {
    // At least one night for a single match
    if (matches.length === 1) {
      return matches[0].city.accommodation_per_night;
    }
    return 0;
  }

  let totalAccommodation = 0;

  for (let i = 0; i < matches.length - 1; i++) {
    const currentMatch = matches[i];
    const nextMatch = matches[i + 1];

    const currentDate = new Date(currentMatch.kickoff);
    const nextDate = new Date(nextMatch.kickoff);
    let nights = Math.ceil(
      (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Ensure at least 1 night
    nights = Math.max(1, nights);

    const nightlyRate = currentMatch.city.accommodation_per_night;
    totalAccommodation += nights * nightlyRate;
  }

  // Add one night for the last city
  totalAccommodation += matches[matches.length - 1].city.accommodation_per_night;

  return totalAccommodation;
}
