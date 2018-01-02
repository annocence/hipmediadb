package de.ml.hipmediadb.repository;

import de.ml.hipmediadb.domain.Ensembleart;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ensembleart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnsembleartRepository extends JpaRepository<Ensembleart, Long> {

}
