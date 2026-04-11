import { Router } from 'express';
import * as MatchModel from '../models/Match';
import * as CityModel from '../models/City';
import { NearestNeighbourStrategy } from '../strategies/NearestNeighbourStrategy';
// Tip: You can also import DateOnlyStrategy to compare results
// import { DateOnlyStrategy } from '../strategies/DateOnlyStrategy';

const router = Router();

/**
 * Route Optimisation Routes — YOUR TASKS #3 and #5
 */

// ============================================================
//  POST /api/route/optimise — YOUR TASK #3
// ============================================================
//
// TODO: Implement this endpoint
//
// Request body: { matchIds: ["match-1", "match-5", "match-12", ...], originCityId: "city-atlanta" }
//
// Steps:
//   1. Extract matchIds and originCityId from req.body
//   2. Fetch the full match data: MatchModel.getByIds(matchIds)
//   3. Fetch origin city: CityModel.getById(originCityId)
//   4. Create a strategy instance: new NearestNeighbourStrategy()
//      (or new DateOnlyStrategy() to test with the working example first)
//   5. Call strategy.optimise(matches, originCity)
//   6. Return the optimised route as JSON
//
// TIP: Start by using DateOnlyStrategy to verify your endpoint works,
// then switch to NearestNeighbourStrategy once you've implemented it.
//
// ============================================================

router.post('/optimise', (req, res) => {
  // TODO: Replace with your implementation
  res.status(200).json({});
});

// ============================================================
//  POST /api/route/budget — YOUR TASK #5
// ============================================================
//
// TODO: Implement this endpoint
//
// Request body:
// {
//   "budget": 5000.00,
//   "matchIds": ["match-1", "match-5", "match-12", ...],
//   "originCityId": "city-atlanta"
// }
//
// Steps:
//   1. Extract budget, matchIds, and originCityId from req.body
//   2. Fetch matches by IDs: MatchModel.getByIds(matchIds)
//   3. Fetch origin city: CityModel.getById(originCityId)
//   4. Fetch all flight prices from the database
//   5. Use the CostCalculator to calculate the budget result
//   6. Return the BudgetResult as JSON
//
// Hint: Import and use the CostCalculator from '../utils/CostCalculator'
//
// IMPORTANT CONSTRAINTS:
//   - User MUST attend at least 1 match in each country (USA, Mexico, Canada)
//   - If the budget is insufficient, return feasible=false with:
//     - minimumBudgetRequired: the actual cost
//     - suggestions: ways to reduce cost
//   - If countries are missing, return feasible=false with:
//     - missingCountries: list of countries not covered
//
// ============================================================

router.post('/budget', (req, res) => {
  // TODO: Replace with your implementation
  res.status(200).json({});
});

// ============================================================
//  POST /api/route/best-value — BONUS CHALLENGE #1
// ============================================================
//
// TODO: Implement this endpoint (BONUS)
//
// Request body:
// {
//   "budget": 5000.00,
//   "originCityId": "city-atlanta"
// }
//
// Steps:
//   1. Extract budget and originCityId from req.body
//   2. Fetch all matches: MatchModel.getAll()
//   3. Fetch origin city: CityModel.getById(originCityId)
//   4. Fetch all flight prices from the database
//   5. Use the BestValueFinder to find the best combination
//   6. Return the BestValueResult as JSON
//
// Hint: Import and use the BestValueFinder from '../bonus/BestValueFinder'
//
// ============================================================

router.post('/best-value', (req, res) => {
  // TODO: Replace with your implementation (BONUS)
  res.status(200).json({});
});

export default router;
