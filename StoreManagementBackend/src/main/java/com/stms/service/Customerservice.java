package com.stms.service;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.stms.model.Customer;

public interface Customerservice {
	
	JSONObject getAllCust();

	JSONObject addCustomer(String name, String email, Integer id, Integer no, Integer orderid);

	JSONObject getCustById(int id);
	
	

 

    }
	

