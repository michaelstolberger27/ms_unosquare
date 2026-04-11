package com.unosquare.worldcup.controller;

import com.unosquare.worldcup.model.Itinerary;
import com.unosquare.worldcup.service.ItineraryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * ItineraryController — Provided (no implementation needed)
 *
 * REST endpoints for saving and retrieving itineraries.
 */
@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @PostMapping
    public ResponseEntity<Itinerary> create(@RequestBody Itinerary itinerary) {
        Itinerary saved = itineraryService.createItinerary(itinerary);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Itinerary> getById(@PathVariable String id) {
        return itineraryService.getItineraryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
