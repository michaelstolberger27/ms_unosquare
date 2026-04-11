import { BestValueResult } from '../types';

/**
 * BestValueDialog — BONUS CHALLENGE #2
 *
 * Displays the results from the Best Value Finder API.
 *
 * ============================================================
 * WHAT YOU NEED TO IMPLEMENT:
 * ============================================================
 *
 * Render the list of recommended matches in the "Recommended Matches" section.
 * Each match should display:
 *   - Team names (homeTeam vs awayTeam)
 *   - City name
 *   - Kickoff date and time
 *   - Ticket price
 *
 * ============================================================
 * HINTS:
 * ============================================================
 *
 * - Use matches.map() to iterate over the matches array
 * - Format the kickoff date using: new Date(match.kickoff).toLocaleDateString()
 * - The match object contains: homeTeam, awayTeam, city, kickoff, ticketPrice
 *
 * ============================================================
 * CSS CLASSES TO USE:
 * ============================================================
 *
 * - <li className="match-item"> — wrapper for each match
 * - <div className="match-teams"> — for team names
 * - <div className="match-details"> — wrapper for city, date, price
 * - <span className="ticket-price"> — for the ticket price
 *
 */

interface BestValueDialogProps {
  result: BestValueResult;
  budget: number;
  onClose: () => void;
  onApply: () => void;
}

function BestValueDialog({ result, budget, onClose, onApply }: BestValueDialogProps) {
  const { withinBudget, matches, costBreakdown, countriesVisited, matchCount, message } = result;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Best Value Matches</h2>
          <button className="dialog-close" onClick={onClose}>&times;</button>
        </div>

        <div className="dialog-body">
          {/* Status Message */}
          <div className={`best-value-status ${withinBudget ? 'within-budget' : 'over-budget'}`}>
            <span className="status-icon">{withinBudget ? '\u2713' : '\u26A0'}</span>
            <span>{message}</span>
          </div>

          {/* Cost Summary */}
          {costBreakdown && (
            <div className="best-value-costs">
              <h4>Cost Breakdown</h4>
              <div className="cost-row">
                <span>Flights</span>
                <span>${costBreakdown.flights.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="cost-row">
                <span>Accommodation</span>
                <span>${costBreakdown.accommodation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="cost-row">
                <span>Match Tickets</span>
                <span>${costBreakdown.tickets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className={`cost-row cost-total ${!withinBudget ? 'over-budget' : ''}`}>
                <span>Total</span>
                <span>${costBreakdown.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="cost-row budget-row">
                <span>Your Budget</span>
                <span>${budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          )}

          {/* Countries */}
          <div className="best-value-countries">
            <h4>Countries Visited ({countriesVisited.length}/3)</h4>
            <div className="country-tags">
              {countriesVisited.map((country) => (
                <span key={country} className="country-tag">{country}</span>
              ))}
            </div>
          </div>

          {/* Matches List */}
          <div className="best-value-matches">
            <h4>Recommended Matches ({matchCount})</h4>
            <ul className="match-list">
              {matches.map((match) => {
                const kickoff = new Date(match.kickoff);
                const dateStr = kickoff.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                const timeStr = kickoff.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                return (
                  <li key={match.id} className="match-item">
                    <div className="match-teams">
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </div>
                    <div className="match-details">
                      <span>{match.city.name}</span>
                      <span>{dateStr}, {timeStr}</span>
                      <span className="ticket-price">${match.ticketPrice}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onApply}>
            Apply Selection
          </button>
        </div>
      </div>
    </div>
  );
}

export default BestValueDialog;
