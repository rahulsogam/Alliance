package com.stms.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stms.model.Designation;

@Repository
public interface Dsgn_Repo extends JpaRepository<Designation,Integer> {
	
}
