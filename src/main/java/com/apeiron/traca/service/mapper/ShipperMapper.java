package com.apeiron.traca.service.mapper;

import com.apeiron.traca.domain.*;
import com.apeiron.traca.service.dto.ShipperDTO;

/**
 * Mapper for the entity Shipper and its DTO ShipperDTO.
 */
public interface ShipperMapper extends EntityMapper<ShipperDTO, Shipper> {

    ShipperDTO toDto(Shipper shipper);

    Shipper toEntity(ShipperDTO shipperDTO);

    default Shipper fromId(Long id) {
        if (id == null) {
            return null;
        }
        Shipper shipper = new Shipper();
        shipper.setId(id);
        return shipper;
    }
}
