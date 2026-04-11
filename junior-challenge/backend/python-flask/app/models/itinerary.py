import uuid
from datetime import datetime
from app.db import db


class Itinerary(db.Model):
    __tablename__ = 'itineraries'

    id = db.Column(db.String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.String(30), nullable=False, default=lambda: datetime.utcnow().isoformat() + 'Z')
    strategy = db.Column(db.String(50), nullable=False)
    total_distance = db.Column(db.Float, nullable=False)

    stops = db.relationship('ItineraryStop', backref='itinerary', order_by='ItineraryStop.stop_number')

    def to_dict(self):
        return {
            'id': self.id,
            'createdAt': self.created_at,
            'strategy': self.strategy,
            'totalDistance': self.total_distance,
            'stops': [stop.to_dict() for stop in self.stops],
        }


class ItineraryStop(db.Model):
    __tablename__ = 'itinerary_stops'

    id = db.Column(db.String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    itinerary_id = db.Column(db.String(50), db.ForeignKey('itineraries.id'), nullable=False)
    stop_number = db.Column(db.Integer, nullable=False)
    match_id = db.Column(db.String(50), db.ForeignKey('matches.id'), nullable=False)
    city_id = db.Column(db.String(50), db.ForeignKey('cities.id'), nullable=False)
    distance_from_previous = db.Column(db.Float, nullable=False, default=0)

    match = db.relationship('Match', foreign_keys=[match_id])
    city = db.relationship('City', foreign_keys=[city_id])

    def to_dict(self):
        return {
            'stopNumber': self.stop_number,
            'match': self.match.to_dict() if self.match else None,
            'city': self.city.to_dict() if self.city else None,
            'distanceFromPrevious': self.distance_from_previous,
        }
