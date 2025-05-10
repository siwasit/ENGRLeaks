# 1. Backend build stage
FROM python:3.12-slim AS backend

WORKDIR /backend

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt gunicorn

# Copy backend code
COPY backend/backend_app /backend/backend_app

# 2. Frontend build stage
FROM node:22-alpine AS frontend

WORKDIR /frontend

# Install frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend source and build
COPY frontend .
RUN npm run build

# 3. Production stage
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies and dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copy backend from builder
COPY --from=backend /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=backend /backend /app/backend

# Copy frontend from builder
COPY --from=frontend /frontend/.next /app/frontend/.next
COPY --from=frontend /frontend/public /app/frontend/public
COPY --from=frontend /frontend/node_modules /app/frontend/node_modules
COPY --from=frontend /frontend/package.json /app/frontend/

# Configure nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=backend_app.settings
ENV PYTHONUNBUFFERED=1
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Collect static files
WORKDIR /app/backend/backend_app
RUN python manage.py collectstatic --noinput

# Expose ports
EXPOSE 80

# Entrypoint with dumb-init
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]