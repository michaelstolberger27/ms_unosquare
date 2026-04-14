import pytest
from app.utils.cost_calculator import CostCalculator


class TestCostCalculator:
    """
    CostCalculator Tests — Nice to Have (Task #5)

    Tests cover the three cost components (tickets, flights, accommodation),
    the two feasibility constraints (budget and country coverage), and the
    suggestions/missing-countries fields returned when infeasible.
    """

    def setup_method(self):
        self.calculator = CostCalculator()

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _make_match(self, id, kickoff, city_id, country, ticket_price=100.0, accommodation=150.0):
        """Build a minimal match dict that CostCalculator reads."""
        return {
            'id': id,
            'kickoff': kickoff,
            'ticketPrice': ticket_price,
            'city': {
                'id': city_id,
                'name': city_id,
                'country': country,
                'latitude': 33.749,
                'longitude': -84.388,
                'stadium': 'Stadium',
                'accommodationPerNight': accommodation,
            },
            'homeTeam': {'id': 'team-a', 'name': 'Team A'},
            'awayTeam': {'id': 'team-b', 'name': 'Team B'},
        }

    def _make_flight(self, from_id, to_id, price):
        return {'from_city_id': from_id, 'to_city_id': to_id, 'price': price}

    # ── Tests ────────────────────────────────────────────────────────────────

    def test_ticket_costs_are_summed_correctly(self):
        """Ticket cost should be the sum of every match's ticketPrice."""
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 'city-a', 'USA', ticket_price=120.0),
            self._make_match('2', '2026-06-17T18:00:00', 'city-b', 'Mexico', ticket_price=80.0),
            self._make_match('3', '2026-06-20T18:00:00', 'city-c', 'Canada', ticket_price=200.0),
        ]
        flight_prices = [
            self._make_flight('origin', 'city-a', 300),
            self._make_flight('city-a', 'city-b', 400),
            self._make_flight('city-b', 'city-c', 500),
        ]

        result = self.calculator.calculate(matches, budget=99999, origin_city_id='origin', flight_prices=flight_prices)

        assert result['costBreakdown']['tickets'] == 400.0

    def test_feasible_when_within_budget_and_all_countries_covered(self):
        """A trip covering USA, Mexico, and Canada within budget should be feasible."""
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 'city-a', 'USA'),
            self._make_match('2', '2026-06-17T18:00:00', 'city-b', 'Mexico'),
            self._make_match('3', '2026-06-20T18:00:00', 'city-c', 'Canada'),
        ]
        flight_prices = [
            self._make_flight('origin', 'city-a', 300),
            self._make_flight('city-a', 'city-b', 400),
            self._make_flight('city-b', 'city-c', 500),
        ]

        result = self.calculator.calculate(matches, budget=99999, origin_city_id='origin', flight_prices=flight_prices)

        assert result['feasible'] is True
        assert result['missingCountries'] == []
        assert result['minimumBudgetRequired'] is None

    def test_infeasible_when_over_budget(self):
        """A trip that costs more than the budget should be infeasible with suggestions."""
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 'city-a', 'USA', ticket_price=500.0),
            self._make_match('2', '2026-06-17T18:00:00', 'city-b', 'Mexico', ticket_price=500.0),
            self._make_match('3', '2026-06-20T18:00:00', 'city-c', 'Canada', ticket_price=500.0),
        ]
        flight_prices = [
            self._make_flight('origin', 'city-a', 1000),
            self._make_flight('city-a', 'city-b', 1000),
            self._make_flight('city-b', 'city-c', 1000),
        ]

        result = self.calculator.calculate(matches, budget=100, origin_city_id='origin', flight_prices=flight_prices)

        assert result['feasible'] is False
        assert result['minimumBudgetRequired'] > 100
        assert len(result['suggestions']) > 0

    def test_infeasible_when_missing_countries(self):
        """A trip that only visits one country should be infeasible with missingCountries set."""
        # All matches in USA — Mexico and Canada are missing
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 'city-a', 'USA'),
            self._make_match('2', '2026-06-17T18:00:00', 'city-b', 'USA'),
        ]
        flight_prices = [
            self._make_flight('origin', 'city-a', 100),
            self._make_flight('city-a', 'city-b', 100),
        ]

        result = self.calculator.calculate(matches, budget=99999, origin_city_id='origin', flight_prices=flight_prices)

        assert result['feasible'] is False
        assert 'Mexico' in result['missingCountries']
        assert 'Canada' in result['missingCountries']

    def test_same_city_flights_cost_zero(self):
        """Travelling from a city to itself should add zero flight cost."""
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 'city-a', 'USA'),
            self._make_match('2', '2026-06-17T18:00:00', 'city-a', 'USA'),  # same city
        ]
        flight_prices = []  # no prices needed — same-city short-circuits to 0

        result = self.calculator.calculate(matches, budget=99999, origin_city_id='city-a', flight_prices=flight_prices)

        # origin → city-a = 0, city-a → city-a = 0
        assert result['costBreakdown']['flights'] == 0.0
