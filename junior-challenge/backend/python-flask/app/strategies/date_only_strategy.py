# NOTE: THIS CLASS DOES NOT NEED MODIFIED

from app.strategies.route_strategy import RouteStrategy, build_route


class DateOnlyStrategy(RouteStrategy):
    """
    DateOnlyStrategy — A naive route optimisation that simply sorts by date.

    This strategy produces valid routes but doesn't consider geographic distance.
    It's provided as a working example so you can test your endpoints before
    implementing NearestNeighbourStrategy.

    Try running this strategy and then your NearestNeighbourStrategy on the
    same set of matches — compare the total distances!
    """

    def optimise(self, matches: list) -> dict:
        # Simply sort matches by kickoff time — no distance optimisation
        sorted_matches = sorted(matches, key=lambda m: m['kickoff'])
        return build_route(sorted_matches, 'date-only')
