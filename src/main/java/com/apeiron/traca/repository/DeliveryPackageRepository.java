package com.apeiron.traca.repository;

import com.apeiron.traca.domain.DeliveryPackage;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import org.exolab.castor.types.DateTime;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the DeliveryPackage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryPackageRepository extends JpaRepository<DeliveryPackage, Long> {

    Optional<DeliveryPackage> findOneByCode(String code);

    Long countByStatus(DeliveryPackageStatus statut);

    List<DeliveryPackage> findAllByCreationDateIsBetween(Instant startDate, Instant endDate);

    @Query("select deliveryPackage from DeliveryPackage deliveryPackage where deliveryPackage.status = :status")
    List<DeliveryPackage> getDeliveryPackagesByStatus(@Param("status") DeliveryPackageStatus status);

    @Query("select deliveryPackage from DeliveryPackage deliveryPackage where deliveryPackage.status = :status and deliveryPackage.shipper.firstName = :first_name and deliveryPackage.shipper.lastName = :last_name")
    List<DeliveryPackage> getDeliveryPackageByStatusAndFirstNameAndLastName(@Param("status") DeliveryPackageStatus status, @Param("first_name") String firstName, @Param("last_name") String lastName);

    @Query("select deliveryPackage from DeliveryPackage deliveryPackage where deliveryPackage.shipper.firstName = :shipper_first_name and deliveryPackage.shipper.lastName = :shipper_last_name")
    List<DeliveryPackage> getDeliveryPackageByClientName(@Param("shipper_first_name") String firstName, @Param("shipper_last_name") String lastName);


    @Query("select deliveryPackage from DeliveryPackage deliveryPackage where deliveryPackage.runSheet.id = :runsheetId")
    List<DeliveryPackage> findPackagesByRunsheetId(@Param("runsheetId") long runSheetId);
}
