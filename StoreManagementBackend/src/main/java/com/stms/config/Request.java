package com.stms.config;


import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class Request {
	
	@JsonInclude(Include.NON_NULL)
	private JSONObject data;
	
	public Request() {
		
	}
	 

	public JSONObject getData() {
		return data;
	}

	public void setData(JSONObject data) {
		this.data = data;
	}

	public Request(JSONObject data) {
		super();
		this.data = data;
	}
	 

}
