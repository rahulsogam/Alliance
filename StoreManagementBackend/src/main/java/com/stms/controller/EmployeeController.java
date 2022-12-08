package com.stms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.service.impl.EmpService;

import repository.Emp_Repo;

import com.stms.model.*;



@RestController
@RequestMapping("/EMP")
public class EmployeeController {
	
	@Autowired
	private EmpService empService;
	
	

	@GetMapping(path = "/All")
	public List<Employee> getEmp()
	{	
		return empService.getAllEmp();
	}
	
	
	
	
	
	
	
	 
}
