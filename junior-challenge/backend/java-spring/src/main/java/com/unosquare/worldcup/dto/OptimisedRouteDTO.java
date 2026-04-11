package com.unosquare.worldcup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptimisedRouteDTO {
    private List<ItineraryStopDTO> stops;
    private double totalDistance;
    private String strategy;
    private boolean feasible = true;
    private List<String> warnings = new ArrayList<>();
    private List<String> countriesVisited = new ArrayList<>();
    private List<String> missingCountries = new ArrayList<>();

    public OptimisedRouteDTO(List<ItineraryStopDTO> stops, double totalDistance, String strategy) {
        this.stops = stops;
        this.totalDistance = totalDistance;
        this.strategy = strategy;
        this.feasible = true;
        this.warnings = new ArrayList<>();
        this.countriesVisited = new ArrayList<>();
        this.missingCountries = new ArrayList<>();
    }
}
