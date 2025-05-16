// Empty module to prevent swisseph compilation
const emptyModule = {
  swe_julday: () => 0,
  swe_calc_ut: () => 0,
  swe_revjul: () => {},
  swe_close: () => {},
  swe_set_ephe_path: () => {},
  SE_GREG_CAL: 1
};

// Support both CommonJS and ES Module imports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = emptyModule;
}

export default emptyModule;
