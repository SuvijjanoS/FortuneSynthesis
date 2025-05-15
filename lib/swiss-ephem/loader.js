import fs from 'fs';
import path from 'path';
import createSwissEphModule from './swe_wasm.js';

export default async function loadSwissEph() {
  const wasmPath = path.resolve(path.dirname(import.meta.url.replace('file://', '')),
                                'swe_wasm.wasm');

  const Module = await createSwissEphModule({
    locateFile: () => wasmPath,          // tells glue where the .wasm file is
    fs: fs                                // allow file-system access for .se1 lookups
  });

  // Wrap the C functions
  const julday   = Module.cwrap('swe_julday',  'number',
                                ['number','number','number','number','number']);
  const calcUt   = Module.cwrap('swe_calc_ut', 'number',
                                ['number','number','number','number']);
  const revjul   = Module.cwrap('swe_revjul',  null,
                                ['number','number','number','number','number','number']);
  const setPath  = Module.cwrap('swe_set_ephe_path','void',['string']);
  const sweClose = Module.cwrap('swe_close','void', []);

  // initialise ephemeris search path
  setPath(path.resolve('./lib/ephe'));

  return { julday, calcUt, revjul, sweClose, Module };
}
