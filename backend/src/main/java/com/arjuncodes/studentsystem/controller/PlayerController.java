package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Player;
import com.arjuncodes.studentsystem.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


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




    ///NUOVISSIMOOO

/*
    @PostMapping("/login22")
    public ResponseEntity<String> login22(@RequestBody Player player, HttpServletRequest request, HttpServletResponse response) {
        Player existingPlayer = playerService.findPlayerByEmail(player.getEmail());

        if (existingPlayer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }

        if (!existingPlayer.isEmailVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not verified.");
        }
        if (existingPlayer.isLoggedIn()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is already logged in.");
        }

        if (playerService.authenticate(player.getEmail(), player.getPassword())) {
            //Genera un nuovo ID di sessione
            String sessionId = UUID.randomUUID().toString();
            existingPlayer.setSessionId(sessionId);

            //Imposta la data di scadenza della sessione
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR, 1);
            Date sessionExpiry = calendar.getTime();
            existingPlayer.setSessionExpiry(sessionExpiry);
            existingPlayer.setLoggedIn(true);
            playerService.savePlayer(existingPlayer);

            //Crea un cookie di sessione contenente l'ID della sessione del giocatore e la data di scadenza
            Cookie sessionCookie = new Cookie("sessionId", sessionId);
            sessionCookie.setPath("/");
            sessionCookie.setMaxAge((int) ((sessionExpiry.getTime() - System.currentTimeMillis()) / 1000));
            sessionCookie.setHttpOnly(true);
            response.addCookie(sessionCookie);

            String email = existingPlayer.getEmail();
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }
*/
    //Aggiungi un filtro per verificare la validità del cookie di sessione in ogni richiesta
    @Component
    public class SessionFilter implements Filter {

        @Autowired
        private PlayerService playerService;

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            HttpServletResponse httpResponse = (HttpServletResponse) response;

            Cookie[] cookies = httpRequest.getCookies();
            if (cookies != null) {
                String sessionId = null;
                for (Cookie cookie : cookies) {
                    if ("sessionId".equals(cookie.getName())) {
                        sessionId = cookie.getValue();
                        break;
                    }
                }

                if (sessionId != null) {
                    Player player = playerService.findPlayerBySessionId(sessionId);
                    if (player != null && player.getSessionExpiry() != null && player.getSessionExpiry().before(new Date())) {
                        //Elimina il cookie di sessione dal client
                        Cookie sessionCookie = new Cookie("sessionId", "");
                        sessionCookie.setPath("/");
                        sessionCookie.setMaxAge(0);
                        httpResponse.addCookie(sessionCookie);

                        //Invalida la sessione del giocatore corrente
                        player.setSessionId(null);
                        player.setSessionExpiry(null);
                        player.setLoggedIn(false);
                        playerService.savePlayer(player);
                    }
                    else if (player != null) {
                        //Aggiorna la data di scadenza della sessione
                        Calendar calendar = Calendar.getInstance();
                        calendar.add(Calendar.HOUR, 1);
                        Date sessionExpiry = calendar.getTime();
                        player.setSessionExpiry(sessionExpiry);
                        playerService.savePlayer(player);

                        //Aggiorna il cookie di sessione
                        Cookie sessionCookie = new Cookie("sessionId", sessionId);
                        sessionCookie.setPath("/");
                        sessionCookie.setMaxAge((int) ((sessionExpiry.getTime() - System.currentTimeMillis()) / 1000));
                        sessionCookie.setHttpOnly(true);
                        httpResponse.addCookie(sessionCookie);
                    }
                }
            }

            chain.doFilter(request, response);
        }

    }
    @PostMapping("/login22")
    public ResponseEntity<Map<String, String>> login22(@RequestBody Player player, HttpServletRequest request, HttpServletResponse response) {
        Player existingPlayer = playerService.findPlayerByEmail(player.getEmail());

        if (existingPlayer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid username or password."));
        }

        if (!existingPlayer.isEmailVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Email not verified."));
        }
        if (existingPlayer.isLoggedIn()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "User is already logged in."));
        }

        if (playerService.authenticate(player.getEmail(), player.getPassword())) {
            //Genera un nuovo ID di sessione
            String sessionId = UUID.randomUUID().toString();
            existingPlayer.setSessionId(sessionId);

            //Imposta la data di scadenza della sessione
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR, 1);
            Date sessionExpiry = calendar.getTime();
            existingPlayer.setSessionExpiry(sessionExpiry);
            existingPlayer.setLoggedIn(true);
            playerService.savePlayer(existingPlayer);

            //Crea un cookie di sessione contenente l'ID della sessione del giocatore e la data di scadenza
            Cookie sessionCookie = new Cookie("sessionId", sessionId);
            sessionCookie.setPath("/");
            sessionCookie.setMaxAge((int) ((sessionExpiry.getTime() - System.currentTimeMillis()) / 1000));
            sessionCookie.setHttpOnly(true);
            response.addCookie(sessionCookie);

            //Aggiungi l'ID della sessione e l'email dell'utente alla risposta JSON
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("sessionId", sessionId);
            responseBody.put("email", existingPlayer.getEmail());
            return ResponseEntity.ok(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid username or password."));
        }
    }

    //Utilizza il metodo logout nel controller per invalidare la sessione del giocatore
   /* @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("sessionId".equals(cookie.getName())) {
                    String sessionId = cookie.getValue();
                    Player player = playerService.findPlayerBySessionId(sessionId);
                    if (player != null) {
                        //Invalida la sessione del giocatore corrente
                        player.setSessionId(null);
                        player.setSessionExpiry(null);
                        player.setLoggedIn(false);
                        playerService.savePlayer(player);
                    }

                    //Elimina il cookie di sessione
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);

                    return ResponseEntity.ok("Logout successful");
                }
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
    }*/

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam("sessionId") String sessionId) {
        Player player = playerService.findPlayerBySessionId(sessionId);
        if (player != null) {
            //Invalida la sessione del giocatore corrente
            player.setSessionId(null);
            player.setSessionExpiry(null);
            player.setLoggedIn(false);
            playerService.savePlayer(player);

            return ResponseEntity.ok("Logout successful");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
    }
}