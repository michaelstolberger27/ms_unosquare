// NOTE: THIS CLASS DOES NOT NEED MODIFIED
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace WorldCup.Api.Tests;

public class HealthEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public HealthEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Health_ReturnsOk()
    {
        var response = await _client.GetAsync("/health");

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        Assert.Contains("ok", json);
    }

    [Fact]
    public async Task Health_ReturnsJsonWithStatusField()
    {
        var response = await _client.GetAsync("/health");

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"status\"", json);
        Assert.Contains("\"ok\"", json);
    }
}
