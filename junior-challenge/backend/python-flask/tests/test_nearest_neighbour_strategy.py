import pytest
from app.strategies.nearest_neighbour_strategy import NearestNeighbourStrategy


class TestNearestNeighbourStrategy:
    """
    NearestNeighbourStrategyTest — YOUR TASK #4

    ============================================================
    WHAT YOU NEED TO IMPLEMENT:
    ============================================================

    Write unit tests for the NearestNeighbourStrategy.
    Each test has a TODO comment explaining what to test.

    """

    def setup_method(self):
        self.strategy = NearestNeighbourStrategy()

    def _make_match(self, id, kickoff, lat, lon, country='USA'):
        """
        Helper to build a minimal match dict for testing.

        We only populate the fields that NearestNeighbourStrategy actually reads
        (kickoff, city lat/lon) — keeping the rest as stubs avoids coupling the
        tests to unrelated model fields.
        """
        return {
            'id': id,
            'kickoff': kickoff,
            'city': {
                'id': f'city-{id}',
                'name': f'City {id}',
                'country': country,
                'latitude': lat,
                'longitude': lon,
                'stadium': f'Stadium {id}',
                'accommodationPerNight': 150.0,
            },
            'homeTeam': {'id': 'team-a', 'name': 'Team A', 'country': 'USA', 'flag': ''},
            'awayTeam': {'id': 'team-b', 'name': 'Team B', 'country': 'Mexico', 'flag': ''},
            'group': 'A',
            'matchDay': 1,
            'ticketPrice': 100.0,
        }

    def test_happy_path_returns_valid_route(self):
        """Should return a valid route for multiple matches (happy path)"""
        # TODO: Implement test (YOUR TASK #4)
        # Arrange: matches spread across different cities and dates
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 33.749, -84.388),   # Atlanta
            self._make_match('2', '2026-06-17T20:00:00', 40.712, -74.006),   # New York
            self._make_match('3', '2026-06-20T15:00:00', 34.052, -118.243),  # LA
        ]

        # Act
        result = self.strategy.optimise(matches)

        # Assert
        assert result['strategy'] == 'nearest-neighbour'
        assert len(result['stops']) == 3
        assert result['totalDistance'] > 0

    def test_empty_matches_returns_empty_route(self):
        """Should return an empty route for empty matches"""
        # TODO: Implement test (YOUR TASK #4)
        # Arrange
        matches = []

        # Act
        result = self.strategy.optimise(matches)

        # Assert
        assert result['stops'] == []
        assert result['totalDistance'] == 0

    def test_single_match_returns_zero_distance(self):
        """Should return zero distance for a single match"""
        # TODO: Implement test (YOUR TASK #4)
        # Arrange
        matches = [self._make_match('1', '2026-06-14T18:00:00', 33.749, -84.388)]

        # Act
        result = self.strategy.optimise(matches)

        # Assert
        assert result['totalDistance'] == 0
        assert len(result['stops']) == 1

    def test_nearest_city_picked_when_multiple_matches_on_same_day(self):
        """Should pick the nearest city when multiple matches fall on the same day"""
        # Arrange: current position is Atlanta (match-1).
        # On the next day there are two candidates:
        #   - match-2 in Miami (~1050 km from Atlanta)
        #   - match-3 in New York (~1370 km from Atlanta)
        # The strategy should pick Miami (closer).
        matches = [
            self._make_match('1', '2026-06-14T18:00:00', 33.749, -84.388),   # Atlanta
            self._make_match('2', '2026-06-17T20:00:00', 25.774, -80.190),   # Miami
            self._make_match('3', '2026-06-17T22:00:00', 40.712, -74.006),   # New York
        ]

        # Act
        result = self.strategy.optimise(matches)

        # Assert: stop 2 should be Miami (closer to Atlanta), not New York
        assert len(result['stops']) == 2
        assert result['stops'][1]['city']['id'] == 'city-2'  # Miami
