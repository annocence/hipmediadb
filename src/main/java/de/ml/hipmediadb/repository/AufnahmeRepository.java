package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Aufnahme;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Aufnahme entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AufnahmeRepository extends JpaRepository<Aufnahme, Long> {

}
