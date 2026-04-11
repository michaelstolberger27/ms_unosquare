from app.db import db


class Match(db.Model):
    __tablename__ = 'matches'

    id = db.Column(db.String(50), primary_key=True)
    home_team_id = db.Column(db.String(50), db.ForeignKey('teams.id'), nullable=False)
    away_team_id = db.Column(db.String(50), db.ForeignKey('teams.id'), nullable=False)
    city_id = db.Column(db.String(50), db.ForeignKey('cities.id'), nullable=False)
    kickoff = db.Column(db.String(30), nullable=False)
    group_name = db.Column(db.String(5), nullable=False)
    match_day = db.Column(db.Integer, nullable=False)
    ticket_price = db.Column(db.Float, nullable=False, default=100.0)

    # Relationships
    home_team = db.relationship('Team', foreign_keys=[home_team_id])
    away_team = db.relationship('Team', foreign_keys=[away_team_id])
    city = db.relationship('City', foreign_keys=[city_id])

    def to_dict(self):
        return {
            'id': self.id,
            'homeTeam': self.home_team.to_dict(),
            'awayTeam': self.away_team.to_dict(),
            'city': self.city.to_dict(),
            'kickoff': self.kickoff,
            'group': self.group_name,
            'matchDay': self.match_day,
            'ticketPrice': self.ticket_price,
        }
