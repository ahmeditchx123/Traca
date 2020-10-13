package com.apeiron.traca.service;

import com.apeiron.traca.domain.DeliveryPackage;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;

import com.apeiron.traca.service.dto.PackagesCountDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DeliveryPackage.
 */
public interface DeliveryPackageService {

    /**
     * Save a deliveryPackage.
     *
     * @param deliveryPackageDTO the entity to save
     * @return the persisted entity
     */
    DeliveryPackageDTO save(DeliveryPackageDTO deliveryPackageDTO);
    DeliveryPackageDTO save(DeliveryPackage deliveryPackage);

    /**
     * Get all the deliveryPackages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DeliveryPackageDTO> findAll(Pageable pageable);


    /**
     * Get the "id" deliveryPackage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DeliveryPackageDTO> findOne(Long id);

    /**
     * Delete the "id" deliveryPackage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    Optional<DeliveryPackageDTO> findByCode(String code);

    List<DeliveryPackageDTO> getDeliveryPackagesByStatus(DeliveryPackageStatus status);

    List<DeliveryPackageDTO> getDeliveryPackageByClientName(String firstName, String lastName);

    int getPackagesCount(String firstName, String lastName);

    PackagesCountDTO getDeliveryPackageByStatusAndClientFullName(String firstName, String lastName);

    List<DeliveryPackageDTO> getDeliveryPackageByClientAndStatus(DeliveryPackageStatus status, String firstName, String lastName);

    public List<DeliveryPackageDTO> findOnePageDeliveryPackages(int pageSize);

}
