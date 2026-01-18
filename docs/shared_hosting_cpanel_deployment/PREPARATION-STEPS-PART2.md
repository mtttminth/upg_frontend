# 📝 Complete Preparation Steps for cPanel Deployment (Part 2)

_Continued from PREPARATION-STEPS.md_

---

### **Phase 6: Create Custom Server File**

#### Step 6.1: Create server.js for cPanel

**File created**: `deploy/server.js`

**Content**:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

**Purpose**:
- Custom Node.js server entry point
- Required by Passenger (cPanel's Node.js handler)
- Handles all HTTP requests
- Provides error handling
- Uses environment PORT variable

**Why custom server is needed**:
- Next.js standalone build includes a basic server.js
- cPanel's Passenger requires specific server configuration
- This custom server integrates Next.js with Passenger
- Handles production mode properly

---

### **Phase 7: Create Apache/Passenger Configuration**

#### Step 7.1: Create .htaccess File

**File created**: `deploy/.htaccess`

**Content**:
```apache
PassengerEnabled On
PassengerStartupFile server.js
PassengerAppType node
PassengerAppRoot /home/username/public_html/your-app-folder

# IMPORTANT: Replace 'username' with your actual cPanel username
# IMPORTANT: Replace 'your-app-folder' with your actual application folder name

# Caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/font-woff "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
```

**Purpose**:
- Tells Apache to use Passenger for Node.js
- Specifies startup file (`server.js`)
- Sets application root path (must be edited by user)
- Configures caching for performance
- Enables compression for faster load times

**Important notes**:
- `PassengerAppRoot` MUST be edited with actual server path
- This is shown in cPanel after creating Node.js app
- Caching and compression improve performance significantly

---

### **Phase 8: Install Production Dependencies in Deploy Folder**

#### Step 8.1: Install Dependencies with Correct Flags

**Command executed:**
```bash
cd deploy
npm install --production --legacy-peer-deps
```

**Flags explanation**:
- `--production`: Excludes devDependencies (TypeScript, ESLint, etc.)
- `--legacy-peer-deps`: Bypasses React 19 peer dependency conflicts

**Result**: ✅ Success
- 130 production packages installed
- Installation completed in ~1 minute
- No errors or warnings

**Why this step is crucial**:
- cPanel's "Run npm install" doesn't support `--legacy-peer-deps` flag by default
- Pre-installing ensures dependencies work correctly
- Avoids timeout issues on shared hosting
- Guarantees consistency between local and server
- Reduces deployment size (no dev dependencies)

**Packages installed**:
- 118 direct packages visible in node_modules
- 130 total including nested dependencies
- All production runtime dependencies only

---

### **Phase 9: Create npm Configuration File**

#### Step 9.1: Create .npmrc

**File created**: `deploy/.npmrc`

**Content**:
```
legacy-peer-deps=true
```

**Purpose**:
- Makes `--legacy-peer-deps` the default for all npm commands
- Ensures server-side `npm install` works if user chooses that option
- Handles peer dependency conflicts automatically
- Provides fallback if user wants to install on server

**How it works**:
- Any npm command in this directory will use this flag
- Applies to `npm install`, `npm update`, etc.
- User can still choose to upload pre-installed node_modules OR install on server

---

### **Phase 10: Create Deployment Documentation**

#### Step 10.1: Create Main Deployment Guide

**File created**: `deploy/DEPLOYMENT-GUIDE.md` (8.46 KB)

**Contains:**
- ✅ Pre-deployment checklist
- ✅ Step-by-step cPanel setup instructions
- ✅ File upload procedures
- ✅ .htaccess configuration guide
- ✅ Dependency installation options
- ✅ Environment variable configuration
- ✅ Application restart steps
- ✅ Comprehensive troubleshooting guide
- ✅ Project-specific notes (authentication, images, API)
- ✅ Monitoring and logging instructions
- ✅ Update procedures

#### Step 10.2: Create Quick Reference Checklist

**File created**: `deploy/QUICK-CHECKLIST.txt` (3.04 KB)

**Contains:**
- ✅ Condensed step-by-step checklist
- ✅ Preparation status
- ✅ Deployment steps
- ✅ Quick troubleshooting tips
- ✅ File list with descriptions
- ✅ Essential paths and commands

#### Step 10.3: Create Dependencies Documentation

**File created**: `deploy/README-DEPENDENCIES.md` (4.52 KB)

**Contains:**
- ✅ Explanation of peer dependency conflicts
- ✅ Why `--legacy-peer-deps` is needed
- ✅ Two deployment options (upload vs install on server)
- ✅ Technical details about .npmrc
- ✅ Verification steps
- ✅ Common issues and solutions
- ✅ Package statistics

---

## 📊 Final Deploy Folder Structure

```
deploy/
├── .next/
│   ├── static/                    ← 📦 Static assets (CSS, JS)
│   │   ├── chunks/
│   │   └── [webpack chunks]
│   └── server/                    ← 🖥️ Server-side code
│       ├── app/                   ← App routes
│       ├── pages/
│       └── chunks/
├── public/                        ← 🖼️ Public assets
│   ├── images/
│   │   ├── logo.png
│   │   └── auth/
│   ├── file.svg
│   └── [other public files]
├── node_modules/                  ← 📚 130 production packages
│   ├── next/
│   ├── react/
│   ├── react-dom/
│   └── [127 other packages]
├── app/                           ← 🎯 Next.js app directory
├── components/                    ← ⚛️ React components
├── lib/                           ← 🛠️ Utilities and APIs
├── stores/                        ← 🗄️ Zustand state stores
├── server.js                      ← ⭐ Custom Node.js server (CRITICAL)
├── .htaccess                      ← ⚙️ Apache config (MUST EDIT)
├── .npmrc                         ← 📝 npm configuration
├── package.json                   ← 📋 Dependencies list
├── package-lock.json              ← 🔒 Locked versions
├── DEPLOYMENT-GUIDE.md            ← 📖 Main deployment guide
├── QUICK-CHECKLIST.txt            ← ✅ Quick reference
└── README-DEPENDENCIES.md         ← 📦 Dependency documentation
```

---

_Continued in PREPARATION-STEPS-PART3.md_