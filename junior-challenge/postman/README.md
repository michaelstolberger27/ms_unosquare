# Postman Collection — World Cup 2026 Travel Planner API

A Postman collection for testing all API endpoints in the World Cup 2026 Travel Planner.

## Pre-requisites

### Install Postman

Download and install from: https://www.postman.com/downloads/

## Import the Collection

1. Open Postman
2. Click **Import** (top-left)
3. Choose **File** → **Upload Files**
4. Select `WorldCup2026_API.postman_collection.json`
5. Click **Import**

The collection will appear in your Collections sidebar.

## Configuration

The collection uses a variable for the base URL:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `baseUrl` | `http://localhost:3008` | Your backend server URL |

To change the base URL:
1. Click on the collection name
2. Go to the **Variables** tab
3. Update the `baseUrl` value
4. Click **Save**

## Running Requests

1. **Start your backend server** on port 3008 (or update `baseUrl`)
2. Expand a folder in the collection (e.g., "Cities")
3. Click on a request (e.g., "Get All Cities")
4. Click **Send**
5. View the response in the lower panel

## Available Endpoints

### Cities (Task #1)

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Get All Cities | GET | `/api/cities` | Returns all 16 host cities |

### Matches (Task #2)

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Get All Matches | GET | `/api/matches` | Returns all matches |
| Get Matches by City | GET | `/api/matches?city=city-atlanta` | Filter by city |
| Get Matches by Date | GET | `/api/matches?date=2026-06-14` | Filter by date |
| Get Matches by City and Date | GET | `/api/matches?city=...&date=...` | Combined filter |
| Get Match by ID | GET | `/api/matches/match-1` | Single match |

### Route Optimisation (Task #3)

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Optimise Route | POST | `/api/route/optimise` | Optimise travel route |
| Optimise Route (Large) | POST | `/api/route/optimise` | Test with more matches |

### Budget Planner (Task #5)

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Budget Route (Within Budget) | POST | `/api/route/budget` | Test feasible trip |
| Budget Route (Over Budget) | POST | `/api/route/budget` | Test budget exceeded |
| Budget Route (Missing Countries) | POST | `/api/route/budget` | Test country constraint |
| Budget Route (Large Budget) | POST | `/api/route/budget` | Test with many matches |

### Best Value Finder (Bonus)

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Find Best Value | POST | `/api/route/best-value` | Find best match combination |
| Find Best Value (Low Budget) | POST | `/api/route/best-value` | Test with limited budget |
| Find Best Value (High Budget) | POST | `/api/route/best-value` | Test with generous budget |

### Itineraries (Pre-built)

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Save Itinerary | POST | `/api/itineraries` | Save an optimised route |
| Get Itinerary by ID | GET | `/api/itineraries/:id` | Retrieve saved itinerary |

### Health Check

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Health Check | GET | `/api/health` | Verify API is running |

## Tips

- **Run Health Check first** to verify your server is running
- **Check the response body** for error messages if a request fails
- **Use the description tab** on each request for expected response format
- **Modify request bodies** to test different scenarios
