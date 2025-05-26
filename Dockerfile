# Utilise une version stable et compatible de Node.js
FROM node:20

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet
COPY . .

# Exposer le port utilisé par Vite en mode dev
EXPOSE 5173

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev"]
