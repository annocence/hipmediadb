package de.ml.hipmediadb.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Medium.
 */
@Entity
@Table(name = "medium")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Medium implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "signatur", nullable = false)
    private String signatur;

    @ManyToOne
    private Mediumtyp typ;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSignatur() {
        return signatur;
    }

    public Medium signatur(String signatur) {
        this.signatur = signatur;
        return this;
    }

    public void setSignatur(String signatur) {
        this.signatur = signatur;
    }

    public Mediumtyp getTyp() {
        return typ;
    }

    public Medium typ(Mediumtyp mediumtyp) {
        this.typ = mediumtyp;
        return this;
    }

    public void setTyp(Mediumtyp mediumtyp) {
        this.typ = mediumtyp;
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
        Medium medium = (Medium) o;
        if (medium.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medium.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medium{" +
            "id=" + getId() +
            ", signatur='" + getSignatur() + "'" +
            "}";
    }
}
