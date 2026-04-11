package com.unosquare.worldcup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BestValueResultDTO {
    private Boolean withinBudget;
    private List<MatchWithCityDTO> matches;
    private OptimisedRouteDTO route;
    private CostBreakdownDTO costBreakdown;
    private List<String> countriesVisited;
    private Integer matchCount;
    private String message;
}
