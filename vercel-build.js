// Create an @empty/swisseph directory in node_modules
const fs = require('fs');
const path = require('path');

// Ensure the target directory exists
const targetDir = path.resolve('./node_modules/@empty/swisseph');
fs.mkdirSync(targetDir, { recursive: true });

// Create the package.json for the empty module
const packageJson = {
  "name": "@empty/swisseph",
  "version": "1.0.0",
  "description": "Empty placeholder for swisseph to prevent native compilation",
  "main": "index.js",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC"
};

// Create the empty module file
const indexFile = `
module.exports = {
  swe_julday: () => 0,
  swe_calc_ut: () => 0,
  swe_revjul: () => {},
  swe_close: () => {},
  swe_set_ephe_path: () => {},
  SE_GREG_CAL: 1
};
`;

// Write the files
fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2));
fs.writeFileSync(path.join(targetDir, 'index.js'), indexFile);

console.log('Created empty swisseph module at', targetDir);

// Continue with the existing vercel-build.js logic
// Ensure the ephe directory exists
if (!fs.existsSync('ephe')) {
  console.log('Creating ephe directory');
  fs.mkdirSync('ephe', { recursive: true });
}

// Check if ephemeris files were downloaded
const files = fs.readdirSync('ephe');
console.log('Ephemeris files:', files);

// Create a symlink from lib/ephe to ephe for the WASM module to find
const libEphePath = path.resolve('./lib/ephe');
if (!fs.existsSync(libEphePath)) {
  console.log('Creating symlink for lib/ephe');
  fs.mkdirSync(path.dirname(libEphePath), { recursive: true });
  
  // Use different methods depending on the environment
  try {
    fs.symlinkSync(path.resolve('./ephe'), libEphePath, 'dir');
  } catch (error) {
    console.warn('Could not create symlink, copying files instead:', error.message);
    fs.mkdirSync(libEphePath, { recursive: true });
    
    // Copy ephemeris files to lib/ephe
    files.forEach(file => {
      fs.copyFileSync(
        path.resolve('./ephe', file),
        path.resolve(libEphePath, file)
      );
    });
  }
}

console.log('Ephemeris setup complete');
