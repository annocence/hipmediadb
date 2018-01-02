package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Ensembleart;
import de.ml.hipmediadb.repository.EnsembleartRepository;
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
 * Test class for the EnsembleartResource REST controller.
 *
 * @see EnsembleartResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class EnsembleartResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EnsembleartRepository ensembleartRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnsembleartMockMvc;

    private Ensembleart ensembleart;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnsembleartResource ensembleartResource = new EnsembleartResource(ensembleartRepository);
        this.restEnsembleartMockMvc = MockMvcBuilders.standaloneSetup(ensembleartResource)
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
    public static Ensembleart createEntity(EntityManager em) {
        Ensembleart ensembleart = new Ensembleart()
            .name(DEFAULT_NAME);
        return ensembleart;
    }

    @Before
    public void initTest() {
        ensembleart = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnsembleart() throws Exception {
        int databaseSizeBeforeCreate = ensembleartRepository.findAll().size();

        // Create the Ensembleart
        restEnsembleartMockMvc.perform(post("/api/ensemblearts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ensembleart)))
            .andExpect(status().isCreated());

        // Validate the Ensembleart in the database
        List<Ensembleart> ensembleartList = ensembleartRepository.findAll();
        assertThat(ensembleartList).hasSize(databaseSizeBeforeCreate + 1);
        Ensembleart testEnsembleart = ensembleartList.get(ensembleartList.size() - 1);
        assertThat(testEnsembleart.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEnsembleartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ensembleartRepository.findAll().size();

        // Create the Ensembleart with an existing ID
        ensembleart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnsembleartMockMvc.perform(post("/api/ensemblearts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ensembleart)))
            .andExpect(status().isBadRequest());

        // Validate the Ensembleart in the database
        List<Ensembleart> ensembleartList = ensembleartRepository.findAll();
        assertThat(ensembleartList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ensembleartRepository.findAll().size();
        // set the field null
        ensembleart.setName(null);

        // Create the Ensembleart, which fails.

        restEnsembleartMockMvc.perform(post("/api/ensemblearts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ensembleart)))
            .andExpect(status().isBadRequest());

        List<Ensembleart> ensembleartList = ensembleartRepository.findAll();
        assertThat(ensembleartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEnsemblearts() throws Exception {
        // Initialize the database
        ensembleartRepository.saveAndFlush(ensembleart);

        // Get all the ensembleartList
        restEnsembleartMockMvc.perform(get("/api/ensemblearts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ensembleart.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getEnsembleart() throws Exception {
        // Initialize the database
        ensembleartRepository.saveAndFlush(ensembleart);

        // Get the ensembleart
        restEnsembleartMockMvc.perform(get("/api/ensemblearts/{id}", ensembleart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ensembleart.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnsembleart() throws Exception {
        // Get the ensembleart
        restEnsembleartMockMvc.perform(get("/api/ensemblearts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnsembleart() throws Exception {
        // Initialize the database
        ensembleartRepository.saveAndFlush(ensembleart);
        int databaseSizeBeforeUpdate = ensembleartRepository.findAll().size();

        // Update the ensembleart
        Ensembleart updatedEnsembleart = ensembleartRepository.findOne(ensembleart.getId());
        // Disconnect from session so that the updates on updatedEnsembleart are not directly saved in db
        em.detach(updatedEnsembleart);
        updatedEnsembleart
            .name(UPDATED_NAME);

        restEnsembleartMockMvc.perform(put("/api/ensemblearts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnsembleart)))
            .andExpect(status().isOk());

        // Validate the Ensembleart in the database
        List<Ensembleart> ensembleartList = ensembleartRepository.findAll();
        assertThat(ensembleartList).hasSize(databaseSizeBeforeUpdate);
        Ensembleart testEnsembleart = ensembleartList.get(ensembleartList.size() - 1);
        assertThat(testEnsembleart.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEnsembleart() throws Exception {
        int databaseSizeBeforeUpdate = ensembleartRepository.findAll().size();

        // Create the Ensembleart

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnsembleartMockMvc.perform(put("/api/ensemblearts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ensembleart)))
            .andExpect(status().isCreated());

        // Validate the Ensembleart in the database
        List<Ensembleart> ensembleartList = ensembleartRepository.findAll();
        assertThat(ensembleartList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnsembleart() throws Exception {
        // Initialize the database
        ensembleartRepository.saveAndFlush(ensembleart);
        int databaseSizeBeforeDelete = ensembleartRepository.findAll().size();

        // Get the ensembleart
        restEnsembleartMockMvc.perform(delete("/api/ensemblearts/{id}", ensembleart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ensembleart> ensembleartList = ensembleartRepository.findAll();
        assertThat(ensembleartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ensembleart.class);
        Ensembleart ensembleart1 = new Ensembleart();
        ensembleart1.setId(1L);
        Ensembleart ensembleart2 = new Ensembleart();
        ensembleart2.setId(ensembleart1.getId());
        assertThat(ensembleart1).isEqualTo(ensembleart2);
        ensembleart2.setId(2L);
        assertThat(ensembleart1).isNotEqualTo(ensembleart2);
        ensembleart1.setId(null);
        assertThat(ensembleart1).isNotEqualTo(ensembleart2);
    }
}
