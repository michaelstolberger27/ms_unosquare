import { City } from '../types';

interface BudgetPlannerProps {
  cities: City[];
  budget: number;
  originCityId: string;
  onBudgetChange: (budget: number) => void;
  onOriginChange: (cityId: string) => void;
  onCalculate: () => void;
  calculating: boolean;
  disabled: boolean;
  selectedCount: number;
}

function BudgetPlanner({
  cities,
  budget,
  originCityId,
  onBudgetChange,
  onOriginChange,
  onCalculate,
  calculating,
  disabled,
  selectedCount,
}: BudgetPlannerProps) {
  return (
    <div className="budget-planner-panel">
      <div className="budget-requirement-panel">
        <span className="requirement-icon">&#9432;</span>
        <span>Must visit all 3 countries: USA, Mexico &amp; Canada</span>
      </div>

      <div className="budget-fields-row">
        <div className="budget-field-panel">
          <label htmlFor="budget">Your Budget</label>
          <div className="budget-input-wrapper-panel">
            <span className="currency-symbol-panel">$</span>
            <input
              id="budget"
              type="number"
              min="0"
              step="100"
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              placeholder="5000"
            />
          </div>
        </div>

        <div className="budget-field-panel">
          <label htmlFor="origin">Starting City</label>
          <select
            id="origin"
            value={originCityId}
            onChange={(e) => onOriginChange(e.target.value)}
          >
            <option value="">Select starting city...</option>
            {cities
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.country}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={onCalculate}
        disabled={disabled || calculating || !originCityId || budget <= 0}
        style={{ width: '100%', marginTop: '0.75rem' }}
      >
        {calculating ? 'Calculating...' : 'Calculate Trip Cost'}
      </button>

      {disabled && (
        <p className="budget-hint-panel">
          Select at least 2 matches ({selectedCount}/2)
        </p>
      )}
    </div>
  );
}

export default BudgetPlanner;
