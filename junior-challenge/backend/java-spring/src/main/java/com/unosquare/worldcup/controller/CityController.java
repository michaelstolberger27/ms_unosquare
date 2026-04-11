package com.unosquare.worldcup.controller;

import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.service.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CityController — YOUR TASK #1
 *
 * Implement the REST endpoints for cities.
 */
@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    // ============================================================
    //  GET /api/cities — Return all host cities
    // ============================================================
    //
    // TODO: Implement this endpoint
    //
    // This should return all 16 host cities as a JSON array.
    //
    // Hint: The CityService is already injected. Use cityService.getAllCities()
    //
    // Expected response: [{ id, name, country, latitude, longitude, stadium }, ...]
    //

    @GetMapping
    public List<City> getAll() {
        // TODO: Implement this endpoint to return all cities
        // Hint: Use cityService.getAllCities()
        return null;
    }
}
