# Deployment Checklist

## ✅ Pre-Deployment Setup (Completed)
- [x] Created .gitignore file
- [x] Created netlify.toml configuration
- [x] Updated server.js for production
- [x] Created environment templates
- [x] Added deployment scripts

## 🚀 Deployment Steps

### 1. GitHub Repository
```bash
# Run the deploy.bat script or execute these commands:
git init
git add .
git commit -m "Initial commit: Hardware Selection System"

# Create repository at https://github.com/new
# Name: hardware-selection-system

# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/hardware-selection-system.git
git branch -M main
git push -u origin main
```

### 2. Backend Deployment (Render.com)
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `hardware-selection-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: `hardwareSelectionSecretKey2024ProjectFinal`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: (will add after Netlify deployment)

### 3. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Add to Render environment variables

### 4. Frontend Deployment (Netlify)
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
6. Deploy!

### 5. Final Configuration
1. Copy your Netlify URL (e.g., `https://amazing-app-123456.netlify.app`)
2. Update Render environment variable `FRONTEND_URL` with your Netlify URL
3. Update `netlify.toml` with your Render URL:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://YOUR-RENDER-APP-NAME.onrender.com/api/:splat"
     status = 200
     force = true
   ```
4. Commit and push changes to trigger redeployment

## 🧪 Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test hardware selection
- [ ] Test all brand filters
- [ ] Test responsive design

## 📝 Post-Deployment
- [ ] Update README.md with live URLs
- [ ] Test all functionality
- [ ] Monitor logs for errors
- [ ] Set up domain (optional)

## 🔗 Expected URLs
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-app-name.onrender.com`
- **GitHub**: `https://github.com/YOUR_USERNAME/hardware-selection-system`

## 🆘 Troubleshooting
- **CORS errors**: Check FRONTEND_URL in Render environment
- **API not found**: Verify netlify.toml redirect URL
- **Database connection**: Check MongoDB Atlas IP whitelist (set to 0.0.0.0/0 for all IPs)
- **Build failures**: Check Node.js version compatibility