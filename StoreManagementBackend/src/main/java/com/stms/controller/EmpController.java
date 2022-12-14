package com.stms.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.Response;
import com.stms.service.Empservice;

@RestController
@RequestMapping("/EMP")
public class EmpController {
	
	@Autowired
	Empservice empservice;
	
	@GetMapping(path = "/All")
	ResponseEntity<Response> getAll(){
		System.out.println("COntroller"+" "+empservice.getAllEmp());
		JSONObject data = empservice.getAllEmp();
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		 
	}
	
	@GetMapping(path = "/EMPSal")
	ResponseEntity<Response> getEmpSal(){
		System.out.println("COntroller"+" "+empservice.getEmpSal());
		JSONObject data = empservice.getEmpSal();
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		 
	}
}
