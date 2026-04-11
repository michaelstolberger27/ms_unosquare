from app.db import db


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(10), nullable=False)
    group_name = db.Column(db.String(5), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'group': self.group_name,
        }
