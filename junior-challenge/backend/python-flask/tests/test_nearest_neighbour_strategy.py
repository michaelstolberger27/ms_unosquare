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

    def test_happy_path_returns_valid_route(self):
        """Should return a valid route for multiple matches (happy path)"""
        # TODO: Implement test (YOUR TASK #4)
        # Arrange: Create an array of matches across different cities and dates
        # Act: Call self.strategy.optimise(matches)
        # Assert: Verify the result has stops, totalDistance > 0, and strategy = 'nearest-neighbour'
        pytest.fail('Test not implemented')

    def test_empty_matches_returns_empty_route(self):
        """Should return an empty route for empty matches"""
        # TODO: Implement test (YOUR TASK #4)
        # Arrange: Create an empty array of matches
        # Act: Call self.strategy.optimise([])
        # Assert: Verify the result has empty stops and totalDistance = 0
        pytest.fail('Test not implemented')

    def test_single_match_returns_zero_distance(self):
        """Should return zero distance for a single match"""
        # TODO: Implement test (YOUR TASK #4)
        # Arrange: Create an array with a single match
        # Act: Call self.strategy.optimise(matches)
        # Assert: Verify totalDistance = 0 and len(stops) = 1
        pytest.fail('Test not implemented')
