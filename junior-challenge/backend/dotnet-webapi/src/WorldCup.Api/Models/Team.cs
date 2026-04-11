using System.Text.Json.Serialization;

namespace WorldCup.Api.Models;

public class Team
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;

    [JsonPropertyName("group")]
    public string GroupName { get; set; } = string.Empty;
}
