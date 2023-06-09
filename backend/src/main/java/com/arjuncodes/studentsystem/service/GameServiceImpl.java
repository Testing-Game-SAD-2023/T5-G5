package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Game;
import com.arjuncodes.studentsystem.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private GameRepository gameRepository;




    @Override
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }
    @Override
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(int id) {
        return gameRepository.findById(id);

    }
}