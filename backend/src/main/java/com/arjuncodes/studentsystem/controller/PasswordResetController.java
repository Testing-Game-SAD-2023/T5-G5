package com.arjuncodes.studentsystem.controller;


import com.arjuncodes.studentsystem.model.PasswordResetRequest;
import com.arjuncodes.studentsystem.model.Player;
import com.arjuncodes.studentsystem.model.ResetToken;
import com.arjuncodes.studentsystem.service.PlayerService;
import com.arjuncodes.studentsystem.service.ResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.SimpleMailMessage;

import java.util.Map;


@RestController
@RequestMapping("/preset")
@CrossOrigin
public class PasswordResetController {
    @Autowired
    private PlayerService playerService;

    @Autowired
    private ResetTokenService resetTokenService;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/form")
    public String showPasswordResetForm() {
        return "password-reset-form";
    }

    @PostMapping("/request")
    public String handlePasswordResetRequest(@RequestBody Player player, Model model) {
        Player existingPlayer = playerService.findPlayerByEmail(player.getEmail());

        if (existingPlayer == null) {
            model.addAttribute("error", "Player not found");
            return "Not Found";
        }
        int playerId = existingPlayer.getId();
        ResetToken resetToken = resetTokenService.createResetToken(playerId);

        String resetLink = "http://localhost:3000/password-reset/reset?token=" + resetToken.getToken();
        String subject = "Reset your password";
        String message = "Click the following link to reset your password:\n" + resetLink;

        sendEmail(player.getEmail(), subject, message);

        model.addAttribute("success", "Password reset link sent to your email");
        return "password-reset-formok";
    }

    @GetMapping("/reset")
    public String showPasswordResetPage(@RequestParam("token") String token, Model model) {
        ResetToken resetToken = resetTokenService.getResetTokenByToken(token);

        if (resetToken == null) {
            model.addAttribute("error", "Invalid or expired token");
            return "password-reset-error";
        }

        if (resetToken.isExpired()) {
            model.addAttribute("error", "Token has expired");
            return "password-reset-error";
        }

        model.addAttribute("token", token);
        return "password-reset-pageokkk";
    }

    @PostMapping("/reset")
    public String handlePasswordReset(@RequestBody PasswordResetRequest resetRequest, Model model) {
            String token = resetRequest.getToken();
            String password = resetRequest.getPassword();

        ResetToken resetToken = resetTokenService.getResetTokenByToken(token);

        if (resetToken == null) {
            model.addAttribute("error", "Invalid or expired token");
            return "password-reset-error";
        }

        if (resetToken.isExpired()) {
            model.addAttribute("error", "Token has expired");
            return "password-reset-error";
        }

        Player player = playerService.getPlayerById(resetToken.getPlayerId());
        player.setPassword(password);
        playerService.savePlayer(player);
        resetTokenService.deleteResetToken(resetToken);

        model.addAttribute("success", "Password reset successful");
        return "password-reset-success";
    }

    private void sendEmail(String to, String subject, String message) {
        SimpleMailMessage mailMessage= new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }
}