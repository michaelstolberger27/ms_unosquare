package com.unosquare.worldcup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "itinerary_stops")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryStop {

    @Id
    private String id;
    private int stopNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "match_id")
    private Match match;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id")
    private City city;

    private double distanceFromPrevious;

    @ManyToOne
    @JoinColumn(name = "itinerary_id")
    @JsonIgnore
    private Itinerary itinerary;

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID().toString();
    }
}
