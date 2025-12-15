#!/usr/bin/env bash
set -e

# Simple startup script: docker compose, then start Django and React dev servers
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting docker-compose..."
docker-compose up -d

echo "Starting Django development server (foreground in background)..."
cd "$ROOT_DIR/backend"
python manage.py runserver 0.0.0.0:8000 &

echo "Starting React dev server (foreground in background)..."
cd "$ROOT_DIR/react-crud"
npm start &

echo "All services started. Use 'jobs' to see background tasks or check logs in the terminal." 
```