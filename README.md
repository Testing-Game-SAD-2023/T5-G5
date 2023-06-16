<h1 align="center"> Guida Installazione su docker</h1>







```bash
git clone https://github.com/Testing-Game-SAD-2023/T5-G5.git
```
### Aprire terminale e spostarsi nel path del repo con cd aggiungendo il percorso della cartella, eseguire in cmd
```bash
 docker build -t front .
 docker-compose up
```
### Successivamente in un secondo terminale
```bash
cd backend
 docker build -t back .
 docker-compose up
```
 
### Nel caso spring desse errore stoppare con ctrl+c e rieseguire docker-compose up


## FAQ

#### Come si può cambiare la porta in cui viene eseguito il progetto in react? 

Per eseguire la GUI su una porta diversa dalla 3000 modificare il primo docker-compose.yml presente nel path T5-G5 e in ports cambiare il primo 3000 con la porta desiderata

## Additional Information
### Il frontend è in esecuzione su http://localhost:3000
### Su http://localhost:9000 è presente un adminer per gestione database, per accedervi:
### Utente: root 
### Password: rootpassword
### I dati vengono inseriti sul database mysql
## 
<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://spring.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/> </a> </p>









