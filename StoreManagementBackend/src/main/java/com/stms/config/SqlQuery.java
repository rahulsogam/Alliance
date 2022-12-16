package com.stms.config;

public class SqlQuery {

	public static final String GET_ALL_EMP_DTLS="select e.*, s.Total_salary  from Employee e , Salary s where e.employeeDesignation= s.designation;";
	public static final String GET_ALL_EMPSal="select e.employee_id,d.Designation,d.designation_salary from Employee e, designation d where e.Designation='employee'";
	public static final String GET_EMP_EMAIL = "select * from Employee em where em.employeeEmail=?";
	public static final String ADD_EMP="INSERT INTO Employee (employeeName, employeeAddress, employeeEmail, employeePassword,employeeDesignation) VALUES (?,?,?,?,?);";
	public static final String UPDATE_EMP="UPDATE Employee SET employeeName = ?, employeeAddress= ?,employeeEmail=?,employeePassword=? WHERE employeeID = ?;";
	public static final String GET_ALL_CUST="select * from Customers";
	public static final String GET_CUST_BY_ID="select * from Customers where cust_id=?";
	public static final String GET_ALL_ORDER="select * from orders";
	public static final String GET_ORDER_BY_ID = "select * from orders where order_id=?";
	public static final String DEL_EMP="Delete from employee where employeeId=?";

//	Category Queries
	public static final String GET_ALL_CAT="select * from Category";
	public static final String GET_CAT_BY_ID="select * from Category where category_Id=?";
	public static final String DEL_CAT_BY_ID="Delete from Category where category_Id=?";
	public static final String Add_CATEGORY="INSERT INTO Category(category_Name, dealer_Id) VALUES ( ?, ?)";
	public static final String UPDATE_CATEGORY="UPDATE Category SET category_Name = ? WHERE category_Id=?  ";
	
//Dealer Queries
	public static final String GET_ALL_DEALERS="select * from Dealers";
	public static final String Add_DEALER="INSERT INTO Dealers(dealer_id,dealer_name,dealer_contact,dealer_address, dealer_email) VALUES ( ?,?, ?,?, ?)";
	
//Product Queries
	public static final String GET_ALL_PRODUCTS="select p.*,c.category_Name from Category c ,Product p where c.category_Id= p.category_Id";
}
