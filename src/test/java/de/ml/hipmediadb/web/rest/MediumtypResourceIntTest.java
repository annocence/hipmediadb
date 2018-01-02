package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Mediumtyp;
import de.ml.hipmediadb.repository.MediumtypRepository;
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
 * Test class for the MediumtypResource REST controller.
 *
 * @see MediumtypResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class MediumtypResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MediumtypRepository mediumtypRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMediumtypMockMvc;

    private Mediumtyp mediumtyp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MediumtypResource mediumtypResource = new MediumtypResource(mediumtypRepository);
        this.restMediumtypMockMvc = MockMvcBuilders.standaloneSetup(mediumtypResource)
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
    public static Mediumtyp createEntity(EntityManager em) {
        Mediumtyp mediumtyp = new Mediumtyp()
            .name(DEFAULT_NAME);
        return mediumtyp;
    }

    @Before
    public void initTest() {
        mediumtyp = createEntity(em);
    }

    @Test
    @Transactional
    public void createMediumtyp() throws Exception {
        int databaseSizeBeforeCreate = mediumtypRepository.findAll().size();

        // Create the Mediumtyp
        restMediumtypMockMvc.perform(post("/api/mediumtyps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediumtyp)))
            .andExpect(status().isCreated());

        // Validate the Mediumtyp in the database
        List<Mediumtyp> mediumtypList = mediumtypRepository.findAll();
        assertThat(mediumtypList).hasSize(databaseSizeBeforeCreate + 1);
        Mediumtyp testMediumtyp = mediumtypList.get(mediumtypList.size() - 1);
        assertThat(testMediumtyp.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMediumtypWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mediumtypRepository.findAll().size();

        // Create the Mediumtyp with an existing ID
        mediumtyp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMediumtypMockMvc.perform(post("/api/mediumtyps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediumtyp)))
            .andExpect(status().isBadRequest());

        // Validate the Mediumtyp in the database
        List<Mediumtyp> mediumtypList = mediumtypRepository.findAll();
        assertThat(mediumtypList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = mediumtypRepository.findAll().size();
        // set the field null
        mediumtyp.setName(null);

        // Create the Mediumtyp, which fails.

        restMediumtypMockMvc.perform(post("/api/mediumtyps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediumtyp)))
            .andExpect(status().isBadRequest());

        List<Mediumtyp> mediumtypList = mediumtypRepository.findAll();
        assertThat(mediumtypList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMediumtyps() throws Exception {
        // Initialize the database
        mediumtypRepository.saveAndFlush(mediumtyp);

        // Get all the mediumtypList
        restMediumtypMockMvc.perform(get("/api/mediumtyps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mediumtyp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getMediumtyp() throws Exception {
        // Initialize the database
        mediumtypRepository.saveAndFlush(mediumtyp);

        // Get the mediumtyp
        restMediumtypMockMvc.perform(get("/api/mediumtyps/{id}", mediumtyp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mediumtyp.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMediumtyp() throws Exception {
        // Get the mediumtyp
        restMediumtypMockMvc.perform(get("/api/mediumtyps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMediumtyp() throws Exception {
        // Initialize the database
        mediumtypRepository.saveAndFlush(mediumtyp);
        int databaseSizeBeforeUpdate = mediumtypRepository.findAll().size();

        // Update the mediumtyp
        Mediumtyp updatedMediumtyp = mediumtypRepository.findOne(mediumtyp.getId());
        // Disconnect from session so that the updates on updatedMediumtyp are not directly saved in db
        em.detach(updatedMediumtyp);
        updatedMediumtyp
            .name(UPDATED_NAME);

        restMediumtypMockMvc.perform(put("/api/mediumtyps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMediumtyp)))
            .andExpect(status().isOk());

        // Validate the Mediumtyp in the database
        List<Mediumtyp> mediumtypList = mediumtypRepository.findAll();
        assertThat(mediumtypList).hasSize(databaseSizeBeforeUpdate);
        Mediumtyp testMediumtyp = mediumtypList.get(mediumtypList.size() - 1);
        assertThat(testMediumtyp.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMediumtyp() throws Exception {
        int databaseSizeBeforeUpdate = mediumtypRepository.findAll().size();

        // Create the Mediumtyp

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMediumtypMockMvc.perform(put("/api/mediumtyps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediumtyp)))
            .andExpect(status().isCreated());

        // Validate the Mediumtyp in the database
        List<Mediumtyp> mediumtypList = mediumtypRepository.findAll();
        assertThat(mediumtypList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMediumtyp() throws Exception {
        // Initialize the database
        mediumtypRepository.saveAndFlush(mediumtyp);
        int databaseSizeBeforeDelete = mediumtypRepository.findAll().size();

        // Get the mediumtyp
        restMediumtypMockMvc.perform(delete("/api/mediumtyps/{id}", mediumtyp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mediumtyp> mediumtypList = mediumtypRepository.findAll();
        assertThat(mediumtypList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mediumtyp.class);
        Mediumtyp mediumtyp1 = new Mediumtyp();
        mediumtyp1.setId(1L);
        Mediumtyp mediumtyp2 = new Mediumtyp();
        mediumtyp2.setId(mediumtyp1.getId());
        assertThat(mediumtyp1).isEqualTo(mediumtyp2);
        mediumtyp2.setId(2L);
        assertThat(mediumtyp1).isNotEqualTo(mediumtyp2);
        mediumtyp1.setId(null);
        assertThat(mediumtyp1).isNotEqualTo(mediumtyp2);
    }
}
