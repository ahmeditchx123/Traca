package com.apeiron.traca.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;

/**
 * A TransitionHistory.
 */
@Entity
@Table(name = "transition_history")
public class TransitionHistory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transition_date")
    private Instant transitionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "from_status")
    private DeliveryPackageStatus fromStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "to_status")
    private DeliveryPackageStatus toStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTransitionDate() {
        return transitionDate;
    }

    public TransitionHistory transitionDate(Instant transitionDate) {
        this.transitionDate = transitionDate;
        return this;
    }

    public void setTransitionDate(Instant transitionDate) {
        this.transitionDate = transitionDate;
    }

    public DeliveryPackageStatus getFromStatus() {
        return fromStatus;
    }

    public TransitionHistory fromStatus(DeliveryPackageStatus fromStatus) {
        this.fromStatus = fromStatus;
        return this;
    }

    public void setFromStatus(DeliveryPackageStatus fromStatus) {
        this.fromStatus = fromStatus;
    }

    public DeliveryPackageStatus getToStatus() {
        return toStatus;
    }

    public TransitionHistory toStatus(DeliveryPackageStatus toStatus) {
        this.toStatus = toStatus;
        return this;
    }

    public void setToStatus(DeliveryPackageStatus toStatus) {
        this.toStatus = toStatus;
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
        TransitionHistory transitionHistory = (TransitionHistory) o;
        if (transitionHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transitionHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransitionHistory{" +
            "id=" + getId() +
            ", transitionDate='" + getTransitionDate() + "'" +
            ", fromStatus='" + getFromStatus() + "'" +
            ", toStatus='" + getToStatus() + "'" +
            "}";
    }
}
