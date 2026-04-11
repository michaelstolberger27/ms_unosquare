package com.unosquare.worldcup.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class BudgetRequestDTO {
    private Double budget;
    private List<String> matchIds;
    private String originCityId;
}
