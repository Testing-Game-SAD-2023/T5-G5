<h1 align="left"> Guida Installazione su docker</h1>


## :file_folder: Requisiti
1. Installare Docker
2. Installare WSL
3. Avviare Docker

## 

```bash
git clone https://github.com/Testing-Game-SAD-2023/T5-G5.git
```

#### Aprire terminale e spostarsi nel path del repo con il comando cd, nella cartella main (dove è presente il dockerfile).
```bash
 docker build -t front .
 docker-compose up
```
#### Successivamente spostarsi nella cartella backend (dove è presente un altro docker file, utilizzando un altro terminale).
```bash
 docker build -t back .
 docker-compose up
```
 
#### Nel caso spring desse errore stoppare con ctrl+c e rieseguire docker-compose up

## :bookmark_tabs: La Documentazione
E' possibile consultare la completa documentazione al seguente link <a title="Link al documento" href="DocumentazioneSAD.pdf">
:link: Documentazione </a>


E' possibile consultare la completa documentazione delle 🐝 al seguente link <a title="Link al documento" href="https://app.swaggerhub.com/apis-docs/ANGELOCRISTIANO1999/SAD-T5-G5/1.0.0"> :link: API </a>

## :video_camera: Video Demo della Application
https://github.com/Testing-Game-SAD-2023/T5-G5/assets/127510084/a9aa3b21-af95-4238-bc3c-32a62ccfbe0a



## :grey_question: FAQ

#### Come si può cambiare la porta in cui viene eseguito il progetto in react? 

Per eseguire la GUI su una porta diversa dalla 3000 modificare il primo docker-compose.yml presente nel path T5-G5 e in ports cambiare il primo 3000 con la porta desiderata

## :heavy_plus_sign: Additional Information
1. Il frontend è in esecuzione su http://localhost:3000
2. Su http://localhost:9000 è presente un adminer per gestione database, per accedervi:
#### Utente: root 
#### Password: rootpassword
3. I dati vengono inseriti sul database mysql
## :busts_in_silhouette: Integrazione
- T6-G16: Ambiente di Editing
- T1-G20: Repo delle classi
##
<p align="left">
</p>

## :wrench: Languages and Tools
<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://spring.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/> </a> </p>









