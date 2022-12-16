package com.stms.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.JSONResponse;
import com.stms.service.Categoryservice;

@CrossOrigin
@RestController
@RequestMapping("/Cat")
public class CategoryController {
	
	@Autowired
	Categoryservice categoryservice;
	
	@GetMapping(path = "/All")
	ResponseEntity<JSONResponse> getAll(){
		System.out.println("COntroller"+" "+categoryservice.getAllCat());
		JSONObject data = categoryservice.getAllCat();
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
		 
	} 
	
	@PostMapping(path = "/AddCat")
	ResponseEntity<JSONResponse> addCat(@RequestBody Map<String, Object> json){
		System.out.println("COntroller"+" "+json.get("Cat_name")+json.get("Dealer_id"));
		JSONObject data = categoryservice.addCategory(json.get("Cat_name").toString(), (Integer)json.get("Dealer_id"));
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
	}
	
	@GetMapping(path = "/GetCatById")
	ResponseEntity<JSONResponse > getCatId(@RequestBody Map<String, Object> json){
		System.out.println("COntroller"+" "+json.get("Cat_id"));
		JSONObject data = categoryservice.getCatById((Integer)json.get("Cat_id"));
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
	}
	
	@DeleteMapping(path="/DelCategory")
	ResponseEntity<JSONResponse > delCatById(@RequestBody Map<String, Object> json){
		System.out.println("COntroller"+" "+json.get("Cat_id"));
		JSONObject data = categoryservice.delCatById((Integer)json.get("Cat_id"));
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
	}
	
	@PostMapping(path="/UpdateCategory")
	ResponseEntity<JSONResponse> updateCategory(@RequestBody Map<String, Object> json){
		System.out.println("COntroller"+" "+json.get("Cat_name"));
		JSONObject data = categoryservice.updateCategoryName(json.get("Cat_name").toString(),(Integer)json.get("Cat_id"));
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
	}
	
}
