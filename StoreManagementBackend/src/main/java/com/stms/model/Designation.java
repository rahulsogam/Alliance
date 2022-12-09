package com.stms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="designation")

public class Designation {
	
	@Id
	@Column(name = "Dsgn_id")
	private String Dsgn_id;
	
	@Column(name = "designation_salary")
	private String designation_salary;
	
	@Column(name = "Designation")
	private String Designation;

	public String getDsgn_id() {
		return Dsgn_id;
	}

	public void setDsgn_id(String dsgn_id) {
		Dsgn_id = dsgn_id;
	}

	public String getDesignation_salary() {
		return designation_salary;
	}

	public void setDesignation_salary(String designation_salary) {
		this.designation_salary = designation_salary;
	}

	public String getDesignation() {
		return Designation;
	}

	public void setDesignation(String designation) {
		Designation = designation;
	}

	public Designation() {

	}
	public Designation(String dsgn_id, String designation_salary, String designation) {
		super();
		Dsgn_id = dsgn_id;
		this.designation_salary = designation_salary;
		Designation = designation;
	}
	
	
}

