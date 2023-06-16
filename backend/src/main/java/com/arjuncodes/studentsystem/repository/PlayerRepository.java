package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player,Integer> {
    Player findByEmail(String email);

    Player findBySessionId(String sessionId);
}