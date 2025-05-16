// Empty swisseph module to prevent native compilation
export default {
  swe_julday: () => 0,
  swe_calc_ut: () => 0,
  swe_revjul: () => {},
  swe_close: () => {},
  swe_set_ephe_path: () => {}
};

// CommonJS compatibility
module.exports = {
  swe_julday: () => 0,
  swe_calc_ut: () => 0,
  swe_revjul: () => {},
  swe_close: () => {},
  swe_set_ephe_path: () => {}
};
