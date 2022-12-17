package com.stms.controller;

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

import com.stms.config.JSONResponse;
import com.stms.service.Productservice;

@RestController
@RequestMapping("/Product")
@CrossOrigin
public class ProductController {
	@Autowired
	Productservice productservice;
	
	@GetMapping("/GetProducts")
	public ResponseEntity<JSONResponse> getProducrs(){
		JSONObject products= productservice.getAllProducts();
		return new ResponseEntity<JSONResponse>(new JSONResponse(products.toMap()), HttpStatus.OK);
	}
	
	@PostMapping("/UpdateProductQty")
	public ResponseEntity<JSONResponse>updateProduct(@RequestBody Map<String, Object> json )
	{
		JSONObject products= productservice.updateProductQty((Integer)json.get("ProductId"),(Integer) json.get("ProductQty"));
		return new ResponseEntity<JSONResponse>(new JSONResponse(products.toMap()), HttpStatus.OK);
	}
}
