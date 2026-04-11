# Frontend — React + TypeScript

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
cd frontend
npm install
npm run dev     # Starts on http://localhost:5173
```

## How to: Run Tests

```bash
npm test
```

---

## Your Task — RouteMap Component

Implement the `RouteMap` component in `src/components/RouteMap.tsx` using **react-leaflet**.

Look for `YOUR TASK` comments in the code.

### Props interface

```typescript
interface RouteMapProps {
  route: OptimisedRoute | null;
  originCity: City | null;
}
```

### Requirements

- Render match details inside the marker **popups**
- Display the stop number, team names, and kickoff date for each match

### What's Pre-Built

The component file includes:

- **Helper functions** — `createMultiNumberedIcon()`, `createStartIcon()`, `groupStopsByCity()`
- **Map setup** — `MapContainer`, `TileLayer`, basic structure
- **Marker rendering** — Origin marker and stop markers with icons
- **Polyline** — Connecting all positions

### What You Need to Implement

Complete the TODO in the popup to render match details for each stop!

### CSS Classes Available

- `popup-match` — wrapper for each match in the popup
- `popup-match-number` — for the stop number
- `popup-match-date` — for the kickoff date

---

## Nice to Have — Unit Tests

| File | What to Implement |
|------|-------------------|
| `__tests__/RouteMap.test.tsx` | Unit tests for the RouteMap component |

Write tests to verify the RouteMap component behaviour:

1. **Placeholder test** — renders placeholder message when route is null
2. **Map container test** — renders MapContainer when route is provided
3. **Markers test** — renders a marker for each stop in the route
4. **Edge case test** — handles route with empty stops array

Look for `TODO` comments in the test file for guidance.

---

## Bonus Challenge (Optional)

See [BONUS_CHALLENGE.md](../BONUS_CHALLENGE.md) for an extra challenge.