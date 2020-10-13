package com.apeiron.traca.service.dto;
import com.apeiron.traca.domain.Authority;
import com.apeiron.traca.domain.User;

import java.util.Objects;
import java.util.stream.Collectors;

/**
 * A DTO for the Shipper entity.
 */
public class ShipperDTO extends UserDTO {

    private Double firstPhone;

    private Double secondPhone;

    private Long addressId;

    private AddressDTO addressDTO;

    public ShipperDTO () {

    }

    public ShipperDTO (User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.activated = user.getActivated();
        this.imageUrl = user.getImageUrl();
        this.langKey = user.getLangKey();
        this.createdBy = user.getCreatedBy();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedBy = user.getLastModifiedBy();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.authorities = user.getAuthorities().stream()
            .map(Authority::getName)
            .collect(Collectors.toSet());
    }
    public String getFirstPhoneAsString(){
        if (firstPhone!=null) {
            return String.valueOf(firstPhone.longValue());
        } else
             return "--";
    }
    public String getSecondPhoneAsString(){
        if (secondPhone!=null) {
            return String.valueOf(secondPhone.longValue());
        } else
            return "--";
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

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public AddressDTO getAddress() {
        return addressDTO;
    }

    public void setAddress(AddressDTO addressDTO) {
        this.addressDTO = addressDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ShipperDTO shipperDTO = (ShipperDTO) o;
        if (shipperDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shipperDTO.getId());
    }



    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShipperDTO{" +
            "id=" + getId() +
            ", firstPhone=" + getFirstPhone() +
            ", secondPhone=" + getSecondPhone() +
            ", address=" + getAddressId() +
            "}";
    }
}
