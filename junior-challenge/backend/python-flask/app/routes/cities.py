from flask import Blueprint, jsonify
from app.models.city import City

cities_bp = Blueprint('cities', __name__)

# ============================================================
#  City Routes — YOUR TASK #1
#
#  Implement the REST endpoint for cities.
# ============================================================


# ============================================================
#  GET /api/cities — Return all host cities
# ============================================================
#
# TODO: Implement this endpoint (YOUR TASK #1)
#
# This should return all 16 host cities as a JSON array.
#
# Hint: Use City.query.all() to get all cities from the database,
# then convert each to a dict using city.to_dict()
#
# Expected response: [{ id, name, country, latitude, longitude, stadium }, ...]
#
# ============================================================

@cities_bp.route('')
def get_all():
    # TODO: Replace with your implementation (YOUR TASK #1)
    #
    # City.query.all() fetches every row from the cities table via SQLAlchemy.
    # to_dict() maps each ORM object to a plain dict so Flask's jsonify can
    # serialise it — ORM objects themselves are not JSON-serialisable.
    cities = City.query.all()
    return jsonify([city.to_dict() for city in cities])