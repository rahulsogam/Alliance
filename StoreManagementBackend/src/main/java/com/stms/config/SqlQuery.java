package com.stms.config;

public class SqlQuery {

	public static final String GET_ALL_EMP="select * from Employee where employee_id='101'";
	public static final String GET_ALL_EMPSal="select e.employee_id,d.Designation,d.designation_salary from Employee e, designation d where e.Designation='employee'";
<<<<<<< HEAD

	public static final String GET_ALL_CAT="select * from Category";

=======
	public static final String GET_EMP_EMAIL = "select * from Employee em where em.employeeEmail='sarveshbhosale111@gmail.com'";
>>>>>>> 6cae47a1de684b191ac2319e9a82c81d8dac593d
}
