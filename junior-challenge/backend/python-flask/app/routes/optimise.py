from flask import Blueprint, jsonify, request
from app.models.match import Match
from app.models.flight_price import FlightPrice
from app.strategies.nearest_neighbour_strategy import NearestNeighbourStrategy
from app.utils.cost_calculator import CostCalculator
from app.bonus.best_value_finder import BestValueFinder
# Tip: You can also import DateOnlyStrategy to compare results
# from app.strategies.date_only_strategy import DateOnlyStrategy

optimise_bp = Blueprint('optimise', __name__)

# ============================================================
#  Route Optimisation — YOUR TASK #3 and #5
#
#  Implement route optimisation and budget calculation endpoints.
# ============================================================


# ============================================================
#  POST /api/route/optimise — Optimise a travel route
# ============================================================
#
# TODO: Implement this endpoint (YOUR TASK #3)
#
# Request body: { "matchIds": ["match-1", "match-5", "match-12", ...] }
#
# Steps:
#   1. Extract matchIds from the request JSON
#   2. Fetch full match data from the database
#   3. Convert matches to dicts (using match.to_dict())
#   4. Create a strategy instance: NearestNeighbourStrategy()
#      (or DateOnlyStrategy() to test with the working example first)
#   5. Call strategy.optimise(match_dicts)
#   6. Return the optimised route as JSON
#
# TIP: Start by using DateOnlyStrategy to verify your endpoint works,
# then switch to NearestNeighbourStrategy once you've implemented it.
#
# ============================================================

@optimise_bp.route('/optimise', methods=['POST'])
def optimise():
    # TODO: Replace with your implementation (YOUR TASK #3)
    #
    # We fetch only the matches the user selected (by ID) rather than all matches.
    # This keeps the strategy focused on the user's chosen fixtures.
    # The Strategy Pattern means we could swap NearestNeighbourStrategy for any
    # other RouteStrategy (e.g. DateOnlyStrategy) without changing this endpoint.
    data = request.get_json()
    match_ids = data.get('matchIds', [])

    matches = Match.query.filter(Match.id.in_(match_ids)).all()
    match_dicts = [m.to_dict() for m in matches]

    strategy = NearestNeighbourStrategy()
    route = strategy.optimise(match_dicts)
    return jsonify(route), 200


# ============================================================
#  POST /api/route/budget — Calculate trip costs and check budget
# ============================================================
#
# TODO: Implement this endpoint (YOUR TASK #5)
#
# Request body:
# {
#   "budget": 5000.00,
#   "matchIds": ["match-1", "match-5", "match-12", ...],
#   "originCityId": "city-atlanta"
# }
#
# Steps:
#   1. Extract budget, matchIds, and originCityId from request JSON
#   2. Fetch matches by IDs from the database
#   3. Convert matches to dicts (using match.to_dict())
#   4. Fetch all flight prices from the database
#   5. Create a CostCalculator instance
#   6. Call calculator.calculate(match_dicts, budget, origin_city_id, flight_prices)
#   7. Return the BudgetResult as JSON
#
# IMPORTANT CONSTRAINTS:
#   - User MUST attend at least 1 match in each country (USA, Mexico, Canada)
#   - If the budget is insufficient, return feasible=False with:
#     - minimumBudgetRequired: the actual cost
#     - suggestions: ways to reduce cost
#   - If countries are missing, return feasible=False with:
#     - missingCountries: list of countries not covered
#
# ============================================================
@optimise_bp.route('/budget', methods=['POST'])
def budget_optimise():
    # TODO: Replace with your implementation (YOUR TASK #5)
    #
    # Flight prices are fetched in their ORM form and then converted to a plain dict
    # with 'from_city_id'/'to_city_id'/'price' keys — these are the keys that
    # CostCalculator.get_flight_price() expects internally.
    # Trade-off: loading all flight prices into memory is fine for 16 cities
    # (~240 city-pairs), but would need pagination at larger scale.
    data = request.get_json()
    budget = data.get('budget')
    match_ids = data.get('matchIds', [])
    origin_city_id = data.get('originCityId')

    matches = Match.query.filter(Match.id.in_(match_ids)).all()
    match_dicts = [m.to_dict() for m in matches]

    # Convert FlightPrice rows to the format expected by CostCalculator
    flight_prices = [
        {
            'from_city_id': fp.origin_city_id,
            'to_city_id': fp.destination_city_id,
            'price': fp.price_usd,
        }
        for fp in FlightPrice.query.all()
    ]

    calculator = CostCalculator()
    result = calculator.calculate(match_dicts, budget, origin_city_id, flight_prices)
    return jsonify(result), 200


# ============================================================
#  POST /api/route/best-value — Find best match combination within budget
# ============================================================
#
# TODO: Implement this endpoint (BONUS CHALLENGE #1)
#
# Request body:
# {
#   "budget": 5000.00,
#   "originCityId": "city-atlanta"
# }
#
# Steps:
#   1. Extract budget and originCityId from request JSON
#   2. Fetch all available matches from the database
#   3. Convert matches to dicts (using match.to_dict())
#   4. Fetch all flight prices from the database
#   5. Create a BestValueFinder instance
#   6. Call finder.find_best_value(match_dicts, budget, origin_city_id, flight_prices)
#   7. Return the BestValueResult as JSON
#
# Requirements:
#   - Find the maximum number of matches that fit within budget
#   - Must include at least 1 match in each country (USA, Mexico, Canada)
#   - Minimum 5 matches required
#   - Return optimised route with cost breakdown
#
# ============================================================
@optimise_bp.route('/best-value', methods=['POST'])
def best_value():
    # TODO: Replace with your implementation (BONUS CHALLENGE #1)
    #
    # BestValueFinder uses a greedy approach: it first picks the cheapest match
    # from each required country (USA, Mexico, Canada), then adds the cheapest
    # remaining matches until the budget is exhausted or no more matches fit.
    data = request.get_json()
    budget = data.get('budget')
    origin_city_id = data.get('originCityId')

    all_matches = Match.query.all()
    match_dicts = [m.to_dict() for m in all_matches]

    flight_prices = [
        {
            'from_city_id': fp.origin_city_id,
            'to_city_id': fp.destination_city_id,
            'price': fp.price_usd,
        }
        for fp in FlightPrice.query.all()
    ]

    finder = BestValueFinder()
    result = finder.find_best_value(match_dicts, budget, origin_city_id, flight_prices)
    return jsonify(result), 200
