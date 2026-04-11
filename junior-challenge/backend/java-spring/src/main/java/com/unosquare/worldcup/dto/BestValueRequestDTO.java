package com.unosquare.worldcup.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BestValueRequestDTO {
    private String originCityId;
    private Double budget;
}
