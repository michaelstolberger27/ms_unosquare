from datetime import datetime
from typing import Optional
from app.strategies.route_strategy import BudgetResult, CostBreakdown


class CostCalculator:
    """
    CostCalculator — YOUR TASK #5

    ============================================================
    WHAT YOU NEED TO IMPLEMENT:
    ============================================================

    The calculate method should:
    1. Calculate ticket costs (sum of ticketPrice for all matches)
    2. Calculate flight costs (between consecutive cities + from origin)
    3. Calculate accommodation costs (nights × city's accommodationPerNight rate)
    4. Check feasibility (total ≤ budget AND visits USA, Mexico, Canada)
    5. Return suggestions if not feasible

    ============================================================
    HELPER METHODS PROVIDED:
    ============================================================

    The helper methods below are already implemented for you:
    - get_flight_price(): Look up flight price between two cities
    - calculate_nights_between(): Calculate nights between two dates
    - get_countries_visited(): Get list of unique countries from matches
    - get_missing_countries(): Check which required countries are missing
    - generate_suggestions(): Create cost-saving suggestions

    """

    REQUIRED_COUNTRIES = ['USA', 'Mexico', 'Canada']

    def calculate(
        self,
        matches: list,
        budget: float,
        origin_city_id: str,
        flight_prices: list
    ) -> BudgetResult:
        """
        Calculate the total cost of a trip and check if it's within budget.

        Args:
            matches: List of match dicts the user wants to attend (sorted by date)
            budget: The user's maximum budget in USD
            origin_city_id: The city where the user starts their trip
            flight_prices: All available flight prices between cities

        Returns:
            BudgetResult dict containing feasibility, costs, and suggestions
        """
        # TODO: Implement cost calculation (YOUR TASK #5)
        #
        # Pseudocode:
        # 1. Calculate ticket costs:
        #    - Sum of match['ticketPrice'] for all matches
        #
        # 2. Calculate flight costs:
        #    - From origin_city_id to first match's city
        #    - Between each consecutive match city (if different)
        #    - Use get_flight_price() helper to look up prices
        #
        # 3. Calculate accommodation costs:
        #    - For each city visited, calculate nights stayed
        #    - Use calculate_nights_between() for dates
        #    - Multiply nights by city's accommodationPerNight
        #
        # 4. Build CostBreakdown with all costs and total
        #
        # 5. Check country constraint:
        #    - Use get_countries_visited() and get_missing_countries()
        #    - If missing countries, set feasible = False
        #
        # 6. Check budget constraint:
        #    - If total > budget, set feasible = False
        #    - Set minimumBudgetRequired = total
        #
        # 7. Generate suggestions if not feasible:
        #    - Use generate_suggestions() helper
        #
        # 8. Return BudgetResult with all results

        # Sort matches chronologically — flight and accommodation costs depend on
        # the travel sequence (origin → match 1 → match 2 → …).
        sorted_matches = sorted(matches, key=lambda m: m['kickoff'])

        # 1. Ticket costs — straightforward sum of each match's face value.
        ticket_cost = sum(m['ticketPrice'] for m in sorted_matches)

        # 2. Flight costs: one leg from the origin city to the first match, then one
        # leg between each consecutive pair of match cities.
        # get_flight_price() handles same-city hops (returns 0) and falls back to an
        # estimated average + 20% markup when no direct price exists in the data.
        flight_cost = 0.0
        if sorted_matches:
            flight_cost += self.get_flight_price(
                origin_city_id, sorted_matches[0]['city']['id'], flight_prices
            )
            for i in range(1, len(sorted_matches)):
                flight_cost += self.get_flight_price(
                    sorted_matches[i - 1]['city']['id'],
                    sorted_matches[i]['city']['id'],
                    flight_prices
                )

        # 3. Accommodation costs: for each match, count the nights until the next one
        # (i.e. how long the fan stays in that city before travelling on).
        # The final match always gets at least 1 night since the fan needs somewhere
        # to stay after the game. max(1, nights) also guards against same-day matches
        # that would otherwise produce 0 nights.
        accommodation_cost = 0.0
        for i, match in enumerate(sorted_matches):
            if i < len(sorted_matches) - 1:
                nights = self.calculate_nights_between(
                    match['kickoff'], sorted_matches[i + 1]['kickoff']
                )
            else:
                nights = 1  # at least one night for the final match
            nights = max(1, nights)
            accommodation_cost += nights * match['city']['accommodationPerNight']

        # 4. Round to 2 decimal places to avoid floating-point noise in the response.
        total = ticket_cost + flight_cost + accommodation_cost
        cost_breakdown = CostBreakdown(
            flights=round(flight_cost, 2),
            accommodation=round(accommodation_cost, 2),
            tickets=round(ticket_cost, 2),
            total=round(total, 2),
        )

        # 5 & 6. A trip is only feasible when BOTH constraints are satisfied:
        # the total cost fits within budget AND all three countries are covered.
        # Separating these checks allows the response to tell the user exactly
        # which constraint(s) failed.
        countries_visited = self.get_countries_visited(sorted_matches)
        missing_countries = self.get_missing_countries(countries_visited)
        feasible = (total <= budget) and (len(missing_countries) == 0)

        # 7. Only generate suggestions when the trip isn't feasible — no point
        # showing cost-saving tips to someone who is already within budget.
        suggestions = []
        if not feasible:
            suggestions = self.generate_suggestions(sorted_matches, total, budget)
            if missing_countries:
                suggestions.append(
                    f"Your route is missing matches in: {', '.join(missing_countries)}. "
                    "Add at least one match per required country."
                )

        # 8. minimumBudgetRequired is only set when infeasible — it tells the user
        # the actual cost so they know how much to increase their budget by.
        return BudgetResult(
            feasible=feasible,
            route=None,
            costBreakdown=cost_breakdown,
            countriesVisited=countries_visited,
            missingCountries=missing_countries,
            minimumBudgetRequired=round(total, 2) if not feasible else None,
            suggestions=suggestions,
        )

    # ============================================================
    # HELPER METHODS (Already implemented for you)
    # ============================================================

    def get_flight_price(
        self,
        from_city_id: str,
        to_city_id: str,
        flight_prices: list
    ) -> float:
        """
        Look up the flight price between two cities.
        Returns an estimated price if no direct flight exists.
        """
        if from_city_id == to_city_id:
            return 0

        for fp in flight_prices:
            if fp['from_city_id'] == from_city_id and fp['to_city_id'] == to_city_id:
                return fp['price']

        # If no direct flight, estimate based on average
        if flight_prices:
            avg_price = sum(fp['price'] for fp in flight_prices) / len(flight_prices)
            return avg_price * 1.2  # 20% markup for indirect routes
        return 300 * 1.2

    def calculate_nights_between(self, date1: str, date2: str) -> int:
        """Calculate the number of nights between two dates."""
        d1 = datetime.fromisoformat(date1.split('T')[0])
        d2 = datetime.fromisoformat(date2.split('T')[0])
        return max(0, (d2 - d1).days)

    def get_countries_visited(self, matches: list) -> list:
        """Get list of unique countries visited from matches."""
        countries = set()
        for match in matches:
            countries.add(match['city']['country'])
        return list(countries)

    def get_missing_countries(self, countries_visited: list) -> list:
        """Check which required countries (USA, Mexico, Canada) are missing."""
        return [c for c in self.REQUIRED_COUNTRIES if c not in countries_visited]

    def generate_suggestions(
        self,
        matches: list,
        total: float,
        budget: float
    ) -> list:
        """Generate cost-saving suggestions when budget is exceeded."""
        suggestions = []
        overage = total - budget

        if len(matches) > 5:
            most_expensive = max(matches, key=lambda m: m['ticketPrice'])
            suggestions.append(
                f"Consider removing the {most_expensive['homeTeam']['name']} vs "
                f"{most_expensive['awayTeam']['name']} match to save ${most_expensive['ticketPrice']}"
            )

        suggestions.append(
            f"You are ${overage:.0f} over budget. Consider reducing the number of matches."
        )

        return suggestions
