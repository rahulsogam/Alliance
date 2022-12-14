package com.stms.controller;

<<<<<<< HEAD
=======
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
>>>>>>> 6cae47a1de684b191ac2319e9a82c81d8dac593d
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD
=======
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
>>>>>>> 6cae47a1de684b191ac2319e9a82c81d8dac593d
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.Request;
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
	
	@PostMapping(path = "/login")
	ResponseEntity<Response> login(@RequestBody Map<String, Object> payload){
		System.out.println(payload.get("id")+" "+payload.get("pass"));
		JSONObject data = new JSONObject();
		boolean sts = empservice.getLogin(payload.get("id"),payload.get("pass"));
		if(sts) {
			data = empservice.dashboardAccess();
		}
		else {
			data.put("message", "loginFailed");
		}
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);

	}
	
}
