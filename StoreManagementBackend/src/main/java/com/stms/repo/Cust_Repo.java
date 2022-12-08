package com.stms.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stms.model.Customer;
@Repository
public interface Cust_Repo  extends JpaRepository<Customer, Integer>{

}
