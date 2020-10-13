package com.apeiron.traca.service;

import com.apeiron.traca.service.dto.TransitionHistoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing TransitionHistory.
 */
public interface TransitionHistoryService {

    /**
     * Save a transitionHistory.
     *
     * @param transitionHistoryDTO the entity to save
     * @return the persisted entity
     */
    TransitionHistoryDTO save(TransitionHistoryDTO transitionHistoryDTO);

    /**
     * Get all the transitionHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TransitionHistoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" transitionHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransitionHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" transitionHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
