package de.ml.hipmediadb.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Werk.
 */
@Entity
@Table(name = "werk")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Werk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titel")
    private String titel;

    @Column(name = "titelzusatz")
    private String titelzusatz;

    @Column(name = "zaehlinfo")
    private String zaehlinfo;

    @Column(name = "gattung")
    private String gattung;

    @ManyToOne
    private Person urheber;

    @ManyToOne
    private Musikepoche musikepoche;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitel() {
        return titel;
    }

    public Werk titel(String titel) {
        this.titel = titel;
        return this;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getTitelzusatz() {
        return titelzusatz;
    }

    public Werk titelzusatz(String titelzusatz) {
        this.titelzusatz = titelzusatz;
        return this;
    }

    public void setTitelzusatz(String titelzusatz) {
        this.titelzusatz = titelzusatz;
    }

    public String getZaehlinfo() {
        return zaehlinfo;
    }

    public Werk zaehlinfo(String zaehlinfo) {
        this.zaehlinfo = zaehlinfo;
        return this;
    }

    public void setZaehlinfo(String zaehlinfo) {
        this.zaehlinfo = zaehlinfo;
    }

    public String getGattung() {
        return gattung;
    }

    public Werk gattung(String gattung) {
        this.gattung = gattung;
        return this;
    }

    public void setGattung(String gattung) {
        this.gattung = gattung;
    }

    public Person getUrheber() {
        return urheber;
    }

    public Werk urheber(Person person) {
        this.urheber = person;
        return this;
    }

    public void setUrheber(Person person) {
        this.urheber = person;
    }

    public Musikepoche getMusikepoche() {
        return musikepoche;
    }

    public Werk musikepoche(Musikepoche musikepoche) {
        this.musikepoche = musikepoche;
        return this;
    }

    public void setMusikepoche(Musikepoche musikepoche) {
        this.musikepoche = musikepoche;
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
        Werk werk = (Werk) o;
        if (werk.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), werk.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Werk{" +
            "id=" + getId() +
            ", titel='" + getTitel() + "'" +
            ", titelzusatz='" + getTitelzusatz() + "'" +
            ", zaehlinfo='" + getZaehlinfo() + "'" +
            ", gattung='" + getGattung() + "'" +
            "}";
    }
}
