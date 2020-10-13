package com.apeiron.traca.repository;

import com.apeiron.traca.domain.Shipper;
import com.apeiron.traca.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the Shipper entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShipperRepository extends JpaRepository<Shipper, Long> {

    Optional<Shipper> findOneByLogin(String login);
    List<Shipper> findAllByCreatedDateIsBetween(Instant startDate, Instant endDate);
}
