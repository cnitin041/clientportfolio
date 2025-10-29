# GitHub Pages Deployment Guide

This guide will walk you through the steps to deploy this React portfolio to GitHub Pages.

## Prerequisites
- GitHub account
- Git installed on your local machine
- Node.js and npm installed

## Deployment Steps

### 1. Prepare Your Repository
1. Create a new repository on GitHub (if you haven't already)
2. Initialize git in your project folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add the remote repository:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```

### 2. Configure Package.json
1. Update the `homepage` field in `package.json`:
   ```json
   "homepage": "https://your-username.github.io/your-repo-name"
   ```
2. Ensure you have these scripts in `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     "build": "react-scripts build",
     "postbuild": "node -e \"const fs=require('fs');fs.copyFileSync('build/index.html','build/404.html')\""
   }
   ```
3. Install gh-pages if not already installed:
   ```bash
   npm install --save gh-pages
   ```

### 3. Deploy to GitHub Pages
1. Run the deployment command:
   ```bash
   npm run deploy
   ```
2. This will:
   - Create a production build
   - Create a `gh-pages` branch
   - Push the build files to the `gh-pages` branch

### 4. Configure GitHub Pages
1. Go to your GitHub repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the `gh-pages` branch and click "Save"
4. Your site will be available at: `https://your-username.github.io/your-repo-name`

### 5. Updating Your Site
1. After making changes, commit them:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main  # or your main branch name
   ```
2. Deploy the changes:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Page Not Found (404) on Refresh
- The project includes a `postbuild` script that creates a `404.html` file to handle client-side routing
- Ensure your `homepage` in `package.json` is correctly set

### Styling Issues
- If styles don't load, check if the `homepage` URL in `package.json` is correct
- Make sure all asset paths are relative (use `process.env.PUBLIC_URL` for static assets)

### Deployment Fails
- Check for any build errors by running `npm run build` first
- Ensure you have write access to the repository
- Verify your GitHub token has the necessary permissions

## Custom Domain (Optional)
To use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Update your DNS settings to point to GitHub Pages
3. In GitHub repository settings, under "Pages", add your custom domain

## Need Help?
If you encounter any issues, please check the [GitHub Pages documentation](https://pages.github.com/) or open an issue in the repository.
