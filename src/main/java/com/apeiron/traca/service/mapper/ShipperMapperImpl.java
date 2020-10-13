package com.apeiron.traca.service.mapper;


import com.apeiron.traca.domain.Address;
import com.apeiron.traca.domain.Authority;
import com.apeiron.traca.domain.Shipper;
import com.apeiron.traca.service.dto.ShipperDTO;
import com.apeiron.traca.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ShipperMapperImpl implements ShipperMapper {

    @Autowired
    private AddressMapper addressMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Shipper> toEntity(List<ShipperDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Shipper> list = new ArrayList<Shipper>( dtoList.size() );
        for ( ShipperDTO shipperDTO : dtoList ) {
            list.add( toEntity( shipperDTO ) );
        }

        return list;
    }

    @Override
    public List<ShipperDTO> toDto(List<Shipper> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<ShipperDTO> list = new ArrayList<ShipperDTO>( entityList.size() );
        for ( Shipper shipper : entityList ) {
            list.add( toDto( shipper ) );
        }

        return list;
    }

    @Override
    public ShipperDTO toDto(Shipper shipper) {
        if ( shipper == null ) {
            return null;
        }

        ShipperDTO shipperDTO = new ShipperDTO(shipper);

        Long id = shipperAddressId( shipper );
        if ( id != null ) {
            shipperDTO.setAddressId( id );
        }
        shipperDTO.setId( shipper.getId() );
        shipperDTO.setFirstPhone( shipper.getFirstPhone() );
        shipperDTO.setSecondPhone( shipper.getSecondPhone() );
        shipperDTO.setAddress(addressMapper.toDto(shipper.getAddress()));
        userMapper.userToUserDTO(shipper);

        return shipperDTO;
    }

    @Override
    public Shipper toEntity(ShipperDTO shipperDTO) {
        if ( shipperDTO == null ) {
            return null;
        }

        Shipper shipper = userDTOToUser(shipperDTO);

        shipper.setAddress( addressMapper.toEntity(shipperDTO.getAddress()) );
        shipper.setId( shipperDTO.getId() );
        shipper.setFirstPhone( shipperDTO.getFirstPhone() );
        shipper.setSecondPhone( shipperDTO.getSecondPhone() );

        return shipper;
    }


    public Shipper userDTOToUser(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        } else {
            Shipper user = new Shipper();
            user.setId(userDTO.getId());
            user.setLogin(userDTO.getLogin());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setEmail(userDTO.getEmail());
            user.setImageUrl(userDTO.getImageUrl());
            user.setActivated(userDTO.isActivated());
            user.setLangKey(userDTO.getLangKey());
            Set<Authority> authorities = this.authoritiesFromStrings(userDTO.getAuthorities());
            user.setAuthorities(authorities);
            return user;
        }
    }

    private Long shipperAddressId(Shipper shipper) {
        if ( shipper == null ) {
            return null;
        }
        Address address = shipper.getAddress();
        if ( address == null ) {
            return null;
        }
        Long id = address.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Set<Authority> authoritiesFromStrings(Set<String> authoritiesAsString) {
        Set<Authority> authorities = new HashSet<>();

        if(authoritiesAsString != null){
            authorities = authoritiesAsString.stream().map(string -> {
                Authority auth = new Authority();
                auth.setName(string);
                return auth;
            }).collect(Collectors.toSet());
        }

        return authorities;
    }
}
