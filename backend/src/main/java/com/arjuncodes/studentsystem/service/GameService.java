package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Game;

import java.util.List;
import java.util.Optional;

public interface GameService {

                public Game saveGame(Game game);
                public List<Game> getAllGames();
                public Optional<Game> getGameById(int id);

}
