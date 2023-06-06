package com.arjuncodes.studentsystem.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id_partita;
        private int id;

        private int turni;
        private String classe;

        private String robot;
        private String modalita;


        private String name;


        public Game() {
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

    public int getId_partita() {
        return id_partita;
    }

    public void setId_partita(int id_partita) {
        this.id_partita = id_partita;
    }



    public int getTurni() {
        return turni;
    }

    public void setTurni(int turni) {
        this.turni = turni;
    }

    public String getClasse() {
        return classe;
    }

    public void setClasse(String classe) {
        this.classe = classe;
    }

    public String getRobot() {
        return robot;
    }

    public void setRobot(String robot) {
        this.robot = robot;
    }

    public String getModalita() {
        return modalita;
    }

    public void setModalita(String modalita) {
        this.modalita = modalita;
    }


}
