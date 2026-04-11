/**
 * Route Strategy Interface & Types
 *
 * This file defines the Strategy Pattern interface for route optimisation.
 * All strategies must implement the `optimise` method.
 */

export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  stadium: string;
  accommodation_per_night: number;
}

/**
 * FlightPrice — DO NOT MODIFY
 *
 * Represents the cost of a flight between two cities.
 * Used for budget-constrained route optimisation.
 */
export interface FlightPrice {
  id: string;
  origin_city_id: string;
  destination_city_id: string;
  price_usd: number;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  group: string;
}

export interface MatchWithCity {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  city: City;
  kickoff: string;
  group: string;
  matchDay: number;
  ticketPrice: number;
}

export interface ItineraryStop {
  stopNumber: number;
  city: City;
  match: MatchWithCity;
  distanceFromPrevious: number;
}

export interface OptimisedRoute {
  stops: ItineraryStop[];
  totalDistance: number;
  strategy: string;
  feasible?: boolean;
  warnings?: string[];
  countriesVisited?: string[];
  missingCountries?: string[];
}

/**
 * RouteStrategy interface — the Strategy Pattern contract.
 *
 * Every route optimisation strategy must implement this interface.
 * This allows different algorithms to be swapped in without changing
 * the calling code (Open/Closed Principle).
 */
export interface RouteStrategy {
  optimise(matches: MatchWithCity[]): OptimisedRoute;
}

/**
 * BudgetRequest — Request body for budget-constrained optimisation
 */
export interface BudgetRequest {
  budget: number;
  matchIds: string[];
  originCityId: string;
}

/**
 * CostBreakdown — Breakdown of trip costs
 */
export interface CostBreakdown {
  flights: number;
  accommodation: number;
  tickets: number;
  total: number;
}

/**
 * BudgetResult — Response for budget-constrained optimisation
 */
export interface BudgetResult {
  feasible: boolean;
  route?: OptimisedRoute;
  costBreakdown: CostBreakdown;
  countriesVisited: string[];
  missingCountries: string[];
  minimumBudgetRequired?: number;
  suggestions: string[];
}

/**
 * BestValueRequest — Request body for best-value optimisation
 */
export interface BestValueRequest {
  budget: number;
  originCityId: string;
}

/**
 * BestValueResult — Response for best-value optimisation
 */
export interface BestValueResult {
  withinBudget: boolean;
  matches: MatchWithCity[];
  route?: OptimisedRoute;
  costBreakdown?: CostBreakdown;
  countriesVisited: string[];
  matchCount: number;
  message: string;
}
