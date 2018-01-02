package de.ml.hipmediadb.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nachname", nullable = false)
    private String nachname;

    @Column(name = "vorname")
    private String vorname;

    @Column(name = "class")
    private String pclass;

    @Column(name = "lebensdaten")
    private String lebensdaten;

    @ManyToOne
    private Musikepoche musikepoche;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNachname() {
        return nachname;
    }

    public Person nachname(String nachname) {
        this.nachname = nachname;
        return this;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }

    public String getVorname() {
        return vorname;
    }

    public Person vorname(String vorname) {
        this.vorname = vorname;
        return this;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public String getPclass() {
        return pclass;
    }

    public Person pclass(String pclass) {
        this.pclass = pclass;
        return this;
    }

    public void setPclass(String pclass) {
        this.pclass = pclass;
    }

    public String getLebensdaten() {
        return lebensdaten;
    }

    public Person lebensdaten(String lebensdaten) {
        this.lebensdaten = lebensdaten;
        return this;
    }

    public void setLebensdaten(String lebensdaten) {
        this.lebensdaten = lebensdaten;
    }

    public Musikepoche getMusikepoche() {
        return musikepoche;
    }

    public Person musikepoche(Musikepoche musikepoche) {
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
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", nachname='" + getNachname() + "'" +
            ", vorname='" + getVorname() + "'" +
            ", pclass='" + getPclass() + "'" +
            ", lebensdaten='" + getLebensdaten() + "'" +
            "}";
    }
}
