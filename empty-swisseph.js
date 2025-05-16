// empty-swisseph.js
module.exports = {
  SE_GREG_CAL: 1,
  swe_julday: () => { throw new Error('Use WASM, not native swisseph'); },
  swe_calc_ut: () => { throw new Error('Use WASM'); },
  swe_set_ephe_path: () => {},
  swe_houses: () => {},
  swe_revjul: () => {},
  swe_close: () => {}
};
