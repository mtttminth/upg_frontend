# 🚀 cPanel Deployment Guide for Shwe Su Frontend

## ✅ Pre-Deployment Checklist

Your project is now ready for deployment! Here's what has been completed:

- ✅ Converted from Yarn to npm
- ✅ Installed all dependencies with `--legacy-peer-deps`
- ✅ Updated `next.config.ts` with `output: 'standalone'`
- ✅ Built the project successfully
- ✅ Created deployment package in `/deploy` folder
- ✅ Created `server.js` startup file
- ✅ Created `.htaccess` configuration file

---

## 📦 What's in the Deploy Folder

```
deploy/
├── .next/
│   ├── static/              ← Static assets (CSS, JS, images)
│   └── [other files]
├── public/                  ← Your public assets (logo, images)
├── node_modules/            ← All dependencies
├── app/                     ← Your Next.js app routes
├── components/              ← React components
├── lib/                     ← Utilities and services
├── stores/                  ← Zustand stores
├── server.js                ← ⭐ Node.js startup file
├── .htaccess                ← ⭐ Apache/Passenger config
├── package.json             ← Dependencies list
└── [other config files]
```

---

## 🎯 Step-by-Step Deployment Instructions

### **Phase 1: cPanel Setup**

#### Step 1: Login to cPanel
- Go to your hosting provider's cPanel
- Login with your credentials

#### Step 2: Setup Node.js Application
1. Find **"Setup Node.js App"** or **"Application Manager"**
2. Click **"Create Application"**
3. Configure the following:
   - **Node.js version**: Select **18.x** or **20.x** (NOT 16.x or below)
   - **Application mode**: **Production**
   - **Application root**: `public_html/shwesu` (or your preferred folder name)
   - **Application URL**: Your domain or subdomain
   - **Application startup file**: `server.js`
   - **Passenger log file**: Keep default
4. Click **"Create"**

#### Step 3: Note Your Paths
cPanel will show you important paths like:
```
Application root: /home/yourusername/public_html/shwesu
```
**Copy this path - you'll need it for the .htaccess file!**

---

### **Phase 2: File Upload**

#### Step 4: Access File Manager
1. Go to **cPanel → File Manager**
2. Navigate to your application root folder (e.g., `public_html/shwesu`)
3. If there are any default files, **delete them**

#### Step 5: Upload Files
1. Click **"Upload"** button
2. Upload **ALL** files and folders from your `/deploy` folder:
   - Upload all files at once, or
   - Create a ZIP file of the deploy folder contents and upload/extract it

**⏰ Time estimate**: 15-30 minutes depending on your internet speed

#### Step 6: Update .htaccess File
1. In File Manager, open the `.htaccess` file you uploaded
2. Find this line:
   ```apache
   PassengerAppRoot /home/username/public_html/your-app-folder
   ```
3. Replace with YOUR actual path from Step 3:
   ```apache
   PassengerAppRoot /home/yourusername/public_html/shwesu
   ```
4. Save the file

---

### **Phase 3: Dependencies (Already Included!)**

#### Step 7: Node Modules - No Action Needed! ✅

**Good news!** The `node_modules` folder is already included in your `/deploy` folder with all dependencies installed using `--legacy-peer-deps`.

**What this means:**
- ✅ All 155 production packages are pre-installed
- ✅ Peer dependency conflicts are resolved
- ✅ No need to run npm install in cPanel
- ✅ Just upload and run!

**Important:** When you upload the deploy folder, make sure the `node_modules` folder is included. This may take 30-60 minutes due to the large number of files (but it's worth it - no installation hassles!).

**Alternative: If you prefer to install on the server**
1. Delete the `node_modules` folder from your local deploy folder before uploading
2. Upload all other files first
3. In **Setup Node.js App**, click "Run npm install"
4. The `.npmrc` file will ensure it uses `--legacy-peer-deps` automatically
5. Wait 5-10 minutes for completion

**Note:** Uploading pre-installed `node_modules` is more reliable for shared hosting environments.

---

### **Phase 4: Environment Variables**

#### Step 8: Set Environment Variables
1. In **Setup Node.js App**, click **"Edit"** on your application
2. Scroll to **"Environment variables"** section
3. Add these variables:
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_API_URL` = `https://admin.shwesu.com` (or your API URL)
   - Add any other environment variables your app needs
4. Click **"Save"**

---

### **Phase 5: Launch**

#### Step 9: Restart Application
1. In **Setup Node.js App**, select your application
2. Click **"Restart"** button
3. Wait 30-60 seconds for the app to start

#### Step 10: Test Your Application
1. Open your browser
2. Navigate to your domain/subdomain
3. Your Next.js app should now be live! 🎉

---

## 🔍 Troubleshooting

### Issue: 503 Service Unavailable
**Possible causes:**
- Node.js version too old (use 18.x or 20.x)
- `server.js` file missing or incorrect
- Application not restarted after changes

**Solutions:**
1. Check **Passenger logs**: `/home/yourusername/logs/passenger.log`
2. Verify `server.js` exists in application root
3. Restart the application
4. Check Node.js version in cPanel settings

### Issue: Assets Not Loading (CSS/JS 404 errors)
**Possible causes:**
- `.next/static/` folder not uploaded correctly
- `public/` folder missing

**Solutions:**
1. Verify `.next/static/` folder exists in your application root
2. Check `public/` folder is present
3. Clear browser cache and reload

### Issue: npm install Failed in cPanel
**Possible causes:**
- Network timeout
- Insufficient memory
- Package conflicts

**Solutions:**
1. Try running npm install again
2. Upload `node_modules` directly (Option B above)
3. Contact hosting support about memory limits

### Issue: Application Crashes After Starting
**Possible causes:**
- Missing environment variables
- Incorrect PORT configuration
- Database connection issues

**Solutions:**
1. Check environment variables are set correctly
2. Review application logs in cPanel
3. Ensure all API endpoints are accessible

### Issue: Authentication Not Working
**Possible causes:**
- Cookie domain settings
- HTTPS/HTTP mismatch
- CORS configuration

**Solutions:**
1. Check API backend CORS settings
2. Ensure cookies work across your domain
3. Verify API URL in environment variables

---

## 📊 Monitoring Your Application

### Check Logs
- **Location**: `/home/yourusername/logs/` in File Manager
- **Passenger log**: `passenger.log`
- **Application log**: Check your app's error output

### Monitor Resource Usage
- Go to **cPanel → Metrics**
- Check CPU, Memory, and I/O usage
- Contact hosting if limits are reached

### Application Status
- Check in **Setup Node.js App**
- Green status = Running
- Red status = Stopped (click Restart)

---

## 🎯 Important Notes for Your Project

### Authentication & Middleware
- Your middleware protects these routes:
  - `/cart`
  - `/checkout`
  - `/order-history`
  - `/profile`
- Ensure your API backend is accessible from the hosting server

### Image Optimization
- Remote image patterns configured for:
  - `admin.shwesu.com`
  - `staging.shwesu.com`
  - `shwesu.test`
- Next.js will optimize images from these domains

### API Integration
- Set `NEXT_PUBLIC_API_URL` to your production API
- Ensure CORS is configured on your backend
- Test all API endpoints after deployment

### Dependencies Note
- Project uses React 19 with Material-UI
- Installed with `--legacy-peer-deps` due to peer dependency conflicts
- This is normal and won't affect functionality

---

## 🚀 Updating Your Application

When you need to deploy updates:

1. Make changes locally
2. Run `npm run build`
3. Copy new files from `.next/standalone/` to deploy folder
4. Upload changed files via File Manager
5. Restart application in cPanel

---

## 📞 Need Help?

If you encounter issues not covered here:

1. Check cPanel error logs first
2. Review Passenger logs for detailed errors
3. Test your app locally to ensure it works with `npm start`
4. Contact your hosting provider's support
5. Verify Node.js version compatibility

---

## ✨ Your Application is Ready!

All files are prepared in the `/deploy` folder. Follow the steps above to deploy your Shwe Su frontend to cPanel shared hosting.

**Good luck with your deployment! 🎉**