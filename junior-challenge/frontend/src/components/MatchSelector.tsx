import { Match } from '../types';

interface MatchSelectorProps {
  selectedMatches: Match[];
  onRemove: (matchId: string) => void;
  onOptimise: () => void;
  optimising: boolean;
}

function MatchSelector({
  selectedMatches,
  onRemove,
  onOptimise,
  optimising,
}: MatchSelectorProps) {
  if (selectedMatches.length === 0) {
    return (
      <div className="empty-state">
        Click on matches from the browser to add them to your itinerary.
      </div>
    );
  }

  return (
    <div>
      <ul className="selected-list">
        {selectedMatches.map((match) => {
          const homeTeam =
            typeof match.homeTeam === 'string'
              ? match.homeTeam
              : match.homeTeam.name;
          const awayTeam =
            typeof match.awayTeam === 'string'
              ? match.awayTeam
              : match.awayTeam.name;
          const cityName =
            typeof match.city === 'string' ? match.city : match.city.name;

          return (
            <li key={match.id}>
              <span>
                {homeTeam} vs {awayTeam} — {cityName}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onRemove(match.id)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>

      <button
        className="btn btn-primary"
        onClick={onOptimise}
        disabled={selectedMatches.length < 2 || optimising}
      >
        {optimising
          ? 'Validating...'
          : `Validate & Plan Route (${selectedMatches.length} matches)`}
      </button>

      {selectedMatches.length < 2 && (
        <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
          Select at least 2 matches to validate your route.
        </p>
      )}
    </div>
  );
}

export default MatchSelector;
