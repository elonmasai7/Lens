# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
RUN npm ci --only=development
COPY . .
RUN npm run build

# Frontend serve stage
FROM nginx:1.25-alpine AS frontend
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# Backend stage
FROM node:20-alpine AS backend
WORKDIR /app
RUN apk add --no-cache tini
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production
COPY backend ./backend
USER node
EXPOSE 3001
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "backend/src/index.js"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/v1/health', r => { process.exit(r.statusCode === 200 ? 0 : 1) })"
