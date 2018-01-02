package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Werk;

import de.ml.hipmediadb.repository.WerkRepository;
import de.ml.hipmediadb.web.rest.errors.BadRequestAlertException;
import de.ml.hipmediadb.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Werk.
 */
@RestController
@RequestMapping("/api")
public class WerkResource {

    private final Logger log = LoggerFactory.getLogger(WerkResource.class);

    private static final String ENTITY_NAME = "werk";

    private final WerkRepository werkRepository;

    public WerkResource(WerkRepository werkRepository) {
        this.werkRepository = werkRepository;
    }

    /**
     * POST  /werks : Create a new werk.
     *
     * @param werk the werk to create
     * @return the ResponseEntity with status 201 (Created) and with body the new werk, or with status 400 (Bad Request) if the werk has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/werks")
    @Timed
    public ResponseEntity<Werk> createWerk(@RequestBody Werk werk) throws URISyntaxException {
        log.debug("REST request to save Werk : {}", werk);
        if (werk.getId() != null) {
            throw new BadRequestAlertException("A new werk cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Werk result = werkRepository.save(werk);
        return ResponseEntity.created(new URI("/api/werks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /werks : Updates an existing werk.
     *
     * @param werk the werk to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated werk,
     * or with status 400 (Bad Request) if the werk is not valid,
     * or with status 500 (Internal Server Error) if the werk couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/werks")
    @Timed
    public ResponseEntity<Werk> updateWerk(@RequestBody Werk werk) throws URISyntaxException {
        log.debug("REST request to update Werk : {}", werk);
        if (werk.getId() == null) {
            return createWerk(werk);
        }
        Werk result = werkRepository.save(werk);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, werk.getId().toString()))
            .body(result);
    }

    /**
     * GET  /werks : get all the werks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of werks in body
     */
    @GetMapping("/werks")
    @Timed
    public List<Werk> getAllWerks() {
        log.debug("REST request to get all Werks");
        return werkRepository.findAll();
        }

    /**
     * GET  /werks/:id : get the "id" werk.
     *
     * @param id the id of the werk to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the werk, or with status 404 (Not Found)
     */
    @GetMapping("/werks/{id}")
    @Timed
    public ResponseEntity<Werk> getWerk(@PathVariable Long id) {
        log.debug("REST request to get Werk : {}", id);
        Werk werk = werkRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(werk));
    }

    /**
     * DELETE  /werks/:id : delete the "id" werk.
     *
     * @param id the id of the werk to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/werks/{id}")
    @Timed
    public ResponseEntity<Void> deleteWerk(@PathVariable Long id) {
        log.debug("REST request to delete Werk : {}", id);
        werkRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
