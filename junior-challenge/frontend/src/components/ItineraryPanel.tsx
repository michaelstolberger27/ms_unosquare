import { OptimisedRoute } from '../types';

interface ItineraryPanelProps {
  route: OptimisedRoute;
}

function ItineraryPanel({ route }: ItineraryPanelProps) {
  const requiredCountries = ['USA', 'Mexico', 'Canada'];
  const hasAllCountries = requiredCountries.every((c) => route.countriesVisited?.includes(c));
  const hasMinimumMatches = route.stops.length >= 5;
  const isFullyFeasible = route.feasible && hasAllCountries && hasMinimumMatches;

  return (
    <div>
      {/* Country Validation */}
      <div className="country-validation">
        <h4>Countries Visited</h4>
        <div className="country-list">
          {requiredCountries.map((country) => {
            const visited = route.countriesVisited?.includes(country);
            return (
              <div key={country} className={`country-item ${visited ? 'visited' : 'missing'}`}>
                <span className="country-check">{visited ? '✓' : '✗'}</span>
                <span>{country}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matches Count Validation */}
      <div className="matches-validation">
        <h4>Matches Selected</h4>
        <div className={`matches-count ${hasMinimumMatches ? 'valid' : 'invalid'}`}>
          <span className="matches-check">{hasMinimumMatches ? '✓' : '✗'}</span>
          <span>{route.stops.length} / 5 minimum</span>
        </div>
      </div>

      {/* Feasibility Banner */}
      {!isFullyFeasible && (
        <div className="route-warning-banner">
          <span className="warning-icon">&#9888;</span>
          <span>Most feasible route but missing minimum requirements</span>
        </div>
      )}
      {isFullyFeasible && (
        <div className="route-success-banner">
          <span className="success-icon">&#10003;</span>
          <span>Route is feasible</span>
        </div>
      )}

      {/* Warnings */}
      {route.warnings && route.warnings.length > 0 && (
        <div className="route-warnings">
          {route.warnings.map((warning, index) => (
            <div key={index} className="route-warning-item">
              {warning}
            </div>
          ))}
        </div>
      )}

      <h4 className="selected-games-title">Selected Games</h4>

      {route.stops.map((stop) => {
        const homeTeam =
          typeof stop.match.homeTeam === 'string'
            ? stop.match.homeTeam
            : stop.match.homeTeam.name;
        const awayTeam =
          typeof stop.match.awayTeam === 'string'
            ? stop.match.awayTeam
            : stop.match.awayTeam.name;

        return (
          <div key={stop.stopNumber} className="itinerary-stop">
            <div className="stop-number">{stop.stopNumber}</div>
            <div className="stop-details">
              <div className="city-name">{stop.city.name}</div>
              <div className="match-info">
                {homeTeam} vs {awayTeam} &middot;{' '}
                {new Date(stop.match.kickoff).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
            </div>
            {stop.distanceFromPrevious > 0 && (
              <div className="stop-distance">
                {Math.round(stop.distanceFromPrevious)} km
              </div>
            )}
          </div>
        );
      })}

      <div className="total-distance">
        Total Distance: {Math.round(route.totalDistance).toLocaleString()} km
      </div>
    </div>
  );
}

export default ItineraryPanel;
