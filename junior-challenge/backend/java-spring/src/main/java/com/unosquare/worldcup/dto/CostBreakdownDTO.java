package com.unosquare.worldcup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CostBreakdownDTO {
    private Double flights;
    private Double accommodation;
    private Double tickets;
    private Double total;
}
