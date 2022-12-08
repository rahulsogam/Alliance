package com.stms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Employee")

public class Employee {
	
	@Id
	@Column(name = "Employee_id")
	private String Employee_id;
	
	@Column(name = "Employee_age")
	private String Employee_age;
	
	@Column(name = "employee_name")
	private String employee_name;
	
	@Column(name = "Designation")
	private String Designation;
	
	
	public Employee() {
		
	}

	

	public Employee(String employee_id, String employee_age, String employee_name, String designation) {
		super();
		Employee_id = employee_id;
		Employee_age = employee_age;
		this.employee_name = employee_name;
		Designation = designation;
	}



	public String getEmployee_id() {
		return Employee_id;
	}


	public void setEmployee_id(String employee_id) {
		Employee_id = employee_id;
	}


	public String getEmployee_age() {
		return Employee_age;
	}


	public void setEmployee_age(String employee_age) {
		Employee_age = employee_age;
	}


	public String getEmployee_name() {
		return employee_name;
	}


	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}


	public String getDesignation() {
		return Designation;
	}


	public void setDesignation(String designation) {
		Designation = designation;
	}

		
	
}
