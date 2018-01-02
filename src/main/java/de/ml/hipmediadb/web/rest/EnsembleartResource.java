package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Ensembleart;

import de.ml.hipmediadb.repository.EnsembleartRepository;
import de.ml.hipmediadb.web.rest.errors.BadRequestAlertException;
import de.ml.hipmediadb.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ensembleart.
 */
@RestController
@RequestMapping("/api")
public class EnsembleartResource {

    private final Logger log = LoggerFactory.getLogger(EnsembleartResource.class);

    private static final String ENTITY_NAME = "ensembleart";

    private final EnsembleartRepository ensembleartRepository;

    public EnsembleartResource(EnsembleartRepository ensembleartRepository) {
        this.ensembleartRepository = ensembleartRepository;
    }

    /**
     * POST  /ensemblearts : Create a new ensembleart.
     *
     * @param ensembleart the ensembleart to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ensembleart, or with status 400 (Bad Request) if the ensembleart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ensemblearts")
    @Timed
    public ResponseEntity<Ensembleart> createEnsembleart(@Valid @RequestBody Ensembleart ensembleart) throws URISyntaxException {
        log.debug("REST request to save Ensembleart : {}", ensembleart);
        if (ensembleart.getId() != null) {
            throw new BadRequestAlertException("A new ensembleart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ensembleart result = ensembleartRepository.save(ensembleart);
        return ResponseEntity.created(new URI("/api/ensemblearts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ensemblearts : Updates an existing ensembleart.
     *
     * @param ensembleart the ensembleart to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ensembleart,
     * or with status 400 (Bad Request) if the ensembleart is not valid,
     * or with status 500 (Internal Server Error) if the ensembleart couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ensemblearts")
    @Timed
    public ResponseEntity<Ensembleart> updateEnsembleart(@Valid @RequestBody Ensembleart ensembleart) throws URISyntaxException {
        log.debug("REST request to update Ensembleart : {}", ensembleart);
        if (ensembleart.getId() == null) {
            return createEnsembleart(ensembleart);
        }
        Ensembleart result = ensembleartRepository.save(ensembleart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ensembleart.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ensemblearts : get all the ensemblearts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ensemblearts in body
     */
    @GetMapping("/ensemblearts")
    @Timed
    public List<Ensembleart> getAllEnsemblearts() {
        log.debug("REST request to get all Ensemblearts");
        return ensembleartRepository.findAll();
        }

    /**
     * GET  /ensemblearts/:id : get the "id" ensembleart.
     *
     * @param id the id of the ensembleart to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ensembleart, or with status 404 (Not Found)
     */
    @GetMapping("/ensemblearts/{id}")
    @Timed
    public ResponseEntity<Ensembleart> getEnsembleart(@PathVariable Long id) {
        log.debug("REST request to get Ensembleart : {}", id);
        Ensembleart ensembleart = ensembleartRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ensembleart));
    }

    /**
     * DELETE  /ensemblearts/:id : delete the "id" ensembleart.
     *
     * @param id the id of the ensembleart to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ensemblearts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnsembleart(@PathVariable Long id) {
        log.debug("REST request to delete Ensembleart : {}", id);
        ensembleartRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
