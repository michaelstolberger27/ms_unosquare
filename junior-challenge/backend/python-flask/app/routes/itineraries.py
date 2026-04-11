from flask import Blueprint, jsonify, request
from app.db import db
from app.models.itinerary import Itinerary, ItineraryStop

itineraries_bp = Blueprint('itineraries', __name__)

# ============================================================
#  Itinerary Routes — Pre-built (no implementation needed)
#
#  These endpoints handle saving and retrieving trip itineraries.
# ============================================================


# POST /api/itineraries — Save an optimised route
@itineraries_bp.route('', methods=['POST'])
def create():
    data = request.get_json()

    itinerary = Itinerary(
        strategy=data['strategy'],
        total_distance=data['totalDistance'],
    )
    db.session.add(itinerary)
    db.session.flush()  # Get the ID before committing

    for stop in data['stops']:
        itinerary_stop = ItineraryStop(
            itinerary_id=itinerary.id,
            stop_number=stop['stopNumber'],
            match_id=stop['match']['id'],
            city_id=stop['city']['id'],
            distance_from_previous=stop.get('distanceFromPrevious', 0),
        )
        db.session.add(itinerary_stop)

    db.session.commit()
    return jsonify({'id': itinerary.id}), 201


# GET /api/itineraries/<id> — Retrieve a saved itinerary
@itineraries_bp.route('/<id>', methods=['GET'])
def get_by_id(id):
    itinerary = Itinerary.query.get(id)

    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    return jsonify(itinerary.to_dict()), 200
