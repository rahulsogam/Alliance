package com.stms.service;

import org.json.JSONObject;

public interface Empservice {

	JSONObject getAllEmp();
	JSONObject getEmpSal();
	Boolean getLogin(Object id, Object pass);
	JSONObject dashboardAccess();
}
