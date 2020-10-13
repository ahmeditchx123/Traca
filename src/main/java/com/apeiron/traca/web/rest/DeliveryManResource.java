package com.apeiron.traca.web.rest;
import com.apeiron.traca.service.DeliveryManService;
import com.apeiron.traca.web.rest.errors.BadRequestAlertException;
import com.apeiron.traca.web.rest.util.HeaderUtil;
import com.apeiron.traca.web.rest.util.PaginationUtil;
import com.apeiron.traca.service.dto.DeliveryManDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DeliveryMan.
 */
@RestController
@RequestMapping("/api")
public class DeliveryManResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryManResource.class);

    private static final String ENTITY_NAME = "deliveryMan";

    private final DeliveryManService deliveryManService;

    public DeliveryManResource(DeliveryManService deliveryManService) {
        this.deliveryManService = deliveryManService;
    }

    /**
     * POST  /delivery-men : Create a new deliveryMan.
     *
     * @param deliveryManDTO the deliveryManDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryManDTO, or with status 400 (Bad Request) if the deliveryMan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-men")
    public ResponseEntity<DeliveryManDTO> createDeliveryMan(@Valid @RequestBody DeliveryManDTO deliveryManDTO) throws URISyntaxException {
        log.debug("REST request to save DeliveryMan : {}", deliveryManDTO);
        if (deliveryManDTO.getId() != null) {
            throw new BadRequestAlertException("A new deliveryMan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryManDTO result = deliveryManService.save(deliveryManDTO);
        return ResponseEntity.created(new URI("/api/delivery-men/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-men : Updates an existing deliveryMan.
     *
     * @param deliveryManDTO the deliveryManDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryManDTO,
     * or with status 400 (Bad Request) if the deliveryManDTO is not valid,
     * or with status 500 (Internal Server Error) if the deliveryManDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-men")
    public ResponseEntity<DeliveryManDTO> updateDeliveryMan(@Valid @RequestBody DeliveryManDTO deliveryManDTO) throws URISyntaxException {
        log.debug("REST request to update DeliveryMan : {}", deliveryManDTO);
        if (deliveryManDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryManDTO result = deliveryManService.save(deliveryManDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryManDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-men : get all the deliveryMen.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryMen in body
     */
    @GetMapping("/delivery-men")
    public ResponseEntity<List<DeliveryManDTO>> getAllDeliveryMen(Pageable pageable) {
        log.debug("REST request to get a page of DeliveryMen");
        Page<DeliveryManDTO> page = deliveryManService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/delivery-men");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /delivery-men/:id : get the "id" deliveryMan.
     *
     * @param id the id of the deliveryManDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryManDTO, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-men/{id}")
    public ResponseEntity<DeliveryManDTO> getDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to get DeliveryMan : {}", id);
        Optional<DeliveryManDTO> deliveryManDTO = deliveryManService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryManDTO);
    }

    /**
     * DELETE  /delivery-men/:id : delete the "id" deliveryMan.
     *
     * @param id the id of the deliveryManDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-men/{id}")
    public ResponseEntity<Void> deleteDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryMan : {}", id);
        try{
            deliveryManService.delete(id);
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        } catch (Exception e) {
            return ResponseEntity.accepted().headers(HeaderUtil.deleteAffectedEntity("Suppression Impossible, des Runsheets sont déjà affectés à ce livreur")).build();

        }

    }
}
