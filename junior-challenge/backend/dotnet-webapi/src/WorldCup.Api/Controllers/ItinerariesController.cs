using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorldCup.Api.Data;
using WorldCup.Api.Models;
using WorldCup.Api.Dtos;

namespace WorldCup.Api.Controllers;

/// <summary>
/// Itinerary Routes — Pre-built (no implementation needed)
///
/// These endpoints handle saving and retrieving trip itineraries.
/// </summary>
[ApiController]
[Route("api/itineraries")]
public class ItinerariesController : ControllerBase
{
    private readonly WorldCupDbContext _context;

    public ItinerariesController(WorldCupDbContext context)
    {
        _context = context;
    }

    // POST /api/itineraries — Save an optimised route
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OptimisedRouteDto request)
    {
        var itinerary = new Itinerary
        {
            Strategy = request.Strategy,
            TotalDistance = request.TotalDistance,
            Stops = request.Stops.Select(s => new ItineraryStop
            {
                StopNumber = s.StopNumber,
                MatchId = s.Match.Id,
                CityId = s.City.Id,
                DistanceFromPrevious = s.DistanceFromPrevious
            }).ToList()
        };

        _context.Itineraries.Add(itinerary);
        await _context.SaveChangesAsync();

        return StatusCode(201, new { id = itinerary.Id });
    }

    // GET /api/itineraries/{id} — Retrieve a saved itinerary
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var itinerary = await _context.Itineraries
            .Where(i => i.Id == id)
            .Select(i => new
            {
                i.Id,
                i.Strategy,
                i.TotalDistance,
                i.CreatedAt,
                Stops = i.Stops.OrderBy(s => s.StopNumber).Select(s => new
                {
                    s.StopNumber,
                    s.MatchId,
                    s.CityId,
                    s.DistanceFromPrevious
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (itinerary == null)
        {
            return NotFound(new { error = "Itinerary not found" });
        }

        return Ok(itinerary);
    }
}
