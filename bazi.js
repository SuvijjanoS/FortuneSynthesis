// BaZi ES Module - Complete Corrected Version
console.log('bazi.js module loaded - v3.0 complete');

// Constants with proper Pinyin and all required data
export const HEAVENLY_STEMS = [
  { chinese: '甲', pinyin: 'Jiǎ', element: 'Yang Wood', number: 1 },
  { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood', number: 2 },
  { chinese: '丙', pinyin: 'Bǐng', element: 'Yang Fire', number: 3 },
  { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire', number: 4 },
  { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth', number: 5 },
  { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth', number: 6 },
  { chinese: '庚', pinyin: 'Gēng', element: 'Yang Metal', number: 7 },
  { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal', number: 8 },
  { chinese: '壬', pinyin: 'Rén', element: 'Yang Water', number: 9 },
  { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water', number: 10 }
];

export const EARTHLY_BRANCHES = [
  { 
    chinese: '子', 
    pinyin: 'Zǐ', 
    animal: 'Rat', 
    element: 'Water', 
    number: 1, 
    hourRange: [23, 1], 
    hiddenStems: [
      { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water', number: 10 }
    ] 
  },
  { 
    chinese: '丑', 
    pinyin: 'Chǒu', 
    animal: 'Ox', 
    element: 'Earth', 
    number: 2, 
    hourRange: [1, 3], 
    hiddenStems: [
      { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth', number: 6 },
      { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water', number: 10 },
      { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal', number: 8 }
    ] 
  },
  { 
    chinese: '寅', 
    pinyin: 'Yín', 
    animal: 'Tiger', 
    element: 'Wood', 
    number: 3, 
    hourRange: [3, 5], 
    hiddenStems: [
      { chinese: '甲', pinyin: 'Jiǎ', element: 'Yang Wood', number: 1 },
      { chinese: '丙', pinyin: 'Bǐng', element: 'Yang Fire', number: 3 },
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth', number: 5 }
    ] 
  },
  { 
    chinese: '卯', 
    pinyin: 'Mǎo', 
    animal: 'Rabbit', 
    element: 'Wood', 
    number: 4, 
    hourRange: [5, 7], 
    hiddenStems: [
      { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood', number: 2 }
    ] 
  },
  { 
    chinese: '辰', 
    pinyin: 'Chén', 
    animal: 'Dragon', 
    element: 'Earth', 
    number: 5, 
    hourRange: [7, 9], 
    hiddenStems: [
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth', number: 5 },
      { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood', number: 2 },
      { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water', number: 10 }
    ] 
  },
  { 
    chinese: '巳', 
    pinyin: 'Sì', 
    animal: 'Snake', 
    element: 'Fire', 
    number: 6, 
    hourRange: [9, 11], 
    hiddenStems: [
      { chinese: '丙', pinyin: 'Bǐng', element: 'Yang Fire', number: 3 },
      { chinese: '庚', pinyin: 'Gēng', element: 'Yang Metal', number: 7 },
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth', number: 5 }
    ] 
  },
  { 
    chinese: '午', 
    pinyin: 'Wǔ', 
    animal: 'Horse', 
    element: 'Fire', 
    number: 7, 
    hourRange: [11, 13], 
    hiddenStems: [
      { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire', number: 4 },
      { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth', number: 6 }
    ] 
  },
  { 
    chinese: '未', 
    pinyin: 'Wèi', 
    animal: 'Goat', 
    element: 'Earth', 
    number: 8, 
    hourRange: [13, 15], 
    hiddenStems: [
      { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth', number: 6 },
      { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire', number: 4 },
      { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood', number: 2 }
    ] 
  },
  { 
    chinese: '申', 
    pinyin: 'Shēn', 
    animal: 'Monkey', 
    element: 'Metal', 
    number: 9, 
    hourRange: [15, 17], 
    hiddenStems: [
      { chinese: '庚', pinyin: 'Gēng', element: 'Yang Metal', number: 7 },
      { chinese: '壬', pinyin: 'Rén', element: 'Yang Water', number: 9 },
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth', number: 5 }
    ] 
  },
  { 
    chinese: '酉', 
    pinyin: 'Yǒu', 
    animal: 'Rooster', 
    element: 'Metal', 
    number: 10, 
    hourRange: [17, 19], 
    hiddenStems: [
      { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal', number: 8 }
    ] 
  },
  { 
    chinese: '戌', 
    pinyin: 'Xū', 
    animal: 'Dog', 
    element: 'Earth', 
    number: 11, 
    hourRange: [19, 21], 
    hiddenStems: [
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth', number: 5 },
      { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal', number: 8 },
      { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire', number: 4 }
    ] 
  },
  { 
    chinese: '亥', 
    pinyin: 'Hài', 
    animal: 'Pig', 
    element: 'Water', 
    number: 12, 
    hourRange: [21, 23], 
    hiddenStems: [
      { chinese: '壬', pinyin: 'Rén', element: 'Yang Water', number: 9 },
      { chinese: '甲', pinyin: 'Jiǎ', element: 'Yang Wood', number: 1 }
    ] 
  }
];

export const SOLAR_TERMS = [
  { name: 'Lìchūn', chineseName: '立春', meaning: 'Beginning of Spring', degree: 315, type: 'Jié' },
  { name: 'Yǔshuǐ', chineseName: '雨水', meaning: 'Rain Water', degree: 330, type: 'Zhōngqì' },
  { name: 'Jīngzhé', chineseName: '惊蛰', meaning: 'Awakening of Insects', degree: 345, type: 'Jié' },
  { name: 'Chūnfēn', chineseName: '春分', meaning: 'Spring Equinox', degree: 0, type: 'Zhōngqì' },
  { name: 'Qīngmíng', chineseName: '清明', meaning: 'Pure Brightness', degree: 15, type: 'Jié' },
  { name: 'Gǔyǔ', chineseName: '谷雨', meaning: 'Grain Rain', degree: 30, type: 'Zhōngqì' },
  { name: 'Lìxià', chineseName: '立夏', meaning: 'Beginning of Summer', degree: 45, type: 'Jié' },
  { name: 'Xiǎomǎn', chineseName: '小满', meaning: 'Grain Full', degree: 60, type: 'Zhōngqì' },
  { name: 'Mángzhòng', chineseName: '芒种', meaning: 'Grain in Ear', degree: 75, type: 'Jié' },
  { name: 'Xiàzhì', chineseName: '夏至', meaning: 'Summer Solstice', degree: 90, type: 'Zhōngqì' },
  { name: 'Xiǎoshǔ', chineseName: '小暑', meaning: 'Slight Heat', degree: 105, type: 'Jié' },
  { name: 'Dàshǔ', chineseName: '大暑', meaning: 'Great Heat', degree: 120, type: 'Zhōngqì' },
  { name: 'Lìqiū', chineseName: '立秋', meaning: 'Beginning of Autumn', degree: 135, type: 'Jié' },
  { name: 'Chǔshǔ', chineseName: '处暑', meaning: 'Limit of Heat', degree: 150, type: 'Zhōngqì' },
  { name: 'Báilù', chineseName: '白露', meaning: 'White Dew', degree: 165, type: 'Jié' },
  { name: 'Qiūfēn', chineseName: '秋分', meaning: 'Autumn Equinox', degree: 180, type: 'Zhōngqì' },
  { name: 'Hánlù', chineseName: '寒露', meaning: 'Cold Dew', degree: 195, type: 'Jié' },
  { name: 'Shuāngjiàng', chineseName: '霜降', meaning: 'Frost Descent', degree: 210, type: 'Zhōngqì' },
  { name: 'Lìdōng', chineseName: '立冬', meaning: 'Beginning of Winter', degree: 225, type: 'Jié' },
  { name: 'Xiǎoxuě', chineseName: '小雪', meaning: 'Slight Snow', degree: 240, type: 'Zhōngqì' },
  { name: 'Dàxuě', chineseName: '大雪', meaning: 'Great Snow', degree: 255, type: 'Jié' },
  { name: 'Dōngzhì', chineseName: '冬至', meaning: 'Winter Solstice', degree: 270, type: 'Zhōngqì' },
  { name: 'Xiǎohán', chineseName: '小寒', meaning: 'Slight Cold', degree: 285, type: 'Jié' },
  { name: 'Dàhán', chineseName: '大寒', meaning: 'Great Cold', degree: 300, type: 'Zhōngqì' }
];

export const SOLAR_TERM_MONTHS = [
  { term: 'Lìchūn', month: 1, branch: '寅' },
  { term: 'Jīngzhé', month: 2, branch: '卯' },
  { term: 'Qīngmíng', month: 3, branch: '辰' },
  { term: 'Lìxià', month: 4, branch: '巳' },
  { term: 'Mángzhòng', month: 5, branch: '午' },
  { term: 'Xiǎoshǔ', month: 6, branch: '未' },
  { term: 'Lìqiū', month: 7, branch: '申' },
  { term: 'Báilù', month: 8, branch: '酉' },
  { term: 'Hánlù', month: 9, branch: '戌' },
  { term: 'Lìdōng', month: 10, branch: '亥' },
  { term: 'Dàxuě', month: 11, branch: '子' },
  { term: 'Xiǎohán', month: 12, branch: '丑' }
];

export const INTERACTIONS = {
  combinations: [
    { branches: ['子', '丑'], result: 'Earth', pinyin: 'Zǐ-Chǒu', strength: 'Strong' },
    { branches: ['寅', '亥'], result: 'Wood', pinyin: 'Yín-Hài', strength: 'Strong' },
    { branches: ['卯', '戌'], result: 'Fire', pinyin: 'Mǎo-Xū', strength: 'Strong' },
    { branches: ['辰', '酉'], result: 'Metal', pinyin: 'Chén-Yǒu', strength: 'Strong' },
    { branches: ['巳', '申'], result: 'Water', pinyin: 'Sì-Shēn', strength: 'Strong' },
    { branches: ['午', '未'], result: 'Fire', pinyin: 'Wǔ-Wèi', strength: 'Strong' }
  ],
  
  threeHarmonies: [
    { branches: ['申', '子', '辰'], result: 'Water', pinyin: 'Shēn-Zǐ-Chén', strength: 'Strong' },
    { branches: ['亥', '卯', '未'], result: 'Wood', pinyin: 'Hài-Mǎo-Wèi', strength: 'Strong' },
    { branches: ['寅', '午', '戌'], result: 'Fire', pinyin: 'Yín-Wǔ-Xū', strength: 'Strong' },
    { branches: ['巳', '酉', '丑'], result: 'Metal', pinyin: 'Sì-Yǒu-Chǒu', strength: 'Strong' }
  ],
  
  clashes: [
    { branches: ['子', '午'], elements: ['Water', 'Fire'], result: 'Fire weakens Water', strength: 'Strong', pinyin: 'Zǐ-Wǔ' },
    { branches: ['丑', '未'], elements: ['Earth', 'Earth'], result: 'Earth clash - instability', strength: 'Moderate', pinyin: 'Chǒu-Wèi' },
    { branches: ['寅', '申'], elements: ['Wood', 'Metal'], result: 'Metal cuts Wood', strength: 'Strong', pinyin: 'Yín-Shēn' },
    { branches: ['卯', '酉'], elements: ['Wood', 'Metal'], result: 'Metal cuts Wood', strength: 'Strong', pinyin: 'Mǎo-Yǒu' },
    { branches: ['辰', '戌'], elements: ['Earth', 'Earth'], result: 'Earth clash - instability', strength: 'Moderate', pinyin: 'Chén-Xū' },
    { branches: ['巳', '亥'], elements: ['Fire', 'Water'], result: 'Water extinguishes Fire', strength: 'Strong', pinyin: 'Sì-Hài' }
  ],
  
  harms: [
    { branches: ['子', '未'], result: 'Water and Earth harm', strength: 'Moderate', pinyin: 'Zǐ-Wèi' },
    { branches: ['丑', '午'], result: 'Earth and Fire harm', strength: 'Moderate', pinyin: 'Chǒu-Wǔ' },
    { branches: ['寅', '巳'], result: 'Wood and Fire harm', strength: 'Moderate', pinyin: 'Yín-Sì' },
    { branches: ['卯', '辰'], result: 'Wood and Earth harm', strength: 'Moderate', pinyin: 'Mǎo-Chén' },
    { branches: ['申', '亥'], result: 'Metal and Water harm', strength: 'Moderate', pinyin: 'Shēn-Hài' },
    { branches: ['酉', '戌'], result: 'Metal and Earth harm', strength: 'Moderate', pinyin: 'Yǒu-Xū' }
  ],
  
  penalties: {
    selfPenalty: {
      branches: ['辰', '午', '酉', '亥'],
      chinese: '自刑',
      pinyin: 'Zì-Xíng',
      result: 'Self-inflicted harm',
      strength: 'Moderate'
    },
    uncivilizedPenalty: {
      branches: ['子', '卯'],
      chinese: '无礼之刑',
      pinyin: 'Wúlǐ-zhī-Xíng',
      result: 'Relationship troubles',
      strength: 'Moderate'
    },
    threeWayPenalties: [
      { 
        branches: ['寅', '巳', '申'], 
        chinese: '恃势之刑',
        pinyin: 'Shìshì-zhī-Xíng',
        result: 'Power struggle penalty',
        strength: 'Strong'
      },
      { 
        branches: ['丑', '未', '戌'], 
        chinese: '无恩之刑',
        pinyin: 'Wú-rēn-zhī-Xíng',
        result: 'Ungrateful penalty',
        strength: 'Strong'
      }
    ]
  },
  
  destructions: [
    { branches: ['子', '酉'], result: 'Water-Metal destruction', strength: 'Minor', pinyin: 'Zǐ-Yǒu' },
    { branches: ['卯', '午'], result: 'Wood-Fire destruction', strength: 'Minor', pinyin: 'Mǎo-Wǔ' },
    { branches: ['辰', '丑'], result: 'Earth destruction', strength: 'Minor', pinyin: 'Chén-Chǒu' },
    { branches: ['未', '戌'], result: 'Earth destruction', strength: 'Minor', pinyin: 'Wèi-Xū' },
    { branches: ['寅', '亥'], result: 'Wood-Water destruction', strength: 'Minor', pinyin: 'Yín-Hài' },
    { branches: ['巳', '申'], result: 'Fire-Metal destruction', strength: 'Minor', pinyin: 'Sì-Shēn' }
  ]
};

const FIVE_TIGERS_RULE = {
  '甲': { stem: '丙', chinese: '甲己之年丙作首', pinyin: 'Jiǎ-Jǐ zhī nián Bǐng zuò shǒu', translation: 'In Jia or Ji years, Bing starts the months' },
  '己': { stem: '丙', chinese: '甲己之年丙作首', pinyin: 'Jiǎ-Jǐ zhī nián Bǐng zuò shǒu', translation: 'In Jia or Ji years, Bing starts the months' },
  '乙': { stem: '戊', chinese: '乙庚之年戊为头', pinyin: 'Yǐ-Gēng zhī nián Wù wéi tóu', translation: 'In Yi or Geng years, Wu leads the months' },
  '庚': { stem: '戊', chinese: '乙庚之年戊为头', pinyin: 'Yǐ-Gēng zhī nián Wù wéi tóu', translation: 'In Yi or Geng years, Wu leads the months' },
  '丙': { stem: '庚', chinese: '丙辛必定寻庚起', pinyin: 'Bǐng-Xīn bìdìng xún Gēng qǐ', translation: 'In Bing or Xin years, seek Geng to start' },
  '辛': { stem: '庚', chinese: '丙辛必定寻庚起', pinyin: 'Bǐng-Xīn bìdìng xún Gēng qǐ', translation: 'In Bing or Xin years, seek Geng to start' },
  '丁': { stem: '壬', chinese: '丁壬壬位顺流行', pinyin: 'Dīng-Rén Rén wèi shùn liúxíng', translation: 'In Ding or Ren years, Ren flows in order' },
  '壬': { stem: '壬', chinese: '丁壬壬位顺流行', pinyin: 'Dīng-Rén Rén wèi shùn liúxíng', translation: 'In Ding or Ren years, Ren flows in order' },
  '戊': { stem: '甲', chinese: '戊癸之年甲好求', pinyin: 'Wù-Guǐ zhī nián Jiǎ hǎo qiú', translation: 'In Wu or Gui years, Jia is easily found' },
  '癸': { stem: '甲', chinese: '戊癸之年甲好求', pinyin: 'Wù-Guǐ zhī nián Jiǎ hǎo qiú', translation: 'In Wu or Gui years, Jia is easily found' }
};

const FIVE_RATS_RULE = {
  '甲': { stem: '甲', chinese: '甲己还生甲', pinyin: 'Jiǎ-Jǐ hái shēng Jiǎ', translation: 'Jia or Ji day starts with Jia' },
  '己': { stem: '甲', chinese: '甲己还生甲', pinyin: 'Jiǎ-Jǐ hái shēng Jiǎ', translation: 'Jia or Ji day starts with Jia' },
  '乙': { stem: '丙', chinese: '乙庚丙作初', pinyin: 'Yǐ-Gēng Bǐng zuò chū', translation: 'Yi or Geng day begins with Bing' },
  '庚': { stem: '丙', chinese: '乙庚丙作初', pinyin: 'Yǐ-Gēng Bǐng zuò chū', translation: 'Yi or Geng day begins with Bing' },
  '丙': { stem: '戊', chinese: '丙辛从戊起', pinyin: 'Bǐng-Xīn cóng Wù qǐ', translation: 'Bing or Xin day starts from Wu' },
  '辛': { stem: '戊', chinese: '丙辛从戊起', pinyin: 'Bǐng-Xīn cóng Wù qǐ', translation: 'Bing or Xin day starts from Wu' },
  '丁': { stem: '庚', chinese: '丁壬庚子属', pinyin: 'Dīng-Rén Gēng Zǐ shǔ', translation: 'Ding or Ren day belongs to Geng' },
  '壬': { stem: '庚', chinese: '丁壬庚子属', pinyin: 'Dīng-Rén Gēng Zǐ shǔ', translation: 'Ding or Ren day belongs to Geng' },
  '戊': { stem: '壬', chinese: '戊癸何方发', pinyin: 'Wù-Guǐ hé fāng fā', translation: 'Wu or Gui day starts from Ren' },
  '癸': { stem: '壬', chinese: '戊癸何方发', pinyin: 'Wù-Guǐ hé fāng fā', translation: 'Wu or Gui day starts from Ren' }
};

// Core calculation functions
export function calculateJulianDay(year, month, day, hour = 0, minute = 0, second = 0) {
  if (month <= 2) {
    month += 12;
    year -= 1;
  }
  
  const a = Math.floor(year / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (year + 4716));
  const f = Math.floor(30.6001 * (month + 1));
  
  const dayFraction = (hour - 12) / 24 + minute / 1440 + second / 86400;
  const julianDay = c + day + e + f - 1524.5 + dayFraction;
  
  return julianDay;
}

export function calculateLocalSolarTime(utcDate, longitude, timezoneOffset) {
  const tzOffsetHours = timezoneOffset / 60;
  const standardMeridian = 15 * tzOffsetHours;
  const dayOfYear = getDayOfYear(utcDate);
  const equationOfTime = calculateEquationOfTime(dayOfYear);
  const longitudeCorrection = (longitude - standardMeridian) * 4 / 60;
  const totalCorrection = (longitudeCorrection + equationOfTime) * 60 * 60 * 1000;
  const solarTime = new Date(utcDate.getTime() + totalCorrection);
  
  return solarTime;
}

export function calculateEquationOfTime(dayOfYear) {
  const b = 2 * Math.PI * (dayOfYear - 81) / 365;
  const equation = 9.87 * Math.sin(2*b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  return equation / 60;
}

export function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function calculateSolarTerm(year, longitude) {
  const solarTerm = SOLAR_TERMS.find(term => term.degree === longitude);
  
  if (!solarTerm) {
    throw new Error(`Solar term for longitude ${longitude} not found`);
  }
  
  const approxDates = {
    315: { month: 2, day: 4 },
    330: { month: 2, day: 19 },
    345: { month: 3, day: 6 },
    0: { month: 3, day: 21 },
    15: { month: 4, day: 5 },
    30: { month: 4, day: 20 },
    45: { month: 5, day: 6 },
    60: { month: 5, day: 21 },
    75: { month: 6, day: 6 },
    90: { month: 6, day: 21 },
    105: { month: 7, day: 7 },
    120: { month: 7, day: 23 },
    135: { month: 8, day: 8 },
    150: { month: 8, day: 23 },
    165: { month: 9, day: 8 },
    180: { month: 9, day: 23 },
    195: { month: 10, day: 8 },
    210: { month: 10, day: 24 },
    225: { month: 11, day: 8 },
    240: { month: 11, day: 22 },
    255: { month: 12, day: 7 },
    270: { month: 12, day: 22 },
    285: { month: 1, day: 6 },
    300: { month: 1, day: 21 }
  };
  
  const date = approxDates[longitude];
  if (!date) {
    throw new Error(`No approximate date found for longitude ${longitude}`);
  }
  
  return new Date(year, date.month - 1, date.day, 12, 0, 0);
}

export function calculateYearPillar(birthDate, location) {
  const birthYear = birthDate.getFullYear();
  
  // Adjust for Lichun (Beginning of Spring)
  const lichunCurrentYear = calculateSolarTerm(birthYear, 315);
  
  let yearForPillar = birthYear;
  
  // Check if birth date is before Lichun of current year
  if (birthDate < lichunCurrentYear) {
    yearForPillar = birthYear - 1;
  }
  
  // Calculate sexagenary year
  const stemIndex = (yearForPillar - 4) % 10;
  const branchIndex = (yearForPillar - 4) % 12;
  
  const actualStemIndex = stemIndex >= 0 ? stemIndex : (stemIndex + 10);
  const actualBranchIndex = branchIndex >= 0 ? branchIndex : (branchIndex + 12);
  
  const stem = HEAVENLY_STEMS[actualStemIndex];
  const branch = EARTHLY_BRANCHES[actualBranchIndex];
  
  return {
    year: yearForPillar,
    stem: stem,
    branch: branch,
    lichunTime: lichunCurrentYear
  };
}

export function calculateMonthPillar(birthDate, yearPillar, location) {
  const year = birthDate.getFullYear();
  
  // Find which solar term month we're in
  const solarTermDates = SOLAR_TERMS
    .filter(term => term.type === 'Jié')
    .map(term => ({
      term: term.name,
      date: calculateSolarTerm(year, term.degree)
    }));
  
  // Add next year's Lichun to handle year boundary
  solarTermDates.push({
    term: 'Lìchūn',
    date: calculateSolarTerm(year + 1, 315)
  });
  
  // Sort by date to ensure correct order
  solarTermDates.sort((a, b) => a.date - b.date);
  
  // Find which month period we're in
  let monthTermIndex = solarTermDates.findIndex(
    (term, index, array) => {
      return birthDate >= term.date && 
            (index === array.length - 1 || birthDate < array[index + 1].date);
    }
  );
  
  if (monthTermIndex < 0) {
    // Birth date is before the first Jie term of the year
    monthTermIndex = 11; // Previous year's 12th month
  }
  
  const monthInfo = SOLAR_TERM_MONTHS[monthTermIndex % 12];
  const monthBranch = EARTHLY_BRANCHES.find(branch => branch.chinese === monthInfo.branch);
  
  // Calculate month stem based on year stem
  const yearStem = yearPillar.stem.chinese;
  const firstMonthStem = HEAVENLY_STEMS.find(stem => stem.chinese === FIVE_TIGERS_RULE[yearStem].stem);
  
  if (!firstMonthStem) {
    throw new Error(`No first month stem found for year stem ${yearStem}`);
  }
  
  let monthStemIndex = (firstMonthStem.number - 1 + monthInfo.month - 1) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  
  return {
    month: monthInfo.month,
    stem: monthStem,
    branch: monthBranch,
    solarTerm: monthInfo.term
  };
}

export function calculateDayPillar(birthDate, location) {
  // Calculate Julian Day
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const hour = birthDate.getHours();
  const minute = birthDate.getMinutes();
  const second = birthDate.getSeconds();
  
  const julianDay = calculateJulianDay(year, month, day, hour, minute, second);
  
  // Use January 1, 1900 as reference: it was 庚辰 day (Stem 7, Branch 5)
  const referenceJD = 2415021; // Julian Day for Jan 1, 1900
  const referenceStemIndex = 6; // 庚 is the 7th stem (index 6)
  const referenceBranchIndex = 4; // 辰 is the 5th branch (index 4)
  
  // Calculate days since reference
  const daysSinceReference = Math.floor(julianDay - referenceJD);
  
  // Calculate current indices
  let currentStemIndex = (referenceStemIndex + daysSinceReference) % 10;
  let currentBranchIndex = (referenceBranchIndex + daysSinceReference) % 12;
  
  // Ensure positive indices
  if (currentStemIndex < 0) currentStemIndex += 10;
  if (currentBranchIndex < 0) currentBranchIndex += 12;
  
  const stem = HEAVENLY_STEMS[currentStemIndex];
  const branch = EARTHLY_BRANCHES[currentBranchIndex];
  
  return {
    stem: stem,
    branch: branch,
    julianDay: julianDay
  };
}

export function calculateHourPillar(birthDate, dayPillar, location) {
  const hour = birthDate.getHours();
  const minute = birthDate.getMinutes();
  
  // Find hour branch based on time
  let hourBranch = null;
  for (const branch of EARTHLY_BRANCHES) {
    const [start, end] = branch.hourRange;
    
    if (start > end) {
      // Handles Zi hour (23:00-01:00)
      if (hour >= start || hour < end) {
        hourBranch = branch;
        break;
      }
    } else {
      if (hour >= start && hour < end) {
        hourBranch = branch;
        break;
      }
    }
  }
  
  if (!hourBranch) {
    throw new Error(`Hour branch not found for hour: ${hour}`);
  }
  
  // Calculate hour stem based on day stem
  const dayStem = dayPillar.stem.chinese;
  const ziHourStem = HEAVENLY_STEMS.find(stem => stem.chinese === FIVE_RATS_RULE[dayStem].stem);
  
  if (!ziHourStem) {
    throw new Error(`No Zi hour stem found for day stem ${dayStem}`);
  }
  
  const hourBranchIndex = EARTHLY_BRANCHES.findIndex(branch => branch.chinese === hourBranch.chinese);
  let hourStemIndex = (ziHourStem.number - 1 + hourBranchIndex) % 10;
  const hourStem = HEAVENLY_STEMS[hourStemIndex];
  
  return {
    stem: hourStem,
    branch: hourBranch,
    hour: hour,
    minute: minute
  };
}

export function calculateLuckPillars(birthData, gender) {
  const { yearPillar, monthPillar, dayPillar, birthDate, location } = birthData;
  
  // Determine progression direction
  const yearStemYang = yearPillar.stem.number % 2 === 1;
  const isForwardProgression = (gender === 'male' && yearStemYang) || 
                              (gender === 'female' && !yearStemYang);
  
  // Find next or previous Jie term
  const nextJieTerm = findNextJieTerm(birthDate, location, isForwardProgression);
  
  // Calculate days difference
  const birthDateTime = birthDate.getTime();
  const solarTermTime = nextJieTerm.date.getTime();
  const differenceInDays = Math.abs(solarTermTime - birthDateTime) / (1000 * 60 * 60 * 24);
  
  // Calculate starting age (3 days = 1 year)
  const startAge = Math.round(differenceInDays / 3);
  
  const luckPillars = [];
  
  // Get month pillar indices
  const monthStemIndex = HEAVENLY_STEMS.findIndex(stem => 
    stem.chinese === monthPillar.stem.chinese);
  const monthBranchIndex = EARTHLY_BRANCHES.findIndex(branch => 
    branch.chinese === monthPillar.branch.chinese);
  
  // Generate 12 luck pillars
  for (let i = 1; i <= 12; i++) {
    let stemIndex, branchIndex;
    
    if (isForwardProgression) {
      stemIndex = (monthStemIndex + i) % 10;
      branchIndex = (monthBranchIndex + i) % 12;
    } else {
      stemIndex = (monthStemIndex - i + 10) % 10;
      branchIndex = (monthBranchIndex - i + 12) % 12;
    }
    
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];
    
    luckPillars.push({
      startAge: startAge + (i - 1) * 10,
      endAge: startAge + i * 10 - 1,
      stem: stem,
      branch: branch
    });
  }
  
  return luckPillars;
}

export function findNextJieTerm(birthDate, location, isForward) {
  const year = birthDate.getFullYear();
  
  // Get all Jie terms for current and adjacent years
  const jieTerms = [];
  
  // Previous year terms
  for (let y = year - 1; y <= year + 1; y++) {
    SOLAR_TERMS
      .filter(term => term.type === 'Jié')
      .forEach(term => {
        jieTerms.push({
          name: term.name,
          date: calculateSolarTerm(y, term.degree)
        });
      });
  }
  
  // Sort by date
  jieTerms.sort((a, b) => a.date - b.date);
  
  if (isForward) {
    return jieTerms.find(term => term.date > birthDate);
  } else {
    const reversedTerms = [...jieTerms].reverse();
    return reversedTerms.find(term => term.date < birthDate);
  }
}

export function identifyInteractions(baziChart) {
  const { yearPillar, monthPillar, dayPillar, hourPillar, luckPillars } = baziChart;
  
  const mainBranches = [
    yearPillar.branch.chinese,
    monthPillar.branch.chinese,
    dayPillar.branch.chinese,
    hourPillar.branch.chinese
  ];
  
  const allBranches = [...mainBranches];
  if (luckPillars && luckPillars.length > 0) {
    luckPillars.forEach(pillar => {
      allBranches.push(pillar.branch.chinese);
    });
  }
  
  const results = {
    combinations: [],
    threeHarmonies: [],
    clashes: [],
    harms: [],
    penalties: [],
    destructions: []
  };
  
  // Check for combinations
  INTERACTIONS.combinations.forEach(combo => {
    const [branch1, branch2] = combo.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.combinations.push({
        type: 'SixCombination',
        branches: combo.branches,
        result: combo.result,
        strength: combo.strength,
        pinyin: combo.pinyin,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
  // Check for three harmonies
  INTERACTIONS.threeHarmonies.forEach(harmony => {
    const [branch1, branch2, branch3] = harmony.branches;
    const count = allBranches.filter(b => 
      b === branch1 || b === branch2 || b === branch3).length;
    
    if (count >= 2) {
      const pillars = [];
      if (allBranches.includes(branch1)) {
        pillars.push(...findPillarsWithBranch(baziChart, branch1));
      }
      if (allBranches.includes(branch2)) {
        pillars.push(...findPillarsWithBranch(baziChart, branch2));
      }
      if (allBranches.includes(branch3)) {
        pillars.push(...findPillarsWithBranch(baziChart, branch3));
      }
      
      results.threeHarmonies.push({
        type: 'ThreeHarmony',
        branches: harmony.branches,
        result: harmony.result,
        strength: count === 3 ? 'Strong' : 'Moderate',
        pinyin: harmony.pinyin,
        complete: count === 3,
        pillars: pillars
      });
    }
  });
  
  // Check for clashes
  INTERACTIONS.clashes.forEach(clash => {
    const [branch1, branch2] = clash.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.clashes.push({
        type: 'SixClash',
        branches: clash.branches,
        elements: clash.elements,
        result: clash.result,
        strength: clash.strength,
        pinyin: clash.pinyin,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
  // Check for harms
  INTERACTIONS.harms.forEach(harm => {
    const [branch1, branch2] = harm.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.harms.push({
        type: 'SixHarm',
        branches: harm.branches,
        result: harm.result,
        strength: harm.strength,
        pinyin: harm.pinyin,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
  // Check for self-penalties
  INTERACTIONS.penalties.selfPenalty.branches.forEach(branch => {
    const count = allBranches.filter(b => b === branch).length;
    
    if (count >= 2) {
      const pillars = findPillarsWithBranch(baziChart, branch);
      
      results.penalties.push({
        type: 'SelfPenalty',
        branch: branch,
        result: INTERACTIONS.penalties.selfPenalty.result,
        strength: INTERACTIONS.penalties.selfPenalty.strength,
        chinese: INTERACTIONS.penalties.selfPenalty.chinese,
        pinyin: INTERACTIONS.penalties.selfPenalty.pinyin,
        pillars: pillars
      });
    }
  });
  
  // Check for uncivilized penalty
  const [uncivBranch1, uncivBranch2] = INTERACTIONS.penalties.uncivilizedPenalty.branches;
  if (allBranches.includes(uncivBranch1) && allBranches.includes(uncivBranch2)) {
    const pillars1 = findPillarsWithBranch(baziChart, uncivBranch1);
    const pillars2 = findPillarsWithBranch(baziChart, uncivBranch2);
    
    results.penalties.push({
      type: 'UncivilizedPenalty',
      branches: [uncivBranch1, uncivBranch2],
      result: INTERACTIONS.penalties.uncivilizedPenalty.result,
      strength: INTERACTIONS.penalties.uncivilizedPenalty.strength,
      chinese: INTERACTIONS.penalties.uncivilizedPenalty.chinese,
      pinyin: INTERACTIONS.penalties.uncivilizedPenalty.pinyin,
      pillars: [...pillars1, ...pillars2]
    });
  }
  
  // Check for three-way penalties
  INTERACTIONS.penalties.threeWayPenalties.forEach(penalty => {
    const [branch1, branch2, branch3] = penalty.branches;
    
    const presentBranches = [];
    if (allBranches.includes(branch1)) presentBranches.push(branch1);
    if (allBranches.includes(branch2)) presentBranches.push(branch2);
    if (allBranches.includes(branch3)) presentBranches.push(branch3);
    
    if (presentBranches.length >= 2) {
      const pillars = [];
      presentBranches.forEach(branch => {
        pillars.push(...findPillarsWithBranch(baziChart, branch));
      });
      
      results.penalties.push({
        type: 'ThreeWayPenalty',
        branches: penalty.branches,
        presentBranches: presentBranches,
        result: penalty.result,
        strength: presentBranches.length === 3 ? 'Strong' : 'Moderate',
        chinese: penalty.chinese,
        pinyin: penalty.pinyin,
        pillars: pillars
      });
    }
  });
  
  // Check for destructions
  INTERACTIONS.destructions.forEach(destruction => {
    const [branch1, branch2] = destruction.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.destructions.push({
        type: 'Destruction',
        branches: destruction.branches,
        result: destruction.result,
        strength: destruction.strength,
        pinyin: destruction.pinyin,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
  return results;
}

export function findPillarsWithBranch(baziChart, branch) {
  const { yearPillar, monthPillar, dayPillar, hourPillar, luckPillars } = baziChart;
  const pillars = [];
  
  if (yearPillar.branch.chinese === branch) {
    pillars.push({ type: 'year', pillar: yearPillar });
  }
  if (monthPillar.branch.chinese === branch) {
    pillars.push({ type: 'month', pillar: monthPillar });
  }
  if (dayPillar.branch.chinese === branch) {
    pillars.push({ type: 'day', pillar: dayPillar });
  }
  if (hourPillar.branch.chinese === branch) {
    pillars.push({ type: 'hour', pillar: hourPillar });
  }
  
  if (luckPillars && luckPillars.length > 0) {
    luckPillars.forEach((pillar, index) => {
      if (pillar.branch.chinese === branch) {
        pillars.push({ type: 'luck', index: index, pillar: pillar });
      }
    });
  }
  
  return pillars;
}

export function calculateBaziChart(birthDate, location, gender) {
  // Set default location to Beijing if not provided
  const defaultLocation = {
    longitude: 116.4,
    timezone: 8 * 60 // Beijing timezone in minutes
  };
  
  const finalLocation = {
    longitude: location.longitude || defaultLocation.longitude,
    timezone: location.timezone || defaultLocation.timezone
  };
  
  const yearPillar = calculateYearPillar(birthDate, finalLocation);
  const monthPillar = calculateMonthPillar(birthDate, yearPillar, finalLocation);
  const dayPillar = calculateDayPillar(birthDate, finalLocation);
  const hourPillar = calculateHourPillar(birthDate, dayPillar, finalLocation);
  
  const baziChart = {
    birthDate: birthDate,
    location: finalLocation,
    gender: gender,
    yearPillar: yearPillar,
    monthPillar: monthPillar,
    dayPillar: dayPillar,
    hourPillar: hourPillar
  };
  
  baziChart.luckPillars = calculateLuckPillars(baziChart, gender);
  baziChart.interactions = identifyInteractions(baziChart);
  
  return baziChart;
}

// Export additional helper functions for Five Tigers and Five Rats rules
export { FIVE_TIGERS_RULE, FIVE_RATS_RULE };
