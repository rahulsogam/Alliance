package com.stms.config;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class JSONResponse {

	@JsonInclude(Include.NON_NULL)
	private Map <String, Object>  data;

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	public JSONResponse(Map<String, Object> data) {
		super();
		this.data = data;
	}
	
	
}
