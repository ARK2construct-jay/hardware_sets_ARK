# 🚀 Deploy Your Hardware Selection Portal to Netlify

## Step-by-Step Deployment

### 1. Login to Netlify
```bash
netlify login
```
This will open your browser - login with your Netlify account (create one if needed)

### 2. Initialize Your Site
```bash
netlify init
```
- Choose "Create & configure a new site"
- Select your team
- Give your site a name (e.g., "hardware-selection-portal")

### 3. Deploy Your Site
```bash
cd client
netlify deploy --prod --dir=build
```

## Alternative: Drag & Drop Method

1. Go to [netlify.com](https://netlify.com)
2. Drag the `client/build` folder to the deploy area
3. Your site will be live instantly!

## Your Site Configuration

✅ **Build folder:** `client/build` (already created)
✅ **API Backend:** Connected to Render
✅ **Environment:** Production ready

## After Deployment

Your portal will be available at:
`https://your-site-name.netlify.app`

## Quick Commands

```bash
# Build app
cd client && npm run build

# Deploy
netlify deploy --prod --dir=build

# Check status
netlify status
```

## Need Help?

Run these commands in order:
1. `netlify login`
2. `netlify init`
3. `cd client`
4. `netlify deploy --prod --dir=build`

Your hardware selection portal will be live for everyone to use! 🎉