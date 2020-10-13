package com.apeiron.traca.domain;



import javax.persistence.*;

import java.util.Objects;

/**
 * A Shipper.
 */
@Entity
@DiscriminatorValue("shipper")
public class Shipper extends User {

    private static final long serialVersionUID = 1L;

    @Column(name = "first_phone")
    private Double firstPhone;

    @Column(name = "second_phone")
    private Double secondPhone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private Address address;

    public Double getFirstPhone() {
        return firstPhone;
    }

    public Shipper firstPhone(Double firstPhone) {
        this.firstPhone = firstPhone;
        return this;
    }

    public void setFirstPhone(Double firstPhone) {
        this.firstPhone = firstPhone;
    }

    public Double getSecondPhone() {
        return secondPhone;
    }

    public Shipper secondPhone(Double secondPhone) {
        this.secondPhone = secondPhone;
        return this;
    }

    public void setSecondPhone(Double secondPhone) {
        this.secondPhone = secondPhone;
    }

    public Address getAddress() {
        return address;
    }

    public Shipper address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
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
        Shipper shipper = (Shipper) o;
        if (shipper.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shipper.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Shipper{" +
            "id=" + getId() +
            ", firstPhone=" + getFirstPhone() +
            ", secondPhone=" + getSecondPhone() +
            "}";
    }
}
