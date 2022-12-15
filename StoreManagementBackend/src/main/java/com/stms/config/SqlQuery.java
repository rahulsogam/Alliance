package com.stms.config;

public class SqlQuery {

	public static final String GET_ALL_EMP="select * from Employee where employee_id='101'";
	public static final String GET_ALL_EMPSal="select e.employee_id,d.Designation,d.designation_salary from Employee e, designation d where e.Designation='employee'";
	public static final String GET_ALL_CUST="select * from Customers";
	public static final String GET_CUST_BY_ID="select * from Customers where cust_id=?";
	public static final String GET_ALL_CAT="select * from Category";


	public static final String GET_EMP_EMAIL = "select * from Employee em where em.employeeEmail='sarveshbhosale111@gmail.com'";

}
