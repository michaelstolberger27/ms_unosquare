package com.unosquare.worldcup.repository;

import com.unosquare.worldcup.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, String> {

    @Query("SELECT m FROM Match m WHERE m.city.id = :cityId ORDER BY m.kickoff")
    List<Match> findByCityId(@Param("cityId") String cityId);

    List<Match> findByIdIn(List<String> ids);

    @Query("SELECT m FROM Match m ORDER BY m.kickoff")
    List<Match> findAllOrderByKickoff();
}
