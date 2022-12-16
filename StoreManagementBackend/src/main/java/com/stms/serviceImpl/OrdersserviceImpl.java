package com.stms.serviceImpl;

import java.sql.Connection;
import java.sql.Date;
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
import com.stms.service.Ordersservice;


@Service
@Transactional
public class OrdersserviceImpl implements Ordersservice {
	
	@Autowired
	DataSource dataSource;
	
	PreparedStatement preparedStatement=null;
	ResultSet rs;
	JSONArray data ;
	JSONObject order;
	
	Connection connection;
	
	
	
	
	@Override
	public JSONObject getAllOrder() {
		
		data = new JSONArray();
		order = new JSONObject();
		try {
			connection = dataSource.getConnection();
			preparedStatement= connection.prepareStatement(SqlQuery.GET_ALL_ORDER);
			rs=preparedStatement.executeQuery();
			while (rs.next()) {
				JSONObject result = new JSONObject();
				result.put("Orderid", rs.getString("order_id"));
				result.put("Custid",rs.getString("cust_id"));
				result.put("Date",rs.getString("date"));
				result.put("Totalcost", rs.getString("total_cost"));
				result.put("Paymentmethod",rs.getString("payment_method"));
				data.put(result);
			}
			order.put("Order",data);		
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		System.out.println(order);
		return order;
	}
	
	
	
	@Override
    public JSONObject getOrderById(int id) {
        data = new JSONArray() ;
        order = new JSONObject();
        System.out.println(id);
        try {
            connection= dataSource.getConnection();
            preparedStatement= connection.prepareStatement(SqlQuery.GET_ORDER_BY_ID);
            preparedStatement.setInt(1, id);
           
            rs=preparedStatement.executeQuery();
            if(rs.next()) {
                JSONObject result= new JSONObject();
                order.put("msg", "Data Present");
                result.put("OrderId",rs.getString("order_id"));
                result.put("CustId", rs.getString("cust_id"));
                result.put("Date", rs.getDate("date"));
                result.put("TotalCost", rs.getString("total_cost"));
                result.put("PaymentMethod",rs.getString("payment_method"));
                data.put(result);
            }
            else {
                order.put("msg", "Data not found");
            }

            order.put("Orders",data);
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            order.put("status", "Exception");
            order.put("msg", e.toString());
        }
        return order;
	}



	@Override
	public JSONObject addOrders(Integer id, Integer custid, java.util.Date date, Integer totalcost,
			String paymentmethod) {
		// TODO Auto-generated method stub
		return null;
	}



	


	
	
	

}