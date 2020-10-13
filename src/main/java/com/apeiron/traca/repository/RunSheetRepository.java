package com.apeiron.traca.repository;

import com.apeiron.traca.domain.RunSheet;
import com.apeiron.traca.domain.enumeration.RunSheetStatut;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the RunSheet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RunSheetRepository extends JpaRepository<RunSheet, Long> {

    Long countByStatus(RunSheetStatut statut);
    List<RunSheet> findAllByCreationDateIsBetween(Instant startDate, Instant endDate);
}
