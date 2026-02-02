# Image de base Node.js
FROM node:22-alpine

# Personnalised build arguments
ARG APP_PORT=3000
ARG NODE_ENV=production

# Environment variables
ENV PORT=${APP_PORT}
ENV NODE_ENV=${NODE_ENV}

LABEL description="Backend Node.js Express"

# Creation of a new non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# Working directory
WORKDIR /app

# Installation of additional system dependencies
RUN apk add --no-cache curl

# Copy and install dependencies
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY server.js ./

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE ${APP_PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:${APP_PORT}/health || exit 1

CMD ["node", "server.js"]
