package com.unosquare.worldcup.controller;

import com.unosquare.worldcup.dto.MatchWithCityDTO;
import com.unosquare.worldcup.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * MatchController — YOUR TASK #2
 *
 * Implement the REST endpoints for matches.
 */
@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    // ============================================================
    //  GET /api/matches — Return matches with optional filters
    // ============================================================
    //
    // TODO: Implement this endpoint
    //
    // Query parameters (both optional):
    //   ?city=city-atlanta    → filter by city ID
    //   ?date=2026-06-14      → filter by date (YYYY-MM-DD)
    //
    // Hint: Use @RequestParam(required = false) to make params optional.
    // Use matchService.getMatches(city, date) to get filtered matches.
    //
    // ============================================================

    @GetMapping
    public List<MatchWithCityDTO> getMatches(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) LocalDate date) {
        // TODO: Implement this endpoint
        // Hint: Use matchService.getMatches(city, date)
        return new ArrayList<>();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchWithCityDTO> getMatchById(@PathVariable String id) {
        return matchService.getMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
