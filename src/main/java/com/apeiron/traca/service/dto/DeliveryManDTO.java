package com.apeiron.traca.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the DeliveryMan entity.
 */
public class DeliveryManDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull
    private String code;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private Double firstPhone;

    private Double secondPhone;

    private Instant hireDate;

    private Instant creationDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Double getFirstPhone() {
        return firstPhone;
    }

    public void setFirstPhone(Double firstPhone) {
        this.firstPhone = firstPhone;
    }

    public Double getSecondPhone() {
        return secondPhone;
    }

    public void setSecondPhone(Double secondPhone) {
        this.secondPhone = secondPhone;
    }

    public Instant getHireDate() {
        return hireDate;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DeliveryManDTO deliveryManDTO = (DeliveryManDTO) o;
        if (deliveryManDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryManDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryManDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", firstPhone=" + getFirstPhone() +
            ", secondPhone=" + getSecondPhone() +
            ", hireDate='" + getHireDate() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
