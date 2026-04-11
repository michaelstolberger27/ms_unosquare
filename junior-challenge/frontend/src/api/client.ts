import axios from 'axios';
import { City, Match, OptimisedRoute, Itinerary, BudgetResult, BestValueResult } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function getCities(): Promise<City[]> {
  const { data } = await api.get('/cities');
  return data;
}

export async function getMatches(filters?: {
  city?: string;
  date?: string;
}): Promise<Match[]> {
  const params = new URLSearchParams();
  if (filters?.city) params.append('city', filters.city);
  if (filters?.date) params.append('date', filters.date);
  const { data } = await api.get(`/matches?${params.toString()}`);
  return data;
}

export async function getMatch(id: string): Promise<Match> {
  const { data } = await api.get(`/matches/${id}`);
  return data;
}

export async function optimiseRoute(
  matchIds: string[],
  originCityId: string
): Promise<OptimisedRoute> {
  const { data } = await api.post('/route/optimise', { matchIds, originCityId });
  return data;
}

export async function saveItinerary(
  route: OptimisedRoute
): Promise<Itinerary> {
  const { data } = await api.post('/itineraries', route);
  return data;
}

export async function getItinerary(id: string): Promise<Itinerary> {
  const { data } = await api.get(`/itineraries/${id}`);
  return data;
}

export async function calculateBudget(
  budget: number,
  matchIds: string[],
  originCityId: string
): Promise<BudgetResult> {
  const { data } = await api.post('/route/budget', {
    budget,
    matchIds,
    originCityId,
  });
  return data;
}

export async function getBestValue(
  budget: number,
  originCityId: string
): Promise<BestValueResult> {
  const { data } = await api.post('/route/best-value', {
    budget,
    originCityId,
  });
  return data;
}
