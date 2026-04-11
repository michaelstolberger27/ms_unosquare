CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  stadium TEXT NOT NULL,
  accommodation_per_night REAL NOT NULL DEFAULT 150.00
);

CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  group_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  home_team_id TEXT NOT NULL REFERENCES teams(id),
  away_team_id TEXT NOT NULL REFERENCES teams(id),
  city_id TEXT NOT NULL REFERENCES cities(id),
  kickoff TEXT NOT NULL,
  group_name TEXT NOT NULL,
  match_day INTEGER NOT NULL,
  ticket_price REAL NOT NULL DEFAULT 100.0
);

CREATE TABLE IF NOT EXISTS itineraries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  strategy TEXT NOT NULL,
  total_distance REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS itinerary_stops (
  id TEXT PRIMARY KEY,
  itinerary_id TEXT NOT NULL REFERENCES itineraries(id),
  stop_number INTEGER NOT NULL,
  match_id TEXT NOT NULL REFERENCES matches(id),
  city_id TEXT NOT NULL REFERENCES cities(id),
  distance_from_previous REAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS flight_prices (
  id TEXT PRIMARY KEY,
  origin_city_id TEXT NOT NULL REFERENCES cities(id),
  destination_city_id TEXT NOT NULL REFERENCES cities(id),
  price_usd REAL NOT NULL
);
