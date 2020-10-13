package com.apeiron.traca.service;

import com.apeiron.traca.service.dto.RunSheetDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing RunSheet.
 */
public interface RunSheetService {

    /**
     * Save a runSheet.
     *
     * @param runSheetDTO the entity to save
     * @return the persisted entity
     */
    RunSheetDTO save(RunSheetDTO runSheetDTO);

    /**
     * Get all the runSheets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RunSheetDTO> findAll(Pageable pageable);


    /**
     * Get the "id" runSheet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RunSheetDTO> findOne(Long id);

    /**
     * Delete the "id" runSheet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

      /**
     * Find one page of runSheets.
     *
     * @param id the id of the entity
     */
    List<RunSheetDTO> findOnePageRunSheets(int pageSize);


}
