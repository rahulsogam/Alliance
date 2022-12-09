package com.stms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stms.model.Designation;
import com.stms.service.Dsgnservice;

@RestController
@RequestMapping("/dsgn")
public class DsgnController {
	@Autowired
	 Dsgnservice dsgnservice ;
	
	@GetMapping(path = "/all")
	List<Designation > getAllDsgn(){
		return dsgnservice.getAllDsgn();
	}

}
