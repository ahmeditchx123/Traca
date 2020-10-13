package com.apeiron.traca.service.mapper;

import com.apeiron.traca.domain.*;
import com.apeiron.traca.service.dto.RunSheetDTO;

/**
 * Mapper for the entity RunSheet and its DTO RunSheetDTO.
 */
public interface RunSheetMapper extends EntityMapper<RunSheetDTO, RunSheet> {

    RunSheetDTO toDto(RunSheet runSheet);

    RunSheet toEntity(RunSheetDTO runSheetDTO);

    default RunSheet fromId(Long id) {
        if (id == null) {
            return null;
        }
        RunSheet runSheet = new RunSheet();
        runSheet.setId(id);
        return runSheet;
    }
}
