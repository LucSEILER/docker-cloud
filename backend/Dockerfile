# Image de base Node.js
FROM node:22-alpine AS build

# Working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

FROM node:22-alpine AS run

LABEL description="Backend Node.js Express"

# Personnalised build arguments
ARG APP_PORT=3000
ARG NODE_ENV=production

# Environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${APP_PORT}

# Working directory
WORKDIR /app

# Creation of a new non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# Installation of additional system dependencies
RUN apk add --no-cache curl

# Copy source code
COPY --from=build /app/node_modules ./node_modules
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

# Run the app
CMD ["node", "server.js"]
