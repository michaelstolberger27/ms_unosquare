package com.unosquare.worldcup.service;

import com.unosquare.worldcup.model.Itinerary;
import com.unosquare.worldcup.model.ItineraryStop;
import com.unosquare.worldcup.repository.ItineraryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * ItineraryService — Provided (no implementation needed)
 *
 * This service handles business logic for itinerary operations.
 */
@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;

    public ItineraryService(ItineraryRepository itineraryRepository) {
        this.itineraryRepository = itineraryRepository;
    }

    /**
     * Save an itinerary, linking stops to the parent.
     */
    public Itinerary createItinerary(Itinerary itinerary) {
        // Link stops to the itinerary before saving
        if (itinerary.getStops() != null) {
            for (ItineraryStop stop : itinerary.getStops()) {
                stop.setItinerary(itinerary);
            }
        }
        return itineraryRepository.save(itinerary);
    }

    /**
     * Get an itinerary by ID.
     */
    public Optional<Itinerary> getItineraryById(String id) {
        return itineraryRepository.findById(id);
    }
}
