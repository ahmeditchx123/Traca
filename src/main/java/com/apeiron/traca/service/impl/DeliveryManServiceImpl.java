package com.apeiron.traca.service.impl;

import com.apeiron.traca.service.DeliveryManService;
import com.apeiron.traca.domain.DeliveryMan;
import com.apeiron.traca.repository.DeliveryManRepository;
import com.apeiron.traca.service.dto.DeliveryManDTO;
import com.apeiron.traca.service.mapper.DeliveryManMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

/**
 * Service Implementation for managing DeliveryMan.
 */
@Service
@Transactional
public class DeliveryManServiceImpl implements DeliveryManService {

    private final Logger log = LoggerFactory.getLogger(DeliveryManServiceImpl.class);

    private final DeliveryManRepository deliveryManRepository;

    private final DeliveryManMapper deliveryManMapper;

    public DeliveryManServiceImpl(DeliveryManRepository deliveryManRepository, DeliveryManMapper deliveryManMapper) {
        this.deliveryManRepository = deliveryManRepository;
        this.deliveryManMapper = deliveryManMapper;
    }

    /**
     * Save a deliveryMan.
     *
     * @param deliveryManDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DeliveryManDTO save(DeliveryManDTO deliveryManDTO) {
        log.debug("Request to save DeliveryMan : {}", deliveryManDTO);
        DeliveryMan deliveryMan = deliveryManMapper.toEntity(deliveryManDTO);
        deliveryMan.setCreationDate(Instant.now());
        deliveryMan = deliveryManRepository.save(deliveryMan);
        return deliveryManMapper.toDto(deliveryMan);
    }

    /**
     * Get all the deliveryMen.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DeliveryManDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DeliveryMen");
        return deliveryManRepository.findAll(pageable)
            .map(deliveryManMapper::toDto);
    }


    /**
     * Get one deliveryMan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DeliveryManDTO> findOne(Long id) {
        log.debug("Request to get DeliveryMan : {}", id);
        return deliveryManRepository.findById(id)
            .map(deliveryManMapper::toDto);
    }

    /**
     * Delete the deliveryMan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DeliveryMan : {}", id);        deliveryManRepository.deleteById(id);
    }
}
