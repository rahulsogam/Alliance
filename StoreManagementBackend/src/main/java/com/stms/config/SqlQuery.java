package com.stms.config;

public class SqlQuery {

	public static final String GET_ALL_EMP="select * from Employee where employee_id='101'";
	public static final String GET_ALL_EMPSal="select e.employee_id,d.Designation,d.designation_salary from Employee e, designation d where e.Designation='employee'";
	public static final String GET_EMP_EMAIL = "select * from Employee em where em.employeeEmail=?";
	public static final String ADD_EMP="INSERT INTO Employee (employeeName, employeeAddress, employeeEmail, employeePassword) VALUES (?,?,?,?);";
	public static final String UPDATE_EMP="UPDATE Employee SET employeeName = ?, employeeAddress= ?,employeeEmail=?,employeePassword=? WHERE employeeID = ?;";

	public static final String GET_ALL_CAT="select * from Category";
}
