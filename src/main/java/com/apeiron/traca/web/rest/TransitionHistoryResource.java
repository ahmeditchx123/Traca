package com.apeiron.traca.web.rest;
import com.apeiron.traca.service.TransitionHistoryService;
import com.apeiron.traca.web.rest.errors.BadRequestAlertException;
import com.apeiron.traca.web.rest.util.HeaderUtil;
import com.apeiron.traca.web.rest.util.PaginationUtil;
import com.apeiron.traca.service.dto.TransitionHistoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TransitionHistory.
 */
@RestController
@RequestMapping("/api")
public class TransitionHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TransitionHistoryResource.class);

    private static final String ENTITY_NAME = "transitionHistory";

    private final TransitionHistoryService transitionHistoryService;

    public TransitionHistoryResource(TransitionHistoryService transitionHistoryService) {
        this.transitionHistoryService = transitionHistoryService;
    }

    /**
     * POST  /transition-histories : Create a new transitionHistory.
     *
     * @param transitionHistoryDTO the transitionHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transitionHistoryDTO, or with status 400 (Bad Request) if the transitionHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transition-histories")
    public ResponseEntity<TransitionHistoryDTO> createTransitionHistory(@RequestBody TransitionHistoryDTO transitionHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save TransitionHistory : {}", transitionHistoryDTO);
        if (transitionHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new transitionHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransitionHistoryDTO result = transitionHistoryService.save(transitionHistoryDTO);
        return ResponseEntity.created(new URI("/api/transition-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transition-histories : Updates an existing transitionHistory.
     *
     * @param transitionHistoryDTO the transitionHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transitionHistoryDTO,
     * or with status 400 (Bad Request) if the transitionHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the transitionHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transition-histories")
    public ResponseEntity<TransitionHistoryDTO> updateTransitionHistory(@RequestBody TransitionHistoryDTO transitionHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update TransitionHistory : {}", transitionHistoryDTO);
        if (transitionHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransitionHistoryDTO result = transitionHistoryService.save(transitionHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transitionHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transition-histories : get all the transitionHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transitionHistories in body
     */
    @GetMapping("/transition-histories")
    public ResponseEntity<List<TransitionHistoryDTO>> getAllTransitionHistories(Pageable pageable) {
        log.debug("REST request to get a page of TransitionHistories");
        Page<TransitionHistoryDTO> page = transitionHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transition-histories");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /transition-histories/:id : get the "id" transitionHistory.
     *
     * @param id the id of the transitionHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transitionHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transition-histories/{id}")
    public ResponseEntity<TransitionHistoryDTO> getTransitionHistory(@PathVariable Long id) {
        log.debug("REST request to get TransitionHistory : {}", id);
        Optional<TransitionHistoryDTO> transitionHistoryDTO = transitionHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transitionHistoryDTO);
    }

    /**
     * DELETE  /transition-histories/:id : delete the "id" transitionHistory.
     *
     * @param id the id of the transitionHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transition-histories/{id}")
    public ResponseEntity<Void> deleteTransitionHistory(@PathVariable Long id) {
        log.debug("REST request to delete TransitionHistory : {}", id);
        transitionHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
