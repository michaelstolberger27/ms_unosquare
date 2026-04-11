export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  stadium: string;
  accommodationPerNight: number;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  group: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  city: City;
  kickoff: string;
  group: string;
  matchDay: number;
  ticketPrice: number;
}

export interface MatchWithCity extends Match {
  city: City;
}

export interface ItineraryStop {
  stopNumber: number;
  city: City;
  match: Match;
  distanceFromPrevious: number;
}

export interface OptimisedRoute {
  stops: ItineraryStop[];
  totalDistance: number;
  strategy: string;
  feasible: boolean;
  warnings: string[];
  countriesVisited: string[];
  missingCountries: string[];
}

export interface Itinerary {
  id: string;
  createdAt: string;
  strategy: string;
  totalDistance: number;
  stops: ItineraryStop[];
}

export interface BudgetRequest {
  budget: number;
  matchIds: string[];
  originCityId: string;
}

export interface CostBreakdown {
  flights: number;
  accommodation: number;
  tickets: number;
  total: number;
}

export interface BudgetResult {
  feasible: boolean;
  route: OptimisedRoute | null;
  costBreakdown: CostBreakdown;
  countriesVisited: string[];
  missingCountries: string[];
  minimumBudgetRequired: number | null;
  suggestions: string[];
}

export interface BestValueResult {
  withinBudget: boolean;
  matches: Match[];
  route: OptimisedRoute | null;
  costBreakdown: CostBreakdown;
  countriesVisited: string[];
  matchCount: number;
  message: string;
}
