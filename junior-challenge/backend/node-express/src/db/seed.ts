import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../../worldcup.db');
const SEED_PATH = path.resolve(__dirname, '../../../../seed-data/matches.json');

console.log('🌱 Seeding database...');
console.log(`   Database: ${DB_PATH}`);
console.log(`   Seed data: ${SEED_PATH}`);

// Read seed data
const rawData = fs.readFileSync(SEED_PATH, 'utf-8');
const seedData = JSON.parse(rawData);

// Create/open database
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Read and execute schema
const schemaPath = path.resolve(__dirname, './schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Drop existing tables
db.exec('DROP TABLE IF EXISTS flight_prices');
db.exec('DROP TABLE IF EXISTS itinerary_stops');
db.exec('DROP TABLE IF EXISTS itineraries');
db.exec('DROP TABLE IF EXISTS matches');
db.exec('DROP TABLE IF EXISTS teams');
db.exec('DROP TABLE IF EXISTS cities');

// Create tables
db.exec(schema);

// Insert cities
const insertCity = db.prepare(
  'INSERT INTO cities (id, name, country, latitude, longitude, stadium, accommodation_per_night) VALUES (?, ?, ?, ?, ?, ?, ?)'
);
for (const city of seedData.cities) {
  insertCity.run(city.id, city.name, city.country, city.latitude, city.longitude, city.stadium, city.accommodationPerNight || 150);
}
console.log(`   ✅ Inserted ${seedData.cities.length} cities`);

// Insert teams
const insertTeam = db.prepare(
  'INSERT INTO teams (id, name, code, group_name) VALUES (?, ?, ?, ?)'
);
for (const team of seedData.teams) {
  insertTeam.run(team.id, team.name, team.code, team.group);
}
console.log(`   ✅ Inserted ${seedData.teams.length} teams`);

// Insert matches
const insertMatch = db.prepare(
  'INSERT INTO matches (id, home_team_id, away_team_id, city_id, kickoff, group_name, match_day, ticket_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);
for (const match of seedData.matches) {
  insertMatch.run(
    match.id,
    match.homeTeamId,
    match.awayTeamId,
    match.cityId,
    match.kickoff,
    match.group,
    match.matchDay,
    match.ticketPrice || 100
  );
}
console.log(`   ✅ Inserted ${seedData.matches.length} matches`);

// Insert flight prices
if (seedData.flightPrices) {
  const insertFlight = db.prepare(
    'INSERT INTO flight_prices (id, origin_city_id, destination_city_id, price_usd) VALUES (?, ?, ?, ?)'
  );
  for (const flight of seedData.flightPrices) {
    insertFlight.run(flight.id, flight.originCityId, flight.destinationCityId, flight.priceUsd);
  }
  console.log(`   ✅ Inserted ${seedData.flightPrices.length} flight prices`);
}

db.close();
console.log('🎉 Database seeded successfully!');
