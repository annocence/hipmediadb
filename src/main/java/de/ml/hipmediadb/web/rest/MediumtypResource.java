package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Mediumtyp;

import de.ml.hipmediadb.repository.MediumtypRepository;
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
 * REST controller for managing Mediumtyp.
 */
@RestController
@RequestMapping("/api")
public class MediumtypResource {

    private final Logger log = LoggerFactory.getLogger(MediumtypResource.class);

    private static final String ENTITY_NAME = "mediumtyp";

    private final MediumtypRepository mediumtypRepository;

    public MediumtypResource(MediumtypRepository mediumtypRepository) {
        this.mediumtypRepository = mediumtypRepository;
    }

    /**
     * POST  /mediumtyps : Create a new mediumtyp.
     *
     * @param mediumtyp the mediumtyp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mediumtyp, or with status 400 (Bad Request) if the mediumtyp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mediumtyps")
    @Timed
    public ResponseEntity<Mediumtyp> createMediumtyp(@Valid @RequestBody Mediumtyp mediumtyp) throws URISyntaxException {
        log.debug("REST request to save Mediumtyp : {}", mediumtyp);
        if (mediumtyp.getId() != null) {
            throw new BadRequestAlertException("A new mediumtyp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mediumtyp result = mediumtypRepository.save(mediumtyp);
        return ResponseEntity.created(new URI("/api/mediumtyps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mediumtyps : Updates an existing mediumtyp.
     *
     * @param mediumtyp the mediumtyp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mediumtyp,
     * or with status 400 (Bad Request) if the mediumtyp is not valid,
     * or with status 500 (Internal Server Error) if the mediumtyp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mediumtyps")
    @Timed
    public ResponseEntity<Mediumtyp> updateMediumtyp(@Valid @RequestBody Mediumtyp mediumtyp) throws URISyntaxException {
        log.debug("REST request to update Mediumtyp : {}", mediumtyp);
        if (mediumtyp.getId() == null) {
            return createMediumtyp(mediumtyp);
        }
        Mediumtyp result = mediumtypRepository.save(mediumtyp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mediumtyp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mediumtyps : get all the mediumtyps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mediumtyps in body
     */
    @GetMapping("/mediumtyps")
    @Timed
    public List<Mediumtyp> getAllMediumtyps() {
        log.debug("REST request to get all Mediumtyps");
        return mediumtypRepository.findAll();
        }

    /**
     * GET  /mediumtyps/:id : get the "id" mediumtyp.
     *
     * @param id the id of the mediumtyp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mediumtyp, or with status 404 (Not Found)
     */
    @GetMapping("/mediumtyps/{id}")
    @Timed
    public ResponseEntity<Mediumtyp> getMediumtyp(@PathVariable Long id) {
        log.debug("REST request to get Mediumtyp : {}", id);
        Mediumtyp mediumtyp = mediumtypRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mediumtyp));
    }

    /**
     * DELETE  /mediumtyps/:id : delete the "id" mediumtyp.
     *
     * @param id the id of the mediumtyp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mediumtyps/{id}")
    @Timed
    public ResponseEntity<Void> deleteMediumtyp(@PathVariable Long id) {
        log.debug("REST request to delete Mediumtyp : {}", id);
        mediumtypRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
