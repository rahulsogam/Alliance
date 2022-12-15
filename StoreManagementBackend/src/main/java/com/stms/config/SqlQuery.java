package com.stms.config;

public class SqlQuery {

	public static final String GET_ALL_EMP="select * from Employee where employee_id='101'";
	public static final String GET_ALL_EMPSal="select e.employee_id,d.Designation,d.designation_salary from Employee e, designation d where e.Designation='employee'";

//	Category Queries
	public static final String GET_ALL_CAT="select * from Category";
	public static final String GET_CAT_BY_ID="select * from Category where category_Id=?";
	public static final String DEL_CAT_BY_ID="Delete from Category where category_Id=?";
	public static final String Add_CATEGORY="INSERT INTO Category(category_Name, dealer_Id) VALUES ( ?, ?)";
	public static final String UPDATE_CATEGORY="UPDATE Category SET category_Name = ? WHERE category_Id=?  ";
	
//Dealer Queries
	public static final String GET_ALL_DEALERS="select * from Dealers";
	public static final String Add_DEALER="INSERT INTO Dealers(dealer_id,dealer_name,dealer_contact,dealer_address, dealer_email) VALUES ( ?,?, ?,?, ?)";
	
	public static final String GET_EMP_EMAIL = "select * from Employee em where em.employeeEmail='sarveshbhosale111@gmail.com'";

}
