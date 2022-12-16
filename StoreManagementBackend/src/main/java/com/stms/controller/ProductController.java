package com.stms.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.JSONResponse;
import com.stms.service.Productservice;

@RestController
@RequestMapping
@CrossOrigin
public class ProductController {
	@Autowired
	Productservice productservice;
	
	@GetMapping("/GetProducts")
	public ResponseEntity<JSONResponse> getProducrs(){
		JSONObject products= productservice.getAllProducts();
		return new ResponseEntity<JSONResponse>(new JSONResponse(products.toMap()), HttpStatus.OK);
	}
}
