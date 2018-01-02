package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Ausfuehrende;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ausfuehrende entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AusfuehrendeRepository extends JpaRepository<Ausfuehrende, Long> {

}
