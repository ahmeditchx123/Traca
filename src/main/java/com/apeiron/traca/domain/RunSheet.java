package com.apeiron.traca.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.apeiron.traca.domain.enumeration.RunSheetStatut;

/**
 * A RunSheet.
 */
@Entity
@Table(name = "run_sheet")
public class RunSheet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "totalPrice")
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RunSheetStatut status;

    @ManyToOne
    @JsonIgnoreProperties("runSheets")
    private DeliveryMan deliveryMan;

    @OneToMany(mappedBy = "runSheet")
    private Set<DeliveryPackage> deliveryPackages = new HashSet<>();
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

    public RunSheet code(String code) {
        this.code = code;
        return this;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public RunSheet creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public RunSheetStatut getStatus() {
        return status;
    }

    public RunSheet status(RunSheetStatut status) {
        this.status = status;
        return this;
    }

    public void setStatus(RunSheetStatut status) {
        this.status = status;
    }

    public DeliveryMan getDeliveryMan() {
        return deliveryMan;
    }

    public RunSheet deliveryMan(DeliveryMan deliveryMan) {
        this.deliveryMan = deliveryMan;
        return this;
    }

    public void setDeliveryMan(DeliveryMan deliveryMan) {
        this.deliveryMan = deliveryMan;
    }

    public Set<DeliveryPackage> getDeliveryPackages() {
        return deliveryPackages;
    }

    public RunSheet deliveryPackages(Set<DeliveryPackage> deliveryPackages) {
        this.deliveryPackages = deliveryPackages;
        return this;
    }

    public RunSheet addDeliveryPackages(DeliveryPackage deliveryPackage) {
        this.deliveryPackages.add(deliveryPackage);
        deliveryPackage.setRunSheet(this);
        return this;
    }

    public RunSheet removeDeliveryPackages(DeliveryPackage deliveryPackage) {
        this.deliveryPackages.remove(deliveryPackage);
        deliveryPackage.setRunSheet(null);
        return this;
    }

    public void setDeliveryPackages(Set<DeliveryPackage> deliveryPackages) {
        this.deliveryPackages = deliveryPackages;
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
        RunSheet runSheet = (RunSheet) o;
        if (runSheet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), runSheet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RunSheet{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", totalPrice='" + getTotalPrice() + "'" +
            "}";
    }
}
