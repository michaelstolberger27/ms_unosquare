using Microsoft.AspNetCore.Mvc;
using WorldCup.Api.Data;
using WorldCup.Api.Dtos;
using WorldCup.Api.Strategies;

namespace WorldCup.Api.Controllers;

/// <summary>
/// Route API — YOUR TASK #3 and #5
///
/// Implement route optimisation and budget calculation endpoints.
/// </summary>
[ApiController]
[Route("api/route")]
public class RouteController : ControllerBase
{
    private readonly WorldCupDbContext _context;
    private readonly IRouteStrategy _strategy;

    public RouteController(WorldCupDbContext context, IRouteStrategy strategy)
    {
        _context = context;
        _strategy = strategy;
    }

    // ============================================================
    //  POST /api/route/optimise — Optimise travel route for selected matches
    // ============================================================
    //
    // TODO: Implement this endpoint (YOUR TASK #3)
    //
    // Accept a list of match IDs and return an optimised travel route
    // using the injected IRouteStrategy.
    //
    // Expected request body:
    //   { "matchIds": ["match-1", "match-5", "match-12"] }
    //
    // Steps:
    //   1. Read matchIds from the request body (OptimiseRequestDto).
    //   2. Load the corresponding Match entities from the database,
    //      including their City, HomeTeam, and AwayTeam navigation properties.
    //   3. Map each Match to a MatchWithCityDto.
    //   4. Pass the list to _strategy.Optimise() to get the optimised route.
    //   5. Return the OptimisedRouteDto result.
    //
    // Hints:
    //   - Use .Where(m => request.MatchIds.Contains(m.Id)) to filter matches.
    //   - Use .Include() for City, HomeTeam, AwayTeam (same as MatchesController).
    //   - Use MatchWithCityDto.FromEntity(match) to map entities to DTOs.
    //   - The IRouteStrategy is injected via the constructor — just call _strategy.Optimise().
    //
    // Expected response: { stops: [...], totalDistance: 12345.67, strategy: "date-only" }
    //
    // ============================================================
    [HttpPost("optimise")]
    public async Task<IActionResult> Optimise([FromBody] OptimiseRequestDto request)
    {
        // TODO: Replace with your implementation
        return Ok();
    }

    // ============================================================
    //  POST /api/route/budget — Calculate trip costs and check budget
    // ============================================================
    //
    // TODO: Implement this endpoint (YOUR TASK #5)
    //
    // Request body:
    // {
    //   "budget": 5000.00,
    //   "matchIds": ["match-1", "match-5", "match-12", ...],
    //   "originCityId": "city-atlanta"
    // }
    //
    // Steps:
    //   1. Accept a BudgetRequestDto from the request body
    //   2. Fetch matches by IDs (with City, HomeTeam, AwayTeam included)
    //   3. Fetch all FlightPrice records from the database
    //   4. Create a CostCalculator and call Calculate()
    //   5. Return the BudgetResultDto
    //
    // IMPORTANT CONSTRAINTS:
    //   - User MUST attend at least 1 match in each country (USA, Mexico, Canada)
    //   - If the budget is insufficient, return Feasible=false with:
    //     - MinimumBudgetRequired: the actual cost
    //     - Suggestions: ways to reduce cost
    //   - If countries are missing, return Feasible=false with:
    //     - MissingCountries: list of countries not covered
    //
    // ============================================================
    [HttpPost("budget")]
    public async Task<IActionResult> BudgetOptimise([FromBody] BudgetRequestDto request)
    {
        // TODO: Replace with your implementation (YOUR TASK #5)
        return Ok(new BudgetResultDto());
    }

    // ============================================================
    //  POST /api/route/best-value — Find best match combination within budget
    // ============================================================
    //
    // TODO: Implement this endpoint (BONUS CHALLENGE #1)
    //
    // Request body:
    // {
    //   "budget": 5000.00,
    //   "originCityId": "city-atlanta"
    // }
    //
    // Steps:
    //   1. Accept a BestValueRequestDto from the request body
    //   2. Fetch all available matches from the database
    //   3. Fetch all FlightPrice records from the database
    //   4. Create a BestValueFinder and call FindBestValue()
    //   5. Return the BestValueResultDto
    //
    // Requirements:
    //   - Find the maximum number of matches that fit within budget
    //   - Must include at least 1 match in each country (USA, Mexico, Canada)
    //   - Minimum 5 matches required
    //   - Return optimised route with cost breakdown
    //
    // ============================================================
    [HttpPost("best-value")]
    public async Task<IActionResult> BestValue([FromBody] BestValueRequestDto request)
    {
        // TODO: Replace with your implementation (BONUS CHALLENGE #1)
        return Ok(new BestValueResultDto());
    }
}
