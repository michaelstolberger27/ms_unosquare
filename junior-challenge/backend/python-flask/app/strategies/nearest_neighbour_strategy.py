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

        # Early exit: an empty selection produces an empty route with zero distance.
        if not matches:
            return build_route([], 'nearest-neighbour')

        # Step 1: Sort by kickoff date.
        # ISO-8601 strings sort lexicographically, so plain string comparison works.
        sorted_matches = sorted(matches, key=lambda m: m['kickoff'])

        # Step 2: Group matches by calendar date (YYYY-MM-DD).
        # Stripping the time component lets us treat all matches on the same day
        # as a single decision point — which city should we travel to that day?
        groups: dict[str, list] = {}
        for match in sorted_matches:
            date = match['kickoff'].split('T')[0]
            groups.setdefault(date, []).append(match)

        ordered_dates = sorted(groups.keys())
        ordered_matches = []

        # Step 3: The first match is our starting position.
        # When multiple matches share the earliest date we have no prior location to
        # compare distances from, so we default to the first one in sort order.
        # Trade-off: a smarter approach could try all first-day candidates as seeds
        # and pick the global shortest route, but that would be O(n²) at best.
        first_day = groups[ordered_dates[0]]
        current_match = first_day[0]
        ordered_matches.append(current_match)

        # Steps 4 & 5: Greedy nearest-neighbour selection.
        # For each day after the first, compare every candidate's city to our current
        # position using the Haversine formula and pick the closest one.
        # This is a greedy heuristic — it minimises each individual hop but does not
        # guarantee a globally optimal route.
        for date in ordered_dates[1:]:
            candidates = groups[date]
            current_city = current_match['city']

            if len(candidates) == 1:
                # No choice to make — only one match that day.
                current_match = candidates[0]
            else:
                current_match = min(
                    candidates,
                    key=lambda m: calculate_distance(
                        current_city['latitude'], current_city['longitude'],
                        m['city']['latitude'], m['city']['longitude']
                    )
                )
            ordered_matches.append(current_match)

        # build_route calculates the distance between each consecutive stop and
        # packages everything into the OptimisedRoute shape expected by the API.
        return build_route(ordered_matches, 'nearest-neighbour')
