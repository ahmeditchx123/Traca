package com.apeiron.traca.web.rest;

import com.apeiron.traca.TracaApp;

import com.apeiron.traca.domain.TransitionHistory;
import com.apeiron.traca.repository.TransitionHistoryRepository;
import com.apeiron.traca.service.TransitionHistoryService;
import com.apeiron.traca.service.dto.TransitionHistoryDTO;
import com.apeiron.traca.service.mapper.TransitionHistoryMapper;
import com.apeiron.traca.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import static com.apeiron.traca.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.apeiron.traca.domain.enumeration.DeliveryPackageStatus;
/**
 * Test class for the TransitionHistoryResource REST controller.
 *
 * @see TransitionHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TracaApp.class)
public class TransitionHistoryResourceIntTest {

    private static final Instant DEFAULT_TRANSITION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TRANSITION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final DeliveryPackageStatus DEFAULT_FROM_STATUS = DeliveryPackageStatus.NEW;
    private static final DeliveryPackageStatus UPDATED_FROM_STATUS = DeliveryPackageStatus.TO_DELIVER;

    private static final DeliveryPackageStatus DEFAULT_TO_STATUS = DeliveryPackageStatus.NEW;
    private static final DeliveryPackageStatus UPDATED_TO_STATUS = DeliveryPackageStatus.TO_DELIVER;

    @Autowired
    private TransitionHistoryRepository transitionHistoryRepository;

    @Autowired
    private TransitionHistoryMapper transitionHistoryMapper;

    @Autowired
    private TransitionHistoryService transitionHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTransitionHistoryMockMvc;

    private TransitionHistory transitionHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransitionHistoryResource transitionHistoryResource = new TransitionHistoryResource(transitionHistoryService);
        this.restTransitionHistoryMockMvc = MockMvcBuilders.standaloneSetup(transitionHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransitionHistory createEntity(EntityManager em) {
        TransitionHistory transitionHistory = new TransitionHistory()
            .transitionDate(DEFAULT_TRANSITION_DATE)
            .fromStatus(DEFAULT_FROM_STATUS)
            .toStatus(DEFAULT_TO_STATUS);
        return transitionHistory;
    }

    @Before
    public void initTest() {
        transitionHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransitionHistory() throws Exception {
        int databaseSizeBeforeCreate = transitionHistoryRepository.findAll().size();

        // Create the TransitionHistory
        TransitionHistoryDTO transitionHistoryDTO = transitionHistoryMapper.toDto(transitionHistory);
        restTransitionHistoryMockMvc.perform(post("/api/transition-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transitionHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the TransitionHistory in the database
        List<TransitionHistory> transitionHistoryList = transitionHistoryRepository.findAll();
        assertThat(transitionHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TransitionHistory testTransitionHistory = transitionHistoryList.get(transitionHistoryList.size() - 1);
        assertThat(testTransitionHistory.getTransitionDate()).isEqualTo(DEFAULT_TRANSITION_DATE);
        assertThat(testTransitionHistory.getFromStatus()).isEqualTo(DEFAULT_FROM_STATUS);
        assertThat(testTransitionHistory.getToStatus()).isEqualTo(DEFAULT_TO_STATUS);
    }

    @Test
    @Transactional
    public void createTransitionHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transitionHistoryRepository.findAll().size();

        // Create the TransitionHistory with an existing ID
        transitionHistory.setId(1L);
        TransitionHistoryDTO transitionHistoryDTO = transitionHistoryMapper.toDto(transitionHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransitionHistoryMockMvc.perform(post("/api/transition-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transitionHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransitionHistory in the database
        List<TransitionHistory> transitionHistoryList = transitionHistoryRepository.findAll();
        assertThat(transitionHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransitionHistories() throws Exception {
        // Initialize the database
        transitionHistoryRepository.saveAndFlush(transitionHistory);

        // Get all the transitionHistoryList
        restTransitionHistoryMockMvc.perform(get("/api/transition-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transitionHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].transitionDate").value(hasItem(DEFAULT_TRANSITION_DATE.toString())))
            .andExpect(jsonPath("$.[*].fromStatus").value(hasItem(DEFAULT_FROM_STATUS.toString())))
            .andExpect(jsonPath("$.[*].toStatus").value(hasItem(DEFAULT_TO_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getTransitionHistory() throws Exception {
        // Initialize the database
        transitionHistoryRepository.saveAndFlush(transitionHistory);

        // Get the transitionHistory
        restTransitionHistoryMockMvc.perform(get("/api/transition-histories/{id}", transitionHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transitionHistory.getId().intValue()))
            .andExpect(jsonPath("$.transitionDate").value(DEFAULT_TRANSITION_DATE.toString()))
            .andExpect(jsonPath("$.fromStatus").value(DEFAULT_FROM_STATUS.toString()))
            .andExpect(jsonPath("$.toStatus").value(DEFAULT_TO_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransitionHistory() throws Exception {
        // Get the transitionHistory
        restTransitionHistoryMockMvc.perform(get("/api/transition-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransitionHistory() throws Exception {
        // Initialize the database
        transitionHistoryRepository.saveAndFlush(transitionHistory);

        int databaseSizeBeforeUpdate = transitionHistoryRepository.findAll().size();

        // Update the transitionHistory
        TransitionHistory updatedTransitionHistory = transitionHistoryRepository.findById(transitionHistory.getId()).get();
        // Disconnect from session so that the updates on updatedTransitionHistory are not directly saved in db
        em.detach(updatedTransitionHistory);
        updatedTransitionHistory
            .transitionDate(UPDATED_TRANSITION_DATE)
            .fromStatus(UPDATED_FROM_STATUS)
            .toStatus(UPDATED_TO_STATUS);
        TransitionHistoryDTO transitionHistoryDTO = transitionHistoryMapper.toDto(updatedTransitionHistory);

        restTransitionHistoryMockMvc.perform(put("/api/transition-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transitionHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the TransitionHistory in the database
        List<TransitionHistory> transitionHistoryList = transitionHistoryRepository.findAll();
        assertThat(transitionHistoryList).hasSize(databaseSizeBeforeUpdate);
        TransitionHistory testTransitionHistory = transitionHistoryList.get(transitionHistoryList.size() - 1);
        assertThat(testTransitionHistory.getTransitionDate()).isEqualTo(UPDATED_TRANSITION_DATE);
        assertThat(testTransitionHistory.getFromStatus()).isEqualTo(UPDATED_FROM_STATUS);
        assertThat(testTransitionHistory.getToStatus()).isEqualTo(UPDATED_TO_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingTransitionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transitionHistoryRepository.findAll().size();

        // Create the TransitionHistory
        TransitionHistoryDTO transitionHistoryDTO = transitionHistoryMapper.toDto(transitionHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransitionHistoryMockMvc.perform(put("/api/transition-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transitionHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransitionHistory in the database
        List<TransitionHistory> transitionHistoryList = transitionHistoryRepository.findAll();
        assertThat(transitionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransitionHistory() throws Exception {
        // Initialize the database
        transitionHistoryRepository.saveAndFlush(transitionHistory);

        int databaseSizeBeforeDelete = transitionHistoryRepository.findAll().size();

        // Delete the transitionHistory
        restTransitionHistoryMockMvc.perform(delete("/api/transition-histories/{id}", transitionHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransitionHistory> transitionHistoryList = transitionHistoryRepository.findAll();
        assertThat(transitionHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransitionHistory.class);
        TransitionHistory transitionHistory1 = new TransitionHistory();
        transitionHistory1.setId(1L);
        TransitionHistory transitionHistory2 = new TransitionHistory();
        transitionHistory2.setId(transitionHistory1.getId());
        assertThat(transitionHistory1).isEqualTo(transitionHistory2);
        transitionHistory2.setId(2L);
        assertThat(transitionHistory1).isNotEqualTo(transitionHistory2);
        transitionHistory1.setId(null);
        assertThat(transitionHistory1).isNotEqualTo(transitionHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransitionHistoryDTO.class);
        TransitionHistoryDTO transitionHistoryDTO1 = new TransitionHistoryDTO();
        transitionHistoryDTO1.setId(1L);
        TransitionHistoryDTO transitionHistoryDTO2 = new TransitionHistoryDTO();
        assertThat(transitionHistoryDTO1).isNotEqualTo(transitionHistoryDTO2);
        transitionHistoryDTO2.setId(transitionHistoryDTO1.getId());
        assertThat(transitionHistoryDTO1).isEqualTo(transitionHistoryDTO2);
        transitionHistoryDTO2.setId(2L);
        assertThat(transitionHistoryDTO1).isNotEqualTo(transitionHistoryDTO2);
        transitionHistoryDTO1.setId(null);
        assertThat(transitionHistoryDTO1).isNotEqualTo(transitionHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transitionHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transitionHistoryMapper.fromId(null)).isNull();
    }
}
