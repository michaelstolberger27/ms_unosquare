package com.unosquare.worldcup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FlightPrice entity — DO NOT MODIFY
 *
 * Represents the cost of a flight between two cities.
 * Used for budget-constrained route optimisation.
 */
@Entity
@Table(name = "flight_prices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightPrice {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "origin_city_id")
    private City originCity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_city_id")
    private City destinationCity;

    @Column(name = "price_usd")
    private Double priceUsd;
}
