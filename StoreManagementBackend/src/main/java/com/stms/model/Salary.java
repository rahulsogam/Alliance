package com.stms.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Salary")
public class Salary {
	@Id
	int sal_id;
	int sal_per_hr;
	
	@OneToOne(fetch = FetchType.LAZY,cascade =  CascadeType.ALL)
	@JoinColumn(name="Designation_id")
	Designation designation;
	
	
	public Salary() {
		
	}
	public Salary(int sal_id, int sal_per_hr, Designation designation) {
		super();
		this.sal_id = sal_id;
		this.sal_per_hr = sal_per_hr;
		this.designation = designation;
	}

	public int getSal_id() {
		return sal_id;
	}

	public void setSal_id(int sal_id) {
		this.sal_id = sal_id;
	}

	public int getSal_per_hr() {
		return sal_per_hr;
	}

	public void setSal_per_hr(int sal_per_hr) {
		this.sal_per_hr = sal_per_hr;
	}

	public Designation getDesignation() {
		return designation;
	}

	public void setDesignation(Designation designation) {
		this.designation = designation;
	}
	
	
}
