package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Musikepoche;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Musikepoche entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MusikepocheRepository extends JpaRepository<Musikepoche, Long> {

}
