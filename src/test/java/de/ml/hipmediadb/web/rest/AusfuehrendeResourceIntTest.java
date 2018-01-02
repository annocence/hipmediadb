package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Ausfuehrende;
import de.ml.hipmediadb.repository.AusfuehrendeRepository;
import de.ml.hipmediadb.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static de.ml.hipmediadb.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AusfuehrendeResource REST controller.
 *
 * @see AusfuehrendeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class AusfuehrendeResourceIntTest {

    private static final String DEFAULT_ORCHESTER = "AAAAAAAAAA";
    private static final String UPDATED_ORCHESTER = "BBBBBBBBBB";

    @Autowired
    private AusfuehrendeRepository ausfuehrendeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAusfuehrendeMockMvc;

    private Ausfuehrende ausfuehrende;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AusfuehrendeResource ausfuehrendeResource = new AusfuehrendeResource(ausfuehrendeRepository);
        this.restAusfuehrendeMockMvc = MockMvcBuilders.standaloneSetup(ausfuehrendeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ausfuehrende createEntity(EntityManager em) {
        Ausfuehrende ausfuehrende = new Ausfuehrende()
            .orchester(DEFAULT_ORCHESTER);
        return ausfuehrende;
    }

    @Before
    public void initTest() {
        ausfuehrende = createEntity(em);
    }

    @Test
    @Transactional
    public void createAusfuehrende() throws Exception {
        int databaseSizeBeforeCreate = ausfuehrendeRepository.findAll().size();

        // Create the Ausfuehrende
        restAusfuehrendeMockMvc.perform(post("/api/ausfuehrendes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ausfuehrende)))
            .andExpect(status().isCreated());

        // Validate the Ausfuehrende in the database
        List<Ausfuehrende> ausfuehrendeList = ausfuehrendeRepository.findAll();
        assertThat(ausfuehrendeList).hasSize(databaseSizeBeforeCreate + 1);
        Ausfuehrende testAusfuehrende = ausfuehrendeList.get(ausfuehrendeList.size() - 1);
        assertThat(testAusfuehrende.getOrchester()).isEqualTo(DEFAULT_ORCHESTER);
    }

    @Test
    @Transactional
    public void createAusfuehrendeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ausfuehrendeRepository.findAll().size();

        // Create the Ausfuehrende with an existing ID
        ausfuehrende.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAusfuehrendeMockMvc.perform(post("/api/ausfuehrendes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ausfuehrende)))
            .andExpect(status().isBadRequest());

        // Validate the Ausfuehrende in the database
        List<Ausfuehrende> ausfuehrendeList = ausfuehrendeRepository.findAll();
        assertThat(ausfuehrendeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAusfuehrendes() throws Exception {
        // Initialize the database
        ausfuehrendeRepository.saveAndFlush(ausfuehrende);

        // Get all the ausfuehrendeList
        restAusfuehrendeMockMvc.perform(get("/api/ausfuehrendes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ausfuehrende.getId().intValue())))
            .andExpect(jsonPath("$.[*].orchester").value(hasItem(DEFAULT_ORCHESTER.toString())));
    }

    @Test
    @Transactional
    public void getAusfuehrende() throws Exception {
        // Initialize the database
        ausfuehrendeRepository.saveAndFlush(ausfuehrende);

        // Get the ausfuehrende
        restAusfuehrendeMockMvc.perform(get("/api/ausfuehrendes/{id}", ausfuehrende.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ausfuehrende.getId().intValue()))
            .andExpect(jsonPath("$.orchester").value(DEFAULT_ORCHESTER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAusfuehrende() throws Exception {
        // Get the ausfuehrende
        restAusfuehrendeMockMvc.perform(get("/api/ausfuehrendes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAusfuehrende() throws Exception {
        // Initialize the database
        ausfuehrendeRepository.saveAndFlush(ausfuehrende);
        int databaseSizeBeforeUpdate = ausfuehrendeRepository.findAll().size();

        // Update the ausfuehrende
        Ausfuehrende updatedAusfuehrende = ausfuehrendeRepository.findOne(ausfuehrende.getId());
        // Disconnect from session so that the updates on updatedAusfuehrende are not directly saved in db
        em.detach(updatedAusfuehrende);
        updatedAusfuehrende
            .orchester(UPDATED_ORCHESTER);

        restAusfuehrendeMockMvc.perform(put("/api/ausfuehrendes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAusfuehrende)))
            .andExpect(status().isOk());

        // Validate the Ausfuehrende in the database
        List<Ausfuehrende> ausfuehrendeList = ausfuehrendeRepository.findAll();
        assertThat(ausfuehrendeList).hasSize(databaseSizeBeforeUpdate);
        Ausfuehrende testAusfuehrende = ausfuehrendeList.get(ausfuehrendeList.size() - 1);
        assertThat(testAusfuehrende.getOrchester()).isEqualTo(UPDATED_ORCHESTER);
    }

    @Test
    @Transactional
    public void updateNonExistingAusfuehrende() throws Exception {
        int databaseSizeBeforeUpdate = ausfuehrendeRepository.findAll().size();

        // Create the Ausfuehrende

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAusfuehrendeMockMvc.perform(put("/api/ausfuehrendes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ausfuehrende)))
            .andExpect(status().isCreated());

        // Validate the Ausfuehrende in the database
        List<Ausfuehrende> ausfuehrendeList = ausfuehrendeRepository.findAll();
        assertThat(ausfuehrendeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAusfuehrende() throws Exception {
        // Initialize the database
        ausfuehrendeRepository.saveAndFlush(ausfuehrende);
        int databaseSizeBeforeDelete = ausfuehrendeRepository.findAll().size();

        // Get the ausfuehrende
        restAusfuehrendeMockMvc.perform(delete("/api/ausfuehrendes/{id}", ausfuehrende.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ausfuehrende> ausfuehrendeList = ausfuehrendeRepository.findAll();
        assertThat(ausfuehrendeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ausfuehrende.class);
        Ausfuehrende ausfuehrende1 = new Ausfuehrende();
        ausfuehrende1.setId(1L);
        Ausfuehrende ausfuehrende2 = new Ausfuehrende();
        ausfuehrende2.setId(ausfuehrende1.getId());
        assertThat(ausfuehrende1).isEqualTo(ausfuehrende2);
        ausfuehrende2.setId(2L);
        assertThat(ausfuehrende1).isNotEqualTo(ausfuehrende2);
        ausfuehrende1.setId(null);
        assertThat(ausfuehrende1).isNotEqualTo(ausfuehrende2);
    }
}
