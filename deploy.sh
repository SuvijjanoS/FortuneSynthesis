#!/bin/bash
# Script to prepare Vercel deployment

# Step 1: Create the empty swisseph package
mkdir -p node_modules/@empty/swisseph
cat > node_modules/@empty/swisseph/package.json << 'EOF'
{
  "name": "@empty/swisseph",
  "version": "1.0.0",
  "description": "Empty swisseph package to prevent native compilation",
  "main": "index.js"
}
EOF

cat > node_modules/@empty/swisseph/index.js << 'EOF'
module.exports = {
  swe_julday: () => 0,
  swe_calc_ut: () => 0,
  swe_revjul: () => {},
  swe_close: () => {},
  swe_set_ephe_path: () => {},
  SE_GREG_CAL: 1
};
EOF

# Step 2: Install dependencies without scripts
npm install --no-optional --ignore-scripts

# Step 3: Run the Vercel build script
npm run vercel-build
