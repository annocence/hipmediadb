package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Medium;
import de.ml.hipmediadb.repository.MediumRepository;
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
 * Test class for the MediumResource REST controller.
 *
 * @see MediumResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class MediumResourceIntTest {

    private static final String DEFAULT_SIGNATUR = "AAAAAAAAAA";
    private static final String UPDATED_SIGNATUR = "BBBBBBBBBB";

    @Autowired
    private MediumRepository mediumRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMediumMockMvc;

    private Medium medium;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MediumResource mediumResource = new MediumResource(mediumRepository);
        this.restMediumMockMvc = MockMvcBuilders.standaloneSetup(mediumResource)
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
    public static Medium createEntity(EntityManager em) {
        Medium medium = new Medium()
            .signatur(DEFAULT_SIGNATUR);
        return medium;
    }

    @Before
    public void initTest() {
        medium = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedium() throws Exception {
        int databaseSizeBeforeCreate = mediumRepository.findAll().size();

        // Create the Medium
        restMediumMockMvc.perform(post("/api/mediums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medium)))
            .andExpect(status().isCreated());

        // Validate the Medium in the database
        List<Medium> mediumList = mediumRepository.findAll();
        assertThat(mediumList).hasSize(databaseSizeBeforeCreate + 1);
        Medium testMedium = mediumList.get(mediumList.size() - 1);
        assertThat(testMedium.getSignatur()).isEqualTo(DEFAULT_SIGNATUR);
    }

    @Test
    @Transactional
    public void createMediumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mediumRepository.findAll().size();

        // Create the Medium with an existing ID
        medium.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMediumMockMvc.perform(post("/api/mediums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medium)))
            .andExpect(status().isBadRequest());

        // Validate the Medium in the database
        List<Medium> mediumList = mediumRepository.findAll();
        assertThat(mediumList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSignaturIsRequired() throws Exception {
        int databaseSizeBeforeTest = mediumRepository.findAll().size();
        // set the field null
        medium.setSignatur(null);

        // Create the Medium, which fails.

        restMediumMockMvc.perform(post("/api/mediums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medium)))
            .andExpect(status().isBadRequest());

        List<Medium> mediumList = mediumRepository.findAll();
        assertThat(mediumList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMediums() throws Exception {
        // Initialize the database
        mediumRepository.saveAndFlush(medium);

        // Get all the mediumList
        restMediumMockMvc.perform(get("/api/mediums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medium.getId().intValue())))
            .andExpect(jsonPath("$.[*].signatur").value(hasItem(DEFAULT_SIGNATUR.toString())));
    }

    @Test
    @Transactional
    public void getMedium() throws Exception {
        // Initialize the database
        mediumRepository.saveAndFlush(medium);

        // Get the medium
        restMediumMockMvc.perform(get("/api/mediums/{id}", medium.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medium.getId().intValue()))
            .andExpect(jsonPath("$.signatur").value(DEFAULT_SIGNATUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedium() throws Exception {
        // Get the medium
        restMediumMockMvc.perform(get("/api/mediums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedium() throws Exception {
        // Initialize the database
        mediumRepository.saveAndFlush(medium);
        int databaseSizeBeforeUpdate = mediumRepository.findAll().size();

        // Update the medium
        Medium updatedMedium = mediumRepository.findOne(medium.getId());
        // Disconnect from session so that the updates on updatedMedium are not directly saved in db
        em.detach(updatedMedium);
        updatedMedium
            .signatur(UPDATED_SIGNATUR);

        restMediumMockMvc.perform(put("/api/mediums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedium)))
            .andExpect(status().isOk());

        // Validate the Medium in the database
        List<Medium> mediumList = mediumRepository.findAll();
        assertThat(mediumList).hasSize(databaseSizeBeforeUpdate);
        Medium testMedium = mediumList.get(mediumList.size() - 1);
        assertThat(testMedium.getSignatur()).isEqualTo(UPDATED_SIGNATUR);
    }

    @Test
    @Transactional
    public void updateNonExistingMedium() throws Exception {
        int databaseSizeBeforeUpdate = mediumRepository.findAll().size();

        // Create the Medium

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMediumMockMvc.perform(put("/api/mediums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medium)))
            .andExpect(status().isCreated());

        // Validate the Medium in the database
        List<Medium> mediumList = mediumRepository.findAll();
        assertThat(mediumList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMedium() throws Exception {
        // Initialize the database
        mediumRepository.saveAndFlush(medium);
        int databaseSizeBeforeDelete = mediumRepository.findAll().size();

        // Get the medium
        restMediumMockMvc.perform(delete("/api/mediums/{id}", medium.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Medium> mediumList = mediumRepository.findAll();
        assertThat(mediumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medium.class);
        Medium medium1 = new Medium();
        medium1.setId(1L);
        Medium medium2 = new Medium();
        medium2.setId(medium1.getId());
        assertThat(medium1).isEqualTo(medium2);
        medium2.setId(2L);
        assertThat(medium1).isNotEqualTo(medium2);
        medium1.setId(null);
        assertThat(medium1).isNotEqualTo(medium2);
    }
}
