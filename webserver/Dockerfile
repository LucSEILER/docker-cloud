# Utilisation d'une version alpine pour la légèreté
FROM nginx:1.25-alpine

# Métadonnées pour la documentation du TP
LABEL version="1.0"
LABEL description="Serveur de configuration statique pour le Cloud"

# Installation de curl pour le healthcheck (demande du TP)
RUN apk add --no-cache curl

# On crée un répertoire spécifique pour nos données
WORKDIR /usr/share/nginx/html

# Suppression des fichiers par défaut de nginx
RUN rm -rf ./*

# Copie de ton dossier public local vers le conteneur
COPY ./public .

# Modification des permissions (Sécurité : utilisateur non-root)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx

# On expose un port différent du front pour bien les distinguer
EXPOSE 8080

# On remplace la config par défaut pour écouter sur le port 8080
RUN sed -i 's/80;/8080;/g' /etc/nginx/conf.d/default.conf

# Utilisateur non-privilégié
USER nginx

# Healthcheck : Docker vérifie si le serveur répond bien sur le port 8080
HEALTHCHECK --interval=15s --timeout=3s \
  CMD curl -f http://localhost:8080/config.json || exit 1

CMD ["nginx", "-g", "daemon off;"]
