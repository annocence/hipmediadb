package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Musikepoche;

import de.ml.hipmediadb.repository.MusikepocheRepository;
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
 * REST controller for managing Musikepoche.
 */
@RestController
@RequestMapping("/api")
public class MusikepocheResource {

    private final Logger log = LoggerFactory.getLogger(MusikepocheResource.class);

    private static final String ENTITY_NAME = "musikepoche";

    private final MusikepocheRepository musikepocheRepository;

    public MusikepocheResource(MusikepocheRepository musikepocheRepository) {
        this.musikepocheRepository = musikepocheRepository;
    }

    /**
     * POST  /musikepoches : Create a new musikepoche.
     *
     * @param musikepoche the musikepoche to create
     * @return the ResponseEntity with status 201 (Created) and with body the new musikepoche, or with status 400 (Bad Request) if the musikepoche has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/musikepoches")
    @Timed
    public ResponseEntity<Musikepoche> createMusikepoche(@Valid @RequestBody Musikepoche musikepoche) throws URISyntaxException {
        log.debug("REST request to save Musikepoche : {}", musikepoche);
        if (musikepoche.getId() != null) {
            throw new BadRequestAlertException("A new musikepoche cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Musikepoche result = musikepocheRepository.save(musikepoche);
        return ResponseEntity.created(new URI("/api/musikepoches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /musikepoches : Updates an existing musikepoche.
     *
     * @param musikepoche the musikepoche to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated musikepoche,
     * or with status 400 (Bad Request) if the musikepoche is not valid,
     * or with status 500 (Internal Server Error) if the musikepoche couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/musikepoches")
    @Timed
    public ResponseEntity<Musikepoche> updateMusikepoche(@Valid @RequestBody Musikepoche musikepoche) throws URISyntaxException {
        log.debug("REST request to update Musikepoche : {}", musikepoche);
        if (musikepoche.getId() == null) {
            return createMusikepoche(musikepoche);
        }
        Musikepoche result = musikepocheRepository.save(musikepoche);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, musikepoche.getId().toString()))
            .body(result);
    }

    /**
     * GET  /musikepoches : get all the musikepoches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of musikepoches in body
     */
    @GetMapping("/musikepoches")
    @Timed
    public List<Musikepoche> getAllMusikepoches() {
        log.debug("REST request to get all Musikepoches");
        return musikepocheRepository.findAll();
        }

    /**
     * GET  /musikepoches/:id : get the "id" musikepoche.
     *
     * @param id the id of the musikepoche to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the musikepoche, or with status 404 (Not Found)
     */
    @GetMapping("/musikepoches/{id}")
    @Timed
    public ResponseEntity<Musikepoche> getMusikepoche(@PathVariable Long id) {
        log.debug("REST request to get Musikepoche : {}", id);
        Musikepoche musikepoche = musikepocheRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(musikepoche));
    }

    /**
     * DELETE  /musikepoches/:id : delete the "id" musikepoche.
     *
     * @param id the id of the musikepoche to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/musikepoches/{id}")
    @Timed
    public ResponseEntity<Void> deleteMusikepoche(@PathVariable Long id) {
        log.debug("REST request to delete Musikepoche : {}", id);
        musikepocheRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
