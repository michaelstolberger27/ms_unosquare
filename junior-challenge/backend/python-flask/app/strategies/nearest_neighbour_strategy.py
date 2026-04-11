from app.strategies.route_strategy import RouteStrategy, build_route
from app.utils.haversine import calculate_distance


class NearestNeighbourStrategy(RouteStrategy):
    """
    NearestNeighbourStrategy — YOUR TASK #3

    Implement a smarter route optimisation using the nearest-neighbour heuristic.
    The idea: when you have multiple matches on the same day (or close dates),
    choose the one that's geographically closest to where you currently are.

    This should produce shorter total distances than DateOnlyStrategy.
    """

    def optimise(self, matches: list) -> dict:
        # TODO: Implement nearest-neighbour optimisation (YOUR TASK #3)
        #
        # Pseudocode:
        # 1. Sort all matches by kickoff date
        # 2. Group matches that fall on the same day
        #    Hint: match['kickoff'].split('T')[0] gives the date string
        # 3. Start with the first match chronologically — this is your starting city
        # 4. For each subsequent day group:
        #    a. If only one match that day → add it to the route
        #    b. If multiple matches that day → pick the one whose city is closest
        #       to your current position (use calculate_distance)
        # 5. Track your "current city" as you go — update it after each match
        # 6. Return build_route(ordered_matches, 'nearest-neighbour')
        #
        # Helper you'll need:
        #   calculate_distance(lat1, lon1, lat2, lon2) → returns distance in km
        #
        # Example:
        #   dist = calculate_distance(
        #       current_city['latitude'], current_city['longitude'],
        #       candidate['city']['latitude'], candidate['city']['longitude']
        #   )
        #
        # Tips:
        # - You can use itertools.groupby or a dict to group by date
        # - Don't forget to handle the case where there's only one match on a day
        # - The first match in chronological order should always be your starting point

        raise NotImplementedError("Not implemented — this is your task!")
