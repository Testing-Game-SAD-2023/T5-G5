package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.ResetToken;
import com.arjuncodes.studentsystem.repository.ResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ResetTokenServiceImpl implements ResetTokenService {

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Override
    public ResetToken createResetToken(int playerId) {
        String token = UUID.randomUUID().toString();
        ResetToken resetToken = new ResetToken(token, playerId);
        return resetTokenRepository.save(resetToken);
    }

    @Override
    public ResetToken getResetTokenByToken(String token) {
        return resetTokenRepository.findByToken(token);
    }

    @Override
    public void deleteResetToken(ResetToken resetToken) {
        resetTokenRepository.delete(resetToken);
    }
}