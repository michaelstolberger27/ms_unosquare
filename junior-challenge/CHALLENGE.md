# World Cup 2026 Travel Route Planner

## Introduction

The 2026 FIFA World Cup will be the biggest ever — **48 teams**, **16 host cities**, spread across **3 countries** (USA, Mexico, and Canada). Fans will need to plan their travel routes carefully to catch the matches they want without criss-crossing the continent unnecessarily.

### The Scenario

A fan wants to attend the World Cup with the following constraints:
- **Fixed budget** — they have a set amount to spend on flights, accommodation, and tickets
- **At least 5 matches** — they want to make the most of their trip
- **All 3 countries** — they want to experience the tournament in USA, Mexico, AND Canada

Your challenge: **build features for a system that helps this fan plan an optimal travel route that fits their budget while meeting these requirements.**

---

## Choose Your Tech

### Backend (Required but only Choose ONE) — 2 - 2.5 hours

API endpoints, route algorithm, unit tests

- Java Spring
- Node/Express
- Python/Flask
- .NET/C#

### Frontend (Required)

| Stack | Focus | Estimated Time |
|-------|-------|----------------|
| **React/TypeScript** | Component implementation, unit tests | 1 - 1.5 hours |

---

## What's Already Built

- ✅ React frontend with match browser, selector, and itinerary panel
- ✅ Database models and query helpers
- ✅ Haversine distance calculation utility
- ✅ Route strategy interface and a working (but naive) example strategy
- ✅ Seed data with all 16 cities, 48 teams, 48 matches, and flight prices
- ✅ Docker setup for PostgreSQL (optional — SQLite works out of the box)
- ✅ Itineraries API (save and retrieve trip plans)

---

## Backend Tasks

Look for `YOUR TASK #` comments in the code. Complete them in order.

See the README in your chosen backend folder for specific file names.

### Task #1 — Cities API - SUPER EASY

| Endpoint | What to Implement |
|----------|-------------------|
| `GET /api/cities` | Return all 16 host cities |

### Task #2 — Matches API - EASY

| Endpoint | What to Implement |
|----------|-------------------|
| `GET /api/matches` | Return matches with optional `?city=` and `?date=` filters |
| `GET /api/matches/{id}` | Return a single match by ID |

### Task #3 — Route Optimisation - MEDIUM

| Endpoint | What to Implement |
|----------|-------------------|
| `POST /api/route/optimise` | Optimise travel route for selected matches |

**Algorithm:** Implement the Nearest-Neighbour strategy:
1. Sort matches by kickoff date
2. Group matches by date
3. For each date, if multiple matches exist, pick the one nearest to current location
4. Validate the route (minimum 5 matches, all 3 countries visited)

### Task #4 — Unit Tests - MEDIUM

Write **3 unit tests** for the NearestNeighbourStrategy:
1. Test that a valid route is returned for multiple matches
2. Test edge case with empty matches
3. Test that nearest city is picked when multiple matches on same day

### Task #5 — Calculate Cost

| Endpoint | What to Implement |
|----------|-------------------|
| `POST /api/route/budget` | Calculate trip costs and check budget feasibility |

**Requirements:**
- Calculate ticket costs (sum of match ticket prices)
- Calculate flight costs (between consecutive cities)
- Calculate accommodation costs (nights × city rate)
- Check feasibility: total cost ≤ budget AND visits all 3 countries
- Return cost breakdown and suggestions if over budget

**Nice to have:**
- Unit test the Calculate Cost logic

---

## Frontend Tasks

Look for `YOUR TASK` comments in the code.

See the [frontend/README.md](./frontend/README.md) for detailed instructions.

### RouteMap Component - EASY

| File | What to Implement |
|------|-------------------|
| `src/components/RouteMap.tsx` | Render match details in marker popups |

**Requirements:**
- Display stop number, team names, and kickoff date for each match
- Use the provided CSS classes for consistent styling

**What's Pre-Built:**
- Map setup with `MapContainer` and `TileLayer`
- Origin city "Start" marker
- Numbered markers for each stop
- Polylines connecting all positions
- Helper functions for icons and grouping

**Nice to have:**
- Unit tests for the RouteMap component (`__tests__/RouteMap.test.tsx`)

---

## Bonus Challenge (Optional)

See [BONUS_CHALLENGE.md](./BONUS_CHALLENGE.md) for an extra challenge.

---

## Tips

- **Read the existing code** — understand the patterns before implementing
- **Start simple** — get basic functionality working before adding complexity
- **Use the hints** — TODO comments include helpful guidance
- **Test as you go** — don't wait until the end to run tests
- **Enjoy it** — don't worry if you don't get it all complete within the recommended time.

Good luck!
