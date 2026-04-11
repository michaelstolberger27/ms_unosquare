using Microsoft.AspNetCore.Mvc;
using WorldCup.Api.Data;

namespace WorldCup.Api.Controllers;

/// <summary>
/// Matches API — YOUR TASK #2
///
/// Implement the REST endpoints for matches.
/// </summary>
[ApiController]
[Route("api/matches")]
public class MatchesController : ControllerBase
{
    private readonly WorldCupDbContext _context;

    public MatchesController(WorldCupDbContext context)
    {
        _context = context;
    }

    // ============================================================
    //  GET /api/matches — Return all matches (with optional filters)
    // ============================================================
    //
    // TODO: Implement this endpoint (YOUR TASK #2)
    //
    // Return all matches with their related city, home team, and away team
    // data included (not just foreign key IDs).
    //
    // Query parameters (both optional):
    //   ?city=city-atlanta   — filter matches by city ID
    //   ?date=2026-06-11     — filter matches by kickoff date
    //
    // Hints:
    //   - Use _context.Matches
    //         .Include(m => m.HomeTeam)
    //         .Include(m => m.AwayTeam)
    //         .Include(m => m.City)
    //     to eagerly load related data.
    //
    //   - Apply .Where() filters conditionally based on query params.
    //     For date filtering, match.Kickoff.StartsWith(date) works
    //     since kickoff is stored as an ISO string (e.g. "2026-06-11T17:00:00Z").
    //
    //   - Map each Match entity to a MatchWithCityDto using
    //     MatchWithCityDto.FromEntity(match) before returning.
    //
    // Expected response: [{ id, homeTeam, awayTeam, city, kickoff, group, matchDay }, ...]
    //
    // ============================================================
    [HttpGet]
    public IActionResult GetAll([FromQuery] string? city, [FromQuery] string? date)
    {
        // TODO: Replace with your implementation
        return StatusCode(501, new { error = "Not implemented" });
    }

    // ============================================================
    //  GET /api/matches/{id} — Return a single match by ID
    // ============================================================
    //
    // TODO: Implement this endpoint (YOUR TASK #2)
    //
    // Look up a single match by its ID and return it with related data.
    //
    // Hints:
    //   - Use .Include() for HomeTeam, AwayTeam, and City (same as above).
    //   - Use .FirstOrDefaultAsync(m => m.Id == id) to find the match.
    //   - Return 404 if the match is not found.
    //   - Map to MatchWithCityDto before returning.
    //
    // Expected response: { id, homeTeam, awayTeam, city, kickoff, group, matchDay }
    //
    // ============================================================
    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        // TODO: Replace with your implementation
        return StatusCode(501, new { error = "Not implemented" });
    }
}
