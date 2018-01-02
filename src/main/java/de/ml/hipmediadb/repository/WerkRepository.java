package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Werk;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Werk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WerkRepository extends JpaRepository<Werk, Long> {

}
