package com.stms.controller;

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
import com.stms.service.Categoryservice;

@RestController
@RequestMapping("/Cat")
public class CategoryController {
	
	@Autowired
	Categoryservice categoryservice;
	
	@GetMapping(path = "/All")
	ResponseEntity<Response> getAll(){
		System.out.println("COntroller"+" "+categoryservice.getAllCat());
		JSONObject data = categoryservice.getAllCat();
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		 
	} 
	
	@PostMapping(path = "/AddCat")
	ResponseEntity<Response> addCat(@RequestBody Map<String, Object> json){
		System.out.println("COntroller"+" "+json.get("Cat_name")+json.get("Cat_id")+json.get("Dealer_id"));
		JSONObject data = categoryservice.addCategory(json.get("Cat_name").toString(),(Integer)json.get("Cat_id"), (Integer)json.get("Dealer_id"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		 
	} 
}
