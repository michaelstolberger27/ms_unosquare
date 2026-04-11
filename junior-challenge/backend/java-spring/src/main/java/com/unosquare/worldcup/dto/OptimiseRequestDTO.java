package com.unosquare.worldcup.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class OptimiseRequestDTO {
    private List<String> matchIds;
    private String originCityId;
}
