package com.apeiron.traca.service.dto;

import java.io.Serializable;

public class DailyCountDTO implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long numberNewDeliveredPackage;
    private Long numberNewRunsheet;
    private Long numberNewDeliveryMan;
    private Long numberNewSheeper;


    public Long getNumberNewDeliveredPackage() {
        return numberNewDeliveredPackage;
    }

    public void setNumberNewDeliveredPackage(Long numberNewDeliveredPackage) {
        this.numberNewDeliveredPackage = numberNewDeliveredPackage;
    }

    public Long getNumberNewRunsheet() {
        return numberNewRunsheet;
    }

    public void setNumberNewRunsheet(Long numberNewRunsheet) {
        this.numberNewRunsheet = numberNewRunsheet;
    }

    public Long getNumberNewDeliveryMan() {
        return numberNewDeliveryMan;
    }

    public void setNumberNewDeliveryMan(Long numberNewDeliveryMan) {
        this.numberNewDeliveryMan = numberNewDeliveryMan;
    }

    public Long getNumberNewSheeper() {
        return numberNewSheeper;
    }

    public void setNumberNewSheeper(Long numberNewSheeper) {
        this.numberNewSheeper = numberNewSheeper;
    }
}
