package com.stms.controller;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stms.config.Request;
import com.stms.config.Response;
import com.stms.model.Employee;
import com.stms.service.Empservice;

@CrossOrigin
@RestController
@RequestMapping("/EMP")
public class EmpController {
	
	@Autowired
	Empservice empservice;
	
	/*
	 * @RequestMapping(path = "api/v1", method = RequestMethod.GET) public
	 * ResponseEntity<Response> getAllStudents() throws
	 * StudentManagementSystemException {
	 * 
	 * List<Student> studentList = studentService.getAllStudents();
	 * 
	 * if (studentList == null || studentList.isEmpty()) {
	 * 
	 * logger.info("No data found or list is empty"); throw new
	 * StudentManagementSystemException("", HttpStatus.OK, studentList); }
	 * 
	 * return new ResponseEntity<Response>(new Response("success", studentList,
	 * null), HttpStatus.OK); }
	 */
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
			data = empservice.dashboardAccess(payload.get("id"));
			data.put("status", true);
		}
		else {
			data.put("message", "loginFailed");
			data.put("status", false);
		}
		return new ResponseEntity<Response>(new Response("success",data.toMap(), null), HttpStatus.OK);

	}
	
}
