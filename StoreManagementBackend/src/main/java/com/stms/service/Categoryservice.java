package com.stms.service;

import org.json.JSONObject;

public interface Categoryservice  {
	JSONObject getAllCat();
	JSONObject addCategory(String name, int id, int dealerid);
}
