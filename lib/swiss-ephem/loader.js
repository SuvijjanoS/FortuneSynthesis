// loader.js - Add error handling for environments without fs
import createSwissEphModule from './swe_wasm.js';

export default async function loadSwissEph() {
  let fs;
  let wasmPath;
  
  // Check if we're in a Node.js environment with fs access
  try {
    fs = await import('fs');
    const path = await import('path');
    wasmPath = path.resolve(path.dirname(import.meta.url.replace('file://', '')),
                          'swe_wasm.wasm');
  } catch (error) {
    console.warn('Running in browser or restricted environment, using browser-compatible WASM loading');
    fs = null;
    wasmPath = './lib/swiss-ephem/swe_wasm.wasm';
  }

  try {
    const Module = await createSwissEphModule({
      locateFile: () => wasmPath,
      fs: fs // Will be null in browser, which is fine
    });

    // Wrap the C functions
    const julday = Module.cwrap('swe_julday', 'number',
                              ['number','number','number','number','number']);
    const calcUt = Module.cwrap('swe_calc_ut', 'number',
                              ['number','number','number','number']);
    const revjul = Module.cwrap('swe_revjul', null,
                              ['number','number','number','number','number','number']);
    const setPath = Module.cwrap('swe_set_ephe_path','void',['string']);
    const sweClose = Module.cwrap('swe_close','void', []);

    return { julday, calcUt, revjul, sweClose, Module };
  } catch (error) {
    console.error('Failed to load Swiss Ephemeris WASM:', error);
    
    // Return simplified fallback functions
    return {
      julday: (year, month, day, hour) => {
        // Simple Julian Day calculation
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;
        return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 
               Math.floor(y / 100) + Math.floor(y / 400) - 32045 + (hour - 12) / 24;
      },
      calcUt: () => ({ longitude: 0 }),
      revjul: () => {},
      sweClose: () => {},
      Module: {
        ccall: () => {}
      }
    };
  }
}
