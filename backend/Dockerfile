# Image de base Node.js
FROM node:20-alpine

# Arguments de build personnalisés
ARG APP_PORT=3000
ARG NODE_ENV=production

# Variables d'environnement
ENV PORT=${APP_PORT}
ENV NODE_ENV=${NODE_ENV}

# Métadonnées
LABEL description="Backend Node.js Express personnalisé"

# Création d'un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# Répertoire de travail
WORKDIR /app

# Installation de dépendances système supplémentaires
RUN apk add --no-cache curl

# Copie et installation des dépendances
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copie du code source
COPY server.js ./

# Changement de propriétaire
RUN chown -R appuser:appgroup /app

# Bascule vers l'utilisateur non-root
USER appuser

# Exposition du port
EXPOSE ${APP_PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:${APP_PORT}/health || exit 1

CMD ["npm", "start"]
