package com.apeiron.traca.service.impl;

import com.apeiron.traca.service.TransitionHistoryService;
import com.apeiron.traca.domain.TransitionHistory;
import com.apeiron.traca.repository.TransitionHistoryRepository;
import com.apeiron.traca.service.dto.TransitionHistoryDTO;
import com.apeiron.traca.service.mapper.TransitionHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing TransitionHistory.
 */
@Service
@Transactional
public class TransitionHistoryServiceImpl implements TransitionHistoryService {

    private final Logger log = LoggerFactory.getLogger(TransitionHistoryServiceImpl.class);

    private final TransitionHistoryRepository transitionHistoryRepository;

    private final TransitionHistoryMapper transitionHistoryMapper;

    public TransitionHistoryServiceImpl(TransitionHistoryRepository transitionHistoryRepository, TransitionHistoryMapper transitionHistoryMapper) {
        this.transitionHistoryRepository = transitionHistoryRepository;
        this.transitionHistoryMapper = transitionHistoryMapper;
    }

    /**
     * Save a transitionHistory.
     *
     * @param transitionHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransitionHistoryDTO save(TransitionHistoryDTO transitionHistoryDTO) {
        log.debug("Request to save TransitionHistory : {}", transitionHistoryDTO);
        TransitionHistory transitionHistory = transitionHistoryMapper.toEntity(transitionHistoryDTO);
        transitionHistory = transitionHistoryRepository.save(transitionHistory);
        return transitionHistoryMapper.toDto(transitionHistory);
    }

    /**
     * Get all the transitionHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TransitionHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransitionHistories");
        return transitionHistoryRepository.findAll(pageable)
            .map(transitionHistoryMapper::toDto);
    }


    /**
     * Get one transitionHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransitionHistoryDTO> findOne(Long id) {
        log.debug("Request to get TransitionHistory : {}", id);
        return transitionHistoryRepository.findById(id)
            .map(transitionHistoryMapper::toDto);
    }

    /**
     * Delete the transitionHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransitionHistory : {}", id);        transitionHistoryRepository.deleteById(id);
    }
}
