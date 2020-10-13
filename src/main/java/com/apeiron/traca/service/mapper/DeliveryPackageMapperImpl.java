package com.apeiron.traca.service.mapper;

import com.apeiron.traca.domain.Address;
import com.apeiron.traca.domain.DeliveryPackage;
import com.apeiron.traca.domain.RunSheet;
import com.apeiron.traca.domain.Shipper;
import com.apeiron.traca.service.dto.DeliveryPackageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DeliveryPackageMapperImpl implements DeliveryPackageMapper {

    @Autowired
    private AddressMapper addressMapper;
    @Autowired
    private ShipperMapper shipperMapper;
    @Autowired
    private RunSheetMapper runSheetMapper;

    @Override
    public List<DeliveryPackage> toEntity(List<DeliveryPackageDTO> dtoList) {
        if (dtoList == null) {
            return null;
        }

        List<DeliveryPackage> list = new ArrayList<DeliveryPackage>(dtoList.size());
        for (DeliveryPackageDTO deliveryPackageDTO : dtoList) {
            list.add(toEntity(deliveryPackageDTO));
        }

        return list;
    }

    @Override
    public List<DeliveryPackageDTO> toDto(List<DeliveryPackage> entityList) {
        if (entityList == null) {
            return null;
        }

        List<DeliveryPackageDTO> list = new ArrayList<DeliveryPackageDTO>(entityList.size());
        for (DeliveryPackage deliveryPackage : entityList) {
            list.add(toDto(deliveryPackage));
        }

        return list;
    }

    @Override
    public DeliveryPackageDTO toDto(DeliveryPackage deliveryPackage) {
        if (deliveryPackage == null) {
            return null;
        }

        DeliveryPackageDTO deliveryPackageDTO = new DeliveryPackageDTO();

        Long id = deliveryPackageShipperId(deliveryPackage);
        if (id != null) {
            deliveryPackageDTO.setShipperId(id);
        }
        Long id1 = deliveryPackageRunSheetId(deliveryPackage);
        if (id1 != null) {
            deliveryPackageDTO.setRunSheetId(id1);
        }
        Long id2 = deliveryPackageAddressId(deliveryPackage);
        if (id2 != null) {
            deliveryPackageDTO.setAddressId(id2);
        }
        deliveryPackageDTO.setId(deliveryPackage.getId());
        deliveryPackageDTO.setCode(deliveryPackage.getCode());
        deliveryPackageDTO.setReceiverFirstName(deliveryPackage.getReceiverFirstName());
        deliveryPackageDTO.setReceiverLastName(deliveryPackage.getReceiverLastName());
        deliveryPackageDTO.setReceiverPhone(deliveryPackage.getReceiverPhone());
        deliveryPackageDTO.setStatus(deliveryPackage.getStatus());
        deliveryPackageDTO.setCreationDate(deliveryPackage.getCreationDate());
        deliveryPackageDTO.setHeight(deliveryPackage.getHeight());
        deliveryPackageDTO.setWidth(deliveryPackage.getWidth());
        deliveryPackageDTO.setWeight(deliveryPackage.getWeight());
        deliveryPackageDTO.setFragility(deliveryPackage.getFragility());
        deliveryPackageDTO.setPrice(deliveryPackage.getPrice());
        if (deliveryPackage.getShipper() != null) {
            deliveryPackageDTO.setShipper(shipperMapper.toDto(deliveryPackage.getShipper()));
        }
        if (deliveryPackage.getAddress() != null) {
            deliveryPackageDTO.setAddress(addressMapper.toDto(deliveryPackage.getAddress()));
        }
        return deliveryPackageDTO;
    }

    @Override
    public DeliveryPackage toEntity(DeliveryPackageDTO deliveryPackageDTO) {
        if (deliveryPackageDTO == null) {
            return null;
        }

        DeliveryPackage deliveryPackage = new DeliveryPackage();

        deliveryPackage.setShipper(shipperMapper.fromId(deliveryPackageDTO.getShipperId()));
        deliveryPackage.setRunSheet(runSheetMapper.fromId(deliveryPackageDTO.getRunSheetId()));
        deliveryPackage.setAddress(addressMapper.toEntity(deliveryPackageDTO.getAddress()));
        deliveryPackage.setId(deliveryPackageDTO.getId());
        deliveryPackage.setCode(deliveryPackageDTO.getCode());
        deliveryPackage.setReceiverFirstName(deliveryPackageDTO.getReceiverFirstName());
        deliveryPackage.setReceiverLastName(deliveryPackageDTO.getReceiverLastName());
        deliveryPackage.setReceiverPhone(deliveryPackageDTO.getReceiverPhone());
        deliveryPackage.setStatus(deliveryPackageDTO.getStatus());
        deliveryPackage.setCreationDate(deliveryPackageDTO.getCreationDate());
        deliveryPackage.setHeight(deliveryPackageDTO.getHeight());
        deliveryPackage.setWidth(deliveryPackageDTO.getWidth());
        deliveryPackage.setWeight(deliveryPackageDTO.getWeight());
        deliveryPackage.setFragility(deliveryPackageDTO.getFragility());
        deliveryPackage.setPrice(deliveryPackageDTO.getPrice());

        return deliveryPackage;
    }

    private Long deliveryPackageShipperId(DeliveryPackage deliveryPackage) {
        if (deliveryPackage == null) {
            return null;
        }
        Shipper shipper = deliveryPackage.getShipper();
        if (shipper == null) {
            return null;
        }
        Long id = shipper.getId();
        if (id == null) {
            return null;
        }
        return id;
    }

    private Long deliveryPackageRunSheetId(DeliveryPackage deliveryPackage) {
        if (deliveryPackage == null) {
            return null;
        }
        RunSheet runSheet = deliveryPackage.getRunSheet();
        if (runSheet == null) {
            return null;
        }
        Long id = runSheet.getId();
        if (id == null) {
            return null;
        }
        return id;
    }

    private Long deliveryPackageAddressId(DeliveryPackage deliveryPackage) {
        if (deliveryPackage == null) {
            return null;
        }
        Address address = deliveryPackage.getAddress();
        if (address == null) {
            return null;
        }
        Long id = address.getId();
        if (id == null) {
            return null;
        }
        return id;
    }
}

