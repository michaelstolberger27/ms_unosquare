namespace WorldCup.Api.Models;

public class City
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Stadium { get; set; } = string.Empty;
    public double AccommodationPerNight { get; set; } = 150.0;
}
