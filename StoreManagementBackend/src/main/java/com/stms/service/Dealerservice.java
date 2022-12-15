package com.stms.service;

import org.json.JSONObject;

public interface Dealerservice {

	JSONObject getDealerDtls();

	JSONObject AddDealerData(int id, String name, String no, String address, String email);

}
