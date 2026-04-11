package com.unosquare.worldcup.repository;

import com.unosquare.worldcup.model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, String> {
}
