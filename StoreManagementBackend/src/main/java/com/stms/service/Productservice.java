package com.stms.service;

import org.json.JSONObject;

public interface Productservice {
	JSONObject getAllProducts();
	JSONObject addProduct(int id,String Name, int Qty,String Desc, int catId);
	JSONObject removeProduct(int id);
	JSONObject updateProductQty(int id,int qty);

}
