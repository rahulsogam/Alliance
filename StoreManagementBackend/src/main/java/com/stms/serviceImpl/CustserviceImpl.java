package com.stms.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stms.model.Customer;
import com.stms.repo.Cust_Repo;
import com.stms.service.Customerservice;


@Service
@Transactional
public class CustserviceImpl implements Customerservice {
	
	@Autowired
	Cust_Repo cust_Repo;
	
	@Override
	public List<Customer> getAllCust() {
		// TODO Auto-generated method stub
		return cust_Repo.findAll();
	}
	
	

}
