package com.stms.model;

import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Emp_Attendance")
public class Emp_Attendance {
	
	@Id
	int A_id;
	String emp_id;
	LocalTime login_time;
	LocalTime logout_time;
	int work_hrs;
	
	public Emp_Attendance(String emp_id, LocalTime login_time, LocalTime logout_time, int work_hrs) {
		super();
		this.emp_id = emp_id;
		this.login_time = login_time;
		this.logout_time = logout_time;
		this.work_hrs = work_hrs;
	}
	
	public String getEmp_id() {
		return emp_id;
	}
	public void setEmp_id(String emp_id) {
		this.emp_id = emp_id;
	}
	public LocalTime getLogin_time() {
		return login_time;
	}
	public void setLogin_time(LocalTime login_time) {
		this.login_time = login_time;
	}
	public LocalTime getLogout_time() {
		return logout_time;
	}
	public void setLogout_time(LocalTime logout_time) {
		this.logout_time = logout_time;
	}
	public int getWork_hrs() {
		return work_hrs;
	}
	public void setWork_hrs(int work_hrs) {
		this.work_hrs = work_hrs;
	}
	
	
}
