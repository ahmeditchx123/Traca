package com.apeiron.traca.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;

/**
 * A DTO for the TransitionHistory entity.
 */
public class TransitionHistoryDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private Instant transitionDate;

    private DeliveryPackageStatus fromStatus;

    private DeliveryPackageStatus toStatus;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTransitionDate() {
        return transitionDate;
    }

    public void setTransitionDate(Instant transitionDate) {
        this.transitionDate = transitionDate;
    }

    public DeliveryPackageStatus getFromStatus() {
        return fromStatus;
    }

    public void setFromStatus(DeliveryPackageStatus fromStatus) {
        this.fromStatus = fromStatus;
    }

    public DeliveryPackageStatus getToStatus() {
        return toStatus;
    }

    public void setToStatus(DeliveryPackageStatus toStatus) {
        this.toStatus = toStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransitionHistoryDTO transitionHistoryDTO = (TransitionHistoryDTO) o;
        if (transitionHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transitionHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransitionHistoryDTO{" +
            "id=" + getId() +
            ", transitionDate='" + getTransitionDate() + "'" +
            ", fromStatus='" + getFromStatus() + "'" +
            ", toStatus='" + getToStatus() + "'" +
            "}";
    }
}
