package com.stms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.model.Employee;
import com.stms.service.Empservice;

@RestController
@RequestMapping("/EMP")
public class EmpController {
	
	@Autowired
	Empservice empservice;
	
	@GetMapping(path = "/All")
	List<Employee> getAll(){
		return empservice.getAllEmp();
	}
}
