from abc import ABC, abstractmethod
from typing import TypedDict, Optional
from app.utils.haversine import calculate_distance


class CostBreakdown(TypedDict):
    """Breakdown of trip costs."""
    flights: float
    accommodation: float
    tickets: float
    total: float


class BudgetRequest(TypedDict):
    """Request body for budget-constrained optimisation."""
    budget: float
    matchIds: list[str]
    originCityId: str


class BudgetResult(TypedDict):
    """Response for budget-constrained optimisation."""
    feasible: bool
    route: Optional[dict]
    costBreakdown: CostBreakdown
    countriesVisited: list[str]
    missingCountries: list[str]
    minimumBudgetRequired: Optional[float]
    suggestions: list[str]


class RouteStrategy(ABC):
    """
    RouteStrategy — the Strategy Pattern contract.

    Every route optimisation strategy must implement this interface.
    This allows different algorithms to be swapped in without changing
    the calling code (Open/Closed Principle).
    """

    @abstractmethod
    def optimise(self, matches: list) -> dict:
        """
        Optimise the order of matches to minimise travel distance.

        Args:
            matches: List of match dicts, each containing full city data
                     (with latitude/longitude for distance calculations)

        Returns:
            An OptimisedRoute dict with keys: stops, totalDistance, strategy
        """
        pass


def build_route(ordered_matches: list, strategy_name: str) -> dict:
    """
    Build an OptimisedRoute from an ordered list of matches.

    This helper takes matches that have already been ordered by a strategy
    and calculates the distances between consecutive stops.

    Args:
        ordered_matches: List of match dicts in visit order
        strategy_name: Name of the strategy that produced this ordering

    Returns:
        dict with stops, totalDistance, and strategy
    """
    total_distance = 0
    stops = []

    for i, match in enumerate(ordered_matches):
        distance_from_previous = 0

        if i > 0:
            prev_city = ordered_matches[i - 1]['city']
            curr_city = match['city']
            distance_from_previous = calculate_distance(
                prev_city['latitude'], prev_city['longitude'],
                curr_city['latitude'], curr_city['longitude']
            )
            total_distance += distance_from_previous

        stops.append({
            'stopNumber': i + 1,
            'city': match['city'],
            'match': match,
            'distanceFromPrevious': distance_from_previous,
        })

    return {
        'stops': stops,
        'totalDistance': total_distance,
        'strategy': strategy_name,
    }
