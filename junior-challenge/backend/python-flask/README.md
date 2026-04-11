# Python/Flask Backend — World Cup 2026 Travel Planner

## Pre-requisites

### Python 3.10+

**macOS:**
```bash
brew install python@3.11
```

**Windows:**

Download and install from: https://www.python.org/downloads/

### Verify installation

```bash
python --version    # Should be 3.10.x or higher
```

## How to: Run Application

```bash
cd backend/python-flask
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed              # Seeds the SQLite database
flask run --port 3008           # Starts the server on http://localhost:3008
```

## How to: Run Tests

```bash
cd backend/python-flask
source venv/bin/activate
pytest
```

## Project Structure

```
app/
├── __init__.py                  # ✅ Flask app factory
├── db.py                        # ✅ SQLAlchemy instance
├── seed.py                      # ✅ Database seeding script
├── models/                      # ✅ Pre-built — SQLAlchemy models
│   ├── city.py
│   ├── team.py
│   ├── match.py
│   ├── flight_price.py
│   └── itinerary.py
├── utils/                       # ✅ Pre-built — helpers
│   ├── haversine.py
│   └── cost_calculator.py       # ⭐ YOUR TASK #5
├── strategies/
│   ├── route_strategy.py                # ✅ Strategy interface & build_route
│   ├── date_only_strategy.py            # ✅ Working example
│   └── nearest_neighbour_strategy.py    # ⭐ YOUR TASK #3
├── bonus/
│   └── best_value_finder.py             # ⭐ BONUS CHALLENGE #1
└── routes/
    ├── cities.py                # ⭐ YOUR TASK #1
    ├── matches.py               # ⭐ YOUR TASK #2
    ├── itineraries.py           # ✅ Pre-built
    └── optimise.py              # ⭐ YOUR TASK #3, #5

tests/
└── test_nearest_neighbour_strategy.py   # ⭐ YOUR TASK #4
```

## What's Pre-Built

- Database connection and seeding (SQLAlchemy + SQLite)
- All models with relationships
- Haversine distance calculation
- Route strategy interface and build_route helper
- DateOnlyStrategy (working naive example)
- Itinerary API (save and retrieve trips)
- Flask app with CORS and blueprints

## Your Tasks

Look for `YOUR TASK #N` comments in the code. Complete them in order.

### Task #1 — Cities API

| File | What to Implement |
|------|-------------------|
| `app/routes/cities.py` | `GET /api/cities` — return all 16 host cities |

### Task #2 — Matches API

| File | What to Implement |
|------|-------------------|
| `app/routes/matches.py` | `GET /api/matches` — with optional `?city=` and `?date=` filters |
| `app/routes/matches.py` | `GET /api/matches/<id>` — return a single match |

### Task #3 — Route Optimisation

| File | What to Implement |
|------|-------------------|
| `app/routes/optimise.py` | `POST /api/route/optimise` — call the strategy |
| `app/strategies/nearest_neighbour_strategy.py` | `optimise()` — nearest-neighbour algorithm (group by date, pick nearest) |

### Task #4 — Unit Tests

| File | What to Implement |
|------|-------------------|
| `tests/test_nearest_neighbour_strategy.py` | 3 unit tests for the strategy |

### Task #5 — Calculate Cost

| File | What to Implement |
|------|-------------------|
| `app/routes/optimise.py` | `POST /api/route/budget` — call the calculator |
| `app/utils/cost_calculator.py` | `calculate()` — calculate trip costs (flights, accommodation, tickets) |

---

## Bonus Challenge (Optional)

Look for `BONUS CHALLENGE #1` comments in the code.

### BONUS #1 — Best Value Finder

| File | What to Implement |
|------|-------------------|
| `app/routes/optimise.py` | `POST /api/route/best-value` — call the finder |
| `app/bonus/best_value_finder.py` | `find_best_value()` — find best combination of matches within budget |

---

## API Endpoints

| Method | Path | Status | Task |
|--------|------|--------|------|
| GET | `/api/cities` | YOUR TASK | #1 |
| GET | `/api/matches` | YOUR TASK | #2 |
| GET | `/api/matches/<id>` | YOUR TASK | #2 |
| POST | `/api/route/optimise` | YOUR TASK | #3 |
| POST | `/api/route/budget` | YOUR TASK | #5 |
| POST | `/api/route/best-value` | BONUS | #1 |
| POST | `/api/itineraries` | ✅ Pre-built | - |
| GET | `/api/itineraries/<id>` | ✅ Pre-built | - |
