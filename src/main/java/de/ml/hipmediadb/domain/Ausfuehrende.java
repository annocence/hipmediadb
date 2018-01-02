package de.ml.hipmediadb.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ausfuehrende.
 */
@Entity
@Table(name = "ausfuehrende")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ausfuehrende implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orchester")
    private String orchester;

    @ManyToOne
    private Person interpret;

    @ManyToOne
    private Person dirigent;

    @ManyToOne
    private Ensembleart ensembleart;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrchester() {
        return orchester;
    }

    public Ausfuehrende orchester(String orchester) {
        this.orchester = orchester;
        return this;
    }

    public void setOrchester(String orchester) {
        this.orchester = orchester;
    }

    public Person getInterpret() {
        return interpret;
    }

    public Ausfuehrende interpret(Person person) {
        this.interpret = person;
        return this;
    }

    public void setInterpret(Person person) {
        this.interpret = person;
    }

    public Person getDirigent() {
        return dirigent;
    }

    public Ausfuehrende dirigent(Person person) {
        this.dirigent = person;
        return this;
    }

    public void setDirigent(Person person) {
        this.dirigent = person;
    }

    public Ensembleart getEnsembleart() {
        return ensembleart;
    }

    public Ausfuehrende ensembleart(Ensembleart ensembleart) {
        this.ensembleart = ensembleart;
        return this;
    }

    public void setEnsembleart(Ensembleart ensembleart) {
        this.ensembleart = ensembleart;
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
        Ausfuehrende ausfuehrende = (Ausfuehrende) o;
        if (ausfuehrende.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ausfuehrende.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ausfuehrende{" +
            "id=" + getId() +
            ", orchester='" + getOrchester() + "'" +
            "}";
    }
}
