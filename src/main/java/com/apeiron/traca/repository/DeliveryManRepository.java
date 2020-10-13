package com.apeiron.traca.repository;

import com.apeiron.traca.domain.DeliveryMan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the DeliveryMan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryManRepository extends JpaRepository<DeliveryMan, Long> {
    List<DeliveryMan> findAllByCreationDateIsBetween(Instant startDate, Instant endDate);

}
