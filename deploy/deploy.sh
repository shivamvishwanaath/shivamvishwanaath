#!/bin/bash

# Exit immediately if any command exits with a non-zero status
set -e

# Configuration
APP_DIR="/var/www/shivam-vishwanaath"
BRANCH="main"

echo "=========================================="
echo " Starting Automated Deployment on VPS     "
echo "=========================================="

# Navigate to the app folder
cd "$APP_DIR"

# 1. Fetch latest changes from Git
echo "Fetching latest changes from Git ($BRANCH)..."
git fetch origin
git reset --hard "origin/$BRANCH"

# 2. Install production dependencies
echo "Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install --frozen-lockfile
elif command -v yarn &> /dev/null; then
    yarn install --frozen-lockfile
else
    npm install
fi

# 3. Build Next.js project
echo "Building the Next.js production bundle..."
if command -v pnpm &> /dev/null; then
    pnpm run build
elif command -v yarn &> /dev/null; then
    yarn run build
else
    npm run build
fi

# 4. Reload PM2 instances (Zero-downtime cluster reload)
echo "Reloading application cluster in PM2..."
if command -v pm2 &> /dev/null; then
    # Reload using zero-downtime cluster mode
    pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs
    pm2 save
else
    echo "WARNING: PM2 is not installed on the VPS. Run: npm install -g pm2"
fi

# 5. Reload Caddy reverse proxy
echo "Reloading Caddy configurations..."
if systemctl is-active --quiet caddy; then
    # Synchronize Caddyfile from project to Caddy config dir and reload
    if [ -f "deploy/Caddyfile" ]; then
        sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
        sudo systemctl reload caddy
        echo "Caddy service reloaded successfully."
    else
        echo "Caddyfile not found in deploy/ folder."
    fi
else
    echo "Caddy service is not active. If Caddy is run manually, reload with: caddy reload --config deploy/Caddyfile"
fi

echo "=========================================="
echo " Deployment Complete!                     "
echo "=========================================="
