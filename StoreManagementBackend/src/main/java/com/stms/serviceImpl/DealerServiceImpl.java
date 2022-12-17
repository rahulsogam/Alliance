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
import com.stms.service.Dealerservice;

@Service
@Transactional
public class DealerServiceImpl implements Dealerservice  {

	@Autowired
	DataSource dataSource;
	
	PreparedStatement preparedStatement=null;
	ResultSet rs;
	JSONArray data ;
	JSONObject cat;
	
	Connection connection;
	
	@Override
	public JSONObject getDealerDtls() {
		data = new JSONArray() ;
		cat = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_DEALERS);
			rs=preparedStatement.executeQuery();
			while(rs.next()) {
				cat.put("msg", "Success");
				JSONObject result= new JSONObject();
				result.put("code",rs.getString("dealer_id"));
				result.put("name", rs.getString("dealer_name"));
				result.put("DealerContact",rs.getString("dealer_contact"));
				result.put("DealerAddress",rs.getString("dealer_address"));
				result.put("DealerEmail",rs.getString("dealer_email"));
				data.put(result);
				}
			cat.put("Dealers", data);
			}
			catch(Exception e) {
				cat.put("Exception", e.toString());
				e.printStackTrace();
			}
		System.out.println(cat);
		return cat;
		
	}
	
	@Override
	public JSONObject AddDealerData(int id,String name,String no,String address,String email) {
		System.out.println(id+""+name+""+no+""+address+""+email);
		data = new JSONArray() ;
		cat = new JSONObject();
		try {
			connection= dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.Add_DEALER);
			preparedStatement.setInt(1, id);
			preparedStatement.setString(2, name);
			preparedStatement.setString(3, no);
			preparedStatement.setString(4, address);
			preparedStatement.setString(5, email);
			int j=preparedStatement.executeUpdate();
			System.out.println(j);
			if(j== 1) {
				cat.put("status", "Success");
				cat.put("msg", "Dealer Data insertion successfull...");
				
			}
			else {
				cat.put("status", "Error");
				cat.put("msg", "Insertion failed..");
			}
			dataSource.getConnection().close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			cat.put("status", "Exception");
			cat.put("msg", e.toString());
		}
		return cat;
		
	}

	
}
