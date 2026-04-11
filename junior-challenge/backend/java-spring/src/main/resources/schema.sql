CREATE TABLE IF NOT EXISTS cities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    stadium VARCHAR(100) NOT NULL,
    accommodation_per_night DECIMAL(10,2) NOT NULL DEFAULT 150.00
);

CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL,
    group_name VARCHAR(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(50) PRIMARY KEY,
    home_team_id VARCHAR(50) NOT NULL,
    away_team_id VARCHAR(50) NOT NULL,
    city_id VARCHAR(50) NOT NULL,
    kickoff TIMESTAMP NOT NULL,
    group_name VARCHAR(5) NOT NULL,
    match_day INT NOT NULL,
    ticket_price DECIMAL(10,2) NOT NULL DEFAULT 100.00,
    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE IF NOT EXISTS itineraries (
    id VARCHAR(50) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    strategy VARCHAR(50) NOT NULL,
    total_distance DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS itinerary_stops (
    id VARCHAR(50) PRIMARY KEY,
    itinerary_id VARCHAR(50) NOT NULL,
    stop_number INT NOT NULL,
    match_id VARCHAR(50) NOT NULL,
    city_id VARCHAR(50) NOT NULL,
    distance_from_previous DOUBLE NOT NULL DEFAULT 0,
    FOREIGN KEY (itinerary_id) REFERENCES itineraries(id),
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE IF NOT EXISTS flight_prices (
    id VARCHAR(50) PRIMARY KEY,
    origin_city_id VARCHAR(50) NOT NULL,
    destination_city_id VARCHAR(50) NOT NULL,
    price_usd DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (origin_city_id) REFERENCES cities(id),
    FOREIGN KEY (destination_city_id) REFERENCES cities(id)
);
