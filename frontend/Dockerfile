# === STAGE 1: Build Angular ===
FROM node:22-alpine AS build

# Arguments de build
# ARG NODE_ENV=production # THIS VARIABLE BREAK ALL, BECAUSE DO NOT INSTALL DEV DEPENDENCIES !!!
ARG CONFIGURATION=production

# Métadonnées
LABEL description="Frontend Angular personnalisé"

# Répertoire de travail
WORKDIR /app

# RUN npm install -g @angular/cli

# Copie des fichiers de dépendances
COPY package*.json /app/

# Installation des dépendances
# --legacy-peer-deps peut être nécessaire selon ta version d'Angular
# RUN npm ci --legacy-peer-deps
RUN npm ci

# Copie de tout le code source
COPY . /app

# Build de l'application Angular
# Le résultat sera dans /app/dist/frontend (ou /app/dist/browser selon la version)
# RUN npm run build -- --configuration=${CONFIGURATION}
# RUN npx ng build --configuration=${CONFIGURATION}
# RUN npm run build
# CMD ["npx", "ng", "build", "--configuration=production"]
# RUN npm run build -- --configuration=${CONFIGURATION}
RUN npm run build -- --configuration $CONFIGURATION

# === STAGE 2: Nginx personnalisé ===
FROM nginx:1.25-alpine

# Métadonnées
LABEL description="Serveur Nginx pour Angular"

# Installation d'outils supplémentaires pour monitoring
RUN apk add --no-cache curl


# Copie des fichiers buildés depuis le stage précédent
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf
# COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port
EXPOSE 80

# Health check personnalisé
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
