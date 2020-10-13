package com.apeiron.traca.repository;

import com.apeiron.traca.domain.TransitionHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransitionHistory entity.
 */
@Repository
public interface TransitionHistoryRepository extends JpaRepository<TransitionHistory, Long> {

}
