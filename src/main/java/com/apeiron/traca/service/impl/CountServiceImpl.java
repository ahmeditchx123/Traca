package com.apeiron.traca.service.impl;

import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
import com.apeiron.traca.domain.enumeration.RunSheetStatut;
import com.apeiron.traca.repository.DeliveryManRepository;
import com.apeiron.traca.repository.DeliveryPackageRepository;
import com.apeiron.traca.repository.RunSheetRepository;
import com.apeiron.traca.repository.ShipperRepository;
import com.apeiron.traca.service.CountService;
import com.apeiron.traca.service.dto.CountDTO;
import com.apeiron.traca.service.dto.DailyCountDTO;
import org.springframework.stereotype.Service;

import java.time.*;

@Service
public class CountServiceImpl implements CountService {

    private final DeliveryPackageRepository deliveryPackageRepository;
    private final DeliveryManRepository deliveryManRepository;
    private final ShipperRepository shipperRepository;
    private final RunSheetRepository runSheetRepository;

    public CountServiceImpl(DeliveryPackageRepository deliveryPackageRepository, DeliveryManRepository deliveryManRepository, ShipperRepository shipperRepository, RunSheetRepository runSheetRepository) {
        this.deliveryPackageRepository = deliveryPackageRepository;
        this.deliveryManRepository = deliveryManRepository;
        this.shipperRepository = shipperRepository;
        this.runSheetRepository = runSheetRepository;
    }

    @Override
    public CountDTO count() {

        CountDTO countDTO = new CountDTO();

        countDTO.setNumberPackage(deliveryPackageRepository.count());
        countDTO.setNumberRunsheet(runSheetRepository.count());
        countDTO.setNumberSheeper(shipperRepository.count());
        countDTO.setNumberDeliveryMan(deliveryManRepository.count());

        countDTO.setNumberAffectedRunsheet(runSheetRepository.countByStatus(RunSheetStatut.AFFECTED));
        countDTO.setNumberNewRunsheet(runSheetRepository.countByStatus(RunSheetStatut.NEW));
        countDTO.setNumberHandledRunsheet(runSheetRepository.countByStatus(RunSheetStatut.HANDLED));

        countDTO.setNumberNewPackage(deliveryPackageRepository.countByStatus(DeliveryPackageStatus.NEW));
        countDTO.setNumberPickedPackage(deliveryPackageRepository.countByStatus(DeliveryPackageStatus.PICKED));
        countDTO.setNumberDeliveredPackage(deliveryPackageRepository.countByStatus(DeliveryPackageStatus.DELIVERED));

        return countDTO;
    }

    @Override
    public DailyCountDTO dailyCount() {

        Instant instant = Instant.now();

        LocalDateTime startDate = LocalDateTime.ofInstant(instant, ZoneOffset.UTC).toLocalDate().atTime(00,1);
        LocalDateTime endDate = LocalDateTime.ofInstant(instant, ZoneOffset.UTC).toLocalDate().atTime(23,59);


        DailyCountDTO dailyCountDTO = new DailyCountDTO();

        dailyCountDTO.setNumberNewDeliveryMan(Long.valueOf(deliveryManRepository.findAllByCreationDateIsBetween(startDate.atZone(ZoneId.of("Europe/Paris")).toInstant(),endDate.atZone(ZoneId.of("Europe/Paris")).toInstant()).size()));
        dailyCountDTO.setNumberNewSheeper(Long.valueOf(shipperRepository.findAllByCreatedDateIsBetween(startDate.atZone(ZoneId.of("Europe/Paris")).toInstant(),endDate.atZone(ZoneId.of("Europe/Paris")).toInstant()).size()));
        dailyCountDTO.setNumberNewDeliveredPackage(Long.valueOf(deliveryPackageRepository.findAllByCreationDateIsBetween(startDate.atZone(ZoneId.of("Europe/Paris")).toInstant(),endDate.atZone(ZoneId.of("Europe/Paris")).toInstant()).size()));
        dailyCountDTO.setNumberNewRunsheet(Long.valueOf(runSheetRepository.findAllByCreationDateIsBetween(startDate.atZone(ZoneId.of("Europe/Paris")).toInstant(),endDate.atZone(ZoneId.of("Europe/Paris")).toInstant()).size()));

        return dailyCountDTO;
    }

}
