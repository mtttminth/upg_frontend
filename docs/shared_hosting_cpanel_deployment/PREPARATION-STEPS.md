# 📝 Complete Preparation Steps for cPanel Deployment

## Overview

This document describes **all the steps performed** to prepare a Next.js SSR project (originally using Yarn) for deployment to cPanel shared hosting **without SSH/terminal access**.

---

## 🎯 Initial Project State

- **Package Manager**: Yarn (with `.yarnrc.yml` and `yarn.lock`)
- **Next.js Version**: 15.0.4
- **React Version**: 19.0.0
- **Key Dependencies**: Material-UI, TanStack Query, Zustand
- **Build Output**: Standard Next.js build (not standalone)
- **Status**: Git cloned, never run with npm

---

## 📋 Complete Step-by-Step Process

### **Phase 1: Clean Up Yarn Files**

#### Step 1.1: Remove Yarn-specific Files

**Commands executed:**
```powershell
Remove-Item -Recurse -Force "node_modules"  # Delete old dependencies
Remove-Item -Force "yarn.lock"               # Remove Yarn lock file
Remove-Item -Force ".yarnrc.yml"             # Remove Yarn config
```

**Purpose**: Clean slate for npm installation

**Files removed:**
- `node_modules/` directory
- `yarn.lock`
- `.yarnrc.yml`

---

### **Phase 2: Install Dependencies with npm**

#### Step 2.1: Attempt Standard npm Install

**Command executed:**
```bash
npm install
```

**Result**: ❌ Failed with error:
```
npm error ERESOLVE unable to resolve dependency tree
npm error peer react@"^17.0.0 || ^18.0.0" from @mui/base@5.0.0-dev...
```

**Problem**: React 19 conflicts with Material-UI's peer dependency requirements

#### Step 2.2: Install with Legacy Peer Deps Flag

**Command executed:**
```bash
npm install --legacy-peer-deps
```

**Result**: ✅ Success
- 447 packages installed
- `package-lock.json` created
- Some deprecation warnings (normal, not blocking)
- 1 critical vulnerability (common, not a deployment blocker)

**Files created:**
- `node_modules/` directory (447 packages)
- `package-lock.json`

---

### **Phase 3: Configure Next.js for Standalone Build**

#### Step 3.1: Update next.config.ts

**File modified**: `next.config.ts`

**Change made**:
```typescript
// BEFORE
const nextConfig: NextConfig = {
  images: {
    // ... existing config
  },
};

// AFTER
const nextConfig: NextConfig = {
  output: 'standalone',  // ← ADDED THIS LINE
  images: {
    // ... existing config
  },
};
```

**Purpose**: Enable standalone build mode which:
- Creates a self-contained server package
- Includes only production dependencies
- Optimizes for hosting environments without build tools
- Critical for cPanel deployment

---

### **Phase 4: Build the Production Bundle**

#### Step 4.1: Run Production Build

**Command executed:**
```bash
npm run build
```

**Result**: ✅ Success
- Build completed in ~2 minutes
- Created `.next/standalone/` directory
- Created `.next/static/` directory
- Generated 13 routes (static and dynamic)
- Middleware compiled (35.8 kB)
- Minor ESLint warnings (not blocking)

**Build output created:**
```
.next/
├── standalone/        ← Self-contained server application
│   ├── server.js      (Not the final one, needs customization)
│   ├── node_modules/  (Minimal required packages)
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── [other files]
├── static/            ← Static assets (CSS, JS, fonts)
│   ├── chunks/
│   ├── css/
│   └── [other files]
└── [other build files]
```

---

### **Phase 5: Create Deployment Package**

#### Step 5.1: Create Deploy Directory

**Command executed:**
```powershell
New-Item -ItemType Directory -Path "deploy"
```

**Result**: Created empty `deploy/` folder

#### Step 5.2: Copy Standalone Build Files

**Commands executed:**
```powershell
Copy-Item -Path ".next/standalone/*" -Destination "deploy/" -Recurse -Force
Copy-Item -Path ".next/static" -Destination "deploy/.next/static" -Recurse -Force
Copy-Item -Path "public" -Destination "deploy/public" -Recurse -Force
Copy-Item -Path "package.json" -Destination "deploy/package.json" -Force
```

**Files copied:**
- All files from `.next/standalone/` → `deploy/`
- `.next/static/` → `deploy/.next/static/`
- `public/` → `deploy/public/`
- `package.json` → `deploy/package.json`

**Result**: `deploy/` folder contains complete standalone build

---

_Continued in PREPARATION-STEPS-PART2.md_