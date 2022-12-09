package com.stms.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stms.model.Designation;
import com.stms.repo.Dsgn_Repo;
import com.stms.service.Dsgnservice;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DsgnserviceImpl implements Dsgnservice{
	
	@Autowired
	Dsgn_Repo dsgn_repo;
	
	@Override
	public List<Designation> getAllDsgn() {
		return dsgn_repo.findAll();
	}

}
