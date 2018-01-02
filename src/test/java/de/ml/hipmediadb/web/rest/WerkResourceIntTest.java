package de.ml.hipmediadb.web.rest;

import de.ml.hipmediadb.HipmediadbApp;

import de.ml.hipmediadb.domain.Werk;
import de.ml.hipmediadb.repository.WerkRepository;
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
 * Test class for the WerkResource REST controller.
 *
 * @see WerkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipmediadbApp.class)
public class WerkResourceIntTest {

    private static final String DEFAULT_TITEL = "AAAAAAAAAA";
    private static final String UPDATED_TITEL = "BBBBBBBBBB";

    private static final String DEFAULT_TITELZUSATZ = "AAAAAAAAAA";
    private static final String UPDATED_TITELZUSATZ = "BBBBBBBBBB";

    private static final String DEFAULT_ZAEHLINFO = "AAAAAAAAAA";
    private static final String UPDATED_ZAEHLINFO = "BBBBBBBBBB";

    private static final String DEFAULT_GATTUNG = "AAAAAAAAAA";
    private static final String UPDATED_GATTUNG = "BBBBBBBBBB";

    @Autowired
    private WerkRepository werkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWerkMockMvc;

    private Werk werk;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WerkResource werkResource = new WerkResource(werkRepository);
        this.restWerkMockMvc = MockMvcBuilders.standaloneSetup(werkResource)
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
    public static Werk createEntity(EntityManager em) {
        Werk werk = new Werk()
            .titel(DEFAULT_TITEL)
            .titelzusatz(DEFAULT_TITELZUSATZ)
            .zaehlinfo(DEFAULT_ZAEHLINFO)
            .gattung(DEFAULT_GATTUNG);
        return werk;
    }

    @Before
    public void initTest() {
        werk = createEntity(em);
    }

    @Test
    @Transactional
    public void createWerk() throws Exception {
        int databaseSizeBeforeCreate = werkRepository.findAll().size();

        // Create the Werk
        restWerkMockMvc.perform(post("/api/werks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(werk)))
            .andExpect(status().isCreated());

        // Validate the Werk in the database
        List<Werk> werkList = werkRepository.findAll();
        assertThat(werkList).hasSize(databaseSizeBeforeCreate + 1);
        Werk testWerk = werkList.get(werkList.size() - 1);
        assertThat(testWerk.getTitel()).isEqualTo(DEFAULT_TITEL);
        assertThat(testWerk.getTitelzusatz()).isEqualTo(DEFAULT_TITELZUSATZ);
        assertThat(testWerk.getZaehlinfo()).isEqualTo(DEFAULT_ZAEHLINFO);
        assertThat(testWerk.getGattung()).isEqualTo(DEFAULT_GATTUNG);
    }

    @Test
    @Transactional
    public void createWerkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = werkRepository.findAll().size();

        // Create the Werk with an existing ID
        werk.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWerkMockMvc.perform(post("/api/werks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(werk)))
            .andExpect(status().isBadRequest());

        // Validate the Werk in the database
        List<Werk> werkList = werkRepository.findAll();
        assertThat(werkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWerks() throws Exception {
        // Initialize the database
        werkRepository.saveAndFlush(werk);

        // Get all the werkList
        restWerkMockMvc.perform(get("/api/werks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(werk.getId().intValue())))
            .andExpect(jsonPath("$.[*].titel").value(hasItem(DEFAULT_TITEL.toString())))
            .andExpect(jsonPath("$.[*].titelzusatz").value(hasItem(DEFAULT_TITELZUSATZ.toString())))
            .andExpect(jsonPath("$.[*].zaehlinfo").value(hasItem(DEFAULT_ZAEHLINFO.toString())))
            .andExpect(jsonPath("$.[*].gattung").value(hasItem(DEFAULT_GATTUNG.toString())));
    }

    @Test
    @Transactional
    public void getWerk() throws Exception {
        // Initialize the database
        werkRepository.saveAndFlush(werk);

        // Get the werk
        restWerkMockMvc.perform(get("/api/werks/{id}", werk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(werk.getId().intValue()))
            .andExpect(jsonPath("$.titel").value(DEFAULT_TITEL.toString()))
            .andExpect(jsonPath("$.titelzusatz").value(DEFAULT_TITELZUSATZ.toString()))
            .andExpect(jsonPath("$.zaehlinfo").value(DEFAULT_ZAEHLINFO.toString()))
            .andExpect(jsonPath("$.gattung").value(DEFAULT_GATTUNG.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWerk() throws Exception {
        // Get the werk
        restWerkMockMvc.perform(get("/api/werks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWerk() throws Exception {
        // Initialize the database
        werkRepository.saveAndFlush(werk);
        int databaseSizeBeforeUpdate = werkRepository.findAll().size();

        // Update the werk
        Werk updatedWerk = werkRepository.findOne(werk.getId());
        // Disconnect from session so that the updates on updatedWerk are not directly saved in db
        em.detach(updatedWerk);
        updatedWerk
            .titel(UPDATED_TITEL)
            .titelzusatz(UPDATED_TITELZUSATZ)
            .zaehlinfo(UPDATED_ZAEHLINFO)
            .gattung(UPDATED_GATTUNG);

        restWerkMockMvc.perform(put("/api/werks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWerk)))
            .andExpect(status().isOk());

        // Validate the Werk in the database
        List<Werk> werkList = werkRepository.findAll();
        assertThat(werkList).hasSize(databaseSizeBeforeUpdate);
        Werk testWerk = werkList.get(werkList.size() - 1);
        assertThat(testWerk.getTitel()).isEqualTo(UPDATED_TITEL);
        assertThat(testWerk.getTitelzusatz()).isEqualTo(UPDATED_TITELZUSATZ);
        assertThat(testWerk.getZaehlinfo()).isEqualTo(UPDATED_ZAEHLINFO);
        assertThat(testWerk.getGattung()).isEqualTo(UPDATED_GATTUNG);
    }

    @Test
    @Transactional
    public void updateNonExistingWerk() throws Exception {
        int databaseSizeBeforeUpdate = werkRepository.findAll().size();

        // Create the Werk

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWerkMockMvc.perform(put("/api/werks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(werk)))
            .andExpect(status().isCreated());

        // Validate the Werk in the database
        List<Werk> werkList = werkRepository.findAll();
        assertThat(werkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWerk() throws Exception {
        // Initialize the database
        werkRepository.saveAndFlush(werk);
        int databaseSizeBeforeDelete = werkRepository.findAll().size();

        // Get the werk
        restWerkMockMvc.perform(delete("/api/werks/{id}", werk.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Werk> werkList = werkRepository.findAll();
        assertThat(werkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Werk.class);
        Werk werk1 = new Werk();
        werk1.setId(1L);
        Werk werk2 = new Werk();
        werk2.setId(werk1.getId());
        assertThat(werk1).isEqualTo(werk2);
        werk2.setId(2L);
        assertThat(werk1).isNotEqualTo(werk2);
        werk1.setId(null);
        assertThat(werk1).isNotEqualTo(werk2);
    }
}
