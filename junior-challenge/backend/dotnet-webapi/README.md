# .NET 8 Web API Backend — World Cup 2026 Travel Planner

## Pre-requisites

### .NET 8 SDK

**macOS:**
```bash
brew install dotnet@8
```

**Windows:**

Download and install from: https://dotnet.microsoft.com/download/dotnet/8.0

### Verify installation

```bash
dotnet --version    # Should be 8.x or higher
```

## How to: Run Application

```bash
cd backend/dotnet-webapi
dotnet run --project src/WorldCup.Api    # Starts on http://localhost:3008
```

The SQLite database is automatically created and seeded on first run.

## How to: Run Tests

```bash
cd backend/dotnet-webapi
dotnet test
```

## Using PostgreSQL (optional)

Set the `DATABASE_URL` environment variable:

```bash
DATABASE_URL="Host=localhost;Port=5432;Database=worldcup;Username=postgres;Password=postgres" \
  dotnet run --project src/WorldCup.Api
```

Or use docker-compose from the project root:

```bash
docker-compose up -d   # Starts PostgreSQL
```

## Project Structure

```
src/WorldCup.Api/
├── Program.cs                  # ✅ App entry point, DI, middleware
├── Data/
│   ├── WorldCupDbContext.cs    # ✅ EF Core DbContext
│   └── DataSeeder.cs           # ✅ Auto-seeds from matches.json
├── Models/                     # ✅ Pre-built — EF Core entities
│   ├── City.cs
│   ├── Team.cs
│   ├── Match.cs
│   ├── FlightPrice.cs
│   ├── Itinerary.cs
│   └── ItineraryStop.cs
├── Dtos/                       # ✅ Pre-built — Data transfer objects
├── Utils/                      # ✅ Pre-built — helpers
│   ├── HaversineUtil.cs
│   ├── BuildRouteUtil.cs
│   └── CostCalculator.cs       # ⭐ YOUR TASK #5
├── Strategies/
│   ├── IRouteStrategy.cs               # ✅ Strategy interface
│   ├── DateOnlyStrategy.cs             # ✅ Working example
│   └── NearestNeighbourStrategy.cs     # ⭐ YOUR TASK #3
├── Bonus/
│   └── BestValueFinder.cs              # ⭐ BONUS CHALLENGE #1
└── Controllers/
    ├── CitiesController.cs             # ⭐ YOUR TASK #1
    ├── MatchesController.cs            # ⭐ YOUR TASK #2
    ├── ItinerariesController.cs        # ✅ Pre-built
    └── RouteController.cs              # ⭐ YOUR TASK #3, #5

tests/WorldCup.Api.Tests/
└── NearestNeighbourStrategyTests.cs    # ⭐ YOUR TASK #4
```

## What's Pre-Built

- Database connection and seeding (EF Core + SQLite)
- All models with navigation properties
- Haversine distance calculation
- Route strategy interface and BuildRoute helper
- DateOnlyStrategy (working naive example)
- Itinerary API (save and retrieve trips)
- ASP.NET Core Web API with CORS

## Your Tasks

Look for `YOUR TASK #N` comments in the code. Complete them in order.

### Task #1 — Cities API

| File | What to Implement |
|------|-------------------|
| `Controllers/CitiesController.cs` | `GET /api/cities` — return all 16 host cities |

### Task #2 — Matches API

| File | What to Implement |
|------|-------------------|
| `Controllers/MatchesController.cs` | `GET /api/matches` — with optional `?city=` and `?date=` filters |
| `Controllers/MatchesController.cs` | `GET /api/matches/{id}` — return a single match |

### Task #3 — Route Optimisation

| File | What to Implement |
|------|-------------------|
| `Controllers/RouteController.cs` | `POST /api/route/optimise` — call the strategy |
| `Strategies/NearestNeighbourStrategy.cs` | `Optimise()` — nearest-neighbour algorithm (group by date, pick nearest) |

### Task #4 — Unit Tests

| File | What to Implement |
|------|-------------------|
| `tests/.../NearestNeighbourStrategyTests.cs` | 3 unit tests for the strategy |

### Task #5 — Calculate Cost

| File | What to Implement |
|------|-------------------|
| `Controllers/RouteController.cs` | `POST /api/route/budget` — call the calculator |
| `Utils/CostCalculator.cs` | `Calculate()` — calculate trip costs (flights, accommodation, tickets) |

---

## Bonus Challenge (Optional)

See [BONUS_CHALLENGE.md](./BONUS_CHALLENGE.md) for an extra challenge.

### BONUS #1 — Best Value Finder

| File | What to Implement |
|------|-------------------|
| `Controllers/RouteController.cs` | `POST /api/route/best-value` — call the finder |
| `Bonus/BestValueFinder.cs` | `FindBestValue()` — find best combination of matches within budget |

---

## API Endpoints

| Method | Path | Status | Task |
|--------|------|--------|------|
| GET | `/api/cities` | YOUR TASK | #1 |
| GET | `/api/matches` | YOUR TASK | #2 |
| GET | `/api/matches/{id}` | YOUR TASK | #2 |
| POST | `/api/route/optimise` | YOUR TASK | #3 |
| POST | `/api/route/budget` | YOUR TASK | #5 |
| POST | `/api/route/best-value` | BONUS | #1 |
| POST | `/api/itineraries` | ✅ Pre-built | - |
| GET | `/api/itineraries/{id}` | ✅ Pre-built | - |
