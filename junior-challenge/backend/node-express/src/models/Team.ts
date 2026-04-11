import db from '../db/connection';
import { Team } from '../strategies/RouteStrategy';

export function getAll(): Team[] {
  const stmt = db.prepare('SELECT id, name, code, group_name as "group" FROM teams ORDER BY name');
  return stmt.all() as Team[];
}

export function getById(id: string): Team | undefined {
  const stmt = db.prepare('SELECT id, name, code, group_name as "group" FROM teams WHERE id = ?');
  return stmt.get(id) as Team | undefined;
}
