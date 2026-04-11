import { useState, useMemo } from 'react';
import { City, Match } from '../types';
import MatchCard from './MatchCard';

interface MatchBrowserProps {
  matches: Match[];
  cities: City[];
  selectedMatchIds: string[];
  onSelect: (match: Match) => void;
}

function MatchBrowser({
  matches,
  cities,
  selectedMatchIds,
  onSelect,
}: MatchBrowserProps) {
  const [cityFilter, setCityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const uniqueDates = useMemo(() => {
    const dates = new Set(
      matches.map((m) => m.kickoff.split('T')[0])
    );
    return Array.from(dates).sort();
  }, [matches]);

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      if (cityFilter) {
        const cityId =
          typeof m.city === 'string' ? m.city : m.city.id;
        if (cityId !== cityFilter) return false;
      }
      if (dateFilter) {
        if (!m.kickoff.startsWith(dateFilter)) return false;
      }
      return true;
    });
  }, [matches, cityFilter, dateFilter]);

  if (matches.length === 0) {
    return (
      <div className="empty-state">
        No matches loaded. Make sure the backend is running and seeded.
      </div>
    );
  }

  return (
    <div>
      <div className="filters">
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="">All Dates</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {new Date(date + 'T00:00:00Z').toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </option>
          ))}
        </select>
      </div>

      <div className="match-list">
        {filteredMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isSelected={selectedMatchIds.includes(match.id)}
            onClick={() => onSelect(match)}
          />
        ))}
        {filteredMatches.length === 0 && (
          <div className="empty-state">
            No matches found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchBrowser;
