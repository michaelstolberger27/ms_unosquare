import { useState, useEffect, useCallback } from 'react';
import { City, Match, OptimisedRoute, BudgetResult, BestValueResult } from './types';
import { getCities, getMatches, optimiseRoute, calculateBudget, getBestValue } from './api/client';
import MatchBrowser from './components/MatchBrowser';
import CostBreakdownPanel from './components/CostBreakdownPanel';
import ItineraryPanel from './components/ItineraryPanel';
import RouteMap from './components/RouteMap';
import BestValueDialog from './components/BestValueDialog';

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([]);
  const [optimisedRoute, setOptimisedRoute] = useState<OptimisedRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [optimising, setOptimising] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Budget planner state
  const [budget, setBudget] = useState<number>(5000);
  const [originCityId, setOriginCityId] = useState<string>('');
  const [budgetResult, setBudgetResult] = useState<BudgetResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  // Best Value state
  const [bestValueResult, setBestValueResult] = useState<BestValueResult | null>(null);
  const [findingBestValue, setFindingBestValue] = useState(false);
  const [showBestValueDialog, setShowBestValueDialog] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [citiesData, matchesData] = await Promise.all([
          getCities(),
          getMatches(),
        ]);
        setCities(citiesData || []);
        setMatches(matchesData || []);
      } catch (err) {
        setError(
          'Failed to load data. Make sure the backend is running on port 3008.'
        );
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectMatch = useCallback(
    (match: Match) => {
      if (selectedMatches.find((m) => m.id === match.id)) return;
      setSelectedMatches((prev) => [...prev, match]);
      setOptimisedRoute(null);
      setBudgetResult(null);
    },
    [selectedMatches]
  );

  const handleRemoveMatch = useCallback((matchId: string) => {
    setSelectedMatches((prev) => prev.filter((m) => m.id !== matchId));
    setOptimisedRoute(null);
    setBudgetResult(null);
  }, []);

  const handleOptimise = useCallback(async () => {
    if (selectedMatches.length < 2 || !originCityId) return;
    setOptimising(true);
    setError(null);
    try {
      const matchIds = selectedMatches.map((m) => m.id);
      const route = await optimiseRoute(matchIds, originCityId);
      setOptimisedRoute(route);
    } catch (err) {
      setError('Failed to optimise route. Check the console for details.');
      console.error('Optimisation error:', err);
    } finally {
      setOptimising(false);
    }
  }, [selectedMatches, originCityId]);

  const handleFindBestValue = useCallback(async () => {
    if (!originCityId || budget <= 0) return;

    setFindingBestValue(true);
    setError(null);
    try {
      const result = await getBestValue(budget, originCityId);
      setBestValueResult(result);
      setShowBestValueDialog(true);
    } catch (err) {
      setError('Failed to find best value matches. Check the console for details.');
      console.error('Best value error:', err);
    } finally {
      setFindingBestValue(false);
    }
  }, [budget, originCityId]);

  const handleApplyBestValue = useCallback(() => {
    if (!bestValueResult?.matches) return;

    // Apply the selected matches
    setSelectedMatches(bestValueResult.matches);
    setShowBestValueDialog(false);

    // Auto-populate the optimised route (Validate Plan)
    // Ensure the route has correct validation data from the BestValueResult
    if (bestValueResult.route) {
      const validatedRoute: OptimisedRoute = {
        ...bestValueResult.route,
        feasible: true,
        countriesVisited: bestValueResult.countriesVisited,
        missingCountries: [],
      };
      setOptimisedRoute(validatedRoute);

      // Auto-populate the budget result (Calculate Cost)
      const budgetResultFromBestValue: BudgetResult = {
        feasible: bestValueResult.withinBudget,
        route: validatedRoute,
        costBreakdown: bestValueResult.costBreakdown,
        countriesVisited: bestValueResult.countriesVisited,
        missingCountries: [],
        minimumBudgetRequired: bestValueResult.withinBudget ? null : bestValueResult.costBreakdown.total,
        suggestions: [],
      };
      setBudgetResult(budgetResultFromBestValue);
    }
  }, [bestValueResult]);

  const handleCalculateBudget = useCallback(async () => {
    if (!optimisedRoute || !originCityId || budget <= 0) return;

    // Check full feasibility
    const requiredCountries = ['USA', 'Mexico', 'Canada'];
    const hasAllCountries = requiredCountries.every((c) => optimisedRoute.countriesVisited?.includes(c));
    const hasMinimumMatches = optimisedRoute.stops.length >= 5;
    const isFullyFeasible = optimisedRoute.feasible && hasAllCountries && hasMinimumMatches;

    if (!isFullyFeasible) return;

    setCalculating(true);
    setError(null);
    try {
      // Use match IDs from the validated route (in optimised order)
      const matchIds = optimisedRoute.stops.map((stop) => stop.match.id);
      const result = await calculateBudget(budget, matchIds, originCityId);
      setBudgetResult(result);
    } catch (err) {
      setError('Failed to calculate budget. Check the console for details.');
      console.error('Budget calculation error:', err);
    } finally {
      setCalculating(false);
    }
  }, [optimisedRoute, budget, originCityId]);

  if (loading) {
    return (
      <div>
        <header className="app-header">
          <h1>World Cup 2026 Travel Planner</h1>
          <p>Plan your perfect route across North America</p>
        </header>
        <div className="loading">Loading match data...</div>
      </div>
    );
  }

  return (
    <div>
      <header className="app-header">
        <h1>World Cup 2026 Travel Planner</h1>
        <p>
          48 teams &middot; 16 cities &middot; 3 countries &mdash; Plan your
          budget-friendly route
        </p>
      </header>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {/* Budget & Origin Header */}
      <div className="trip-settings-header">
        <div className="trip-settings-content">
          <div className="trip-setting">
            <label htmlFor="budget">Your Budget</label>
            <div className="budget-input-wrapper-header">
              <span className="currency-symbol-header">$</span>
              <input
                id="budget"
                type="number"
                value={budget}
                disabled
                className="budget-input-disabled"
              />
            </div>
          </div>

          <div className="trip-setting">
            <label htmlFor="origin">Starting City</label>
            <select
              id="origin"
              value={originCityId}
              onChange={(e) => setOriginCityId(e.target.value)}
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

          <div className="trip-requirement">
            <span className="requirement-icon">&#9432;</span>
            <span>Must attend at least 5 matches across all 3 countries (USA, Mexico &amp; Canada)</span>
          </div>

          <button
            className="btn btn-secondary best-value-btn"
            onClick={handleFindBestValue}
            disabled={!originCityId || findingBestValue}
          >
            {findingBestValue ? 'Finding...' : 'Find Best Value'}
          </button>
        </div>
      </div>

      <div className="app-layout-3col">
        {/* Column 1 - Browse Matches with Selection pinned */}
        <div className="panel">
          <h2>Browse Matches</h2>

          {/* Selected matches pinned at top */}
          {selectedMatches.length > 0 && (
            <div className="selected-matches-pinned">
              <h3>Selected ({selectedMatches.length})</h3>
              <ul className="selected-list-compact">
                {selectedMatches.map((match) => {
                  const homeTeam = typeof match.homeTeam === 'string' ? match.homeTeam : match.homeTeam.name;
                  const awayTeam = typeof match.awayTeam === 'string' ? match.awayTeam : match.awayTeam.name;
                  const cityName = typeof match.city === 'string' ? match.city : match.city.name;
                  const kickoff = new Date(match.kickoff);
                  const dateStr = kickoff.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                  const timeStr = kickoff.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                  return (
                    <li key={match.id}>
                      <div className="selected-match-info">
                        <span className="selected-match-teams">{homeTeam} vs {awayTeam}</span>
                        <span className="selected-match-meta">{cityName} &middot; {dateStr}, {timeStr}</span>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveMatch(match.id)}
                      >
                        &times;
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <MatchBrowser
            matches={matches}
            cities={cities}
            selectedMatchIds={selectedMatches.map((m) => m.id)}
            onSelect={handleSelectMatch}
          />
        </div>

        {/* Column 2 - Validate & Plan Route (Nearest Neighbour) */}
        <div className="panel">
          <h2>Validate &amp; Plan Route</h2>

          <button
            className="btn btn-primary"
            onClick={handleOptimise}
            disabled={selectedMatches.length < 5 || !originCityId || optimising}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {optimising ? 'Planning...' : 'Plan My Route'}
          </button>

          {(selectedMatches.length < 5 || !originCityId) && (
            <p className="helper-text">
              {!originCityId
                ? 'Select a starting city above'
                : `Select at least 5 matches (${selectedMatches.length}/5)`}
            </p>
          )}

          {optimisedRoute && (
            <ItineraryPanel route={optimisedRoute} />
          )}
        </div>

        {/* Column 3 - Route Map & Calculate Trip Cost */}
        <div>
          <div className="panel">
            <h2>Route Map</h2>
            <RouteMap route={optimisedRoute} originCity={cities.find(c => c.id === originCityId) || null} />
          </div>

          <div className="panel" style={{ marginTop: '1.5rem' }}>
            <h2>Calculate Trip Cost</h2>

            {(() => {
              const requiredCountries = ['USA', 'Mexico', 'Canada'];
              const hasAllCountries = optimisedRoute ? requiredCountries.every((c) => optimisedRoute.countriesVisited?.includes(c)) : false;
              const hasMinimumMatches = optimisedRoute ? optimisedRoute.stops.length >= 5 : false;
              const isFullyFeasible = optimisedRoute?.feasible && hasAllCountries && hasMinimumMatches;
              const canCalculate = isFullyFeasible && originCityId;

              return (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleCalculateBudget}
                    disabled={!canCalculate || calculating}
                    style={{ width: '100%', marginBottom: '1rem' }}
                  >
                    {calculating ? 'Calculating...' : 'Calculate Cost'}
                  </button>

                  {!canCalculate && (
                    <p className="helper-text">
                      {!optimisedRoute
                        ? 'Plan your route first'
                        : !isFullyFeasible
                        ? 'Fix route validation issues first'
                        : 'Select a starting city above'}
                    </p>
                  )}
                </>
              );
            })()}

            {budgetResult && (
              <CostBreakdownPanel result={budgetResult} budget={budget} />
            )}
          </div>
        </div>
      </div>

      {/* Best Value Dialog */}
      {showBestValueDialog && bestValueResult && (
        <BestValueDialog
          result={bestValueResult}
          budget={budget}
          onClose={() => setShowBestValueDialog(false)}
          onApply={handleApplyBestValue}
        />
      )}
    </div>
  );
}

export default App;
