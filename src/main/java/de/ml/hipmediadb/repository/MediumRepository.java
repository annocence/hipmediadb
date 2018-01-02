package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Medium;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Medium entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MediumRepository extends JpaRepository<Medium, Long> {

}
