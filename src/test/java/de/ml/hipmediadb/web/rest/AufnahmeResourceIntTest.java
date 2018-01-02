package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Aufnahme;
import de.ml.hipmediadb.repository.AufnahmeRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static de.ml.hipmediadb.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AufnahmeResource REST controller.
 *
 * @see AufnahmeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class AufnahmeResourceIntTest {

    private static final String DEFAULT_TITEL = "AAAAAAAAAA";
    private static final String UPDATED_TITEL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_AUFNAHME_DATUM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_AUFNAHME_DATUM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_MITSCHNITT_DATUM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MITSCHNITT_DATUM = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_DAUER = 1L;
    private static final Long UPDATED_DAUER = 2L;

    private static final Long DEFAULT_STARTZEIT = 1L;
    private static final Long UPDATED_STARTZEIT = 2L;

    @Autowired
    private AufnahmeRepository aufnahmeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAufnahmeMockMvc;

    private Aufnahme aufnahme;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AufnahmeResource aufnahmeResource = new AufnahmeResource(aufnahmeRepository);
        this.restAufnahmeMockMvc = MockMvcBuilders.standaloneSetup(aufnahmeResource)
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
    public static Aufnahme createEntity(EntityManager em) {
        Aufnahme aufnahme = new Aufnahme()
            .titel(DEFAULT_TITEL)
            .aufnahmeDatum(DEFAULT_AUFNAHME_DATUM)
            .mitschnittDatum(DEFAULT_MITSCHNITT_DATUM)
            .dauer(DEFAULT_DAUER)
            .startzeit(DEFAULT_STARTZEIT);
        return aufnahme;
    }

    @Before
    public void initTest() {
        aufnahme = createEntity(em);
    }

    @Test
    @Transactional
    public void createAufnahme() throws Exception {
        int databaseSizeBeforeCreate = aufnahmeRepository.findAll().size();

        // Create the Aufnahme
        restAufnahmeMockMvc.perform(post("/api/aufnahmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aufnahme)))
            .andExpect(status().isCreated());

        // Validate the Aufnahme in the database
        List<Aufnahme> aufnahmeList = aufnahmeRepository.findAll();
        assertThat(aufnahmeList).hasSize(databaseSizeBeforeCreate + 1);
        Aufnahme testAufnahme = aufnahmeList.get(aufnahmeList.size() - 1);
        assertThat(testAufnahme.getTitel()).isEqualTo(DEFAULT_TITEL);
        assertThat(testAufnahme.getAufnahmeDatum()).isEqualTo(DEFAULT_AUFNAHME_DATUM);
        assertThat(testAufnahme.getMitschnittDatum()).isEqualTo(DEFAULT_MITSCHNITT_DATUM);
        assertThat(testAufnahme.getDauer()).isEqualTo(DEFAULT_DAUER);
        assertThat(testAufnahme.getStartzeit()).isEqualTo(DEFAULT_STARTZEIT);
    }

    @Test
    @Transactional
    public void createAufnahmeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aufnahmeRepository.findAll().size();

        // Create the Aufnahme with an existing ID
        aufnahme.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAufnahmeMockMvc.perform(post("/api/aufnahmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aufnahme)))
            .andExpect(status().isBadRequest());

        // Validate the Aufnahme in the database
        List<Aufnahme> aufnahmeList = aufnahmeRepository.findAll();
        assertThat(aufnahmeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAufnahmes() throws Exception {
        // Initialize the database
        aufnahmeRepository.saveAndFlush(aufnahme);

        // Get all the aufnahmeList
        restAufnahmeMockMvc.perform(get("/api/aufnahmes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aufnahme.getId().intValue())))
            .andExpect(jsonPath("$.[*].titel").value(hasItem(DEFAULT_TITEL.toString())))
            .andExpect(jsonPath("$.[*].aufnahmeDatum").value(hasItem(DEFAULT_AUFNAHME_DATUM.toString())))
            .andExpect(jsonPath("$.[*].mitschnittDatum").value(hasItem(DEFAULT_MITSCHNITT_DATUM.toString())))
            .andExpect(jsonPath("$.[*].dauer").value(hasItem(DEFAULT_DAUER.intValue())))
            .andExpect(jsonPath("$.[*].startzeit").value(hasItem(DEFAULT_STARTZEIT.intValue())));
    }

    @Test
    @Transactional
    public void getAufnahme() throws Exception {
        // Initialize the database
        aufnahmeRepository.saveAndFlush(aufnahme);

        // Get the aufnahme
        restAufnahmeMockMvc.perform(get("/api/aufnahmes/{id}", aufnahme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aufnahme.getId().intValue()))
            .andExpect(jsonPath("$.titel").value(DEFAULT_TITEL.toString()))
            .andExpect(jsonPath("$.aufnahmeDatum").value(DEFAULT_AUFNAHME_DATUM.toString()))
            .andExpect(jsonPath("$.mitschnittDatum").value(DEFAULT_MITSCHNITT_DATUM.toString()))
            .andExpect(jsonPath("$.dauer").value(DEFAULT_DAUER.intValue()))
            .andExpect(jsonPath("$.startzeit").value(DEFAULT_STARTZEIT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAufnahme() throws Exception {
        // Get the aufnahme
        restAufnahmeMockMvc.perform(get("/api/aufnahmes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAufnahme() throws Exception {
        // Initialize the database
        aufnahmeRepository.saveAndFlush(aufnahme);
        int databaseSizeBeforeUpdate = aufnahmeRepository.findAll().size();

        // Update the aufnahme
        Aufnahme updatedAufnahme = aufnahmeRepository.findOne(aufnahme.getId());
        // Disconnect from session so that the updates on updatedAufnahme are not directly saved in db
        em.detach(updatedAufnahme);
        updatedAufnahme
            .titel(UPDATED_TITEL)
            .aufnahmeDatum(UPDATED_AUFNAHME_DATUM)
            .mitschnittDatum(UPDATED_MITSCHNITT_DATUM)
            .dauer(UPDATED_DAUER)
            .startzeit(UPDATED_STARTZEIT);

        restAufnahmeMockMvc.perform(put("/api/aufnahmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAufnahme)))
            .andExpect(status().isOk());

        // Validate the Aufnahme in the database
        List<Aufnahme> aufnahmeList = aufnahmeRepository.findAll();
        assertThat(aufnahmeList).hasSize(databaseSizeBeforeUpdate);
        Aufnahme testAufnahme = aufnahmeList.get(aufnahmeList.size() - 1);
        assertThat(testAufnahme.getTitel()).isEqualTo(UPDATED_TITEL);
        assertThat(testAufnahme.getAufnahmeDatum()).isEqualTo(UPDATED_AUFNAHME_DATUM);
        assertThat(testAufnahme.getMitschnittDatum()).isEqualTo(UPDATED_MITSCHNITT_DATUM);
        assertThat(testAufnahme.getDauer()).isEqualTo(UPDATED_DAUER);
        assertThat(testAufnahme.getStartzeit()).isEqualTo(UPDATED_STARTZEIT);
    }

    @Test
    @Transactional
    public void updateNonExistingAufnahme() throws Exception {
        int databaseSizeBeforeUpdate = aufnahmeRepository.findAll().size();

        // Create the Aufnahme

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAufnahmeMockMvc.perform(put("/api/aufnahmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aufnahme)))
            .andExpect(status().isCreated());

        // Validate the Aufnahme in the database
        List<Aufnahme> aufnahmeList = aufnahmeRepository.findAll();
        assertThat(aufnahmeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAufnahme() throws Exception {
        // Initialize the database
        aufnahmeRepository.saveAndFlush(aufnahme);
        int databaseSizeBeforeDelete = aufnahmeRepository.findAll().size();

        // Get the aufnahme
        restAufnahmeMockMvc.perform(delete("/api/aufnahmes/{id}", aufnahme.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Aufnahme> aufnahmeList = aufnahmeRepository.findAll();
        assertThat(aufnahmeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aufnahme.class);
        Aufnahme aufnahme1 = new Aufnahme();
        aufnahme1.setId(1L);
        Aufnahme aufnahme2 = new Aufnahme();
        aufnahme2.setId(aufnahme1.getId());
        assertThat(aufnahme1).isEqualTo(aufnahme2);
        aufnahme2.setId(2L);
        assertThat(aufnahme1).isNotEqualTo(aufnahme2);
        aufnahme1.setId(null);
        assertThat(aufnahme1).isNotEqualTo(aufnahme2);
    }
}
