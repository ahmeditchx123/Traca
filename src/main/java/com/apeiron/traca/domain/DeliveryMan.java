package com.apeiron.traca.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DeliveryMan.
 */
@Entity
@Table(name = "delivery_man")
public class DeliveryMan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "first_phone")
    private Double firstPhone;

    @Column(name = "second_phone")
    private Double secondPhone;

    @Column(name = "hire_date")
    private Instant hireDate;

    @Column(name = "creation_date")
    private Instant creationDate;

    @OneToMany(mappedBy = "deliveryMan")
    private Set<RunSheet> runSheets = new HashSet<>();
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

    public DeliveryMan code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFirstName() {
        return firstName;
    }

    public DeliveryMan firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public DeliveryMan lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Double getFirstPhone() {
        return firstPhone;
    }

    public DeliveryMan firstPhone(Double firstPhone) {
        this.firstPhone = firstPhone;
        return this;
    }

    public void setFirstPhone(Double firstPhone) {
        this.firstPhone = firstPhone;
    }

    public Double getSecondPhone() {
        return secondPhone;
    }

    public DeliveryMan secondPhone(Double secondPhone) {
        this.secondPhone = secondPhone;
        return this;
    }

    public void setSecondPhone(Double secondPhone) {
        this.secondPhone = secondPhone;
    }

    public Instant getHireDate() {
        return hireDate;
    }

    public DeliveryMan hireDate(Instant hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Set<RunSheet> getRunSheets() {
        return runSheets;
    }

    public DeliveryMan runSheets(Set<RunSheet> runSheets) {
        this.runSheets = runSheets;
        return this;
    }

    public DeliveryMan addRunSheet(RunSheet runSheet) {
        this.runSheets.add(runSheet);
        runSheet.setDeliveryMan(this);
        return this;
    }

    public DeliveryMan removeRunSheet(RunSheet runSheet) {
        this.runSheets.remove(runSheet);
        runSheet.setDeliveryMan(null);
        return this;
    }

    public void setRunSheets(Set<RunSheet> runSheets) {
        this.runSheets = runSheets;
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
        DeliveryMan deliveryMan = (DeliveryMan) o;
        if (deliveryMan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryMan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryMan{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", firstPhone=" + getFirstPhone() +
            ", secondPhone=" + getSecondPhone() +
            ", hireDate='" + getHireDate() + "'" +
            "}";
    }
}
