package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Medium;

import de.ml.hipmediadb.repository.MediumRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Medium.
 */
@RestController
@RequestMapping("/api")
public class MediumResource {

    private final Logger log = LoggerFactory.getLogger(MediumResource.class);

    private static final String ENTITY_NAME = "medium";

    private final MediumRepository mediumRepository;

    public MediumResource(MediumRepository mediumRepository) {
        this.mediumRepository = mediumRepository;
    }

    /**
     * POST  /mediums : Create a new medium.
     *
     * @param medium the medium to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medium, or with status 400 (Bad Request) if the medium has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mediums")
    @Timed
    public ResponseEntity<Medium> createMedium(@Valid @RequestBody Medium medium) throws URISyntaxException {
        log.debug("REST request to save Medium : {}", medium);
        if (medium.getId() != null) {
            throw new BadRequestAlertException("A new medium cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Medium result = mediumRepository.save(medium);
        return ResponseEntity.created(new URI("/api/mediums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mediums : Updates an existing medium.
     *
     * @param medium the medium to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medium,
     * or with status 400 (Bad Request) if the medium is not valid,
     * or with status 500 (Internal Server Error) if the medium couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mediums")
    @Timed
    public ResponseEntity<Medium> updateMedium(@Valid @RequestBody Medium medium) throws URISyntaxException {
        log.debug("REST request to update Medium : {}", medium);
        if (medium.getId() == null) {
            return createMedium(medium);
        }
        Medium result = mediumRepository.save(medium);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medium.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mediums : get all the mediums.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mediums in body
     */
    @GetMapping("/mediums")
    @Timed
    public ResponseEntity<List<Medium>> getAllMediums(Pageable pageable) {
        log.debug("REST request to get a page of Mediums");
        Page<Medium> page = mediumRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mediums");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mediums/:id : get the "id" medium.
     *
     * @param id the id of the medium to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medium, or with status 404 (Not Found)
     */
    @GetMapping("/mediums/{id}")
    @Timed
    public ResponseEntity<Medium> getMedium(@PathVariable Long id) {
        log.debug("REST request to get Medium : {}", id);
        Medium medium = mediumRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(medium));
    }

    /**
     * DELETE  /mediums/:id : delete the "id" medium.
     *
     * @param id the id of the medium to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mediums/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedium(@PathVariable Long id) {
        log.debug("REST request to delete Medium : {}", id);
        mediumRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
