package de.ml.hipmediadb.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.ml.hipmediadb.domain.Ausfuehrende;

import de.ml.hipmediadb.repository.AusfuehrendeRepository;
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
 * REST controller for managing Ausfuehrende.
 */
@RestController
@RequestMapping("/api")
public class AusfuehrendeResource {

    private final Logger log = LoggerFactory.getLogger(AusfuehrendeResource.class);

    private static final String ENTITY_NAME = "ausfuehrende";

    private final AusfuehrendeRepository ausfuehrendeRepository;

    public AusfuehrendeResource(AusfuehrendeRepository ausfuehrendeRepository) {
        this.ausfuehrendeRepository = ausfuehrendeRepository;
    }

    /**
     * POST  /ausfuehrendes : Create a new ausfuehrende.
     *
     * @param ausfuehrende the ausfuehrende to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ausfuehrende, or with status 400 (Bad Request) if the ausfuehrende has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ausfuehrendes")
    @Timed
    public ResponseEntity<Ausfuehrende> createAusfuehrende(@RequestBody Ausfuehrende ausfuehrende) throws URISyntaxException {
        log.debug("REST request to save Ausfuehrende : {}", ausfuehrende);
        if (ausfuehrende.getId() != null) {
            throw new BadRequestAlertException("A new ausfuehrende cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ausfuehrende result = ausfuehrendeRepository.save(ausfuehrende);
        return ResponseEntity.created(new URI("/api/ausfuehrendes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ausfuehrendes : Updates an existing ausfuehrende.
     *
     * @param ausfuehrende the ausfuehrende to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ausfuehrende,
     * or with status 400 (Bad Request) if the ausfuehrende is not valid,
     * or with status 500 (Internal Server Error) if the ausfuehrende couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ausfuehrendes")
    @Timed
    public ResponseEntity<Ausfuehrende> updateAusfuehrende(@RequestBody Ausfuehrende ausfuehrende) throws URISyntaxException {
        log.debug("REST request to update Ausfuehrende : {}", ausfuehrende);
        if (ausfuehrende.getId() == null) {
            return createAusfuehrende(ausfuehrende);
        }
        Ausfuehrende result = ausfuehrendeRepository.save(ausfuehrende);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ausfuehrende.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ausfuehrendes : get all the ausfuehrendes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ausfuehrendes in body
     */
    @GetMapping("/ausfuehrendes")
    @Timed
    public List<Ausfuehrende> getAllAusfuehrendes() {
        log.debug("REST request to get all Ausfuehrendes");
        return ausfuehrendeRepository.findAll();
        }

    /**
     * GET  /ausfuehrendes/:id : get the "id" ausfuehrende.
     *
     * @param id the id of the ausfuehrende to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ausfuehrende, or with status 404 (Not Found)
     */
    @GetMapping("/ausfuehrendes/{id}")
    @Timed
    public ResponseEntity<Ausfuehrende> getAusfuehrende(@PathVariable Long id) {
        log.debug("REST request to get Ausfuehrende : {}", id);
        Ausfuehrende ausfuehrende = ausfuehrendeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ausfuehrende));
    }

    /**
     * DELETE  /ausfuehrendes/:id : delete the "id" ausfuehrende.
     *
     * @param id the id of the ausfuehrende to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ausfuehrendes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAusfuehrende(@PathVariable Long id) {
        log.debug("REST request to delete Ausfuehrende : {}", id);
        ausfuehrendeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
