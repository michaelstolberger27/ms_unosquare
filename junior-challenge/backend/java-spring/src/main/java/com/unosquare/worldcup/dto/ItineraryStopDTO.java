package com.unosquare.worldcup.dto;

import com.unosquare.worldcup.model.City;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryStopDTO {
    private int stopNumber;
    private City city;
    private MatchWithCityDTO match;
    private double distanceFromPrevious;
}
