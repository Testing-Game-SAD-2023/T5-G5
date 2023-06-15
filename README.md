<h1 align="center"> Guida Installazione su docker</h1>

<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://spring.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/> </a> </p>





```bash
git clone https://github.com/Testing-Game-SAD-2023/T5-G5.git
```
### aprire terminale e spostarsi nel path del repo con cd aggiungendo il percorso della cartella, eseguire in cmd
```bash
 docker build -t front .
 docker-compose up
```
### Infine
```bash
cd backend
 docker build -t back .
 docker-compose up
```
 
### Nel caso spring desse errore stoppare con ctrl+c e rieseguire docker-compose up
### Andare su http://localhost:3000 per vedere la GUI
### Andare su http://localhost:9000 per gestione database, le tabelle vengono memorizzate in db:mysql
### Utente: root 
### Password: rootpassword

## FAQ

#### Come si può cambiare la porta in cui viene eseguito react? 

Per eseguire la GUI su una porta diversa dalla 3000 utilizzare il primo docker-compose.yml presente nel path T5-G5 e in ports cambiare 3000 con la porta desiderata











