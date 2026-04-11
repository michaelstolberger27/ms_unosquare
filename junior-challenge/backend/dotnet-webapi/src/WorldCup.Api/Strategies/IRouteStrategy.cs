using WorldCup.Api.Dtos;

namespace WorldCup.Api.Strategies;

/// <summary>
/// RouteStrategy — the Strategy Pattern contract.
///
/// Every route optimisation strategy must implement this interface.
/// This allows different algorithms to be swapped in without changing
/// the calling code (Open/Closed Principle).
/// </summary>
public interface IRouteStrategy
{
    /// <summary>
    /// Optimise the order of matches to minimise travel distance.
    /// </summary>
    /// <param name="matches">List of matches the fan wants to attend.</param>
    /// <returns>An optimised route with ordered stops and total distance.</returns>
    OptimisedRouteDto Optimise(List<MatchWithCityDto> matches);
}
