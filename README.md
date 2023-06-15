# Guida Installazione su docker
### git clone https://github.com/Testing-Game-SAD-2023/T5-G5.git
spostarsi nel path del repo
eseguire 
### docker-build -t G5-T5-front .
### docker-compose up
Dopo
### cd backend
### docker-build -t G5-T5-back
### docker-compose up
### Andare su http://localhost:9000 e accedere con
### Utente: root 
### Password: rootpassword
### creare un database di nome sadfinal
### rieseguire docker-compose up
### Andare su http://localhost:3000








### Vecchio Manuale Instalazione
Aprire la cartella backend in un IDE come Intellij IDEA e runnare StudentsystemApplication 
OR
Da cmd
### ` cd backend`
###  `mvnw install`
### In caso di errore Error: JAVA_HOME not found in your environment. Please set the JAVA_HOME variable in your environment to match the location of your Java installation.
### `setx JAVA_HOME  "C:\Program Files\Java\jdk(JDK version number)"`  then restart cmd
### ` cd target`
### `java -jar studentsystem-0.0.1-SNAPSHOT.jar`







# Getting Started with Create React App


## Installations and setup
download node.js: https://nodejs.org/en/download
in 'Node.js command prompt':
### `npm install`


In the project directory, you can run:

### `npm install react-scripts --save` 
npm install deve essere eseguito solo una volta per installare tutte le dipendenze, dopodichè basterà npm start
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`




