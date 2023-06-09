package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game,Integer> {
}
