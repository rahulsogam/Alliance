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
import com.stms.service.Productservice;

@Transactional
@Service
public class ProductServiceImpl implements Productservice {
	@Autowired
	DataSource dataSource;
	
	PreparedStatement preparedStatement=null;
	ResultSet rs;
	JSONArray data ;
	JSONObject prod;
	
	Connection connection;
	
	@Override
	public JSONObject getAllProducts() {
		data = new JSONArray() ;
		prod = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_CAT);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				prod.put("msg", "Success");
				JSONObject result= new JSONObject();
				result.put("product_id",rs.getString("product_Id"));
				result.put("product_Name", rs.getString("product_Name"));
				result.put("product_Qty",rs.getString("product_Qty"));
				result.put("product_Description",rs.getString("product_Description"));
				result.put("category_Id",rs.getString("category_Id"));
				data.put(result);
				}
			prod.put("Categories", data);
			}
			catch(Exception e) {
				prod.put("Exception", e.toString());
				e.printStackTrace();
			}
		System.out.println(prod);
		return prod;
	}

}
