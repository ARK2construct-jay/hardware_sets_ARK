# Quick Deploy Guide

## 1. GitHub (2 minutes)
1. Go to https://github.com/new
2. Repository name: `hardware-selection-system`
3. Make it Public
4. Click "Create repository"
5. Copy the commands from GitHub and run them in your project folder

## 2. Netlify (3 minutes)
1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your GitHub repository
5. Build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`
6. Click "Deploy site"

## 3. Backend (Render.com - 3 minutes)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Choose your repository
5. Settings:
   - Name: `hardware-selection-api`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Environment Variables:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `hardwareSelectionSecretKey2024ProjectFinal`
   - `MONGODB_URI`: `mongodb://localhost:27017/hardware_selection` (temporary)

## 4. Database (MongoDB Atlas - 5 minutes)
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update Render environment variable

Total time: ~15 minutes