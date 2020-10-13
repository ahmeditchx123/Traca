package com.apeiron.traca.web.rest;

import com.apeiron.traca.service.CountService;
import com.apeiron.traca.service.RunSheetService;
import com.apeiron.traca.service.dto.CountDTO;
import com.apeiron.traca.web.rest.errors.BadRequestAlertException;
import com.apeiron.traca.web.rest.util.HeaderUtil;
import com.apeiron.traca.web.rest.util.PaginationUtil;
import com.apeiron.traca.service.dto.RunSheetDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RunSheet.
 */
@RestController
@RequestMapping("/api")
public class RunSheetResource {

    private final Logger log = LoggerFactory.getLogger(RunSheetResource.class);

    private static final String ENTITY_NAME = "runSheet";

    private final RunSheetService runSheetService;
    private final CountService countService;

    public RunSheetResource(RunSheetService runSheetService, CountService countService) {
        this.runSheetService = runSheetService;
        this.countService = countService;
    }

    /**
     * POST  /run-sheets : Create a new runSheet.
     *
     * @param runSheetDTO the runSheetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new runSheetDTO, or with status 400 (Bad Request) if the runSheet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/run-sheets")
    public ResponseEntity<RunSheetDTO> createRunSheet(@Valid @RequestBody RunSheetDTO runSheetDTO) throws URISyntaxException {
        log.debug("REST request to save RunSheet : {}", runSheetDTO);
        if (runSheetDTO.getId() != null) {
            throw new BadRequestAlertException("A new runSheet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RunSheetDTO result = runSheetService.save(runSheetDTO);
        return ResponseEntity.created(new URI("/api/run-sheets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /run-sheets : Updates an existing runSheet.
     *
     * @param runSheetDTO the runSheetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated runSheetDTO,
     * or with status 400 (Bad Request) if the runSheetDTO is not valid,
     * or with status 500 (Internal Server Error) if the runSheetDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/run-sheets")
    public ResponseEntity<RunSheetDTO> updateRunSheet(@Valid @RequestBody RunSheetDTO runSheetDTO) throws URISyntaxException {
        log.debug("REST request to update RunSheet : {}", runSheetDTO);
        if (runSheetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RunSheetDTO result = runSheetService.save(runSheetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, runSheetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /run-sheets : get all the runSheets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of runSheets in body
     */
    @GetMapping("/run-sheets")
    public ResponseEntity<List<RunSheetDTO>> getAllRunSheets(Pageable pageable) {
        log.debug("REST request to get a page of RunSheets");
        Page<RunSheetDTO> page = runSheetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/run-sheets");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/count")
    public ResponseEntity<CountDTO> getCount() {
        log.debug("REST request to get a page of RunSheets");
        return ResponseEntity.ok().body(countService.count());
    }

    /**
     * GET  /run-sheets/:id : get the "id" runSheet.
     *
     * @param id the id of the runSheetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the runSheetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/run-sheets/{id}")
    public ResponseEntity<RunSheetDTO> getRunSheet(@PathVariable Long id) {
        log.debug("REST request to get RunSheet : {}", id);
        Optional<RunSheetDTO> runSheetDTO = runSheetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(runSheetDTO);
    }

    @GetMapping("/run-sheets/dashboard/{pageSize}")
    public ResponseEntity<List<RunSheetDTO>> getOnePageRunSheet(@PathVariable int pageSize) {
        log.debug("REST request to get One page of RunSheet : {}", pageSize);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.valueOf("application/json"));
        List<RunSheetDTO> onePageRunsheet = runSheetService.findOnePageRunSheets(pageSize);
        return new ResponseEntity<List<RunSheetDTO>>(onePageRunsheet,responseHeaders,HttpStatus.OK);
    }

    /**
     * DELETE  /run-sheets/:id : delete the "id" runSheet.
     *
     * @param id the id of the runSheetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/run-sheets/{id}")
    public ResponseEntity<Void> deleteRunSheet(@PathVariable Long id) {
        log.debug("REST request to delete RunSheet : {}", id);
        runSheetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
