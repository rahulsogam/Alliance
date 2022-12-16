package com.stms.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
				cat.put("msg", "Success");
				JSONObject result= new JSONObject();
				result.put("CatId",rs.getString("Category_Id"));
				result.put("CatName", rs.getString("Category_Name"));
				result.put("CategoryDealer",rs.getString("Dealer_id"));
				data.put(result);
				}
			cat.put("Categories", data);
			}
			catch(Exception e) {
				cat.put("Exception", e.toString());
				e.printStackTrace();
			}
		System.out.println(cat);
		return cat;
	}


	@Override
	public JSONObject addCategory( String name, int dealerid) {
		System.out.println(name+dealerid);
		cat = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.Add_CATEGORY);
			preparedStatement.setString(1, name);
			preparedStatement.setInt(2, dealerid);
			//System.out.println(name+id+dealerid+"----"+preparedStatement.executeUpdate());
			int a=preparedStatement.executeUpdate();
			System.out.println(a);
			if(a!= 0) {
				cat.put("status", "Success");
				cat.put("msg", "Category insertion successfull...");
				
			}
			else {
				cat.put("status", "Error");
				cat.put("msg", "Insertion failed..");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			cat.put("status", "Exception");
			cat.put("msg", e.toString());
		}
		return cat;
	}


	@Override
	public JSONObject getCatById(int id) {
		data = new JSONArray() ;
		cat = new JSONObject();
		System.out.println(id);
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_CAT_BY_ID);
			preparedStatement.setInt(1, id);
			//System.out.println(name+id+dealerid+"----"+preparedStatement.executeUpdate());
			rs=preparedStatement.executeQuery();
			if(rs.next()) {
				JSONObject result= new JSONObject();
				cat.put("msg", "Data Present");
				result.put("CatId",rs.getString("Category_Id"));
				result.put("CatName", rs.getString("Category_Name"));
				result.put("CategoryDealer",rs.getString("Dealer_id"));
				data.put(result);
			}
			else {
				cat.put("msg", "Data not found");
			}
			
			cat.put("Categories", data);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			cat.put("status", "Exception");
			cat.put("msg", e.toString());
		}
		return cat;

	}


	@Override
	public JSONObject delCatById(int id) {
		data = new JSONArray() ;
		cat = new JSONObject();
		System.out.println(id);
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.DEL_CAT_BY_ID);
			preparedStatement.setInt(1, id);
			int j=preparedStatement.executeUpdate();
			if(j!= 0) {
				cat.put("msg", "Category Deleted Successfully..!!");
				cat.append("status", "success");
			}
			else {
				cat.put("msg", "Unsucessfull");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			cat.put("status", "Exception");
			cat.put("msg", e.toString());
		}
		return cat;
	}


	@Override
	public JSONObject updateCategoryName(String name,int id) {
		data = new JSONArray() ;
		cat = new JSONObject();
		System.out.println(id);
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.UPDATE_CATEGORY);
			preparedStatement.setString(1,name);
			preparedStatement.setInt(2,id);
			int j=preparedStatement.executeUpdate();
			if(j!= 0) {
				cat.put("msg", "Category Updated Successfully..!!");
				cat.put("status", "success");
			}
			else {
				cat.put("msg", "Update Unsucessfull");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			cat.put("status", "Exception");
			cat.put("msg", e.toString());
		}
		return cat;
	}

}
