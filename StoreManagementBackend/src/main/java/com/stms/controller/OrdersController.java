package com.stms.controller;

import java.util.Date;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.Response;
import com.stms.service.Ordersservice;

@RestController
@RequestMapping("/Order")
@CrossOrigin
public class OrdersController {
	
	@Autowired
	Ordersservice Ordersservice;
	
	
	@GetMapping(path = "/All")
	ResponseEntity<Response> getAll(){
		System.out.println("Controller"+Ordersservice.getAllOrder());
		JSONObject data = Ordersservice.getAllOrder();
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
	}
	
	@PostMapping(path = "/AddOrder")
	ResponseEntity<Response> addCat(@RequestBody Map<String, Object> json){
		System.out.println("Controller"+" "+json.get("order_id")+json.get("cust_id")+json.get("date")+json.get("total_cost")+json.get("payment_method"));
		JSONObject data = Ordersservice.addOrders((Integer)json.get("order_id"),(Integer)json.get("cust_id"),(Date)json.get("date"),(Integer)json.get("total_cost"),json.get("payment_method").toString());
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		}
	
	@GetMapping(path = "/GetByOID")
	ResponseEntity<Response> getByOID(@RequestBody Map<String, Object> json){
		System.out.println("Controller"+" "+json.get("order_id")+json.get("cust_id")+json.get("date")+json.get("total_cost")+json.get("payment_method"));
		JSONObject data = Ordersservice.getOrderById((Integer)json.get("order_id"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		}
	}