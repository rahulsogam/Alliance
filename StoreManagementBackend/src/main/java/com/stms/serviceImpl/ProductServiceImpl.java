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
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_PRODUCTS);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				prod.put("msg", "Success");
				JSONObject result= new JSONObject();
				result.put("product_id",rs.getString("product_Id"));
				result.put("product_Name", rs.getString("product_Name"));
				result.put("product_Qty",rs.getString("product_Qty"));
				result.put("product_Description",rs.getString("product_Description"));
				result.put("category_Id",rs.getString("category_Id"));
				result.put("category_Name",rs.getString("category_Name"));
				data.put(result);
				}
			prod.put("Products", data);
			}
			catch(Exception e) {
				prod.put("Exception", e.toString());
				e.printStackTrace();
			}
		System.out.println(prod);
		return prod;
	}

	@Override
	public JSONObject addProduct(int id, String Name, int Qty, String Desc, int catId) {
		
		prod = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.Add_CATEGORY);
			preparedStatement.setInt(1, id);
			preparedStatement.setString(2, Name);
			preparedStatement.setInt(3, Qty);
			preparedStatement.setString(4, Desc);
			preparedStatement.setInt(5, catId);
			//System.out.println(name+id+dealerid+"----"+preparedStatement.executeUpdate());
			int a=preparedStatement.executeUpdate();
			System.out.println(a);
			if(a!= 0) {
				prod.put("status", "Success");
				prod.put("msg", "Product insertion successfull...");
				
			}
			else {
				prod.put("status", "Error");
				prod.put("msg", "Insertion failed..");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			prod.put("status", "Exception");
			prod.put("msg", e.toString());
		}
		return prod;
	}

	@Override
	public JSONObject removeProduct(int id) {
		data = new JSONArray() ;
		prod = new JSONObject();
		System.out.println(id);
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.DEL_PRODUCTS_BY_ID);
			preparedStatement.setInt(1, id);
			int j=preparedStatement.executeUpdate();
			if(j!= 0) {
				prod.put("msg", "Product Deleted Successfully..!!");
				prod.append("status", "success");
			}
			else {
				prod.put("msg", "Unsucessfull");
			}
		} catch (SQLException e) { 
			e.printStackTrace();
			prod.put("status", "Exception");
			prod.put("msg", e.toString());
		}
		return prod;

	}

	@Override
	public JSONObject updateProductQty(int id, int qty) {
		data = new JSONArray() ;
		prod = new JSONObject();
		System.out.println(id);
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.UPDATE_PRODUCT);
			preparedStatement.setInt(1, qty);
			preparedStatement.setInt(2, id);
			int j=preparedStatement.executeUpdate();
			if(j!= 0) {
				prod.put("msg", "Quantity Changed Successfully..!!");
				prod.append("status", "success");
			}
			else {
				prod.put("msg", "Unsucessfull");
			}
		} catch (SQLException e) { 
			e.printStackTrace();
			prod.put("status", "Exception");
			prod.put("msg", e.toString());
		}
		return prod;
	}

}
