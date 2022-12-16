package com.stms.controller;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.Response;
import com.stms.model.Customer;
import com.stms.service.Customerservice;
import com.stms.serviceImpl.CustserviceImpl;

@RestController
@RequestMapping("/Cust")
public class CustController {
	
	@Autowired
	Customerservice customerservice;
	
	
	@GetMapping(path = "/All")
	ResponseEntity<Response> getAll(){
		System.out.println("Controller"+customerservice.getAllCust());
		JSONObject data = customerservice.getAllCust();
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
	}
	
	@PostMapping(path = "/AddCust")
	ResponseEntity<Response> addCat(@RequestBody Map<String, Object> json){
		System.out.println("Controller"+" "+json.get("cust_name")+json.get("cust_email")+json.get("cust_no")+json.get("cust_id")+json.get("order_id"));
		JSONObject data = customerservice.addCustomer(json.get("cust_name").toString(), json.get("cust_email").toString(), (Integer)json.get("cust_no"),(Integer)json.get("cust_id"),(Integer)json.get("order_id"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		}
	
	@GetMapping(path = "/GetByID")
	ResponseEntity<Response> getByID(@RequestBody Map<String, Object> json){
		System.out.println("Controller"+" "+json.get("cust_name")+json.get("cust_email")+json.get("cust_no")+json.get("cust_id")+json.get("order_id"));
		JSONObject data = customerservice.getCustById((Integer)json.get("cust_id"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		}
	}

