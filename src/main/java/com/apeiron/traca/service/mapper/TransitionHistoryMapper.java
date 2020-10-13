package com.apeiron.traca.service.mapper;

import com.apeiron.traca.domain.*;
import com.apeiron.traca.service.dto.TransitionHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransitionHistory and its DTO TransitionHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransitionHistoryMapper extends EntityMapper<TransitionHistoryDTO, TransitionHistory> {



    default TransitionHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransitionHistory transitionHistory = new TransitionHistory();
        transitionHistory.setId(id);
        return transitionHistory;
    }
}
