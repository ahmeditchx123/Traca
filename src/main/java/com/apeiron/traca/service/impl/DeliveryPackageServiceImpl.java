package com.apeiron.traca.service.impl;

import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import com.apeiron.traca.service.DeliveryPackageService;
import com.apeiron.traca.domain.DeliveryPackage;
import com.apeiron.traca.repository.DeliveryPackageRepository;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;
import com.apeiron.traca.service.dto.PackagesCountDTO;
import com.apeiron.traca.service.mapper.DeliveryPackageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service Implementation for managing DeliveryPackage.
 */
@Service
@Transactional
public class DeliveryPackageServiceImpl implements DeliveryPackageService {

    private final Logger log = LoggerFactory.getLogger(DeliveryPackageServiceImpl.class);

    private final DeliveryPackageRepository deliveryPackageRepository;

    private final DeliveryPackageMapper deliveryPackageMapper;

    public DeliveryPackageServiceImpl(DeliveryPackageRepository deliveryPackageRepository, DeliveryPackageMapper deliveryPackageMapper) {
        this.deliveryPackageRepository = deliveryPackageRepository;
        this.deliveryPackageMapper = deliveryPackageMapper;
    }

    /**
     * Save a deliveryPackage.
     *
     * @param deliveryPackageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DeliveryPackageDTO save(DeliveryPackageDTO deliveryPackageDTO) {
        log.debug("Request to save DeliveryPackage : {}", deliveryPackageDTO);

        if(deliveryPackageDTO.getId() == null) {
            deliveryPackageDTO.setStatus(DeliveryPackageStatus.NEW);
            deliveryPackageDTO.setCreationDate(new Date().toInstant());
        }

        DeliveryPackage deliveryPackage = deliveryPackageMapper.toEntity(deliveryPackageDTO);
        deliveryPackage = deliveryPackageRepository.save(deliveryPackage);
        return deliveryPackageMapper.toDto(deliveryPackage);
    }

    @Override
    public DeliveryPackageDTO save(DeliveryPackage deliveryPackage) {
        log.debug("Request to save DeliveryPackage : {}", deliveryPackage);

        deliveryPackage = deliveryPackageRepository.save(deliveryPackage);
        return deliveryPackageMapper.toDto(deliveryPackage);
    }

    /**
     * Get all the deliveryPackages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DeliveryPackageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DeliveryPackages");
        return deliveryPackageRepository.findAll(pageable)
            .map(deliveryPackageMapper::toDto);
    }


    /**
     * Get one deliveryPackage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DeliveryPackageDTO> findOne(Long id) {
        log.debug("Request to get DeliveryPackage : {}", id);
        return deliveryPackageRepository.findById(id)
            .map(deliveryPackageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DeliveryPackageDTO> findByCode(String code) {
        log.debug("Request to get DeliveryPackage : {}", code);
        return deliveryPackageRepository.findOneByCode(code)
            .map(deliveryPackageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DeliveryPackageDTO> getDeliveryPackagesByStatus(DeliveryPackageStatus status) {
        log.debug("Request to get DeliveryPackages having status : {}", status);
        List<DeliveryPackage> packages = deliveryPackageRepository.getDeliveryPackagesByStatus(status);
        List<DeliveryPackageDTO> result = new ArrayList<>();
        for (DeliveryPackage deliveryPackage :packages){
            result.add(deliveryPackageMapper.toDto(deliveryPackage));
        }
        return result;

    }

    @Override
    public List<DeliveryPackageDTO> getDeliveryPackageByClientName(String firstName, String lastName) {
        log.debug("Request to get DeliveryPackages by client first and last name  : {} {}", firstName,lastName);
        List<DeliveryPackageDTO> resultPackages = new ArrayList<>();
        List<DeliveryPackage> packages = deliveryPackageRepository.getDeliveryPackageByClientName(firstName, lastName);
        for (DeliveryPackage pack : packages) {
            resultPackages.add(deliveryPackageMapper.toDto(pack));
        }
        return resultPackages;
    }

    @Override
    public int getPackagesCount(String firstName, String lastName) {
        return deliveryPackageRepository.getDeliveryPackageByClientName(firstName, lastName).size();
    }

    @Override
    public PackagesCountDTO getDeliveryPackageByStatusAndClientFullName(String firstName, String lastName) {
             UUID id = UUID.randomUUID();
            PackagesCountDTO packagesCountDTO = new PackagesCountDTO();
            packagesCountDTO.setId(id.getMostSignificantBits());
            packagesCountDTO.setAllPackagesCount(deliveryPackageRepository.getDeliveryPackageByClientName(firstName, lastName).size());
            packagesCountDTO.setNewPackagesCount(deliveryPackageRepository.getDeliveryPackageByStatusAndFirstNameAndLastName(DeliveryPackageStatus.NEW, firstName, lastName).size());
            packagesCountDTO.setToDeliverPackagesCount(deliveryPackageRepository.getDeliveryPackageByStatusAndFirstNameAndLastName(DeliveryPackageStatus.TO_DELIVER, firstName, lastName).size());
            packagesCountDTO.setPickedPackagesCount(deliveryPackageRepository.getDeliveryPackageByStatusAndFirstNameAndLastName(DeliveryPackageStatus.PICKED,firstName, lastName).size());
            packagesCountDTO.setDeliveredPackagesCount(deliveryPackageRepository.getDeliveryPackageByStatusAndFirstNameAndLastName(DeliveryPackageStatus.DELIVERED, firstName, lastName).size());
            packagesCountDTO.setRefusedPackagesCount(deliveryPackageRepository.getDeliveryPackageByStatusAndFirstNameAndLastName(DeliveryPackageStatus.REFUSED, firstName, lastName).size());
            return packagesCountDTO;
    }

    @Override
    public List<DeliveryPackageDTO> getDeliveryPackageByClientAndStatus(DeliveryPackageStatus status, String firstName, String lastName) {
            List<DeliveryPackageDTO> deliveryPackageDTOS = new ArrayList<>();
            List<DeliveryPackage> deliveryPackageList = deliveryPackageRepository.getDeliveryPackageByStatusAndFirstNameAndLastName(status, firstName, lastName);
            for(DeliveryPackage pack: deliveryPackageList) {
                deliveryPackageDTOS.add(deliveryPackageMapper.toDto(pack));
            }
            return deliveryPackageDTOS;
    }

    /**
     * Delete the deliveryPackage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DeliveryPackage : {}", id);        deliveryPackageRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<DeliveryPackageDTO> findOnePageDeliveryPackages(int pageSize) {

    int count = deliveryPackageRepository.findAll().size();
    List<DeliveryPackage> deliveryPackages = new ArrayList<>();
    List<DeliveryPackageDTO> deliveryPackageDTOs = new ArrayList<>();

    if(count<pageSize)
    {
        deliveryPackages = deliveryPackageRepository.findAll();
        Collections.reverse(deliveryPackages);

    }
    else{
        deliveryPackages = deliveryPackageRepository.findAll().
            subList(count-pageSize, count);
            Collections.reverse(deliveryPackages);

    }
    for (DeliveryPackage deliveryPackage : deliveryPackages) {
        deliveryPackageDTOs.add(deliveryPackageMapper.toDto(deliveryPackage));
    }
    return deliveryPackageDTOs;
    }
}
