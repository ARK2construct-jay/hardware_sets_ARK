# Deployment Guide

## GitHub Deployment

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Hardware Selection System"
```

### 2. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `hardware-selection-system`
3. Don't initialize with README (we already have one)

### 3. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/hardware-selection-system.git
git branch -M main
git push -u origin main
```

## Backend Deployment (Render.com)

### 1. Create Render Account
- Go to [Render.com](https://render.com)
- Sign up with GitHub

### 2. Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `hardware-selection-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

### 3. Set Environment Variables
In Render dashboard, add:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: `hardwareSelectionSecretKey2024ProjectFinal`
- `NODE_ENV`: `production`

## Frontend Deployment (Netlify)

### 1. Create Netlify Account
- Go to [Netlify](https://netlify.com)
- Sign up with GitHub

### 2. Deploy Frontend
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub and select your repository
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`

### 3. Update API URL
After backend is deployed, update the netlify.toml file with your actual Render URL:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-RENDER-APP-NAME.onrender.com/api/:splat"
  status = 200
  force = true
```

## Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create free cluster

### 2. Get Connection String
1. Click "Connect" → "Connect your application"
2. Copy the connection string
3. Replace `<password>` with your database password

### 3. Import Data (Optional)
Use MongoDB Compass or mongoimport to upload your Excel data.

## Final Steps

1. Update CORS origins in server.js with your Netlify URL
2. Test all functionality
3. Update README.md with live URLs

## Live URLs
- **Frontend**: https://your-app-name.netlify.app
- **Backend**: https://your-app-name.onrender.com