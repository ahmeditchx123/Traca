package com.apeiron.traca.service.impl;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import com.apeiron.traca.config.Constants;
import com.apeiron.traca.domain.Authority;
import com.apeiron.traca.domain.Shipper;
import com.apeiron.traca.repository.AuthorityRepository;
import com.apeiron.traca.repository.ShipperRepository;
import com.apeiron.traca.service.MailService;
import com.apeiron.traca.service.ShipperService;
import com.apeiron.traca.service.UserService;
import com.apeiron.traca.service.dto.ShipperDTO;
import com.apeiron.traca.service.mapper.AddressMapper;
import com.apeiron.traca.service.mapper.ShipperMapper;
import com.apeiron.traca.service.util.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Shipper.
 */
@Service
@Transactional
public class ShipperServiceImpl implements ShipperService {

    private final Logger log = LoggerFactory.getLogger(ShipperServiceImpl.class);

    private final ShipperRepository shipperRepository;

    private final ShipperMapper shipperMapper;

    private final PasswordEncoder passwordEncoder;

    private final MailService mailService;

    private final AuthorityRepository authorityRepository;

    private final UserService userService;

    private final AddressMapper addressMapper;

    public ShipperServiceImpl(AddressMapper addressMapper,MailService mailService, UserService userService, ShipperRepository shipperRepository, ShipperMapper shipperMapper, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository) {
        this.shipperRepository = shipperRepository;
        this.shipperMapper = shipperMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.userService = userService;
        this.addressMapper = addressMapper;
        this.mailService = mailService;
    }

    /**
     * Save a shipper.
     *
     * @param shipperDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ShipperDTO save(ShipperDTO shipperDTO) {

        log.debug("Request to save Shipper : {}", shipperDTO);

        if (shipperDTO.getId() == null) {
            return shipperMapper.toDto(createUser(shipperDTO));
        } else {
            updateShipper(shipperDTO);
            return shipperDTO;
        }
    }

    /**
     * Get all the shippers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ShipperDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Shippers");
        return shipperRepository.findAll(pageable)
            .map(shipperMapper::toDto);
    }


    /**
     * Get one shipper by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ShipperDTO> findOne(Long id) {
        log.debug("Request to get Shipper : {}", id);
        return shipperRepository.findById(id)
            .map(shipperMapper::toDto);
    }

    /**
     * Delete the shipper by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shipper : {}", id);
        shipperRepository.deleteById(id);
    }


    public Shipper createUser(ShipperDTO userDTO) {
        Shipper user = shipperMapper.toEntity(userDTO);
        user.setLogin(userDTO.getLogin().toLowerCase());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail().toLowerCase());
        user.setImageUrl(userDTO.getImageUrl());
        if (userDTO.getLangKey() == null) {
            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }

        String encryptedPassword = passwordEncoder.encode(userDTO.getPassword());

        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setActivated(true);

        if(userDTO.getAuthorities() == null){
            userDTO.setAuthorities(new HashSet<>());
        }

        userDTO.getAuthorities().add("ROLE_USER");

        if (userDTO.getAuthorities() != null) {
            Set<Authority> authorities = userDTO.getAuthorities().stream()
                .map(authorityRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
            user.setAuthorities(authorities);
        }

        Shipper save = shipperRepository.save(user);

        mailService.sendActivationEmail(save, userDTO.getPassword());

        this.userService.clearUserCaches(user);
        log.debug("Created Information for User: {}", user);
        return user;
    }


    public void updateShipper(ShipperDTO shipperDTO) {


        Optional<Shipper> oneByLogin = shipperRepository.findOneByLogin(shipperDTO.getLogin());

        if(oneByLogin.isPresent()) {

            Shipper user = oneByLogin.get();
            user.setFirstName(shipperDTO.getFirstName());
            user.setLastName(shipperDTO.getLastName());
            user.setEmail(shipperDTO.getEmail().toLowerCase());
            user.setLangKey(shipperDTO.getLangKey());
            user.setImageUrl(shipperDTO.getImageUrl());
            user.setFirstPhone(shipperDTO.getFirstPhone());
            user.setSecondPhone(shipperDTO.getSecondPhone());
            user.setAddress(addressMapper.toEntity(shipperDTO.getAddress()));

            shipperRepository.save(user);
            log.debug("Changed Information for User: {}", user);

        }

    }
}
