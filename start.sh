#!/bin/sh
set -e

# Start nginx in background
nginx -g "daemon off;" &

# Start Django
cd /app/backend/backend_app
gunicorn backend_app.wsgi:application --bind 0.0.0.0:8000 &

# Start Next.js
cd /app/frontend
exec npm start