package com.stms.config;

public class SqlQuery {

	public static final String GET_ALL_EMP="select * from Employee where employee_id='101'";
	public static final String GET_ALL_EMPSal="select e.employee_id,d.Designation,d.designation_salary from Employee e, designation d where e.Designation='employee'";
}
