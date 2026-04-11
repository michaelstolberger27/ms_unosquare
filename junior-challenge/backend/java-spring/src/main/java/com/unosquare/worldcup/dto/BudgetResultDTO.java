package com.unosquare.worldcup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResultDTO {
    private Boolean feasible;
    private OptimisedRouteDTO route;
    private CostBreakdownDTO costBreakdown;
    private List<String> countriesVisited;
    private List<String> missingCountries;
    private Double minimumBudgetRequired;
    private List<String> suggestions;
}
