package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.ResetToken;

public interface ResetTokenService {
    public ResetToken createResetToken(int playerId);
    public ResetToken getResetTokenByToken(String token);
    public void deleteResetToken(ResetToken resetToken);
}
