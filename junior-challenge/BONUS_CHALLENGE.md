# Bonus Challenge (Optional)

Completed the main tasks? Want an extra challenge? This is for you.

Look for `BONUS CHALLENGE #N` comments in the code.

---

## BONUS #1 — Best Value Finder (Backend)

| Endpoint | What to Implement |
|----------|-------------------|
| `POST /api/route/best-value` | Find the best combination of matches within budget |

See the **Bonus Challenge (Optional)** section in your chosen backend README for specific file names:
- [Java Spring](./backend/java-spring/README.md)
- [Node/Express](./backend/node-express/README.md)
- [Python/Flask](./backend/python-flask/README.md)
- [.NET/C#](./backend/dotnet-webapi/README.md)

**Requirements:**
- Find the maximum number of matches that fit within budget
- Must include at least 1 match in each country (USA, Mexico, Canada)
- Minimum 5 matches required
- Return optimised route with cost breakdown

**Hints:**
- This is a combinatorial optimisation problem
- Consider a greedy approach: start with cheapest matches that cover all 3 countries
- Then add more matches while staying within budget
- Use your CostCalculator to verify the total cost

**Example approach:**
1. Pick the cheapest match from each required country (USA, Mexico, Canada)
2. Sort remaining matches by ticket price (cheapest first)
3. Add matches one-by-one while total cost ≤ budget
4. Stop when you can't add more without exceeding budget
5. Return the optimised route with cost breakdown

---

## BONUS #2 — Best Value Dialog (Frontend)

| File | What to Implement |
|------|-------------------|
| `frontend/src/components/BestValueDialog.tsx` | Render the recommended matches list |

**Requirements:**
- Display each match returned from the Best Value API
- Show team names, city, kickoff date/time, and ticket price
- Use the provided CSS classes for consistent styling

**Hints:**
- Use `matches.map()` to iterate over the matches array
- Format the kickoff date using `new Date(match.kickoff)`
- The `match` object contains: `homeTeam`, `awayTeam`, `city`, `kickoff`, `ticketPrice`

**CSS classes to use:**
- `<li className="match-item">` — wrapper for each match
- `<div className="match-teams">` — for team names
- `<div className="match-details">` — wrapper for city, date, price
- `<span className="ticket-price">` — for the ticket price

---

Good luck!
