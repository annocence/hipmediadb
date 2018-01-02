package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Musikepoche;
import de.ml.hipmediadb.repository.MusikepocheRepository;
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
 * Test class for the MusikepocheResource REST controller.
 *
 * @see MusikepocheResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class MusikepocheResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MusikepocheRepository musikepocheRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMusikepocheMockMvc;

    private Musikepoche musikepoche;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MusikepocheResource musikepocheResource = new MusikepocheResource(musikepocheRepository);
        this.restMusikepocheMockMvc = MockMvcBuilders.standaloneSetup(musikepocheResource)
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
    public static Musikepoche createEntity(EntityManager em) {
        Musikepoche musikepoche = new Musikepoche()
            .name(DEFAULT_NAME);
        return musikepoche;
    }

    @Before
    public void initTest() {
        musikepoche = createEntity(em);
    }

    @Test
    @Transactional
    public void createMusikepoche() throws Exception {
        int databaseSizeBeforeCreate = musikepocheRepository.findAll().size();

        // Create the Musikepoche
        restMusikepocheMockMvc.perform(post("/api/musikepoches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musikepoche)))
            .andExpect(status().isCreated());

        // Validate the Musikepoche in the database
        List<Musikepoche> musikepocheList = musikepocheRepository.findAll();
        assertThat(musikepocheList).hasSize(databaseSizeBeforeCreate + 1);
        Musikepoche testMusikepoche = musikepocheList.get(musikepocheList.size() - 1);
        assertThat(testMusikepoche.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMusikepocheWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = musikepocheRepository.findAll().size();

        // Create the Musikepoche with an existing ID
        musikepoche.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMusikepocheMockMvc.perform(post("/api/musikepoches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musikepoche)))
            .andExpect(status().isBadRequest());

        // Validate the Musikepoche in the database
        List<Musikepoche> musikepocheList = musikepocheRepository.findAll();
        assertThat(musikepocheList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = musikepocheRepository.findAll().size();
        // set the field null
        musikepoche.setName(null);

        // Create the Musikepoche, which fails.

        restMusikepocheMockMvc.perform(post("/api/musikepoches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musikepoche)))
            .andExpect(status().isBadRequest());

        List<Musikepoche> musikepocheList = musikepocheRepository.findAll();
        assertThat(musikepocheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMusikepoches() throws Exception {
        // Initialize the database
        musikepocheRepository.saveAndFlush(musikepoche);

        // Get all the musikepocheList
        restMusikepocheMockMvc.perform(get("/api/musikepoches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(musikepoche.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getMusikepoche() throws Exception {
        // Initialize the database
        musikepocheRepository.saveAndFlush(musikepoche);

        // Get the musikepoche
        restMusikepocheMockMvc.perform(get("/api/musikepoches/{id}", musikepoche.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(musikepoche.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMusikepoche() throws Exception {
        // Get the musikepoche
        restMusikepocheMockMvc.perform(get("/api/musikepoches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMusikepoche() throws Exception {
        // Initialize the database
        musikepocheRepository.saveAndFlush(musikepoche);
        int databaseSizeBeforeUpdate = musikepocheRepository.findAll().size();

        // Update the musikepoche
        Musikepoche updatedMusikepoche = musikepocheRepository.findOne(musikepoche.getId());
        // Disconnect from session so that the updates on updatedMusikepoche are not directly saved in db
        em.detach(updatedMusikepoche);
        updatedMusikepoche
            .name(UPDATED_NAME);

        restMusikepocheMockMvc.perform(put("/api/musikepoches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMusikepoche)))
            .andExpect(status().isOk());

        // Validate the Musikepoche in the database
        List<Musikepoche> musikepocheList = musikepocheRepository.findAll();
        assertThat(musikepocheList).hasSize(databaseSizeBeforeUpdate);
        Musikepoche testMusikepoche = musikepocheList.get(musikepocheList.size() - 1);
        assertThat(testMusikepoche.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMusikepoche() throws Exception {
        int databaseSizeBeforeUpdate = musikepocheRepository.findAll().size();

        // Create the Musikepoche

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMusikepocheMockMvc.perform(put("/api/musikepoches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musikepoche)))
            .andExpect(status().isCreated());

        // Validate the Musikepoche in the database
        List<Musikepoche> musikepocheList = musikepocheRepository.findAll();
        assertThat(musikepocheList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMusikepoche() throws Exception {
        // Initialize the database
        musikepocheRepository.saveAndFlush(musikepoche);
        int databaseSizeBeforeDelete = musikepocheRepository.findAll().size();

        // Get the musikepoche
        restMusikepocheMockMvc.perform(delete("/api/musikepoches/{id}", musikepoche.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Musikepoche> musikepocheList = musikepocheRepository.findAll();
        assertThat(musikepocheList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Musikepoche.class);
        Musikepoche musikepoche1 = new Musikepoche();
        musikepoche1.setId(1L);
        Musikepoche musikepoche2 = new Musikepoche();
        musikepoche2.setId(musikepoche1.getId());
        assertThat(musikepoche1).isEqualTo(musikepoche2);
        musikepoche2.setId(2L);
        assertThat(musikepoche1).isNotEqualTo(musikepoche2);
        musikepoche1.setId(null);
        assertThat(musikepoche1).isNotEqualTo(musikepoche2);
    }
}
