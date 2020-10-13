package com.apeiron.traca.service.dto;

import java.io.Serializable;

public class PackagesCountDTO implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long id;
    private int allPackagesCount;
    private int newPackagesCount;
    private int toDeliverPackagesCount;
    private int pickedPackagesCount;
    private int deliveredPackagesCount;
    private int refusedPackagesCount;

    public PackagesCountDTO() {

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAllPackagesCount() {
        return allPackagesCount;
    }

    public void setAllPackagesCount(int allPackagesCount) {
        this.allPackagesCount = allPackagesCount;
    }

    public int getNewPackagesCount() {
        return newPackagesCount;
    }

    public void setNewPackagesCount(int newPackagesCount) {
        this.newPackagesCount = newPackagesCount;
    }

    public int getToDeliverPackagesCount() {
        return toDeliverPackagesCount;
    }

    public void setToDeliverPackagesCount(int toDeliverPackagesCount) {
        this.toDeliverPackagesCount = toDeliverPackagesCount;
    }

    public int getPickedPackagesCount() {
        return pickedPackagesCount;
    }

    public void setPickedPackagesCount(int pickedPackagesCount) {
        this.pickedPackagesCount = pickedPackagesCount;
    }

    public int getDeliveredPackagesCount() {
        return deliveredPackagesCount;
    }

    public void setDeliveredPackagesCount(int deliveredPackagesCount) {
        this.deliveredPackagesCount = deliveredPackagesCount;
    }

    public int getRefusedPackagesCount() {
        return refusedPackagesCount;
    }

    public void setRefusedPackagesCount(int refusedPackagesCount) {
        this.refusedPackagesCount = refusedPackagesCount;
    }
}
