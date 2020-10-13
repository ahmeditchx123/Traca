package com.apeiron.traca.service;

import com.apeiron.traca.service.dto.DeliveryManDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing DeliveryMan.
 */
public interface DeliveryManService {

    /**
     * Save a deliveryMan.
     *
     * @param deliveryManDTO the entity to save
     * @return the persisted entity
     */
    DeliveryManDTO save(DeliveryManDTO deliveryManDTO);

    /**
     * Get all the deliveryMen.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DeliveryManDTO> findAll(Pageable pageable);


    /**
     * Get the "id" deliveryMan.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DeliveryManDTO> findOne(Long id);

    /**
     * Delete the "id" deliveryMan.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
