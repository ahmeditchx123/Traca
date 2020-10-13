package com.apeiron.traca.service;

import com.apeiron.traca.service.dto.ShipperDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Shipper.
 */
public interface ShipperService {

    /**
     * Save a shipper.
     *
     * @param shipperDTO the entity to save
     * @return the persisted entity
     */
    ShipperDTO save(ShipperDTO shipperDTO);

    /**
     * Get all the shippers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ShipperDTO> findAll(Pageable pageable);


    /**
     * Get the "id" shipper.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ShipperDTO> findOne(Long id);

    /**
     * Delete the "id" shipper.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
