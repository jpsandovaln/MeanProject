#!/bin/bash
#build.sh

echo "Building"

cd ./frontend

echo "Building frontend"
npm run build

echo "building server"
cd ../server
gulp build

echo "Copying build folder(frontend) into build/public(server)"
cp -R ../frontend/build build/public

echo "Copying package.jason file into build folder(server)"
cp package.json build/package.json

echo "Copying .env file to build folder(server)"
cp .env build/.env

echo "Installing dependencies into build folder(server)"
cd ./build
npm install --production

echo "Starting server with PM2"
pm2 start index.js --name MEAN

