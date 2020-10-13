package com.apeiron.traca.service.dto;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.time.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import com.apeiron.traca.domain.enumeration.RunSheetStatut;

/**
 * A DTO for the RunSheet entity.
 */
public class RunSheetDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull
    private String code;

    private Instant creationDate;

    private Double totalPrice;

    private RunSheetStatut status;

    private List<DeliveryPackageDTO> deliveryPackages;

    private Long deliveryManId;
    private DeliveryManDTO deliveryMan;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }
    public String getTotalPriceAsString(){
        NumberFormat format = NumberFormat.getInstance(Locale.FRANCE);

        return format.format(totalPrice);
    }
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setCode(String code) {
        this.code = code;
    }
    public String getCreationDateString(){
        Date myDate = Date.from(creationDate);
        SimpleDateFormat formatter = new SimpleDateFormat("dd MM yyyy HH:mm:ss");
        return formatter.format(myDate);
    }
    public Instant getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public RunSheetStatut getStatus() {
        return status;
    }

    public void setStatus(RunSheetStatut status) {
        this.status = status;
    }

    public Long getDeliveryManId() {
        return deliveryManId;
    }

    public void setDeliveryManId(Long deliveryManId) {
        this.deliveryManId = deliveryManId;
    }

    public DeliveryManDTO getDeliveryMan() {
        return deliveryMan;
    }

    public void setDeliveryMan(DeliveryManDTO deliveryMan) {
        this.deliveryMan = deliveryMan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RunSheetDTO runSheetDTO = (RunSheetDTO) o;
        if (runSheetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), runSheetDTO.getId());
    }

    public List<DeliveryPackageDTO> getDeliveryPackages() {
        return deliveryPackages;
    }

    public void setDeliveryPackages(List<DeliveryPackageDTO> deliveryPackages) {
        this.deliveryPackages = deliveryPackages;
    }

    public String getCreationDateLocalString() {

        LocalDate localDate = LocalDateTime.ofInstant(creationDate, ZoneOffset.UTC).toLocalDate();
        LocalTime localTime = LocalDateTime.ofInstant(creationDate, ZoneOffset.UTC).toLocalTime();
        return localDate.toString() + " " + localTime;
    }


    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RunSheetDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", deliveryMan=" + getDeliveryManId() +
            "}";
    }
}
