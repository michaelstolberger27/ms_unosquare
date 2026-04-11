import db from '../db/connection';
import { v4 as uuidv4 } from 'uuid';
import { OptimisedRoute } from '../strategies/RouteStrategy';

interface ItineraryRow {
  id: string;
  created_at: string;
  strategy: string;
  total_distance: number;
}

interface StopRow {
  id: string;
  itinerary_id: string;
  stop_number: number;
  match_id: string;
  city_id: string;
  distance_from_previous: number;
}

export function create(route: OptimisedRoute): { id: string } {
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  const insertItinerary = db.prepare(
    'INSERT INTO itineraries (id, created_at, strategy, total_distance) VALUES (?, ?, ?, ?)'
  );
  insertItinerary.run(id, createdAt, route.strategy, route.totalDistance);

  const insertStop = db.prepare(
    'INSERT INTO itinerary_stops (id, itinerary_id, stop_number, match_id, city_id, distance_from_previous) VALUES (?, ?, ?, ?, ?, ?)'
  );

  for (const stop of route.stops) {
    insertStop.run(
      uuidv4(),
      id,
      stop.stopNumber,
      stop.match.id,
      stop.city.id,
      stop.distanceFromPrevious
    );
  }

  return { id };
}

export function getById(id: string): (ItineraryRow & { stops: StopRow[] }) | undefined {
  const itinerary = db.prepare('SELECT * FROM itineraries WHERE id = ?').get(id) as
    | ItineraryRow
    | undefined;

  if (!itinerary) return undefined;

  const stops = db
    .prepare(
      'SELECT * FROM itinerary_stops WHERE itinerary_id = ? ORDER BY stop_number'
    )
    .all(id) as StopRow[];

  return { ...itinerary, stops };
}
