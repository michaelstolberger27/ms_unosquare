from app.db import db


class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    stadium = db.Column(db.String(100), nullable=False)
    accommodation_per_night = db.Column(db.Float, nullable=False, default=150.0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'stadium': self.stadium,
            'accommodationPerNight': self.accommodation_per_night,
        }
