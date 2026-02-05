# === STAGE 1: Build Angular ===
FROM node:22-alpine AS build

# Build argw
ARG CONFIGURATION=production

LABEL description="Frontend Angular personnalisé"

# Working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json /app/
RUN npm ci

# Copy source code
COPY . /app

# Build of the app > to .dist folder
RUN npm run build -- --configuration $CONFIGURATION

# === STAGE 2: Nginx personnalisé ===
FROM nginx:1.25-alpine

LABEL description="Serveur Nginx pour Angular"

# Install curl the healthcheck
RUN apk add --no-cache curl

# Copy front the built application
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
