// NOTE: THIS CLASS DOES NOT NEED MODIFIED

import { RouteStrategy, MatchWithCity, OptimisedRoute } from './RouteStrategy';
import { buildRoute } from '../utils/buildRoute';

/**
 * DateOnlyStrategy — A naive route optimisation that simply sorts by date.
 *
 * This strategy produces valid routes but doesn't consider geographic distance.
 * It's provided as a working example so you can test your endpoints before
 * implementing NearestNeighbourStrategy.
 *
 * Try running this strategy and then your NearestNeighbourStrategy on the
 * same set of matches — compare the total distances!
 */
export class DateOnlyStrategy implements RouteStrategy {
  optimise(matches: MatchWithCity[]): OptimisedRoute {
    // Simply sort matches by kickoff time — no distance optimisation
    const sorted = [...matches].sort(
      (a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime()
    );

    return buildRoute(sorted, 'date-only');
  }
}
