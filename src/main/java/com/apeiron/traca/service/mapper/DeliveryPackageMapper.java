package com.apeiron.traca.service.mapper;
import com.apeiron.traca.domain.*;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;
/**
 * Mapper for the entity DeliveryPackage and its DTO DeliveryPackageDTO.
 */
public interface DeliveryPackageMapper extends EntityMapper<DeliveryPackageDTO, DeliveryPackage> {


    DeliveryPackageDTO toDto(DeliveryPackage deliveryPackage);

    DeliveryPackage toEntity(DeliveryPackageDTO deliveryPackageDTO);

    default DeliveryPackage fromId(Long id) {
        if (id == null) {
            return null;
        }
        DeliveryPackage deliveryPackage = new DeliveryPackage();
        deliveryPackage.setId(id);
        return deliveryPackage;
    }
}
