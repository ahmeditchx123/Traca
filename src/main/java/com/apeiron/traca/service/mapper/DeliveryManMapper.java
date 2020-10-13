package com.apeiron.traca.service.mapper;

import com.apeiron.traca.domain.*;
import com.apeiron.traca.service.dto.DeliveryManDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DeliveryMan and its DTO DeliveryManDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DeliveryManMapper extends EntityMapper<DeliveryManDTO, DeliveryMan> {


    @Mapping(target = "runSheets", ignore = true)
    DeliveryMan toEntity(DeliveryManDTO deliveryManDTO);

    default DeliveryMan fromId(Long id) {
        if (id == null) {
            return null;
        }
        DeliveryMan deliveryMan = new DeliveryMan();
        deliveryMan.setId(id);
        return deliveryMan;
    }
}
