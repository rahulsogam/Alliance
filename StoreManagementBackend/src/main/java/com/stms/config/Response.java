package com.stms.config;


import java.util.Map;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class Response {
	@JsonInclude(Include.NON_NULL)
	private String message;
	
	@JsonInclude(Include.NON_NULL)
	private Map <String, Object>  data;
	 
	@JsonInclude(Include.NON_NULL)
	private String errorMessage;
	
	public Response(){
		
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public Response(String message, Map<String, Object> data, String errorMessage) {
		super();
		this.message = message;
		this.data = data;
		this.errorMessage = errorMessage;
	}
	
		
	
}
