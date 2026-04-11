import db from '../db/connection';
import { MatchWithCity } from '../strategies/RouteStrategy';

interface MatchRow {
  id: string;
  home_team_id: string;
  away_team_id: string;
  city_id: string;
  kickoff: string;
  group_name: string;
  match_day: number;
  ticket_price: number;
  home_team_name: string;
  home_team_code: string;
  home_team_group: string;
  away_team_name: string;
  away_team_code: string;
  away_team_group: string;
  city_name: string;
  city_country: string;
  city_latitude: number;
  city_longitude: number;
  city_stadium: string;
  city_accommodation_per_night: number;
}

const BASE_QUERY = `
  SELECT
    m.id, m.kickoff, m.group_name, m.match_day, m.ticket_price,
    m.home_team_id, m.away_team_id, m.city_id,
    ht.name as home_team_name, ht.code as home_team_code, ht.group_name as home_team_group,
    at2.name as away_team_name, at2.code as away_team_code, at2.group_name as away_team_group,
    c.name as city_name, c.country as city_country,
    c.latitude as city_latitude, c.longitude as city_longitude, c.stadium as city_stadium,
    c.accommodation_per_night as city_accommodation_per_night
  FROM matches m
  JOIN teams ht ON m.home_team_id = ht.id
  JOIN teams at2 ON m.away_team_id = at2.id
  JOIN cities c ON m.city_id = c.id
`;

function rowToMatch(row: MatchRow): MatchWithCity {
  return {
    id: row.id,
    homeTeam: {
      id: row.home_team_id,
      name: row.home_team_name,
      code: row.home_team_code,
      group: row.home_team_group,
    },
    awayTeam: {
      id: row.away_team_id,
      name: row.away_team_name,
      code: row.away_team_code,
      group: row.away_team_group,
    },
    city: {
      id: row.city_id,
      name: row.city_name,
      country: row.city_country,
      latitude: row.city_latitude,
      longitude: row.city_longitude,
      stadium: row.city_stadium,
      accommodation_per_night: row.city_accommodation_per_night,
    },
    kickoff: row.kickoff,
    group: row.group_name,
    matchDay: row.match_day,
    ticketPrice: row.ticket_price,
  };
}

export function getAll(filters?: { city?: string; date?: string }): MatchWithCity[] {
  let query = BASE_QUERY;
  const params: string[] = [];

  const conditions: string[] = [];
  if (filters?.city) {
    conditions.push('m.city_id = ?');
    params.push(filters.city);
  }
  if (filters?.date) {
    conditions.push('m.kickoff LIKE ?');
    params.push(`${filters.date}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY m.kickoff';

  const stmt = db.prepare(query);
  const rows = stmt.all(...params) as MatchRow[];
  return rows.map(rowToMatch);
}

export function getById(id: string): MatchWithCity | undefined {
  const query = BASE_QUERY + ' WHERE m.id = ?';
  const stmt = db.prepare(query);
  const row = stmt.get(id) as MatchRow | undefined;
  return row ? rowToMatch(row) : undefined;
}

export function getByIds(ids: string[]): MatchWithCity[] {
  if (ids.length === 0) return [];
  const placeholders = ids.map(() => '?').join(', ');
  const query = BASE_QUERY + ` WHERE m.id IN (${placeholders}) ORDER BY m.kickoff`;
  const stmt = db.prepare(query);
  const rows = stmt.all(...ids) as MatchRow[];
  return rows.map(rowToMatch);
}
