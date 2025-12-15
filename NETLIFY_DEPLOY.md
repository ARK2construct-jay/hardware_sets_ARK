# Netlify Deployment Guide

## Quick Deploy Steps

### Option 1: Using Netlify CLI (Recommended)

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify:**
```bash
netlify login
```

3. **Build the app:**
```bash
cd client
npm run build
```

4. **Deploy:**
```bash
netlify deploy --prod --dir=build
```

### Option 2: Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy with Git"
3. Connect your GitHub repository
4. Set build settings:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/build`

## Environment Variables

Add these in Netlify dashboard under Site Settings → Environment Variables:

```
REACT_APP_API_URL=https://hardware-selection-api.onrender.com
```

## Your Configuration

✅ **netlify.toml** - Already configured
✅ **Build settings** - Ready
✅ **API proxy** - Points to Render backend
✅ **Environment variables** - Set in .env.production

## After Deployment

Your site will be available at: `https://your-site-name.netlify.app`

## Troubleshooting

- If build fails, check Node.js version (should be 18+)
- Ensure all dependencies are installed in client folder
- Check that backend API is running on Render