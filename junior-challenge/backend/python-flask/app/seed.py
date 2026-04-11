"""
Database seeding script.

Usage: python -m app.seed
"""

import json
import os
import sys

# Add parent directory to path so we can import app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.db import db
from app.models.city import City
from app.models.team import Team
from app.models.match import Match
from app.models.flight_price import FlightPrice

SEED_PATH = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'seed-data', 'matches.json')


def seed():
    app = create_app()

    with app.app_context():
        print('🌱 Seeding database...')
        print(f'   Seed data: {os.path.abspath(SEED_PATH)}')

        # Read seed data
        with open(SEED_PATH, 'r') as f:
            data = json.load(f)

        # Drop and recreate all tables
        db.drop_all()
        db.create_all()

        # Insert cities
        for city_data in data['cities']:
            city = City(
                id=city_data['id'],
                name=city_data['name'],
                country=city_data['country'],
                latitude=city_data['latitude'],
                longitude=city_data['longitude'],
                stadium=city_data['stadium'],
                accommodation_per_night=city_data.get('accommodationPerNight', 150.0),
            )
            db.session.add(city)
        print(f'   ✅ Inserted {len(data["cities"])} cities')

        # Insert teams
        for team_data in data['teams']:
            team = Team(
                id=team_data['id'],
                name=team_data['name'],
                code=team_data['code'],
                group_name=team_data['group'],
            )
            db.session.add(team)
        print(f'   ✅ Inserted {len(data["teams"])} teams')

        # Insert matches
        for match_data in data['matches']:
            match = Match(
                id=match_data['id'],
                home_team_id=match_data['homeTeamId'],
                away_team_id=match_data['awayTeamId'],
                city_id=match_data['cityId'],
                kickoff=match_data['kickoff'],
                group_name=match_data['group'],
                match_day=match_data['matchDay'],
                ticket_price=match_data.get('ticketPrice', 100.0),
            )
            db.session.add(match)
        print(f'   ✅ Inserted {len(data["matches"])} matches')

        # Insert flight prices
        if 'flightPrices' in data:
            for flight_data in data['flightPrices']:
                flight = FlightPrice(
                    id=flight_data['id'],
                    origin_city_id=flight_data['originCityId'],
                    destination_city_id=flight_data['destinationCityId'],
                    price_usd=flight_data['priceUsd'],
                )
                db.session.add(flight)
            print(f'   ✅ Inserted {len(data["flightPrices"])} flight prices')

        db.session.commit()
        print('🎉 Database seeded successfully!')


if __name__ == '__main__':
    seed()
