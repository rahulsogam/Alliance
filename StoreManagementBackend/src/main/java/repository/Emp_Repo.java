package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stms.model.Employee;

@Repository
public interface Emp_Repo extends JpaRepository<Employee, String> {
	
}
