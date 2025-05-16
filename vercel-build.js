// vercel-build.js - Run during Vercel build to set up ephemeris files
import fs from 'fs';
import path from 'path';

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
