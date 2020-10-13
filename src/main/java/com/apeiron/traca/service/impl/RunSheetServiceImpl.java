package com.apeiron.traca.service.impl;

import com.apeiron.traca.domain.DeliveryPackage;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import com.apeiron.traca.domain.enumeration.RunSheetStatut;
import com.apeiron.traca.service.DeliveryPackageService;
import com.apeiron.traca.service.RunSheetService;
import com.apeiron.traca.domain.RunSheet;
import com.apeiron.traca.repository.RunSheetRepository;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;
import com.apeiron.traca.service.dto.RunSheetDTO;
import com.apeiron.traca.service.mapper.DeliveryPackageMapper;
import com.apeiron.traca.service.mapper.RunSheetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RunSheet.
 */
@Service
@Transactional
public class RunSheetServiceImpl implements RunSheetService {

    private final Logger log = LoggerFactory.getLogger(RunSheetServiceImpl.class);

    private final RunSheetRepository runSheetRepository;

    private final RunSheetMapper runSheetMapper;
    private final DeliveryPackageService deliveryPackageService;
    private final DeliveryPackageMapper deliveryPackageMapper;


    public RunSheetServiceImpl(DeliveryPackageMapper deliveryPackageMapper, RunSheetRepository runSheetRepository,
            RunSheetMapper runSheetMapper, DeliveryPackageService deliveryPackageService) {
        this.runSheetRepository = runSheetRepository;
        this.runSheetMapper = runSheetMapper;
        this.deliveryPackageService = deliveryPackageService;
        this.deliveryPackageMapper = deliveryPackageMapper;
    }

    /**
     * Save a runSheet.
     *
     * @param runSheetDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RunSheetDTO save(RunSheetDTO runSheetDTO) {
        log.debug("Request to save RunSheet : {}", runSheetDTO);

        RunSheetStatut status = null;

        if (runSheetDTO.getId() != null) {
            RunSheet old = runSheetRepository.findById(runSheetDTO.getId()).get();
            status = old.getStatus();
        }

        RunSheet runSheet = runSheetMapper.toEntity(runSheetDTO);
        runSheet = runSheetRepository.save(runSheet);

        if (runSheetDTO.getDeliveryPackages() != null) {

            for (DeliveryPackageDTO dto : runSheetDTO.getDeliveryPackages()) {
                DeliveryPackage deliveryPackage = deliveryPackageMapper.toEntity(dto);
                deliveryPackage.setRunSheet(runSheet);
                deliveryPackageService.save(deliveryPackage);
            }

        }

        if (runSheet.getCreationDate() == null) {
            runSheet.setCreationDate(new Date().toInstant());
        }

        RunSheet runSheetEntity = runSheetRepository.findById(runSheet.getId()).get();

        if (runSheetDTO.getId() != null) {
            if (runSheetEntity.getStatus() != status) {
                if (RunSheetStatut.NEW.equals(runSheetDTO.getStatus())) {
                    for (DeliveryPackage dp : runSheetEntity.getDeliveryPackages()) {
                        dp.setStatus(DeliveryPackageStatus.PICKED);
                        deliveryPackageService.save(dp);
                    }
                } else if (RunSheetStatut.AFFECTED.equals(runSheetDTO.getStatus())) {
                    for (DeliveryPackage dp : runSheetEntity.getDeliveryPackages()) {
                        dp.setStatus(DeliveryPackageStatus.TO_DELIVER);
                        deliveryPackageService.save(dp);
                    }
                } else if (RunSheetStatut.HANDLED.equals(runSheetDTO.getStatus())) {
                    for (DeliveryPackage dp : runSheetEntity.getDeliveryPackages()) {
                        dp.setStatus(DeliveryPackageStatus.DELIVERED);
                        deliveryPackageService.save(dp);
                    }
                }
            }
        }

        return runSheetMapper.toDto(runSheetEntity);
    }

    /**
     * Get all the runSheets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RunSheetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RunSheets");
        return runSheetRepository.findAll(pageable).map(runSheetMapper::toDto);
    }

    /**
     * Get one runSheet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RunSheetDTO> findOne(Long id) {
        log.debug("Request to get RunSheet : {}", id);
        return runSheetRepository.findById(id).map(runSheetMapper::toDto);
    }

    /**
     * Delete the runSheet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RunSheet : {}", id);
        runSheetRepository.deleteById(id);
    }

    @Transactional
    public List<RunSheetDTO> findOnePageRunSheets(int pageSize) {

    int count = runSheetRepository.findAll().size();
    List<RunSheet> runSheets = new ArrayList<>();
    List<RunSheetDTO> runSheetDTOs = new ArrayList<>();

    if(count<pageSize)
    {
        runSheets = runSheetRepository.findAll();
        Collections.reverse(runSheets);
    }
    else{
        runSheets = runSheetRepository.findAll().
            subList(count-pageSize, count);
            Collections.reverse(runSheets);

    }
    for (RunSheet runSheet : runSheets) {
        runSheetDTOs.add(runSheetMapper.toDto(runSheet));
    }
    return runSheetDTOs;
    }

}
