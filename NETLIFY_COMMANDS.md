# Netlify Deployment Commands

## Option 1: Direct CLI Deployment (Recommended)

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the React app
cd client
npm install
npm run build
cd ..

# 3. Deploy to Netlify
netlify login
netlify deploy --dir=client/build --prod
```

## Option 2: GitHub + Netlify Web Interface

### Step 1: Push to GitHub
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/hardware-selection-system.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select your repository: `hardware-selection-system`
5. Build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
6. Click "Deploy site"

## Option 3: Drag & Drop (Simplest)

```bash
# 1. Build the app locally
cd client
npm install
npm run build

# 2. Go to https://netlify.com/drop
# 3. Drag the client/build folder to the page
```

## Environment Variables for Netlify

After deployment, add these in Netlify dashboard:
- `REACT_APP_API_URL`: `https://your-backend-url.onrender.com`