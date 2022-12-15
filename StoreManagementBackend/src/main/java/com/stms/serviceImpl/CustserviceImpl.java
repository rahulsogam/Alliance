package com.stms.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stms.config.SqlQuery;
import com.stms.model.Customer;
import com.stms.repo.Cust_Repo;
import com.stms.service.Customerservice;


@Service
@Transactional
public class CustserviceImpl implements Customerservice {
	
	@Autowired
	DataSource dataSource;
	
	PreparedStatement preparedStatement=null;
	ResultSet rs;
	JSONArray data ;
	JSONObject cust;
	
	Connection connection;
	
	
	
	
	@Override
	public JSONObject getAllCust() {
		
		data = new JSONArray();
		cust = new JSONObject();
		try {
			connection = dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_CUST);
			rs=preparedStatement.executeQuery();
			while (rs.next()) {
				JSONObject result = new JSONObject();
				result.put("Custid", rs.getString("cust_id"));
				result.put("Custname",rs.getString("cust_name"));
				result.put("Custemail",rs.getString("cust_email"));
				result.put("Custno", rs.getString("cust_no"));
				result.put("Orderid",rs.getString("order_id"));
				data.put(result);
			}
			cust.put("Customer",data);		
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		System.out.println(cust);
		return cust;
	}
	
	
	
	@Override
    public JSONObject getCustById(int id) {
        data = new JSONArray() ;
        cust = new JSONObject();
        System.out.println(id);
        try {
            connection= dataSource.getConnection();
            preparedStatement= connection.prepareStatement(SqlQuery.GET_CUST_BY_ID);
            preparedStatement.setInt(1, id);
           
            rs=preparedStatement.executeQuery();
            if(rs.next()) {
                JSONObject result= new JSONObject();
                cust.put("msg", "Data Present");
                result.put("CustId",rs.getString("cust_id"));
                result.put("CustName", rs.getString("cust_name"));
                result.put("CustEmail", rs.getString("cust_email"));
                result.put("CustNo", rs.getString("cust_no"));
                result.put("OrderId",rs.getString("order_id"));
                data.put(result);
            }
            else {
                cust.put("msg", "Data not found");
            }

            cust.put("Customers",data);
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            cust.put("status", "Exception");
            cust.put("msg", e.toString());
        }
        return cust;
	}



	@Override
	public JSONObject addCustomer(String name, String email, Integer id, Integer no, Integer orderid) {
		System.out.println(name+email+id+no+orderid);
		return null;
	}
	
	

}
