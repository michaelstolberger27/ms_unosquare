# Node/Express Backend — World Cup 2026 Travel Planner

## Pre-requisites

### Node.js (v20 or higher)

**macOS:**
```bash
# Using Homebrew
brew install node

# Or using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20
```

**Windows:**

Download and install from: https://nodejs.org/

### Verify installation

```bash
node --version    # Should be v20.x or higher
npm --version     # Should be v10.x or higher
```

## How to: Run Application

```bash
cd backend/node-express
npm install
npm run seed     # Seeds the SQLite database from seed-data/matches.json
npm run dev      # Starts the dev server on http://localhost:3008
```

## How to: Run Tests

```bash
npm test
```

## Project Structure

```
src/
├── index.ts                 # ✅ Express server setup
├── db/
│   ├── connection.ts        # ✅ SQLite database connection
│   ├── schema.sql           # ✅ Table definitions
│   └── seed.ts              # ✅ Database seeding script
├── models/                  # ✅ Pre-built — query helpers
│   ├── City.ts
│   ├── Match.ts
│   ├── Team.ts
│   └── Itinerary.ts
├── utils/                   # ✅ Pre-built — helpers & types
│   ├── haversine.ts
│   ├── buildRoute.ts
│   └── CostCalculator.ts    # ⭐ YOUR TASK #5
├── strategies/
│   ├── RouteStrategy.ts             # ✅ Types and interfaces
│   ├── DateOnlyStrategy.ts          # ✅ Working example
│   └── NearestNeighbourStrategy.ts  # ⭐ YOUR TASK #3
├── routes/
│   ├── cities.ts            # ⭐ YOUR TASK #1
│   ├── matches.ts           # ⭐ YOUR TASK #2
│   ├── itineraries.ts       # ✅ Pre-built
│   └── optimise.ts          # ⭐ YOUR TASK #3, #5
└── bonus/
    └── BestValueFinder.ts   # ⭐ BONUS CHALLENGE #1

__tests__/
└── NearestNeighbourStrategy.test.ts  # ⭐ YOUR TASK #4
```

## What's Pre-Built

- Database connection and seeding
- All models with query methods (City, Match, Team, Itinerary)
- Haversine distance calculation
- Route strategy interface and buildRoute helper
- DateOnlyStrategy (working naive example)
- Itinerary API (save and retrieve trips)
- Express server with CORS and route mounting

## Your Tasks

Look for `YOUR TASK #N` comments in the code. Complete them in order.

### Task #1 — Cities API

| File | What to Implement |
|------|-------------------|
| `src/routes/cities.ts` | `GET /api/cities` — return all 16 host cities |

### Task #2 — Matches API

| File | What to Implement |
|------|-------------------|
| `src/routes/matches.ts` | `GET /api/matches` — with optional `?city=` and `?date=` filters |
| `src/routes/matches.ts` | `GET /api/matches/:id` — return a single match |

### Task #3 — Route Optimisation

| File | What to Implement |
|------|-------------------|
| `src/routes/optimise.ts` | `POST /api/route/optimise` — call the strategy |
| `src/strategies/NearestNeighbourStrategy.ts` | `optimise()` — nearest-neighbour algorithm (group by date, pick nearest) |
| `src/strategies/NearestNeighbourStrategy.ts` | `validateRoute()` — check minimum matches and country coverage |

### Task #4 — Unit Tests

| File | What to Implement |
|------|-------------------|
| `__tests__/NearestNeighbourStrategy.test.ts` | 3 unit tests for the strategy |

### Task #5 — Calculate Cost

| File | What to Implement |
|------|-------------------|
| `src/routes/optimise.ts` | `POST /api/route/budget` — call the calculator |
| `src/utils/CostCalculator.ts` | `calculate()` — calculate trip costs (flights, accommodation, tickets) |

---

## Bonus Challenge (Optional)

Look for `BONUS CHALLENGE #1` comments in the code.

### BONUS #1 — Best Value Finder

| File | What to Implement |
|------|-------------------|
| `src/routes/optimise.ts` | `POST /api/route/best-value` — call the finder |
| `src/bonus/BestValueFinder.ts` | `findBestValue()` — find best combination of matches within budget |

---

## API Endpoints

| Method | Path | Status | Task |
|--------|------|--------|------|
| GET | `/api/cities` | YOUR TASK | #1 |
| GET | `/api/matches` | YOUR TASK | #2 |
| GET | `/api/matches/:id` | YOUR TASK | #2 |
| POST | `/api/route/optimise` | YOUR TASK | #3 |
| POST | `/api/route/budget` | YOUR TASK | #5 |
| POST | `/api/route/best-value` | BONUS | #1 |
| POST | `/api/itineraries` | ✅ Pre-built | - |
| GET | `/api/itineraries/:id` | ✅ Pre-built | - |
