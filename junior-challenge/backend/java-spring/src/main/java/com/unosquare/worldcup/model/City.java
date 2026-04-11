package com.unosquare.worldcup.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {

    @Id
    private String id;
    private String name;
    private String country;
    private Double latitude;
    private Double longitude;
    private String stadium;
    private Double accommodationPerNight;
}
