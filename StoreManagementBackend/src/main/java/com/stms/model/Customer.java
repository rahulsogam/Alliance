package com.stms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="Customers")

public class Customer {
	@Id
	@Column(name = "cust_id")
	private String cust_id;
	
	@Column(name = "cust_name")
	private String cust_name;
	
	@Column(name = "cust_no")
	private String cust_no;
	
	@Column(name = "cust_email")
	private String cust_email;
	
	@Column(name = "cust_invoice")
	private String cust_invoice;
	
	
	public Customer(){
		
	}


	public Customer(String cust_id, String cust_name, String cust_no, String cust_email, String cust_invoice) {
		super();
		this.cust_id = cust_id;
		this.cust_name = cust_name;
		this.cust_no = cust_no;
		this.cust_email = cust_email;
		this.cust_invoice = cust_invoice;
	}


	public String getCust_id() {
		return cust_id;
	}


	public void setCust_id(String cust_id) {
		this.cust_id = cust_id;
	}


	public String getCust_name() {
		return cust_name;
	}


	public void setCust_name(String cust_name) {
		this.cust_name = cust_name;
	}


	public String getCust_no() {
		return cust_no;
	}


	public void setCust_no(String cust_no) {
		this.cust_no = cust_no;
	}


	public String getCust_email() {
		return cust_email;
	}


	public void setCust_email(String cust_email) {
		this.cust_email = cust_email;
	}


	public String getCust_invoice() {
		return cust_invoice;
	}


	public void setCust_invoice(String cust_invoice) {
		this.cust_invoice = cust_invoice;
	}
	
}
