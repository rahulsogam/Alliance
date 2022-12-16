package com.stms.controller;

import java.util.Map;



import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.stms.config.Response;
import com.stms.service.Empservice;

@CrossOrigin
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
	
	@GetMapping(path = "/Designation")
	ResponseEntity<Response> getDesignation(){
		System.out.println("COntroller"+" "+empservice.getAllEmp());
		JSONObject data = empservice.getAllDesignation();
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
		 
	}
	
//	@GetMapping(path = "/EMPSal")
//	ResponseEntity<Response> getEmpSal(){
//		System.out.println("COntroller"+" "+empservice.getEmpSal());
//		JSONObject data = empservice.getEmpSal();
//		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
//		 
//	}
	
	@PostMapping(path = "/login")
	ResponseEntity<Response> login(@RequestBody Map<String, Object> payload){
		JSONObject data = new JSONObject();
		boolean sts = empservice.getLogin(payload.get("id"),payload.get("pass"));
		if(sts) {
			  
			data.put("status", true);
		}
		else {
			data.put("message", "loginFailed");
			data.put("status", false);
		}
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);

	}
	
	
	@PostMapping(path = "/create")
	ResponseEntity<Response> addEmployee(@RequestBody Map<String, Object> payload){
		JSONObject data = new JSONObject();
	    data = empservice.addEmployee(payload.get("name"),payload.get("address"),payload.get("email"),payload.get("password"),payload.get("designation"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);

	}
	@PatchMapping(path = "/update")
	ResponseEntity<Response> updateEmployee(@RequestBody Map<String, Object> payload){
		JSONObject data = new JSONObject();
	    data = empservice.updateEmployee(payload.get("id"),payload.get("name"),payload.get("address"),payload.get("email"),payload.get("password"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);

	}
	@DeleteMapping(path = "/delete")
	ResponseEntity<Response> deleteEmployee(@RequestBody Map<String, Object> payload){
		JSONObject data = new JSONObject();
	    data = empservice.deleteEmployee(payload.get("id"));
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);
	}
}
