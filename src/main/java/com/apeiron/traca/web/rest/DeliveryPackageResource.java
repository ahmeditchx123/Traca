package com.apeiron.traca.web.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import com.apeiron.traca.service.CountService;
import com.apeiron.traca.service.DeliveryPackageService;
import com.apeiron.traca.service.DocumentsService;
import com.apeiron.traca.service.dto.DailyCountDTO;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;
import com.apeiron.traca.service.dto.PackagesCountDTO;
import com.apeiron.traca.web.rest.errors.BadRequestAlertException;
import com.apeiron.traca.web.rest.util.HeaderUtil;
import com.apeiron.traca.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing DeliveryPackage.
 */
@RestController
@RequestMapping("/api")
public class DeliveryPackageResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryPackageResource.class);

    private static final String ENTITY_NAME = "deliveryPackage";

    private final DeliveryPackageService deliveryPackageService;
    private final DocumentsService documentsService;
    private final CountService countService;
    public DeliveryPackageResource(DeliveryPackageService deliveryPackageService, DocumentsService documentsService, CountService countService) {
        this.deliveryPackageService = deliveryPackageService;
        this.documentsService = documentsService;
        this.countService = countService;
    }

    /**
     * POST  /delivery-packages : Create a new deliveryPackage.
     *
     * @param deliveryPackageDTO the deliveryPackageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryPackageDTO, or with status 400 (Bad Request) if the deliveryPackage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-packages")
    public ResponseEntity<DeliveryPackageDTO> createDeliveryPackage(@Valid @RequestBody DeliveryPackageDTO deliveryPackageDTO) throws URISyntaxException {
        log.debug("REST request to save DeliveryPackage : {}", deliveryPackageDTO);
        if (deliveryPackageDTO.getId() != null) {
            throw new BadRequestAlertException("A new deliveryPackage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryPackageDTO result = deliveryPackageService.save(deliveryPackageDTO);
        return ResponseEntity.created(new URI("/api/delivery-packages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-packages : Updates an existing deliveryPackage.
     *
     * @param deliveryPackageDTO the deliveryPackageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryPackageDTO,
     * or with status 400 (Bad Request) if the deliveryPackageDTO is not valid,
     * or with status 500 (Internal Server Error) if the deliveryPackageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-packages")
    public ResponseEntity<DeliveryPackageDTO> updateDeliveryPackage(@Valid @RequestBody DeliveryPackageDTO deliveryPackageDTO) throws URISyntaxException {
        log.debug("REST request to update DeliveryPackage : {}", deliveryPackageDTO);
        if (deliveryPackageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryPackageDTO result = deliveryPackageService.save(deliveryPackageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryPackageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-packages : get all the deliveryPackages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryPackages in body
     */
    @GetMapping("/delivery-packages")
    public ResponseEntity<List<DeliveryPackageDTO>> getAllDeliveryPackages(Pageable pageable) {
        log.debug("REST request to get a page of DeliveryPackages");
        Page<DeliveryPackageDTO> page = deliveryPackageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/delivery-packages");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/delivery-packages/dashboard/{pageSize}")
    public ResponseEntity<List<DeliveryPackageDTO>> getOnePageDeliveryPackages(@PathVariable int pageSize) {
        log.debug("REST request to get One page of DeliveryPackages : {}", pageSize);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.valueOf("application/json"));

        List<DeliveryPackageDTO>  onePagDeliveryPackages = deliveryPackageService.findOnePageDeliveryPackages(pageSize);
        return new ResponseEntity<List<DeliveryPackageDTO>>(onePagDeliveryPackages,responseHeaders,HttpStatus.OK);

    }

    @GetMapping(value = "/report/run-sheet/{id}.pdf")
    public ResponseEntity<InputStreamResource> getDocument(HttpServletResponse response, @PathVariable Long id) throws IOException {

        File generatedReport = documentsService.printReport(id, response,"run-sheet");
        File reportColiFile = new File(generatedReport.getPath());
        // Set the input stream
        InputStream inputStream = new FileInputStream(reportColiFile);
        // asume that it was a PDF file
        HttpHeaders responseHeaders = new HttpHeaders();
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        responseHeaders.setContentType(MediaType.valueOf("application/pdf"));
        responseHeaders.setContentDispositionFormData("attachment","report.pdf");
        return new ResponseEntity<InputStreamResource>(inputStreamResource,responseHeaders,HttpStatus.OK);

    }

    @GetMapping(value = "/report/delivery-package/{id}.pdf")
    public ResponseEntity<InputStreamResource> getBonLivraison(HttpServletResponse response, @PathVariable Long id) throws IOException {
        File generatedReport = documentsService.printReport(id, response,"delivery-package");
        File reportColiFile = new File(generatedReport.getPath());
        // Set the input stream
        InputStream inputStream = new FileInputStream(reportColiFile);
        // asume that it was a PDF file
        HttpHeaders responseHeaders = new HttpHeaders();
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        responseHeaders.setContentType(MediaType.valueOf("application/pdf"));
        responseHeaders.setContentDispositionFormData("attachment","report.pdf");
        return new ResponseEntity<InputStreamResource>(inputStreamResource,
            responseHeaders,
            HttpStatus.OK);
    }

    @GetMapping("/daily-count")
    public ResponseEntity<DailyCountDTO> getCount() {
        log.debug("REST request to get a page of RunSheets");
        return ResponseEntity.ok().body(countService.dailyCount());
    }

    /**
     * GET  /delivery-packages/:id : get the "id" deliveryPackage.
     *
     * @param id the id of the deliveryPackageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryPackageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-packages/{id}")
    public ResponseEntity<DeliveryPackageDTO> getDeliveryPackage(@PathVariable Long id) {
        log.debug("REST request to get DeliveryPackage : {}", id);
        Optional<DeliveryPackageDTO> deliveryPackageDTO = deliveryPackageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryPackageDTO);
    }

    @GetMapping("/delivery-packages/code/{code}")
    public ResponseEntity<DeliveryPackageDTO> getDeliveryPackageByCode(@PathVariable String code) {
        log.debug("REST request to get DeliveryPackage by code : {}", code);
        Optional<DeliveryPackageDTO> deliveryPackageDTO = deliveryPackageService.findByCode(code);
        return ResponseUtil.wrapOrNotFound(deliveryPackageDTO);
    }

    /**
     * DELETE  /delivery-packages/:id : delete the "id" deliveryPackage.
     *
     * @param id the id of the deliveryPackageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-packages/{id}")
    public ResponseEntity<Void> deleteDeliveryPackage(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryPackage : {}", id);
        deliveryPackageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/delivery-packages/status")
    public ResponseEntity<List<DeliveryPackageDTO>> getDeliveryPackagesByStatus(@RequestParam DeliveryPackageStatus status){
        log.debug("REST request to get all delivery packages with status: {}",status);
        return new ResponseEntity<>(deliveryPackageService.getDeliveryPackagesByStatus(status), HttpStatus.OK);

    }

    @GetMapping("/delivery-package/get-by-client-name/{firstName}/{lastName}")
    public ResponseEntity<List<DeliveryPackageDTO>> getDeliveryPackageByClientName(@PathVariable String firstName, @PathVariable String lastName) {
        return new ResponseEntity<>(deliveryPackageService.getDeliveryPackageByClientName(firstName, lastName), HttpStatus.OK);
    }

    @GetMapping("/delivery-package/get-by-client-and-status/{status}/{firstName}/{lastName}")
    public ResponseEntity<List<DeliveryPackageDTO>> getDeliveryPackagesByClientAndStatus(@PathVariable DeliveryPackageStatus status, @PathVariable String firstName, @PathVariable String lastName) {
        return new ResponseEntity<>(deliveryPackageService.getDeliveryPackageByClientAndStatus(status, firstName, lastName), HttpStatus.OK);
    }

    @GetMapping("/delivery-package/get-packages-count/{firstName}/{lastName}")
    public ResponseEntity<PackagesCountDTO> getPackagesCount(@PathVariable String firstName,@PathVariable String lastName) {
        return new ResponseEntity<>(deliveryPackageService.getDeliveryPackageByStatusAndClientFullName(firstName, lastName), HttpStatus.OK);
    }
}

