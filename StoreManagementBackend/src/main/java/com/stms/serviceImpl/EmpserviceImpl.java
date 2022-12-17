package com.stms.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stms.config.SqlQuery;
import com.stms.model.Employee;
import com.stms.repo.Emp_Repo;
import com.stms.service.Empservice;

@Service
@Transactional
public class EmpserviceImpl implements Empservice{
	
	@Autowired
	Emp_Repo emp_Repo;
	
	@Autowired
	DataSource dataSource;
	
	PreparedStatement preparedStatement=null;
	ResultSet rs;
	Employee emp;
	JSONArray data ;
	JSONObject ans;
	
	Connection connection;
	
	@Override
	public JSONObject  getAllEmp() {
		data = new JSONArray() ;
		ans = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_EMP_DTLS);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				JSONObject result= new JSONObject();
				result.put("Name",rs.getString("employeeName"));
				result.put("ID", rs.getString("EmployeeId"));
				result.put("Address", rs.getString("employeeAddress"));
				result.put("Email", rs.getString("employeeEmail"));
				result.put("pwd", rs.getString("employeePassword"));
				result.put("Designation", rs.getString("employeeDesignation"));
				result.put("Salary", rs.getString("Total_salary"));
				data.put(result);
				}
			ans.put("Employees", data);
			dataSource.getConnection().close();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		return ans;
	}

	
	@Override
	public JSONObject getEmpSal() {
		data = new JSONArray() ;
		ans = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_EMPSal);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				JSONObject result= new JSONObject();
				result.put("Name",rs.getString("employee_id"));
				result.put("Salary", rs.getString("designation_salary"));
				result.put("Designation",rs.getString("Designation"));
				data.put(result);
				}
			ans.put("EmpSal", data);
			dataSource.getConnection().close();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		return ans;
	}


	@Override
	public Boolean getLogin(Object id, Object pass) {
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_EMP_EMAIL);
			preparedStatement.setString(1, id.toString());
			rs=preparedStatement.executeQuery();
			if(rs.next()) {
				System.out.println(rs.getString("employeePassword")+""+pass);
				if(pass.equals(rs.getString("employeePassword"))) {
				return true;
			}
			}
			dataSource.getConnection().close();
		}
			catch(Exception e) {
				e.printStackTrace();
			}
		return false;
	}


	@Override
	public JSONObject dashboardAccess(Object id) {
		JSONObject result= new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_EMP_EMAIL);
			preparedStatement.setString(1, id.toString());
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				result.put("ID",rs.getString("employeeID"));
				result.put("Name", rs.getString("employeeName"));
				result.put("Address",rs.getString("employeeAddress"));
				result.put("Email",rs.getString("employeeEmail"));	
			}
			dataSource.getConnection().close();
		}
			catch(Exception e) {
				e.printStackTrace();
			}
		return result;
	}


	@Override
	public JSONObject addEmployee(Object name, Object address, Object email, Object password,Object designation) {
		JSONObject result= new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.ADD_EMP);
			preparedStatement.setString(1, name.toString());
			preparedStatement.setString(2, address.toString());
			preparedStatement.setString(3, email.toString());
			preparedStatement.setString(4, password.toString());
			preparedStatement.setString(5, designation.toString());
			int i=preparedStatement.executeUpdate();
			System.out.println(i);
			if(i==1) {
				result.put("status", "success");
			}
			else {
				result.put("status", "Error");
			}
			dataSource.getConnection().close();
		}
			catch(Exception e) {
				e.printStackTrace();
				result.put("status", "Exception");
			}
		
		return result;
	}
	
	public JSONObject updateEmployee(Object id,Object name, Object address, Object email, Object password) {
		JSONObject result= new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.UPDATE_EMP);
			preparedStatement.setString(1, name.toString());
			preparedStatement.setString(2, address.toString());
			preparedStatement.setString(3, email.toString());
			preparedStatement.setString(4, password.toString());
			preparedStatement.setString(5, id.toString());
			int i=preparedStatement.executeUpdate();
			System.out.println(i);
			if(i==1) {
				result.put("status", "success");
			}
			else {
				result.put("status", "Error");
			}
			dataSource.getConnection().close();
		}
			catch(Exception e) {
				e.printStackTrace();
				result.put("status", "Exception");
			}
		
		return result;
	}


	@Override
	public JSONObject deleteEmployee(Object empId) {
		data = new JSONArray() ;
		ans = new JSONObject();
		System.out.println(empId);
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.DEL_EMP);
			preparedStatement.setInt(1, (Integer)empId);
			int j=preparedStatement.executeUpdate();
			if(j!= 0) {
				ans.put("msg", "Eemployee Data Deleted Successfully..!!");
				ans.append("status", "success");
			}
			else {
				ans.put("msg", "Unsucessfull");
			}
			dataSource.getConnection().close();
		} catch (SQLException e) {
			e.printStackTrace();
			ans.put("status", "Exception");
			ans.put("msg", e.toString());
		}
		return ans;
	}


	@Override
	public JSONObject getAllDesignation() {
		data = new JSONArray() ;
		ans = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_DESIGNATION);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				JSONObject result= new JSONObject();
				result.put("name", rs.getString("employeeDesignation"));
				result.put("code", rs.getString("employeeDesignation"));
				data.put(result);
				}
			ans.put("Designation", data);
			dataSource.getConnection().close();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		return ans;
	
	}
	

}
