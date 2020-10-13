package com.apeiron.traca.repository;

import com.apeiron.traca.domain.Address;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Address entity.
 */
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
