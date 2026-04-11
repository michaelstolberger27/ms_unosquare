# Java/Spring Boot Backend — World Cup 2026 Travel Planner

## Pre-requisites

### Java 21+

**macOS:**
```bash
brew install openjdk@21
```

**Windows:**

Download and install from: https://adoptium.net/

### Verify installation

```bash
java --version    # Should be 21.x or higher
```

## How to: Run Application

```bash
cd backend/java-spring
gradle wrapper       # Generate the Gradle wrapper (first time only)
./gradlew bootRun    # Starts the server on http://localhost:3008
```

> **Note:** If you don't have Gradle installed, you can download the wrapper JAR manually or install Gradle via `brew install gradle` (macOS) or from https://gradle.org/install/ (Windows).

The H2 database is auto-configured and seeded from `schema.sql` and `data.sql`.

## How to: Run Tests

```bash
./gradlew test
```

## Project Structure

```
src/main/java/com/unosquare/worldcup/
├── Application.java             # ✅ Spring Boot main class
├── config/CorsConfig.java       # ✅ CORS configuration
├── model/                       # ✅ JPA entities
├── repository/                  # ✅ Spring Data repositories
├── dto/                         # ✅ Data transfer objects
├── util/                        # ✅ Helpers (Haversine, BuildRoute)
│   └── CostCalculator.java      # ⭐ YOUR TASK #5
├── strategy/
│   ├── DateOnlyStrategy.java            # ✅ Working example
│   └── NearestNeighbourStrategy.java    # ⭐ YOUR TASK #3
├── controller/
│   ├── CityController.java              # ⭐ YOUR TASK #1
│   ├── MatchController.java             # ⭐ YOUR TASK #2
│   ├── ItineraryController.java         # ✅ Pre-built
│   └── RouteController.java             # ⭐ YOUR TASK #3, #5
├── service/
│   ├── CityService.java                 # ⭐ YOUR TASK #1
│   ├── MatchService.java                # ⭐ YOUR TASK #2
│   ├── ItineraryService.java            # ✅ Pre-built
│   └── RouteService.java                # ⭐ YOUR TASK #3
└── bonus/
    └── BestValueFinder.java             # ⭐ BONUS CHALLENGE #1
```

## What's Pre-Built

- Database connection and seeding
- All JPA entities and repositories
- Haversine distance calculation utility
- Route strategy interface and DateOnlyStrategy example
- Itinerary API (save and retrieve trips)
- Spring Boot server with CORS configured

## Your Tasks

Look for `YOUR TASK #N` comments in the code. Complete them in order.

### Task #1 — Cities API

| File | What to Implement |
|------|-------------------|
| `CityController.java` | `GET /api/cities` — return all 16 host cities |
| `CityService.java` | `getAllCities()` — call the repository |

### Task #2 — Matches API

| File | What to Implement |
|------|-------------------|
| `MatchController.java` | `GET /api/matches` — with optional `?city=` and `?date=` filters |
| `MatchController.java` | `GET /api/matches/{id}` — return a single match |
| `MatchService.java` | `getMatches(city, date)` — filter matches by city and/or date |

### Task #3 — Route Optimisation

| File | What to Implement |
|------|-------------------|
| `RouteController.java` | `POST /api/route/optimise` — call the service |
| `RouteService.java` | `optimise()` — fetch matches, convert to DTOs, call strategy |
| `NearestNeighbourStrategy.java` | `optimise()` — nearest-neighbour algorithm (group by date, pick nearest) |
| `NearestNeighbourStrategy.java` | `validateRoute()` — check minimum matches and country coverage |

### Task #4 — Unit Tests

| File | What to Implement |
|------|-------------------|
| `NearestNeighbourStrategyTest.java` | 3 unit tests for the strategy |

### Task #5 — Calculate Cost

| File | What to Implement |
|------|-------------------|
| `RouteController.java` | `POST /api/route/budget` — call the service |
| `CostCalculator.java` | `calculate()` — calculate trip costs (flights, accommodation, tickets) |

---

See [BONUS_CHALLENGE.md](./BONUS_CHALLENGE.md) for an extra challenge.

Look for `BONUS CHALLENGE #1` comments in the code.

### BONUS #1 — Best Value Finder

| File | What to Implement |
|------|-------------------|
| `RouteController.java` | `POST /api/route/best-value` — call the service |
| `BestValueFinder.java` | `findBestValue()` — find best combination of matches within budget |

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
