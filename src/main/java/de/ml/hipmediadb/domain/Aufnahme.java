package de.ml.hipmediadb.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Aufnahme.
 */
@Entity
@Table(name = "aufnahme")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aufnahme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titel")
    private String titel;

    @Column(name = "aufnahme_datum")
    private LocalDate aufnahmeDatum;

    @Column(name = "mitschnitt_datum")
    private LocalDate mitschnittDatum;

    @Column(name = "dauer")
    private Long dauer;

    @Column(name = "startzeit")
    private Long startzeit;

    @ManyToOne
    private Ausfuehrende ausfuehrende;

    @ManyToOne
    private Medium medium;

    @ManyToOne
    private Werk werk;

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

    public Aufnahme titel(String titel) {
        this.titel = titel;
        return this;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public LocalDate getAufnahmeDatum() {
        return aufnahmeDatum;
    }

    public Aufnahme aufnahmeDatum(LocalDate aufnahmeDatum) {
        this.aufnahmeDatum = aufnahmeDatum;
        return this;
    }

    public void setAufnahmeDatum(LocalDate aufnahmeDatum) {
        this.aufnahmeDatum = aufnahmeDatum;
    }

    public LocalDate getMitschnittDatum() {
        return mitschnittDatum;
    }

    public Aufnahme mitschnittDatum(LocalDate mitschnittDatum) {
        this.mitschnittDatum = mitschnittDatum;
        return this;
    }

    public void setMitschnittDatum(LocalDate mitschnittDatum) {
        this.mitschnittDatum = mitschnittDatum;
    }

    public Long getDauer() {
        return dauer;
    }

    public Aufnahme dauer(Long dauer) {
        this.dauer = dauer;
        return this;
    }

    public void setDauer(Long dauer) {
        this.dauer = dauer;
    }

    public Long getStartzeit() {
        return startzeit;
    }

    public Aufnahme startzeit(Long startzeit) {
        this.startzeit = startzeit;
        return this;
    }

    public void setStartzeit(Long startzeit) {
        this.startzeit = startzeit;
    }

    public Ausfuehrende getAusfuehrende() {
        return ausfuehrende;
    }

    public Aufnahme ausfuehrende(Ausfuehrende ausfuehrende) {
        this.ausfuehrende = ausfuehrende;
        return this;
    }

    public void setAusfuehrende(Ausfuehrende ausfuehrende) {
        this.ausfuehrende = ausfuehrende;
    }

    public Medium getMedium() {
        return medium;
    }

    public Aufnahme medium(Medium medium) {
        this.medium = medium;
        return this;
    }

    public void setMedium(Medium medium) {
        this.medium = medium;
    }

    public Werk getWerk() {
        return werk;
    }

    public Aufnahme werk(Werk werk) {
        this.werk = werk;
        return this;
    }

    public void setWerk(Werk werk) {
        this.werk = werk;
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
        Aufnahme aufnahme = (Aufnahme) o;
        if (aufnahme.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aufnahme.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aufnahme{" +
            "id=" + getId() +
            ", titel='" + getTitel() + "'" +
            ", aufnahmeDatum='" + getAufnahmeDatum() + "'" +
            ", mitschnittDatum='" + getMitschnittDatum() + "'" +
            ", dauer=" + getDauer() +
            ", startzeit=" + getStartzeit() +
            "}";
    }
}
