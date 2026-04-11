package com.unosquare.worldcup.repository;

import com.unosquare.worldcup.model.FlightPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightPriceRepository extends JpaRepository<FlightPrice, String> {
}
