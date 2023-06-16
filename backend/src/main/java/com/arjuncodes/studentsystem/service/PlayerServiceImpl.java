package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Player;
import com.arjuncodes.studentsystem.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Player findPlayerByEmail(String email) {
        return playerRepository.findByEmail(email);
    }

    @Override
    public boolean authenticate(String email, String password) {
        Player player = playerRepository.findByEmail(email);
        if (player == null) {
            return false;
        } else {
            return player.getPassword().equals(password);
        }
    }

    @Override
    public Player getPlayerByEmail(String email) {
        return playerRepository.findByEmail(email);
    }

    @Override
    public Player getPlayerById(int id) {
        Optional<Player> player = playerRepository.findById(id);
        return player.orElse(null);
    }

    @Override
    public void deletePlayerById(int id) {
        playerRepository.deleteById(id);
    }
//aggiunto ora
    public Player findPlayerBySessionId(String sessionId) {
        return playerRepository.findBySessionId(sessionId);
    }
}