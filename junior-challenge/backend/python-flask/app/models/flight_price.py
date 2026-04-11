"""
FlightPrice model — DO NOT MODIFY

Represents the cost of a flight between two cities.
Used for budget-constrained route optimisation.
"""
from app.db import db


class FlightPrice(db.Model):
    __tablename__ = 'flight_prices'

    id = db.Column(db.String(50), primary_key=True)
    origin_city_id = db.Column(db.String(50), db.ForeignKey('cities.id'), nullable=False)
    destination_city_id = db.Column(db.String(50), db.ForeignKey('cities.id'), nullable=False)
    price_usd = db.Column(db.Float, nullable=False)

    # Relationships
    origin_city = db.relationship('City', foreign_keys=[origin_city_id])
    destination_city = db.relationship('City', foreign_keys=[destination_city_id])

    def to_dict(self):
        return {
            'id': self.id,
            'originCityId': self.origin_city_id,
            'destinationCityId': self.destination_city_id,
            'priceUsd': self.price_usd,
        }
