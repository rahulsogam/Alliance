package com.stms.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.sql.DataSource;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stms.config.SqlQuery;
import com.stms.service.Categoryservice;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryserviceImpl implements Categoryservice {

	@Autowired
	DataSource dataSource;
	
	PreparedStatement preparedStatement=null;
	ResultSet rs;
	JSONArray data ;
	JSONObject cat;
	
	Connection connection;
	
	
	@Override
	public JSONObject getAllCat() {
		data = new JSONArray() ;
		cat = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_CAT);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				JSONObject result= new JSONObject();
				result.put("CatId",rs.getString("Category_Id"));
				result.put("CatName", rs.getString("Category_Name"));
				result.put("CategoryDealer",rs.getString("Dealer_id"));
				data.put(result);
				}
			cat.put("Categories", data);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		System.out.println(cat);
		return cat;
	}


	@Override
	public JSONObject addCategory( String name,int id, int dealerid) {
		System.out.println(name+id+dealerid);
		return null;
	}

}
