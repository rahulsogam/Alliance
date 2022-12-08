package com.stms.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stms.model.Employee;
import com.stms.repo.Emp_Repo;
import com.stms.service.Empservice;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmpserviceImpl implements Empservice{
	
	@Autowired
	Emp_Repo emp_Repo;
	
	@Override
	public List<Employee> getAllEmp() {
		return emp_Repo.findAll();
	}

}
