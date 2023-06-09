package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Player;
import com.arjuncodes.studentsystem.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/player")
@CrossOrigin
public class PlayerController {
    @Autowired
    private PlayerService playerService;


    @PostMapping("/add")
    public String add(@RequestBody Player player) {
        Player existingPlayer = playerService.findPlayerByEmail(player.getEmail());

        if(existingPlayer != null) {
            return "Email già presente";
        }
        String token = UUID.randomUUID().toString();
        player.setToken(token);
        playerService.savePlayer(player);
        String subject = "Conferma email per il tuo account";
        String message = "Ciao " + player.getName() + ",\n\nClicca sul link seguente per confermare la tua email: http://localhost:8080/player/confirm?email=" + player.getEmail() + "&token=" + token;
        boolean sent = sendEmail(player.getEmail(), subject, message);

        if (sent) {
            return "Nuovo giocatore aggiunto";
        } else {
            return "Errore durante l'invio dell'email di conferma. Riprova più tardi.";
        }

    }
    //conferma
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmEmail(@RequestParam("email") String email, @RequestParam("token") String token) {
        Player player = playerService.findPlayerByEmail(email);

        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        }

        if (player.getToken() == null || !player.getToken().equals(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }

        player.setToken(null);
        player.setEmailVerified(true);
        playerService.savePlayer(player);

        return ResponseEntity.ok("Email confirmed successfully");
    }

    @GetMapping("/getAll")
    public List<Player> list() {
        return playerService.getAllPlayers();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Player player) {
        Player existingPlayer = playerService.findPlayerByEmail(player.getEmail());
        if (!existingPlayer.isEmailVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not verified.");
        }
        if (playerService.authenticate(player.getEmail(), player.getPassword())) {
            String response =   player.getEmail();
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }
    //per recupero e verifica account
    @GetMapping("/exists/{email}")
    public ResponseEntity<String> checkEmailExists(@PathVariable("email") String email) {
        Player player = playerService.findPlayerByEmail(email);
        if (player != null) {
            return ResponseEntity.ok("Trovato");
        } else {
            return ResponseEntity.ok("Non trovato");
        }
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<Map<String, String>> getPlayerByEmail(@PathVariable("email") String email) {
        Player player = playerService.getPlayerByEmail(email);
        if (player != null) {
            Map<String, String> response = new HashMap<>();
            response.put("id_player", String.valueOf(player.getId()));
            response.put("name", player.getName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePlayerById(@PathVariable("id") int id) {
        Player player = playerService.getPlayerById(id);
        if (player == null) {
            return ResponseEntity.notFound().build();
        } else {
            playerService.deletePlayerById(id);
            return ResponseEntity.ok("Player with ID " + id + " has been deleted successfully");
        }
    }


    @GetMapping("/{id}/email")
    public ResponseEntity<Map<String, String>> getPlayerEmailById(@PathVariable("id") int id) {
        Player player = playerService.getPlayerById(id);
        if (player != null) {
            Map<String, String> response = new HashMap<>();
            response.put("email", player.getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        Player player = playerService.findPlayerByEmail(email);

        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        }

        String newPassword = generateNewPassword();
        player.setPassword(newPassword);
        playerService.savePlayer(player);

        String subject = "Password reset for your account";
        String message = "Dear " + player.getName() + ",\n\nYour password has been reset to: " + newPassword + "\nPlease use this new password to login.";
        boolean sent = sendEmail(email, subject, message);

        if (sent) {
            return ResponseEntity.ok("Password reset successful. An email has been sent to " + email + " with the new password.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email. Please try again.");
        }
    }

    private String generateNewPassword() {
        // Generate a new random password
        // You can use a library like Apache Commons Text to generate the password
        // Here's an example:
        return UUID.randomUUID().toString().substring(0,8);
    }

    @Autowired
    private JavaMailSender mailSender;

    private boolean sendEmail(String to, String subject, String message) {
        try {
            SimpleMailMessage mailMessage= new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);

            mailSender.send(mailMessage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}