package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Player;

import java.util.List;

public interface PlayerService {

    public Player savePlayer(Player player);
    public List<Player> getAllPlayers();

    public boolean authenticate(String email, String password);

    Player getPlayerByEmail(String email);

    public Player getPlayerById(int id);

    void deletePlayerById(int id);
    public Player findPlayerByEmail(String email);

    public Player findPlayerBySessionId(String sessionId);
}