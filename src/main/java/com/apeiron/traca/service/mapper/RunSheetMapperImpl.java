package com.apeiron.traca.service.mapper;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.apeiron.traca.domain.DeliveryMan;
import com.apeiron.traca.domain.DeliveryPackage;
import com.apeiron.traca.domain.RunSheet;
import com.apeiron.traca.repository.DeliveryPackageRepository;
import com.apeiron.traca.service.dto.RunSheetDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RunSheetMapperImpl implements RunSheetMapper {

    @Autowired
    private DeliveryManMapper deliveryManMapper;
    @Autowired
    private DeliveryPackageMapper deliveryPackageMapper;

    @Autowired
    private DeliveryPackageRepository deliveryPackageRepository;

    @Override
    public List<RunSheet> toEntity(List<RunSheetDTO> dtoList) {

        if (dtoList == null) {
            return null;
        }

        List<RunSheet> list = new ArrayList<RunSheet>(dtoList.size());
        for (RunSheetDTO runSheetDTO : dtoList) {
            list.add(toEntity(runSheetDTO));
        }

        return list;
    }

    @Override
    public List<RunSheetDTO> toDto(List<RunSheet> entityList) {
        if (entityList == null) {
            return null;
        }

        List<RunSheetDTO> list = new ArrayList<RunSheetDTO>(entityList.size());
        for (RunSheet runSheet : entityList) {
            list.add(toDto(runSheet));
        }

        return list;
    }

    @Override
    public RunSheetDTO toDto(RunSheet runSheet) {
        Double totalprice = 0.0;
        if (runSheet == null) {
            return null;
        }

        RunSheetDTO runSheetDTO = new RunSheetDTO();

        Long id = runSheetDeliveryManId(runSheet);
        if (id != null) {
            runSheetDTO.setDeliveryManId(id);
        }
        runSheetDTO.setId(runSheet.getId());
        runSheetDTO.setCode(runSheet.getCode());
        runSheetDTO.setCreationDate(runSheet.getCreationDate());
        runSheetDTO.setStatus(runSheet.getStatus());

        runSheetDTO.setDeliveryMan(deliveryManMapper.toDto(runSheet.getDeliveryMan()));

        if (runSheet.getDeliveryPackages() != null) {
            List<DeliveryPackage> mainList = new ArrayList<>();
            mainList=deliveryPackageRepository.findPackagesByRunsheetId(runSheet.getId());
            runSheetDTO.setDeliveryPackages(deliveryPackageMapper.toDto(mainList));
            for (DeliveryPackage deliveryPackage: mainList ) {
                totalprice+=deliveryPackage.getPrice();
            }
            runSheetDTO.setTotalPrice(totalprice);
        }

        return runSheetDTO;
    }

    @Override
    public RunSheet toEntity(RunSheetDTO runSheetDTO) {
        if (runSheetDTO == null) {
            return null;
        }

        RunSheet runSheet = new RunSheet();

        runSheet.setDeliveryMan(deliveryManMapper.fromId(runSheetDTO.getDeliveryManId()));
        runSheet.setId(runSheetDTO.getId());
        runSheet.setCode(runSheetDTO.getCode());
        runSheet.setCreationDate(runSheetDTO.getCreationDate());
        runSheet.setStatus(runSheetDTO.getStatus());
        runSheet.setTotalPrice(runSheetDTO.getTotalPrice());
        if (runSheetDTO.getDeliveryPackages() != null) {
            runSheet.setDeliveryPackages(new HashSet<>(deliveryPackageMapper.toEntity(runSheetDTO.getDeliveryPackages())));
        }
        return runSheet;
    }

    private Long runSheetDeliveryManId(RunSheet runSheet) {
        if (runSheet == null) {
            return null;
        }
        DeliveryMan deliveryMan = runSheet.getDeliveryMan();
        if (deliveryMan == null) {
            return null;
        }
        Long id = deliveryMan.getId();
        if (id == null) {
            return null;
        }
        return id;
    }
}

