#!/bin/sh
set -e

cd /usr/src/app/apps/backend

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting the application..."
exec node ./dist/index.js
