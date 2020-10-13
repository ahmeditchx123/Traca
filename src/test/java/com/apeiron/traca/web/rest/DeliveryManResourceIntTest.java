package com.apeiron.traca.web.rest;

import com.apeiron.traca.TracaApp;

import com.apeiron.traca.domain.DeliveryMan;
import com.apeiron.traca.repository.DeliveryManRepository;
import com.apeiron.traca.service.DeliveryManService;
import com.apeiron.traca.service.dto.DeliveryManDTO;
import com.apeiron.traca.service.mapper.DeliveryManMapper;
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

/**
 * Test class for the DeliveryManResource REST controller.
 *
 * @see DeliveryManResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TracaApp.class)
public class DeliveryManResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_FIRST_PHONE = 1D;
    private static final Double UPDATED_FIRST_PHONE = 2D;

    private static final Double DEFAULT_SECOND_PHONE = 1D;
    private static final Double UPDATED_SECOND_PHONE = 2D;

    private static final Instant DEFAULT_HIRE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HIRE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DeliveryManRepository deliveryManRepository;

    @Autowired
    private DeliveryManMapper deliveryManMapper;

    @Autowired
    private DeliveryManService deliveryManService;

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

    private MockMvc restDeliveryManMockMvc;

    private DeliveryMan deliveryMan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryManResource deliveryManResource = new DeliveryManResource(deliveryManService);
        this.restDeliveryManMockMvc = MockMvcBuilders.standaloneSetup(deliveryManResource)
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
    public static DeliveryMan createEntity(EntityManager em) {
        DeliveryMan deliveryMan = new DeliveryMan()
            .code(DEFAULT_CODE)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .firstPhone(DEFAULT_FIRST_PHONE)
            .secondPhone(DEFAULT_SECOND_PHONE)
            .hireDate(DEFAULT_HIRE_DATE);
        return deliveryMan;
    }

    @Before
    public void initTest() {
        deliveryMan = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryMan() throws Exception {
        int databaseSizeBeforeCreate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(deliveryMan);
        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isCreated());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryMan testDeliveryMan = deliveryManList.get(deliveryManList.size() - 1);
        assertThat(testDeliveryMan.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testDeliveryMan.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testDeliveryMan.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testDeliveryMan.getFirstPhone()).isEqualTo(DEFAULT_FIRST_PHONE);
        assertThat(testDeliveryMan.getSecondPhone()).isEqualTo(DEFAULT_SECOND_PHONE);
        assertThat(testDeliveryMan.getHireDate()).isEqualTo(DEFAULT_HIRE_DATE);
    }

    @Test
    @Transactional
    public void createDeliveryManWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan with an existing ID
        deliveryMan.setId(1L);
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(deliveryMan);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryManRepository.findAll().size();
        // set the field null
        deliveryMan.setCode(null);

        // Create the DeliveryMan, which fails.
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(deliveryMan);

        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isBadRequest());

        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryManRepository.findAll().size();
        // set the field null
        deliveryMan.setFirstName(null);

        // Create the DeliveryMan, which fails.
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(deliveryMan);

        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isBadRequest());

        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryManRepository.findAll().size();
        // set the field null
        deliveryMan.setLastName(null);

        // Create the DeliveryMan, which fails.
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(deliveryMan);

        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isBadRequest());

        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDeliveryMen() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        // Get all the deliveryManList
        restDeliveryManMockMvc.perform(get("/api/delivery-men?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryMan.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].firstPhone").value(hasItem(DEFAULT_FIRST_PHONE.doubleValue())))
            .andExpect(jsonPath("$.[*].secondPhone").value(hasItem(DEFAULT_SECOND_PHONE.doubleValue())))
            .andExpect(jsonPath("$.[*].hireDate").value(hasItem(DEFAULT_HIRE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        // Get the deliveryMan
        restDeliveryManMockMvc.perform(get("/api/delivery-men/{id}", deliveryMan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryMan.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.firstPhone").value(DEFAULT_FIRST_PHONE.doubleValue()))
            .andExpect(jsonPath("$.secondPhone").value(DEFAULT_SECOND_PHONE.doubleValue()))
            .andExpect(jsonPath("$.hireDate").value(DEFAULT_HIRE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliveryMan() throws Exception {
        // Get the deliveryMan
        restDeliveryManMockMvc.perform(get("/api/delivery-men/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        int databaseSizeBeforeUpdate = deliveryManRepository.findAll().size();

        // Update the deliveryMan
        DeliveryMan updatedDeliveryMan = deliveryManRepository.findById(deliveryMan.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryMan are not directly saved in db
        em.detach(updatedDeliveryMan);
        updatedDeliveryMan
            .code(UPDATED_CODE)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .firstPhone(UPDATED_FIRST_PHONE)
            .secondPhone(UPDATED_SECOND_PHONE)
            .hireDate(UPDATED_HIRE_DATE);
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(updatedDeliveryMan);

        restDeliveryManMockMvc.perform(put("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isOk());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeUpdate);
        DeliveryMan testDeliveryMan = deliveryManList.get(deliveryManList.size() - 1);
        assertThat(testDeliveryMan.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDeliveryMan.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testDeliveryMan.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testDeliveryMan.getFirstPhone()).isEqualTo(UPDATED_FIRST_PHONE);
        assertThat(testDeliveryMan.getSecondPhone()).isEqualTo(UPDATED_SECOND_PHONE);
        assertThat(testDeliveryMan.getHireDate()).isEqualTo(UPDATED_HIRE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryMan() throws Exception {
        int databaseSizeBeforeUpdate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan
        DeliveryManDTO deliveryManDTO = deliveryManMapper.toDto(deliveryMan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryManMockMvc.perform(put("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryManDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        int databaseSizeBeforeDelete = deliveryManRepository.findAll().size();

        // Delete the deliveryMan
        restDeliveryManMockMvc.perform(delete("/api/delivery-men/{id}", deliveryMan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryMan.class);
        DeliveryMan deliveryMan1 = new DeliveryMan();
        deliveryMan1.setId(1L);
        DeliveryMan deliveryMan2 = new DeliveryMan();
        deliveryMan2.setId(deliveryMan1.getId());
        assertThat(deliveryMan1).isEqualTo(deliveryMan2);
        deliveryMan2.setId(2L);
        assertThat(deliveryMan1).isNotEqualTo(deliveryMan2);
        deliveryMan1.setId(null);
        assertThat(deliveryMan1).isNotEqualTo(deliveryMan2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryManDTO.class);
        DeliveryManDTO deliveryManDTO1 = new DeliveryManDTO();
        deliveryManDTO1.setId(1L);
        DeliveryManDTO deliveryManDTO2 = new DeliveryManDTO();
        assertThat(deliveryManDTO1).isNotEqualTo(deliveryManDTO2);
        deliveryManDTO2.setId(deliveryManDTO1.getId());
        assertThat(deliveryManDTO1).isEqualTo(deliveryManDTO2);
        deliveryManDTO2.setId(2L);
        assertThat(deliveryManDTO1).isNotEqualTo(deliveryManDTO2);
        deliveryManDTO1.setId(null);
        assertThat(deliveryManDTO1).isNotEqualTo(deliveryManDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(deliveryManMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(deliveryManMapper.fromId(null)).isNull();
    }
}
