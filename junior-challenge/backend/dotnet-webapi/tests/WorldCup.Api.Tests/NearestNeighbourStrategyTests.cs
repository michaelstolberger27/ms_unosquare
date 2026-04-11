using WorldCup.Api.Dtos;
using WorldCup.Api.Strategies;
using Xunit;

namespace WorldCup.Api.Tests;

/// <summary>
/// NearestNeighbourStrategyTests — YOUR TASK #4
///
/// ============================================================
/// WHAT YOU NEED TO IMPLEMENT:
/// ============================================================
///
/// Write unit tests for the NearestNeighbourStrategy.
/// Each test has a TODO comment explaining what to test.
///
/// </summary>
public class NearestNeighbourStrategyTests
{
    private readonly NearestNeighbourStrategy _strategy;

    public NearestNeighbourStrategyTests()
    {
        _strategy = new NearestNeighbourStrategy();
    }

    [Fact]
    public void ShouldReturnValidRouteForMultipleMatches()
    {
        // TODO: Implement test (YOUR TASK #4)
        // Arrange: Create a list of matches across different cities and dates
        // Act: Call _strategy.Optimise(matches)
        // Assert: Verify the result has stops, TotalDistance > 0, and Strategy = "nearest-neighbour"
        Assert.Fail("Test not implemented");
    }

    [Fact]
    public void ShouldReturnEmptyRouteForEmptyMatches()
    {
        // TODO: Implement test (YOUR TASK #4)
        // Arrange: Create an empty list of matches
        // Act: Call _strategy.Optimise(new List<MatchWithCityDto>())
        // Assert: Verify the result has empty stops and TotalDistance = 0
        Assert.Fail("Test not implemented");
    }

    [Fact]
    public void ShouldReturnZeroDistanceForSingleMatch()
    {
        // TODO: Implement test (YOUR TASK #4)
        // Arrange: Create a list with a single match
        // Act: Call _strategy.Optimise(matches)
        // Assert: Verify TotalDistance = 0 and Stops.Count = 1
        Assert.Fail("Test not implemented");
    }
}
