import { NearestNeighbourStrategy } from '../src/strategies/NearestNeighbourStrategy';
import { MatchWithCity } from '../src/strategies/RouteStrategy';

/**
 * NearestNeighbourStrategyTest — YOUR TASK #4
 *
 * ============================================================
 * WHAT YOU NEED TO IMPLEMENT:
 * ============================================================
 *
 * Write unit tests for the NearestNeighbourStrategy.
 * Each test has a TODO comment explaining what to test.
 *
 */

describe('NearestNeighbourStrategy', () => {
  let strategy: NearestNeighbourStrategy;

  beforeEach(() => {
    strategy = new NearestNeighbourStrategy();
  });

  it('should return a valid route for multiple matches (happy path)', () => {
    // TODO: Implement test
    // Arrange: Create an array of matches across different cities and dates
    // Act: Call strategy.optimise(matches)
    // Assert: Verify the result has stops, totalDistance > 0, and strategy = 'nearest-neighbour'
    fail('Test not implemented');
  });

  it('should return an empty route for empty matches', () => {
    // TODO: Implement test
    // Arrange: Create an empty array of matches
    // Act: Call strategy.optimise([])
    // Assert: Verify the result has empty stops and totalDistance = 0
    fail('Test not implemented');
  });

  it('should return zero distance for a single match', () => {
    // TODO: Implement test
    // Arrange: Create an array with a single match
    // Act: Call strategy.optimise(matches)
    // Assert: Verify totalDistance = 0 and stops.length = 1
    fail('Test not implemented');
  });
});
