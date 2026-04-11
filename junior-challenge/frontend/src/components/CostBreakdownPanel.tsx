import { BudgetResult } from '../types';

interface CostBreakdownPanelProps {
  result: BudgetResult;
  budget: number;
}

function CostBreakdownPanel({ result, budget }: CostBreakdownPanelProps) {
  const { feasible, costBreakdown, missingCountries, minimumBudgetRequired, suggestions } = result;
  const overBudget = costBreakdown.total > budget;

  return (
    <div className="cost-breakdown">
      {/* Feasibility Status */}
      <div className={`feasibility-banner ${feasible ? 'feasible' : 'not-feasible'}`}>
        {feasible ? (
          <>
            <span className="status-icon">&#10003;</span>
            <span>Your trip is within budget!</span>
          </>
        ) : (
          <>
            <span className="status-icon">&#10007;</span>
            <span>
              {missingCountries.length > 0
                ? 'Missing required countries'
                : 'Trip exceeds your budget'}
            </span>
          </>
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="cost-details">
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
        <div className={`cost-row cost-total ${overBudget ? 'over-budget' : ''}`}>
          <span>Total</span>
          <span>${costBreakdown.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="cost-row budget-row">
          <span>Your Budget</span>
          <span>${budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        {overBudget && (
          <div className="cost-row over-amount">
            <span>Over by</span>
            <span>${(costBreakdown.total - budget).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        )}
      </div>

      {/* Minimum Budget Required */}
      {minimumBudgetRequired && minimumBudgetRequired > budget && (
        <div className="minimum-budget">
          <strong>Minimum budget needed:</strong>{' '}
          ${minimumBudgetRequired.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          <h4>Suggestions</h4>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CostBreakdownPanel;
