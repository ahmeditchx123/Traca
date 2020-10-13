package com.apeiron.traca.service;

import com.apeiron.traca.service.dto.CountDTO;
import com.apeiron.traca.service.dto.DailyCountDTO;

public interface CountService {

    CountDTO count();
    DailyCountDTO dailyCount();
}
