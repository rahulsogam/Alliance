package com.stms.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.stms.model.Employee;
import repository.Emp_Repo;

@Service
@Transactional
public class EmpServiceImpl implements EmpService {
	private Emp_Repo emp_Repo;
	
	
	@Override
	public List<Employee> getAllEmp() {
		System.out.println("Here");
		return emp_Repo.findAll();
	}
	
	

}
