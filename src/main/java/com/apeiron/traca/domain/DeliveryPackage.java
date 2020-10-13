package com.apeiron.traca.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;

import com.apeiron.traca.domain.enumeration.Fragility;

/**
 * A DeliveryPackage.
 */
@Entity
@Table(name = "delivery_package")
public class DeliveryPackage implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "receiver_first_name")
    private String receiverFirstName;

    @Column(name = "receiver_last_name")
    private String receiverLastName;

    @NotNull
    @Column(name = "receiver_phone", nullable = false)
    private Double receiverPhone;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DeliveryPackageStatus status;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "height")
    private Float height;

    @Column(name = "width")
    private Float width;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "price")
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "fragility")
    private Fragility fragility;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private Address address;

    @ManyToOne
    @JsonIgnoreProperties("deliveryPackages")
    private Shipper shipper;

    @ManyToOne
    @JsonIgnoreProperties("deliveryPackages")
    private RunSheet runSheet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public DeliveryPackage code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public DeliveryPackage receiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
        return this;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public String getReceiverLastName() {
        return receiverLastName;
    }

    public DeliveryPackage receiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
        return this;
    }

    public void setReceiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
    }

    public Double getReceiverPhone() {
        return receiverPhone;
    }

    public DeliveryPackage receiverPhone(Double receiverPhone) {
        this.receiverPhone = receiverPhone;
        return this;
    }

    public void setReceiverPhone(Double receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public DeliveryPackageStatus getStatus() {
        return status;
    }

    public DeliveryPackage status(DeliveryPackageStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(DeliveryPackageStatus status) {
        this.status = status;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public DeliveryPackage creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Float getHeight() {
        return height;
    }

    public DeliveryPackage height(Float height) {
        this.height = height;
        return this;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getWidth() {
        return width;
    }

    public DeliveryPackage width(Float width) {
        this.width = width;
        return this;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    public Float getWeight() {
        return weight;
    }

    public DeliveryPackage weight(Float weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Fragility getFragility() {
        return fragility;
    }

    public DeliveryPackage fragility(Fragility fragility) {
        this.fragility = fragility;
        return this;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setFragility(Fragility fragility) {
        this.fragility = fragility;
    }

    public Address getAddress() {
        return address;
    }

    public DeliveryPackage address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Shipper getShipper() {
        return shipper;
    }

    public DeliveryPackage shipper(Shipper shipper) {
        this.shipper = shipper;
        return this;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }

    public RunSheet getRunSheet() {
        return runSheet;
    }

    public DeliveryPackage runSheet(RunSheet runSheet) {
        this.runSheet = runSheet;
        return this;
    }

    public void setRunSheet(RunSheet runSheet) {
        this.runSheet = runSheet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DeliveryPackage deliveryPackage = (DeliveryPackage) o;
        if (deliveryPackage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryPackage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryPackage{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", receiverFirstName='" + getReceiverFirstName() + "'" +
            ", receiverLastName='" + getReceiverLastName() + "'" +
            ", receiverPhone=" + getReceiverPhone() +
            ", status='" + getStatus() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", height=" + getHeight() +
            ", width=" + getWidth() +
            ", weight=" + getWeight() +
            ", fragility='" + getFragility() + "'" +
            ", price='" + getPrice() + "'" +
            "}";
    }
}
