package com.arjuncodes.studentsystem.model;

import javax.persistence.*;
import java.util.Date;

    @Entity
    public class ResetToken {

        private static final int EXPIRATION_MINUTES = 60 * 24; // 1 giorno

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private int id;

        @Column(nullable = false, unique = true)
        private String token;

        @Column(nullable = false)
        private int playerId;

        @Column(nullable = false)
        private Date expiryDate;

        public ResetToken() {}

        public ResetToken(String token, int playerId) {
            this.token = token;
            this.playerId = playerId;
            this.expiryDate = calculateExpiryDate(EXPIRATION_MINUTES);
        }

        private Date calculateExpiryDate(int expiryTimeInMinutes) {
            Date now = new Date();
            long expiryTimeMs = expiryTimeInMinutes * 60 * 1000;
            return new Date(now.getTime() + expiryTimeMs);
        }

        public boolean isExpired() {
            return new Date().after(this.expiryDate);
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public int getPlayerId() {
            return playerId;
        }

        public void setPlayerId(int playerId) {
            this.playerId = playerId;
        }

        public Date getExpiryDate() {
            return expiryDate;
        }

        public void setExpiryDate(Date expiryDate) {
            this.expiryDate = expiryDate;
        }
    }

