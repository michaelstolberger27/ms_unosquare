import {
  MatchWithCity,
  FlightPrice,
  BestValueResult,
  CostBreakdown,
  City,
} from '../strategies/RouteStrategy';
import { buildRoute } from '../utils/buildRoute';
import { calculateDistance } from '../utils/haversine';

/**
 * BestValueFinder — BONUS CHALLENGE #1
 *
 * Finds the best value combination of matches that:
 * 1. Includes at least 5 matches
 * 2. Covers all 3 countries (USA, Mexico, Canada)
 * 3. Fits within the budget (or gets as close as possible)
 * 4. Maximizes the number of matches for the money
 *
 * ============================================================
 * WHAT YOU NEED TO IMPLEMENT:
 * ============================================================
 *
 * The findBestValue() method — Find the best combination by:
 *   1. Return an error result if no matches are available
 *   2. Find the combination that fits the budget with the most matches
 *   3. If nothing fits the budget, return the closest option
 *
 * ============================================================
 * HELPER METHODS PROVIDED (no changes needed):
 * ============================================================
 *
 * - generateValidCombinations(matches, targetSize) - generates combinations meeting country requirements
 * - calculateTotalCost(matches, originCity, flightPrices) - calculates total cost
 * - buildResult(combination, cost, withinBudget, budget, originCity, flightPrices) - builds success response
 * - buildErrorResult(message) - builds error response
 *
 */

const REQUIRED_COUNTRIES = ['USA', 'Mexico', 'Canada'];
const MINIMUM_MATCHES = 5;

/**
 * Find the best value combination of matches.
 *
 * TODO: Implement this function to find the best combination of matches within budget.
 *
 * Requirements:
 *   - Return an error result if no matches are available
 *   - Find the combination that fits the budget with the most matches
 *   - If nothing fits the budget, return the closest option
 *
 * @param allMatches All available matches
 * @param budget The user's budget
 * @param originCityId The starting city ID
 * @param flightPrices List of flight prices between cities
 * @param originCity The starting city
 * @returns BestValueResult with the best combination found
 */
export function findBestValue(
  allMatches: MatchWithCity[],
  budget: number,
  originCityId: string,
  flightPrices: FlightPrice[],
  originCity: City
): BestValueResult {
  // TODO: Implement this function
  return buildErrorResult('Not implemented yet');
}

// ============================================================
// HELPER METHODS - You can use these in your implementation
// ============================================================

/**
 * Build an error result when no valid combination can be found.
 */
function buildErrorResult(message: string): BestValueResult {
  return {
    withinBudget: false,
    matches: [],
    route: undefined,
    costBreakdown: undefined,
    countriesVisited: [],
    matchCount: 0,
    message,
  };
}

/**
 * Build a successful result from a combination of matches.
 */
function buildResult(
  combination: MatchWithCity[],
  totalCost: number,
  withinBudget: boolean,
  budget: number,
  originCity: City,
  flightPrices: FlightPrice[]
): BestValueResult {
  const costBreakdown = buildCostBreakdown(combination, originCity, flightPrices);
  const route = buildRoute(combination, 'best-value');

  const countriesVisited = [...new Set(combination.map((m) => m.city.country))];

  const message = withinBudget
    ? `Found ${combination.length} matches within your $${budget.toFixed(2)} budget!`
    : `Closest option: ${combination.length} matches for $${totalCost.toFixed(2)} (${(totalCost - budget).toFixed(2)} over budget)`;

  return {
    withinBudget,
    matches: combination,
    route,
    costBreakdown,
    countriesVisited,
    matchCount: combination.length,
    message,
  };
}

/**
 * Generate valid combinations that meet country requirements.
 * Each combination will have at least 1 match from each required country.
 */
function generateValidCombinations(
  matches: MatchWithCity[],
  targetSize: number
): MatchWithCity[][] {
  const validCombinations: MatchWithCity[][] = [];

  // Group matches by country
  const byCountry: Record<string, MatchWithCity[]> = {};
  for (const match of matches) {
    const country = match.city.country;
    if (!byCountry[country]) {
      byCountry[country] = [];
    }
    byCountry[country].push(match);
  }

  // Ensure we have matches in all required countries
  for (const country of REQUIRED_COUNTRIES) {
    if (!byCountry[country] || byCountry[country].length === 0) {
      return validCombinations;
    }
  }

  const usaMatches = byCountry['USA'] || [];
  const mexicoMatches = byCountry['Mexico'] || [];
  const canadaMatches = byCountry['Canada'] || [];

  // Try different combinations of 1 from each country + fill rest with cheapest
  for (let u = 0; u < Math.min(usaMatches.length, 3); u++) {
    for (let m = 0; m < Math.min(mexicoMatches.length, 3); m++) {
      for (let c = 0; c < Math.min(canadaMatches.length, 3); c++) {
        const base = [usaMatches[u], mexicoMatches[m], canadaMatches[c]];

        const usedIds = new Set(base.map((match) => match.id));

        const remaining = matches
          .filter((match) => !usedIds.has(match.id))
          .sort((a, b) => getMatchTicketPrice(a) - getMatchTicketPrice(b));

        const needed = targetSize - base.length;
        if (needed <= remaining.length) {
          const combination = [...base, ...remaining.slice(0, needed)];
          combination.sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
          validCombinations.push(combination);
        }
      }
    }
  }

  return validCombinations;
}

/**
 * Calculate the total cost of a combination (tickets + flights + accommodation).
 */
function calculateTotalCost(
  matches: MatchWithCity[],
  originCity: City,
  flightPrices: FlightPrice[]
): number {
  const tickets = calculateTicketsCost(matches);
  const flights = calculateFlightsCost(originCity, matches, flightPrices);
  const accommodation = calculateAccommodationCost(matches);
  return tickets + flights + accommodation;
}

/**
 * Calculate total ticket cost for all matches.
 */
function calculateTicketsCost(matches: MatchWithCity[]): number {
  return matches.reduce((sum, match) => sum + getMatchTicketPrice(match), 0);
}

/**
 * Build the cost breakdown.
 */
function buildCostBreakdown(
  matches: MatchWithCity[],
  originCity: City,
  flightPrices: FlightPrice[]
): CostBreakdown {
  const tickets = calculateTicketsCost(matches);
  const flights = calculateFlightsCost(originCity, matches, flightPrices);
  const accommodation = calculateAccommodationCost(matches);
  return {
    flights,
    accommodation,
    tickets,
    total: tickets + flights + accommodation,
  };
}

/**
 * Get the ticket price for a match (defaults to 150 if not set).
 */
function getMatchTicketPrice(match: MatchWithCity): number {
  return match.ticketPrice ?? 150.0;
}

/**
 * Calculate total flight costs for the route.
 */
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

/**
 * Get the flight price between two cities.
 */
function getFlightPrice(from: City, to: City, flightPrices: FlightPrice[]): number {
  if (from.id === to.id) return 0;

  const exactPrice = flightPrices.find(
    (fp) => fp.origin_city_id === from.id && fp.destination_city_id === to.id
  );

  if (exactPrice) {
    return exactPrice.price_usd;
  }

  // Estimate based on distance if no direct price found
  const distance = calculateDistance(from.latitude, from.longitude, to.latitude, to.longitude);
  return Math.round(distance * 0.1 * 100) / 100;
}

/**
 * Calculate total accommodation cost for the trip.
 */
function calculateAccommodationCost(matches: MatchWithCity[]): number {
  if (matches.length < 2) {
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
    nights = Math.max(1, nights);

    const nightlyRate = currentMatch.city.accommodation_per_night;
    totalAccommodation += nights * nightlyRate;
  }

  // Add one night for the last city
  totalAccommodation += matches[matches.length - 1].city.accommodation_per_night;

  return totalAccommodation;
}
