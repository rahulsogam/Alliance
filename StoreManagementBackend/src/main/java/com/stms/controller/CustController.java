package com.stms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.model.Customer;
import com.stms.service.Customerservice;

@RestController
@RequestMapping("/Cust")
public class CustController {
	
	@Autowired
	Customerservice customerservice;
	
	
	@GetMapping(path = "/All")
	List<Customer> getAll(){
		return customerservice.getAllCust();
	}

}
