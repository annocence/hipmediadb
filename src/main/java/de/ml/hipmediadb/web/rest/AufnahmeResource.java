package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Aufnahme;

import de.ml.hipmediadb.repository.AufnahmeRepository;
import de.ml.hipmediadb.web.rest.errors.BadRequestAlertException;
import de.ml.hipmediadb.web.rest.util.HeaderUtil;
import de.ml.hipmediadb.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Aufnahme.
 */
@RestController
@RequestMapping("/api")
public class AufnahmeResource {

    private final Logger log = LoggerFactory.getLogger(AufnahmeResource.class);

    private static final String ENTITY_NAME = "aufnahme";

    private final AufnahmeRepository aufnahmeRepository;

    public AufnahmeResource(AufnahmeRepository aufnahmeRepository) {
        this.aufnahmeRepository = aufnahmeRepository;
    }

    /**
     * POST  /aufnahmes : Create a new aufnahme.
     *
     * @param aufnahme the aufnahme to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aufnahme, or with status 400 (Bad Request) if the aufnahme has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/aufnahmes")
    @Timed
    public ResponseEntity<Aufnahme> createAufnahme(@RequestBody Aufnahme aufnahme) throws URISyntaxException {
        log.debug("REST request to save Aufnahme : {}", aufnahme);
        if (aufnahme.getId() != null) {
            throw new BadRequestAlertException("A new aufnahme cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aufnahme result = aufnahmeRepository.save(aufnahme);
        return ResponseEntity.created(new URI("/api/aufnahmes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /aufnahmes : Updates an existing aufnahme.
     *
     * @param aufnahme the aufnahme to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aufnahme,
     * or with status 400 (Bad Request) if the aufnahme is not valid,
     * or with status 500 (Internal Server Error) if the aufnahme couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/aufnahmes")
    @Timed
    public ResponseEntity<Aufnahme> updateAufnahme(@RequestBody Aufnahme aufnahme) throws URISyntaxException {
        log.debug("REST request to update Aufnahme : {}", aufnahme);
        if (aufnahme.getId() == null) {
            return createAufnahme(aufnahme);
        }
        Aufnahme result = aufnahmeRepository.save(aufnahme);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aufnahme.getId().toString()))
            .body(result);
    }

    /**
     * GET  /aufnahmes : get all the aufnahmes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of aufnahmes in body
     */
    @GetMapping("/aufnahmes")
    @Timed
    public ResponseEntity<List<Aufnahme>> getAllAufnahmes(Pageable pageable) {
        log.debug("REST request to get a page of Aufnahmes");
        Page<Aufnahme> page = aufnahmeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/aufnahmes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /aufnahmes/:id : get the "id" aufnahme.
     *
     * @param id the id of the aufnahme to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aufnahme, or with status 404 (Not Found)
     */
    @GetMapping("/aufnahmes/{id}")
    @Timed
    public ResponseEntity<Aufnahme> getAufnahme(@PathVariable Long id) {
        log.debug("REST request to get Aufnahme : {}", id);
        Aufnahme aufnahme = aufnahmeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(aufnahme));
    }

    /**
     * DELETE  /aufnahmes/:id : delete the "id" aufnahme.
     *
     * @param id the id of the aufnahme to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/aufnahmes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAufnahme(@PathVariable Long id) {
        log.debug("REST request to delete Aufnahme : {}", id);
        aufnahmeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
