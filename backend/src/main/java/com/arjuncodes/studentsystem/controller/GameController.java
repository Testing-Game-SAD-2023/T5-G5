package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Game;
import com.arjuncodes.studentsystem.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/game") // player

@CrossOrigin
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping("/add")
    public int add(@RequestBody Game game) {
        Game savedGame = gameService.saveGame(game);
        return savedGame.getId_partita();
    }

    @GetMapping("/getAll")
    public List<Game> list(){
        return gameService.getAllGames();
    }

    @GetMapping("/{id}")
    public Optional<Game> getGameById(@PathVariable int id) {
        return gameService.getGameById(id);
    }
}
