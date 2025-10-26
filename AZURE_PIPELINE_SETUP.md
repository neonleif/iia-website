# Azure Pipeline Setup Guide

This guide explains how to set up Azure Pipelines for automatic deployment of the IIA website to Azure Static Web Apps.

## ✅ Current Status

- **Deployment Method**: Azure Static Web Apps (direct deployment)
- **Website**: https://isitautomated.com
- **Azure Static Web App**: iia (resource group: iia-website)
- **Repository**: https://github.com/neonleif/iia-website

## 🎯 Why Azure Pipelines Instead of GitHub Actions?

**GitHub Actions reported false errors** despite successful deployments. The mobile menu updates were deployed successfully, but the workflow failed at the "Build And Deploy" step with authentication errors.

**Azure Pipelines provides:**
- ✅ Direct integration with Azure Static Web Apps
- ✅ Better error reporting and debugging
- ✅ Native Azure authentication
- ✅ More reliable deployment status
- ✅ No false positive errors

## 🚀 Setup Instructions

### Step 1: Get Deployment Token

Run this command to get your Azure Static Web Apps deployment token:

```bash
az staticwebapp secrets list \
  --name iia \
  --resource-group iia-website \
  --query "properties.apiKey" \
  -o tsv
```

Copy the output token (it will look like: `324f150f04fc099e7bd7...`)

### Step 2: Create Azure DevOps Project (if not exists)

1. Go to https://dev.azure.com
2. Create a new organization (if you don't have one)
3. Create a new project: `iia-website`

### Step 3: Connect GitHub Repository

1. In your Azure DevOps project, go to **Pipelines**
2. Click **New Pipeline**
3. Select **GitHub** as your code source
4. Authorize Azure Pipelines to access your GitHub account
5. Select repository: `neonleif/iia-website`
6. Choose **Existing Azure Pipelines YAML file**
7. Select the file: `/azure-pipelines.yml`

### Step 4: Add Deployment Token as Secret Variable

1. In the pipeline configuration, click **Variables**
2. Click **New variable**
3. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. Value: Paste the deployment token from Step 1
5. ⚠️ **Important**: Check **"Keep this value secret"**
6. Click **OK** and **Save**

### Step 5: Run Your First Pipeline

1. Click **Run** to test the pipeline
2. Monitor the build process:
   - Install Node.js ✓
   - Install dependencies ✓
   - Build Astro site ✓
   - Run validation tests ✓
   - Deploy to Azure Static Web Apps ✓

## 📋 Pipeline Behavior

**Triggers automatically on:**
- Push to `main` branch
- Excludes: README.md, *.md files, .github folder

**Steps:**
1. **Install Node.js 18.x** - Sets up the build environment
2. **Install dependencies** - Runs `npm ci` for clean install
3. **Build Astro site** - Runs `npm run build` → creates `dist/` folder
4. **Run validation tests** - Runs `npm run test:simple` (non-blocking)
5. **Deploy** - Uses Azure SWA CLI to deploy `dist/` folder to production

## 🔍 Monitoring Deployments

### View Pipeline Status
- Azure DevOps: https://dev.azure.com/[your-org]/iia-website/_build
- See real-time logs during deployment
- Get accurate success/failure status

### View Live Site
- Production: https://isitautomated.com
- Azure default: https://ashy-hill-04f0fce03.1.azurestaticapps.net

### Check Deployment History
```bash
az staticwebapp show \
  --name iia \
  --resource-group iia-website \
  --query "{name:name, hostname:defaultHostname, customDomains:customDomains}"
```

## 🛠️ Troubleshooting

### Pipeline Fails at "Deploy" Step

**Check deployment token:**
```bash
# Get current token
az staticwebapp secrets list --name iia --resource-group iia-website --query "properties.apiKey" -o tsv

# If needed, reset token
az staticwebapp secrets reset-api-key --name iia --resource-group iia-website --no-wait

# Wait 5-10 seconds, then get new token
az staticwebapp secrets list --name iia --resource-group iia-website --query "properties.apiKey" -o tsv

# Update Azure Pipeline variable with new token
```

### Build Fails

**Check Node.js version:**
- Pipeline uses Node.js 18.x
- Ensure `package.json` engines match: `"node": ">=18.0.0"`

**Check dependencies:**
```bash
# Local test
npm ci
npm run build
```

### Validation Tests Fail

Tests are set to `continueOnError: true`, so they won't block deployment.

To run tests locally:
```bash
npm run test:simple
npm run test:mobile-menu
```

## 📝 Manual Deployment (Fallback)

If Azure Pipeline has issues, you can deploy manually:

```bash
# Build locally
npm ci
npm run build

# Get deployment token
TOKEN=$(az staticwebapp secrets list --name iia --resource-group iia-website --query "properties.apiKey" -o tsv)

# Deploy using SWA CLI
npx @azure/static-web-apps-cli deploy \
  --deployment-token "$TOKEN" \
  --app-location dist \
  --no-use-keychain \
  --env production
```

## 🎓 Key Learnings

1. **GitHub Actions was reporting false errors** - The deployment actually succeeded, but the workflow failed at authentication
2. **Azure Static Web Apps accepts deployments via multiple methods:**
   - GitHub Actions (unreliable authentication)
   - Azure Pipelines (reliable, recommended)
   - Azure CLI / SWA CLI (manual)
3. **Mobile menu deployment proved the system works** - The code was live on isitautomated.com despite GitHub Actions reporting failure

## 🔄 Maintenance

### Update Deployment Token (if needed)
```bash
# Reset token
az staticwebapp secrets reset-api-key --name iia --resource-group iia-website --no-wait
sleep 10

# Get new token
NEW_TOKEN=$(az staticwebapp secrets list --name iia --resource-group iia-website --query "properties.apiKey" -o tsv)

# Update Azure Pipeline variable manually via UI
echo "New token: $NEW_TOKEN"
```

### Update Custom Domains
Custom domains are configured in Azure:
- isitautomated.com
- www.isitautomated.com

To view or update:
```bash
az staticwebapp hostname list --name iia --resource-group iia-website -o table
```

## ✨ Summary

**Before:**
- ❌ GitHub Actions: False errors, confusing status
- ❌ Deployment appeared to fail
- ✅ But actually worked (mobile menu was deployed!)

**After:**
- ✅ Azure Pipelines: Clear, accurate status
- ✅ Direct Azure integration
- ✅ Reliable deployment reporting
- ✅ No false positives

---

**Setup completed on:** 26 October 2025  
**Maintained by:** Nicolaj Schweitz  
**Contact:** https://isitautomated.com/contact
