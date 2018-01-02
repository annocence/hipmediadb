package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Mediumtyp;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mediumtyp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MediumtypRepository extends JpaRepository<Mediumtyp, Long> {

}
