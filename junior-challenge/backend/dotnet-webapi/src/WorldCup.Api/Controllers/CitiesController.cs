using Microsoft.AspNetCore.Mvc;
using WorldCup.Api.Data;

namespace WorldCup.Api.Controllers;

/// <summary>
/// City Routes — YOUR TASK #1
///
/// Implement the REST endpoints for cities.
/// </summary>
[ApiController]
[Route("api/cities")]
public class CitiesController : ControllerBase
{
    private readonly WorldCupDbContext _context;

    public CitiesController(WorldCupDbContext context)
    {
        _context = context;
    }

    // ============================================================
    //  GET /api/cities — Return all host cities
    // ============================================================
    //
    // TODO: Implement this endpoint
    //
    // This should return all 16 host cities as a JSON array.
    //
    // Hint: Use _context.Cities.ToListAsync() to get all cities.
    //
    // Expected response: [{ id, name, country, latitude, longitude, stadium }, ...]
    //
    // ============================================================

    [HttpGet]
    public IActionResult GetAll()
    {
        // TODO: Replace with your implementation
        return StatusCode(501, new { error = "Not implemented" });
    }
}
