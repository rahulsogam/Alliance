package com.stms.service;



import java.util.Date;

import org.json.JSONObject;

public interface Ordersservice {
	
	JSONObject getAllOrder();

	JSONObject addOrders(Integer id, Integer custid,Date date, Integer totalcost,String paymentmethod);

	JSONObject getOrderById(int id);
	
	

 

    }