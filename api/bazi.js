// BaZi ES Module – v5.0  (pure‑JS + Swiss‑Eph WASM, WanNianLi, Luck Pillars)
// ---------------------------------------------------------------------------
// This file expects two runtime env‑vars (in Vercel settings):
//   SUPABASE_URL   – your project URL
//   SUPABASE_KEY   – service‑role key (read access to `wanianli` table)
// ---------------------------------------------------------------------------

import { createClient } from '@supabase/supabase-js';
import loadSwissEph from '../lib/swiss-ephem/loader.js';
import path from 'path';

// ─────────────────────────────────────────────────────────────────────────────
// 1.  Boot Swiss Ephemeris WASM (top‑level await)                              
// ─────────────────────────────────────────────────────────────────────────────
const swe = await loadSwissEph(); // { julday, calcUt, revjul, sweClose, Module }

// point Swiss‑Eph to ephemeris data (./lib/ephe)
const epheDir = path.resolve('./lib/ephe');
swe.Module.ccall('swe_set_ephe_path', 'void', ['string'], [epheDir]);

// ─────────────────────────────────────────────────────────────────────────────
// 2.  Supabase helper                                                          
// ─────────────────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// 3.  Static data                                                             
// ─────────────────────────────────────────────────────────────────────────────
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  SOLAR_TERMS,
  SOLAR_TERM_MONTHS
} from './constants.js';
import { FIVE_TIGERS_RULE, FIVE_RATS_RULE } from './rules.js';
import solarTermMap from './data/solarTerms.json';
import { identifyInteractions } from './interactions.js';

// ─────────────────────────────────────────────────────────────────────────────
// 4.  Wan‑Nian‑Li helpers                                                     
// ─────────────────────────────────────────────────────────────────────────────
export async function getDayGanzhi(dateStr) {
  const { data, error } = await supabase
    .from('wanianli')
    .select('day_ganzhi')
    .eq('gregorian_date', dateStr)
    .single();
  if (error) throw error;
  return data.day_ganzhi; // e.g. "甲子"
}

export async function getDayPillar(dateStr) {
  const gz = await getDayGanzhi(dateStr);
  return { dayStem: gz[0], dayBranch: gz[1] };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5.  Julian‑Day helpers                                                      
// ─────────────────────────────────────────────────────────────────────────────
export function toJulianDay(y, m, d, h, min, tzOffsetMin, dst) {
  const localHours = h + min / 60;
  // convert local civil time → UT
  const utHours = localHours - (tzOffsetMin - (dst ? 60 : 0)) / 60;
  return swe.julday(y, m, d, utHours, 1 /* SE_GREG_CAL */);
}

// reverse JD → Gregorian (Meeus 1991, ch. 7) – JS only (avoid swe_revjul stub)
function jdToUTC(jd) {
  let Z = Math.floor(jd + 0.5);
  let F = (jd + 0.5) - Z;
  let A = Z;
  const alpha = Math.floor((Z - 1867216.25) / 36524.25);
  A += 1 + alpha - Math.floor(alpha / 4);
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E) + F;
  const month = (E < 14) ? E - 1 : E - 13;
  const year = (month > 2) ? C - 4716 : C - 4715;
  const dayFrac = day % 1;
  const hour = Math.floor(dayFrac * 24);
  const minute = Math.round((dayFrac * 24 - hour) * 60);
  return new Date(Date.UTC(year, month - 1, Math.floor(day), hour, minute));
}

// ─────────────────────────────────────────────────────────────────────────────
// 6.  Pillar calculations                                                     
// ─────────────────────────────────────────────────────────────────────────────
export async function getYearPillar(jd) {
  const dt = jdToUTC(jd);
  const yr = dt.getUTCFullYear();
  const lichunJD = solarTermMap[yr].find(t => t.term === 'Lichun').jd;
  const chartYear = jd >= lichunJD ? yr : yr - 1;
  const { data } = await supabase
    .from('wanianli')
    .select('lunar_year_gz')
    .eq('gregorian_date', `${chartYear}-02-04`)
    .single();
  const gz = data.lunar_year_gz;
  return { yearStem: gz[0], yearBranch: gz[1], chartYear };
}

export async function getMonthPillar(jd, yearStem) {
  const dt = jdToUTC(jd);
  const yr = dt.getUTCFullYear();
  const termList = solarTermMap[yr];
  // determine index 0‑11 by which Jie interval jd falls into
  const jieOnly = termList.filter(t => t.type === 'Jie');
  let idx = jieOnly.findIndex((t, i) => {
    const start = t.jd;
    const end = jieOnly[(i + 1) % 12].jd;
    return jd >= start && jd < end;
  });
  if (idx < 0) idx = 11;
  const branchChar = EARTHLY_BRANCHES[idx].chinese;
  const firstStem = FIVE_TIGERS_RULE[yearStem];
  const startIdx = HEAVENLY_STEMS.findIndex(s => s.chinese === firstStem);
  const stemChar = HEAVENLY_STEMS[(startIdx + idx) % 10].chinese;
  return { monthStem: stemChar, monthBranch: branchChar, monthIndex: idx };
}

export function getHourPillar(date, dayStem) {
  const idx = Math.floor((date.getHours() + 1) / 2) % 12;
  const branchChar = EARTHLY_BRANCHES[idx].chinese;
  const ziStem = FIVE_RATS_RULE[dayStem];
  const baseIdx = HEAVENLY_STEMS.findIndex(s => s.chinese === ziStem);
  const stemChar = HEAVENLY_STEMS[(baseIdx + idx) % 10].chinese;
  return { hourStem: stemChar, hourBranch: branchChar };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Luck Pillars (120 yrs)                                                   
// ─────────────────────────────────────────────────────────────────────────────
function findNextPrevJieJD(jd, forward = true) {
  const dt = jdToUTC(jd); const yr = dt.getUTCFullYear();
  const all = [];
  for (let y = yr - 1; y <= yr + 1; y++) all.push(...solarTermMap[y].filter(t => t.type === 'Jie'));
  all.sort((a, b) => a.jd - b.jd);
  if (forward) return all.find(t => t.jd > jd);
  return [...all].reverse().find(t => t.jd < jd);
}

export async function calcLuckPillars(birthDate, gender, yearStem, monthIndex) {
  const birthJD = toJulianDay(birthDate.getFullYear(), birthDate.getMonth() + 1, birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), -birthDate.getTimezoneOffset(), birthDate.dst ? 60 : 0);
  const isYang = HEAVENLY_STEMS.find(s => s.chinese === yearStem).number % 2 === 1;
  const fwd = (gender === 'male' && isYang) || (gender === 'female' && !isYang);
  const jie = findNextPrevJieJD(birthJD, fwd);
  const days = Math.abs(jie.jd - birthJD);
  const startAge = Math.round(days / 3);
  const stemsStart = FIVE_TIGERS_RULE[yearStem];
  const stem0Idx = HEAVENLY_STEMS.findIndex(s => s.chinese === stemsStart);

  const pillars = [];
  for (let i = 0; i < 12; i++) {
    const shift = fwd ? i + 1 : -(i + 1);
    const stem = HEAVENLY_STEMS[(stem0Idx + monthIndex + shift + 100) % 10].chinese;
    const branchObj = EARTHLY_BRANCHES[(monthIndex + shift + 120) % 12];
    pillars.push({
      startAge: startAge + i * 10,
      endAge: startAge + i * 10 + 9,
      stem,
      branch: branchObj.chinese,
      hiddenBranches: branchObj.hiddenStems
    });
  }
  return pillars;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8.   Public API                                                            
// ─────────────────────────────────────────────────────────────────────────────
export default async function calcBazi({ year, month, day, hour, minute, tzOffset, dst = false, gender }) {
  const jd = toJulianDay(year, month, day, hour, minute, tzOffset, dst);
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const [yearP, dayP] = await Promise.all([
    getYearPillar(jd),
    getDayPillar(dateStr)
  ]);
  const monthP = await getMonthPillar(jd, yearP.yearStem);
  const hourP = getHourPillar(new Date(Date.UTC(year, month - 1, day, hour, minute)), dayP.dayStem);

  const luckPillars = await calcLuckPillars(
    new Date(year, month - 1, day, hour, minute),
    gender,
    yearP.yearStem,
    monthP.monthIndex
  );

  const chart = { yearP, monthP, dayP, hourP, luckPillars };
  chart.interactions = identifyInteractions(chart);
  return chart;
}
