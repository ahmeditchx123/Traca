package com.apeiron.traca.web.rest;
import com.apeiron.traca.service.ShipperService;
import com.apeiron.traca.web.rest.errors.BadRequestAlertException;
import com.apeiron.traca.web.rest.util.HeaderUtil;
import com.apeiron.traca.web.rest.util.PaginationUtil;
import com.apeiron.traca.service.dto.ShipperDTO;
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
 * REST controller for managing Shipper.
 */
@RestController
@RequestMapping("/api")
public class ShipperResource {

    private final Logger log = LoggerFactory.getLogger(ShipperResource.class);

    private static final String ENTITY_NAME = "shipper";

    private final ShipperService shipperService;

    public ShipperResource(ShipperService shipperService) {
        this.shipperService = shipperService;
    }

    /**
     * POST  /shippers : Create a new shipper.
     *
     * @param shipperDTO the shipperDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shipperDTO, or with status 400 (Bad Request) if the shipper has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shippers")
    public ResponseEntity<ShipperDTO> createShipper(@RequestBody ShipperDTO shipperDTO) throws URISyntaxException {
        log.debug("REST request to save Shipper : {}", shipperDTO);
        if (shipperDTO.getId() != null) {
            throw new BadRequestAlertException("A new shipper cannot already have an ID", ENTITY_NAME, "idexists");
        }

        try {
            ShipperDTO result = shipperService.save(shipperDTO);
        return ResponseEntity.created(new URI("/api/shippers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
        } catch (Exception e) {
            return ResponseEntity.accepted().headers(HeaderUtil.deleteAffectedEntity("Un client existe déjà avec ce login ou email ")).build();
        }
    }

    /**
     * PUT  /shippers : Updates an existing shipper.
     *
     * @param shipperDTO the shipperDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shipperDTO,
     * or with status 400 (Bad Request) if the shipperDTO is not valid,
     * or with status 500 (Internal Server Error) if the shipperDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shippers")
    public ResponseEntity<ShipperDTO> updateShipper(@RequestBody ShipperDTO shipperDTO) throws URISyntaxException {
        log.debug("REST request to update Shipper : {}", shipperDTO);
        if (shipperDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        try {
            ShipperDTO result = shipperService.save(shipperDTO);
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shipperDTO.getId().toString()))
                .body(result);

        } catch (Exception e) {
            return ResponseEntity.accepted().headers(HeaderUtil.deleteAffectedEntity("Un client existe déjà avec ce login ou email")).build();
        }


    }

    /**
     * GET  /shippers : get all the shippers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shippers in body
     */
    @GetMapping("/shippers")
    public ResponseEntity<List<ShipperDTO>> getAllShippers(Pageable pageable) {
        log.debug("REST request to get a page of Shippers");
        Page<ShipperDTO> page = shipperService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shippers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /shippers/:id : get the "id" shipper.
     *
     * @param id the id of the shipperDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shipperDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shippers/{id}")
    public ResponseEntity<ShipperDTO> getShipper(@PathVariable Long id) {
        log.debug("REST request to get Shipper : {}", id);
        Optional<ShipperDTO> shipperDTO = shipperService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shipperDTO);
    }

    /**
     * DELETE  /shippers/:id : delete the "id" shipper.
     *
     * @param id the id of the shipperDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shippers/{id}")
    public ResponseEntity<Void> deleteShipper(@PathVariable Long id) {
        log.debug("REST request to delete Shipper : {}", id);
        try{
            shipperService.delete(id);
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        }catch (Exception e) {
            return ResponseEntity.accepted().headers(HeaderUtil.deleteAffectedEntity("Suppression impossible, des colis sont déjà affectés à ce client")).build();
        }

    }
}
