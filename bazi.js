// BaZi ES Module - Revised with Swiss Ephemeris, WanNianLi & Luck Pillars
console.log('bazi.js module loaded - v5.0 with Luck Pillars & Interactions');

import swisseph from 'swisseph';
import { createClient } from '@supabase/supabase-js';

// --- Supabase setup ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Path to Swiss Ephemeris files (downloaded at build)
swisseph.swe_set_ephe_path('ephe');

// --- Heavenly Stems, Earthly Branches, Solar Terms, Rules constants ---
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  SOLAR_TERMS,
  SOLAR_TERM_MONTHS
} from './constants.js';
import { FIVE_TIGERS_RULE, FIVE_RATS_RULE } from './rules.js';
import solarTermMap from './data/solarTerms.json';

// --- WanNianLi lookup helper ---
export async function getDayGanzhi(dateStr) {
  const { data, error } = await supabase
    .from('wanianli')
    .select('day_ganzhi')
    .eq('gregorian_date', dateStr)
    .single();
  if (error) throw error;
  return data.day_ganzhi;
}

export async function getDayPillar(dateStr) {
  const gz = await getDayGanzhi(dateStr);
  return { dayStem: gz[0], dayBranch: gz[1] };
}

// --- Julian Day calculation via Swiss Ephemeris ---
export function toJulianDay(year, month, day, hour, minute, tzOffsetMin, dst) {
  const offset = tzOffsetMin - (dst ? 60 : 0);
  const dt = new Date(Date.UTC(year, month - 1, day, hour - offset, minute));
  return swisseph.swe_julday(
    dt.getUTCFullYear(), dt.getUTCMonth() + 1,
    dt.getUTCDate(), dt.getUTCHours() + dt.getUTCMinutes() / 60,
    swisseph.SE_GREG_CAL
  );
}

// --- Pillar calculations ---
export async function getYearPillar(jd) {
  const utc = swisseph.swe_jdet_to_utc(jd);
  const yr = utc.year;
  const lichunJD = solarTermMap[yr].find(t => t.term === 'Lichun').jd;
  const chartYear = jd >= lichunJD ? yr : yr - 1;
  const rec = await supabase
    .from('wanianli')
    .select('lunar_year_gz')
    .eq('gregorian_date', `${chartYear}-02-04`)
    .single();
  const gz = rec.data.lunar_year_gz;
  return { yearStem: gz[0], yearBranch: gz[1], chartYear };
}

export async function getMonthPillar(jd, yearStem) {
  const utc = swisseph.swe_jdet_to_utc(jd);
  const terms = solarTermMap[utc.year];
  const months = ['Lichun','Jingzhe','Qingming','Lixia','Mangzhong','Xiaoshu','Liqiu','Bailu','Hanlu','Lidong','Daxue','Xiaohan'];
  let idx = months.findIndex((m, i) => {
    const start = terms.find(t => t.term === m).jd;
    const end = terms.find(t => t.term === months[(i + 1) % 12]).jd;
    return jd >= start && jd < end;
  });
  if (idx < 0) idx = 11; // fallback
  const branchChar = EARTHLY_BRANCHES[idx].chinese;
  const firstStem = FIVE_TIGERS_RULE[yearStem];
  const startIdx = HEAVENLY_STEMS.findIndex(s => s.chinese === firstStem);
  const stemChar = HEAVENLY_STEMS[(startIdx + idx) % 10].chinese;
  return { monthStem: stemChar, monthBranch: branchChar };
}

export function getHourPillar(date, dayStem) {
  const hr = date.getHours();
  const idx = Math.floor((hr + 1) / 2) % 12;
  const branchChar = EARTHLY_BRANCHES[idx].chinese;
  const ziStem = FIVE_RATS_RULE[dayStem];
  const baseIdx = HEAVENLY_STEMS.findIndex(s => s.chinese === ziStem);
  const stemChar = HEAVENLY_STEMS[(baseIdx + idx) % 10].chinese;
  return { hourStem: stemChar, hourBranch: branchChar };
}

// --- Find next/previous Jie term ---
export function findJieTermAfter(date, forward = true) {
  const year = date.getFullYear();
  let terms = [];
  for (let y = year - 1; y <= year + 1; y++) {
    solarTermMap[y].forEach(t => { if (t.type === 'Jie') terms.push({...t, year: y}); });
  }
  terms.sort((a, b) => a.jd - b.jd);
  if (forward) return terms.find(t => swisseph.swe_julday(...swisseph.swe_jdet_to_utc(t.jd)) > toJulianDay(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getTimezoneOffset()*-1, date.dst || 0));
  const reversed = [...terms].reverse();
  return reversed.find(t => swisseph.swe_julday(...swisseph.swe_jdet_to_utc(t.jd)) < toJulianDay(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getTimezoneOffset()*-1, date.dst || 0));
}

// --- Luck Pillars for next 120 years ---
export async function calculateLuckPillars(birthDate, gender, yearStem, monthIndex) {
  const isYang = HEAVENLY_STEMS.find(s => s.chinese === yearStem).number % 2 === 1;
  const forward = (gender === 'male' && isYang) || (gender === 'female' && !isYang);
  const term = findJieTermAfter(birthDate, forward);
  const termUTC = swisseph.swe_jdet_to_utc(term.jd);
  const diffMs = Math.abs(new Date(termUTC.year, termUTC.month-1, termUTC.day, termUTC.hour, termUTC.minute).getTime() - birthDate.getTime());
  const days = diffMs / (1000*60*60*24);
  const startAge = Math.round(days / 3);

  const pillars = [];
  for (let i = 0; i < 12; i++) {
    const idx = forward ? monthIndex + i + 1 : monthIndex - (i + 1);
    const stemChar = HEAVENLY_STEMS[(startIdx + idx) % 10].chinese;
    const branch = EARTHLY_BRANCHES[(startIndexBW + idx) % 12];
    pillars.push({
      startAge: startAge + i*10,
      endAge: startAge + i*10 + 9,
      stem: stemChar,
      branch: branch.chinese,
      hiddenBranches: branch.hiddenStems
    });
  }
  return pillars;
}

// --- Interaction identification (combos, clashes, etc.) ---
import { identifyInteractions } from './interactions.js';

// --- Main API function ---
export default async function calcBazi({ year, month, day, hour, minute, tzOffset, dst, gender }) {
  const jd = toJulianDay(year, month, day, hour, minute, tzOffset, dst);
  const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const [yearP, dayP] = await Promise.all([
    getYearPillar(jd),
    getDayPillar(dateStr)
  ]);
  const monthP = await getMonthPillar(jd, yearP.yearStem);
  const hourP = getHourPillar(new Date(year, month-1, day, hour, minute), dayP.dayStem);

  // Determine monthIndex for luck pillar start
  const monthIndex = EARTHLY_BRANCHES.findIndex(b => b.chinese === monthP.monthBranch);

  const luckPillars = await calculateLuckPillars(
    new Date(year, month-1, day, hour, minute),
    gender,
    yearP.yearStem,
    monthIndex
  );

  const chart = { yearP, monthP, dayP, hourP, luckPillars };
  chart.interactions = identifyInteractions(chart);
  return chart;
}
