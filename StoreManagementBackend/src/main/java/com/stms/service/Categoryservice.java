package com.stms.service;

import org.json.JSONObject;

public interface Categoryservice  {
	JSONObject getAllCat();
	JSONObject addCategory(String name, int dealerid);
	JSONObject getCatById(int id);
	JSONObject delCatById(int id);
	JSONObject updateCategoryName(String name, int id);
}
