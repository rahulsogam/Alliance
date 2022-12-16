package com.stms.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_EMP);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				JSONObject result= new JSONObject();
				result.put("Name",rs.getString("employee_name"));
				result.put("ID", rs.getString("Employee_id"));
				result.put("Designation",rs.getString("Designation"));
				data.put(result);
				}
			ans.put("arrayOfEmployees", data);
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
		}
			catch(Exception e) {
				e.printStackTrace();
			}
		return result;
	}
	
	

}
