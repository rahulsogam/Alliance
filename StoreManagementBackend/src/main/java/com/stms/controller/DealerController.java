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
import com.stms.service.Dealerservice;

@RestController
@RequestMapping("/Dealer")
@CrossOrigin
public class DealerController {
	@Autowired
	Dealerservice dealerservice;
	
	@GetMapping(path = "/All")
	ResponseEntity<JSONResponse> getAll(){
		System.out.println("COntroller"+" "+dealerservice.getDealerDtls());
		JSONObject data = dealerservice.getDealerDtls();
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
	} 
	
	@PostMapping(path = "/AddDealer")
	ResponseEntity<JSONResponse> addDealer(@RequestBody Map<String, Object> json){
		System.out.println("COntroller"+" "+ json.get("Name").toString());
		JSONObject data = dealerservice.AddDealerData((Integer)json.get("dealerId"),json.get("Name").toString(),json.get("contact").toString(),json.get("Address").toString(),json.get("Email").toString());
		return new ResponseEntity<JSONResponse>(new JSONResponse(data.toMap()), HttpStatus.OK);
	}
}
