

FROM node:alpine as development

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il file package.json nella directory di lavoro
COPY package*.json ./

# Esegue il comando npm install per installare le dipendenze
RUN npm install

# Copia il contenuto della directory build nell'immagine Docker
COPY ./build ./build

# Espone la porta 3000 del container
EXPOSE 3000


# Avvia l'applicazione React con il comando npm start
CMD ["npm", "start"]