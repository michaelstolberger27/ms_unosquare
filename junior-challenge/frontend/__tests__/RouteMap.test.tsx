/**
 * RouteMap Tests — Nice to Have (Frontend)
 *
 * react-leaflet renders a real Leaflet map which requires a browser canvas
 * and DOM APIs not available in jsdom. We mock the library so we can test
 * the component's behaviour (what it renders, what data it passes) without
 * needing a real map environment.
 *
 * Each mock returns a simple <div> containing its children so we can still
 * assert on the popup content that our code adds.
 */

import { render, screen } from '@testing-library/react';
import RouteMap from '../src/components/RouteMap';
import { OptimisedRoute, City } from '../src/types';

// Mock react-leaflet — replace map primitives with plain divs
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
  Polyline: () => <div data-testid="polyline" />,
}));

// Mock leaflet — DivIcon is used by the icon helper functions inside RouteMap
jest.mock('leaflet', () => ({
  DivIcon: jest.fn().mockImplementation(() => ({})),
}));

// ─── Test data helpers ────────────────────────────────────────────────────────

const makeCity = (id: string): City => ({
  id,
  name: `City ${id}`,
  country: 'USA',
  latitude: 33.749,
  longitude: -84.388,
  stadium: `Stadium ${id}`,
  accommodationPerNight: 150,
});

const makeRoute = (stopCount: number): OptimisedRoute => ({
  stops: Array.from({ length: stopCount }, (_, i) => ({
    stopNumber: i + 1,
    city: makeCity(`city-${i + 1}`),
    distanceFromPrevious: i === 0 ? 0 : 500,
    match: {
      id: `match-${i + 1}`,
      homeTeam: { id: 'team-a', name: 'Team A', code: 'USA', group: 'A' },
      awayTeam: { id: 'team-b', name: 'Team B', code: 'MEX', group: 'A' },
      city: makeCity(`city-${i + 1}`),
      kickoff: '2026-06-14T18:00:00',
      group: 'A',
      matchDay: 1,
      ticketPrice: 100,
    },
  })),
  totalDistance: stopCount > 1 ? 500 * (stopCount - 1) : 0,
  strategy: 'nearest-neighbour',
  feasible: true,
  warnings: [],
  countriesVisited: ['USA'],
  missingCountries: [],
});

const originCity = makeCity('origin');

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('RouteMap', () => {
  it('should render placeholder message when route is null', () => {
    // When no route has been optimised yet the map should show a prompt
    // rather than an empty or broken map container.
    render(<RouteMap route={null} originCity={null} />);

    expect(screen.getByText(/validate a route/i)).toBeInTheDocument();
    expect(screen.queryByTestId('map-container')).not.toBeInTheDocument();
  });

  it('should render a map container when route is provided', () => {
    // A valid route should render the actual map, not the placeholder.
    render(<RouteMap route={makeRoute(2)} originCity={originCity} />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.queryByText(/validate a route/i)).not.toBeInTheDocument();
  });

  it('should render a marker for each stop in the route', () => {
    // Each unique city in the route gets one numbered marker, plus one
    // extra marker for the origin "Start" city.
    const route = makeRoute(3); // 3 stops, each a different city
    render(<RouteMap route={route} originCity={originCity} />);

    // 3 stop markers + 1 origin marker = 4 total
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(4);
  });

  it('should handle route with empty stops array', () => {
    // Edge case: an optimised route can legitimately have zero stops.
    // The map should still render without crashing.
    render(<RouteMap route={makeRoute(0)} originCity={originCity} />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });
});
