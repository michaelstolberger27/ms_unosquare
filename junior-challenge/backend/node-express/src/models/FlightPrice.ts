import db from '../db/connection';
import { FlightPrice } from '../strategies/RouteStrategy';

/**
 * FlightPrice Model — Provides access to flight price data
 */

interface FlightPriceRow {
  id: string;
  origin_city_id: string;
  destination_city_id: string;
  price_usd: number;
}

export function getAll(): FlightPrice[] {
  const stmt = db.prepare('SELECT * FROM flight_prices');
  const rows = stmt.all() as FlightPriceRow[];

  return rows.map((row) => ({
    id: row.id,
    origin_city_id: row.origin_city_id,
    destination_city_id: row.destination_city_id,
    price_usd: row.price_usd,
  }));
}