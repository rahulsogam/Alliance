package com.stms.service;

import org.json.JSONObject;

public interface Empservice {

	JSONObject getAllEmp();
	JSONObject getEmpSal();
	Boolean getLogin(Object id, Object pass);
	JSONObject dashboardAccess(Object id);
	JSONObject addEmployee(Object name, Object address, Object email, Object password,Object designation);
	JSONObject updateEmployee(Object id,Object name, Object address, Object email, Object password);
	JSONObject deleteEmployee(Object empId);
}
