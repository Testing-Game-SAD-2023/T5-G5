package com.arjuncodes.studentsystem.repository;


import com.arjuncodes.studentsystem.model.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ResetTokenRepository extends JpaRepository<ResetToken,Integer> {

    ResetToken findByToken(String token);
}
    


  
    

