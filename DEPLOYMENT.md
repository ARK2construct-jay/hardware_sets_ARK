# Deployment Guide

## GitHub Setup

### 1. Install Git
Download and install Git from: https://git-scm.com/download/windows

### 2. Create GitHub Repository
1. Go to https://github.com
2. Click "New repository"
3. Name it "hardware-selection-system"
4. Make it public or private
5. Don't initialize with README (we already have one)

### 3. Initialize Local Repository
Open Command Prompt in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hardware-selection-system.git
git push -u origin main
```

## Environment Setup for Production

### Create .env.example file
Copy your .env file structure without sensitive values:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=production
```

## Deployment Options

### Option 1: Heroku (Recommended)

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git push heroku main`

### Option 2: Netlify (Frontend) + Railway/Render (Backend)

**Frontend (Netlify):**
1. Build the client: `cd client && npm run build`
2. Drag and drop the `build` folder to Netlify

**Backend (Railway):**
1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Set environment variables in Vercel dashboard

## Database Setup

### MongoDB Atlas (Cloud Database)
1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Replace localhost connection with Atlas connection string

## Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Database connected
- [ ] Frontend can communicate with backend
- [ ] CORS configured for production domain
- [ ] SSL certificate enabled
- [ ] Domain configured (if using custom domain)

## Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS configuration in server.js
2. **Database connection**: Check MongoDB URI format
3. **Build failures**: Ensure all dependencies are in package.json
4. **Environment variables**: Double-check all required variables are set