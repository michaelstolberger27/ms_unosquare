package com.unosquare.worldcup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "itineraries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {

    @Id
    private String id;
    private LocalDateTime createdAt;
    private String strategy;
    private double totalDistance;

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("stopNumber")
    private List<ItineraryStop> stops = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID().toString();
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
