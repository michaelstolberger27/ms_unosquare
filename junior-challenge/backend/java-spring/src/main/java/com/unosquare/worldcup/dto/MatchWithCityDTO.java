package com.unosquare.worldcup.dto;

import com.unosquare.worldcup.model.City;
import com.unosquare.worldcup.model.Match;
import com.unosquare.worldcup.model.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchWithCityDTO {
    private String id;
    private Team homeTeam;
    private Team awayTeam;
    private City city;
    private LocalDateTime kickoff;
    private String group;
    private int matchDay;
    private Double ticketPrice;

    public static MatchWithCityDTO fromEntity(Match match) {
        return new MatchWithCityDTO(
                match.getId(),
                match.getHomeTeam(),
                match.getAwayTeam(),
                match.getCity(),
                match.getKickoff(),
                match.getGroupName(),
                match.getMatchDay(),
                match.getTicketPrice()
        );
    }
}
