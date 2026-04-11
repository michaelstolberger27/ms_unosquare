package com.unosquare.worldcup.service;

import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * CityService — YOUR TASK #1.1
 *
 * This service handles business logic for city operations.
 */
@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    // ============================================================
    //  Get all cities
    // ============================================================
    //
    // TODO: Implement this method
    //
    // This should return all 16 host cities.
    //
    // Hint: Use cityRepository.findAll()
    //
    // ============================================================

    public List<City> getAllCities() {
        // TODO: Implement this method to return all cities
        // Hint: Use cityRepository.findAll()
        return new ArrayList<>();
    }
}
