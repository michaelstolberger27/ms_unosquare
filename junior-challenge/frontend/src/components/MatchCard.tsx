import { Match } from '../types';

interface MatchCardProps {
  match: Match;
  isSelected: boolean;
  onClick: () => void;
}

function MatchCard({ match, isSelected, onClick }: MatchCardProps) {
  const kickoff = new Date(match.kickoff);
  const dateStr = kickoff.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const timeStr = kickoff.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const homeTeamName =
    typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.name;
  const awayTeamName =
    typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.name;
  const cityName =
    typeof match.city === 'string' ? match.city : match.city.name;
  const stadiumName =
    typeof match.city === 'string' ? '' : match.city.stadium;

  return (
    <div
      className={`match-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="teams">
        {homeTeamName} vs {awayTeamName}
        <span className="group-badge">Group {match.group}</span>
      </div>
      <div className="meta">
        {dateStr} &middot; {timeStr} &middot; {cityName}
        {stadiumName && ` — ${stadiumName}`}
      </div>
    </div>
  );
}

export default MatchCard;
