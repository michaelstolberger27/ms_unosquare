import db from '../db/connection';
import { City } from '../strategies/RouteStrategy';

export function getAll(): City[] {
  const stmt = db.prepare('SELECT * FROM cities ORDER BY name');
  return stmt.all() as City[];
}

export function getById(id: string): City | undefined {
  const stmt = db.prepare('SELECT * FROM cities WHERE id = ?');
  return stmt.get(id) as City | undefined;
}
