#!/bin/bash
# pre-install.sh - Run before npm install to prevent swisseph installation

# Create a fake empty package to prevent the real one from being installed
mkdir -p fake-node-modules/swisseph
echo '{
  "name": "swisseph",
  "version": "0.5.17",
  "description": "Empty placeholder to prevent native compilation",
  "main": "index.js"
}' > fake-node-modules/swisseph/package.json

echo 'module.exports = {};' > fake-node-modules/swisseph/index.js

# Add to npm cache so it won't try to download the real one
npm cache add ./fake-node-modules/swisseph
