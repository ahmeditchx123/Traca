package com.apeiron.traca.service.dto;
import java.io.Serializable;

public class CountDTO implements Serializable {

    private static final long serialVersionUID = -7802370175670391519L;
    private Long numberRunsheet;
    private Long numberPackage;
    private Long numberSheeper;
    private Long numberDeliveryMan;
    private Long numberNewPackage;
    private Long numberPickedPackage;
    private Long numberDeliveredPackage;
    private Long numberNewRunsheet;
    private Long numberHandledRunsheet;
    private Long numberAffectedRunsheet;


    public Long getNumberRunsheet() {
        return numberRunsheet;
    }

    public void setNumberRunsheet(Long numberRunsheet) {
        this.numberRunsheet = numberRunsheet;
    }

    public Long getNumberPackage() {
        return numberPackage;
    }

    public void setNumberPackage(Long numberPackage) {
        this.numberPackage = numberPackage;
    }

    public Long getNumberSheeper() {
        return numberSheeper;
    }

    public void setNumberSheeper(Long numberSheeper) {
        this.numberSheeper = numberSheeper;
    }

    public Long getNumberDeliveryMan() {
        return numberDeliveryMan;
    }

    public void setNumberDeliveryMan(Long numberDeliveryMan) {
        this.numberDeliveryMan = numberDeliveryMan;
    }

    public Long getNumberNewPackage() {
        return numberNewPackage;
    }

    public void setNumberNewPackage(Long numberNewPackage) {
        this.numberNewPackage = numberNewPackage;
    }

    public Long getNumberPickedPackage() {
        return numberPickedPackage;
    }

    public void setNumberPickedPackage(Long numberPickedPackage) {
        this.numberPickedPackage = numberPickedPackage;
    }

    public Long getNumberDeliveredPackage() {
        return numberDeliveredPackage;
    }

    public void setNumberDeliveredPackage(Long numberDeliveredPackage) {
        this.numberDeliveredPackage = numberDeliveredPackage;
    }

    public Long getNumberNewRunsheet() {
        return numberNewRunsheet;
    }

    public void setNumberNewRunsheet(Long numberNewRunsheet) {
        this.numberNewRunsheet = numberNewRunsheet;
    }

    public Long getNumberHandledRunsheet() {
        return numberHandledRunsheet;
    }

    public void setNumberHandledRunsheet(Long numberHandledRunsheet) {
        this.numberHandledRunsheet = numberHandledRunsheet;
    }

    public Long getNumberAffectedRunsheet() {
        return numberAffectedRunsheet;
    }

    public void setNumberAffectedRunsheet(Long numberAffectedRunsheet) {
        this.numberAffectedRunsheet = numberAffectedRunsheet;
    }
}
