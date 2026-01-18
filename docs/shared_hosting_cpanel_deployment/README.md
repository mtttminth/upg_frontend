# 📚 cPanel Shared Hosting Deployment Documentation

Complete documentation for deploying Next.js SSR applications to cPanel shared hosting without SSH/terminal access.

---

## 📖 Documentation Structure

This directory contains comprehensive guides for preparing and deploying Next.js applications to cPanel shared hosting.

### For Developers (Preparation Phase)

#### **PREPARATION-STEPS.md** (Part 1)
Complete step-by-step guide of ALL preparation steps performed.
- Phase 1: Clean up Yarn files
- Phase 2: Install dependencies with npm
- Phase 3: Configure Next.js for standalone build
- Phase 4: Build the production bundle
- Phase 5: Create deployment package

#### **PREPARATION-STEPS-PART2.md** (Part 2)
Continuation of preparation steps.
- Phase 6: Create custom server file
- Phase 7: Create Apache/Passenger configuration
- Phase 8: Install production dependencies
- Phase 9: Create npm configuration
- Phase 10: Create deployment documentation
- Final folder structure

#### **PREPARATION-STEPS-PART3.md** (Part 3)
Final part with verification and summary.
- Key files explanation
- Commands summary
- Verification checklist
- Statistics
- Future deployment guide
- Key learnings and best practices

### For End Users (Deployment Phase)

#### **DEPLOYMENT-GUIDE(MAIN).md**
Complete guide for deploying to cPanel (for end users).
- Pre-deployment checklist
- cPanel setup instructions
- File upload procedures
- Environment configuration
- Troubleshooting guide
- Monitoring instructions

#### **QUICK-CHECKLIST.txt**
Quick reference checklist for deployment.
- Condensed step-by-step list
- Quick troubleshooting tips
- Essential file list

#### **README-DEPENDENCIES.md**
Explanation of dependency management.
- Why `--legacy-peer-deps` is needed
- Deployment options
- Technical details
- Verification steps

---

## 🎯 Quick Start

### For Developers Preparing a Project

1. Read **PREPARATION-STEPS.md** (all 3 parts)
2. Follow the commands in sequence
3. Verify with the checklist in Part 3
4. Your `/deploy` folder is ready

### For End Users Deploying to cPanel

1. Read **DEPLOYMENT-GUIDE(MAIN).md**
2. Use **QUICK-CHECKLIST.txt** while deploying
3. Refer to **README-DEPENDENCIES.md** for dependency questions
4. Follow troubleshooting guides if issues occur

---

## 📂 File Overview

```
doc/shared_hosting_cpanel_deployment/
├── README.md                        ← This file
├── PREPARATION-STEPS.md             ← Preparation guide (Part 1)
├── PREPARATION-STEPS-PART2.md       ← Preparation guide (Part 2)
├── PREPARATION-STEPS-PART3.md       ← Preparation guide (Part 3)
├── DEPLOYMENT-GUIDE(MAIN).md        ← Deployment guide for end users
├── QUICK-CHECKLIST.txt              ← Quick reference checklist
└── README-DEPENDENCIES.md           ← Dependency documentation
```

---

## 🔑 Key Concepts

### Standalone Build
Next.js `output: 'standalone'` mode creates a self-contained deployment package optimized for production hosting without build tools.

### Legacy Peer Deps
The `--legacy-peer-deps` flag resolves peer dependency conflicts between React 19 and Material-UI packages that haven't updated their peer dependency requirements.

### Custom Server
A custom `server.js` file integrates Next.js with Apache's Passenger system used by cPanel for Node.js applications.

### Pre-installed Dependencies
Dependencies are installed locally with correct flags and uploaded to avoid issues with cPanel's npm install limitations.

---

## ⚙️ Technical Requirements

### Development Environment
- Node.js 18.x or higher
- npm (not Yarn)
- Windows PowerShell or Unix terminal
- Git (optional, for version control)

### cPanel Hosting Requirements
- Node.js support (version 18.x or 20.x)
- Passenger (usually included)
- File Manager access
- Sufficient storage space (~500 MB recommended)
- No SSH access required

### Project Requirements
- Next.js 14.x or 15.x
- React 18.x or 19.x
- Any standard Next.js dependencies

---

## 🚀 Process Overview

### Preparation (Developer)
1. Convert from Yarn to npm
2. Install dependencies with `--legacy-peer-deps`
3. Configure `next.config.ts` for standalone build
4. Build production bundle
5. Create deployment package
6. Install production dependencies
7. Create configuration files
8. Create documentation

**Time**: ~10-15 minutes

### Deployment (End User)
1. Setup Node.js app in cPanel
2. Upload files via File Manager
3. Edit .htaccess with actual paths
4. Set environment variables
5. Restart application
6. Test and verify

**Time**: ~45-60 minutes (mostly upload time)

---

## 📊 Project Statistics

### Package Counts
- **Development**: 447 packages (with devDependencies)
- **Production**: 130 packages (without devDependencies)
- **Visible**: 118 packages (in node_modules root)

### Deploy Folder
- **Size**: ~200-300 MB
- **Files**: 1000+ files
- **Folders**: 150+ folders

### Documentation
- **Total pages**: 7 documents
- **Total size**: ~40 KB
- **Word count**: ~8,000 words

---

## 🎓 Learning Resources

### Understanding the Process
1. Read PREPARATION-STEPS (all parts) for complete understanding
2. Review each phase carefully
3. Note the "why" explanations for each step
4. Study the verification checklists

### Common Issues
- Peer dependency conflicts → Use `--legacy-peer-deps`
- Build errors → Verify `output: 'standalone'` in config
- Upload failures → Use ZIP file method
- Server crashes → Check environment variables

### Best Practices
- Always test locally before deploying
- Keep documentation updated
- Verify file integrity after upload
- Monitor logs for issues
- Use staging environment when possible

---

## 🔄 Update Process

When updating the deployed application:

1. Make changes locally
2. Run `npm run build`
3. Copy new files from `.next/standalone/`
4. Upload changed files only
5. Restart application in cPanel

No need to re-upload node_modules or unchanged files.

---

## 📞 Support

### For Preparation Issues
Refer to PREPARATION-STEPS-PART3.md "Support & Troubleshooting" section

### For Deployment Issues
Refer to DEPLOYMENT-GUIDE(MAIN).md "Troubleshooting" section

### For Dependency Issues
Refer to README-DEPENDENCIES.md "Common Issues" section

---

## ✨ Success Criteria

### Preparation Complete When:
- ✅ All commands executed successfully
- ✅ `/deploy` folder exists and contains all files
- ✅ `node_modules/` has 118+ packages
- ✅ All configuration files created
- ✅ Documentation files present

### Deployment Complete When:
- ✅ Application accessible via browser
- ✅ All pages load correctly
- ✅ Authentication works
- ✅ Images display properly
- ✅ API calls succeed
- ✅ No console errors

---

## 🎯 Quick Links

- **Start Preparation**: PREPARATION-STEPS.md
- **Deploy to cPanel**: DEPLOYMENT-GUIDE(MAIN).md
- **Quick Reference**: QUICK-CHECKLIST.txt
- **Dependency Info**: README-DEPENDENCIES.md

---

**Last Updated**: November 23, 2025  
**Version**: 1.0  
**Compatibility**: Next.js 14.x - 15.x, React 18.x - 19.x, cPanel with Node.js 18.x+

---

**Need help?** Read through the appropriate guide above or contact your hosting provider's support for cPanel-specific questions.