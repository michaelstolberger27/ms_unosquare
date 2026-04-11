// NOTE: THIS CLASS DOES NOT NEED MODIFIED
using WorldCup.Api.Dtos;
using WorldCup.Api.Utils;

namespace WorldCup.Api.Strategies;

/// <summary>
/// DateOnlyStrategy — sorts matches by kickoff date and builds a route.
///
/// This is the simplest strategy: it visits matches in chronological order
/// without any distance optimisation. Use this as a reference implementation
/// when building your own strategy.
/// </summary>
public class DateOnlyStrategy : IRouteStrategy
{
    public OptimisedRouteDto Optimise(List<MatchWithCityDto> matches)
    {
        var sorted = matches.OrderBy(m => m.Kickoff).ToList();
        return BuildRouteUtil.BuildRoute(sorted, "date-only");
    }
}
