// BaZi ES Module - Corrected and Complete for Test Environment

// Constants
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
    hiddenStems: [{ chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water', number: 10 }]
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
    hiddenStems: [{ chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood', number: 2 }]
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
    hiddenStems: [{ chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal', number: 8 }]
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
  { name: 'Lichun', chineseName: '立春', meaning: 'Beginning of Spring', degree: 315, type: 'Jie' },
  { name: 'Yushui', chineseName: '雨水', meaning: 'Rain Water', degree: 330, type: 'Zhongqi' },
  { name: 'Jingzhe', chineseName: '惊蛰', meaning: 'Awakening of Insects', degree: 345, type: 'Jie' },
  { name: 'Chunfen', chineseName: '春分', meaning: 'Spring Equinox', degree: 0, type: 'Zhongqi' },
  { name: 'Qingming', chineseName: '清明', meaning: 'Pure Brightness', degree: 15, type: 'Jie' },
  { name: 'Guyu', chineseName: '谷雨', meaning: 'Grain Rain', degree: 30, type: 'Zhongqi' },
  { name: 'Lixia', chineseName: '立夏', meaning: 'Beginning of Summer', degree: 45, type: 'Jie' },
  { name: 'Xiaoman', chineseName: '小满', meaning: 'Grain Full', degree: 60, type: 'Zhongqi' },
  { name: 'Mangzhong', chineseName: '芒种', meaning: 'Grain in Ear', degree: 75, type: 'Jie' },
  { name: 'Xiazhi', chineseName: '夏至', meaning: 'Summer Solstice', degree: 90, type: 'Zhongqi' },
  { name: 'Xiaoshu', chineseName: '小暑', meaning: 'Slight Heat', degree: 105, type: 'Jie' },
  { name: 'Dashu', chineseName: '大暑', meaning: 'Great Heat', degree: 120, type: 'Zhongqi' },
  { name: 'Liqiu', chineseName: '立秋', meaning: 'Beginning of Autumn', degree: 135, type: 'Jie' },
  { name: 'Chushu', chineseName: '处暑', meaning: 'Limit of Heat', degree: 150, type: 'Zhongqi' },
  { name: 'Bailu', chineseName: '白露', meaning: 'White Dew', degree: 165, type: 'Jie' },
  { name: 'Qiufen', chineseName: '秋分', meaning: 'Autumn Equinox', degree: 180, type: 'Zhongqi' },
  { name: 'Hanlu', chineseName: '寒露', meaning: 'Cold Dew', degree: 195, type: 'Jie' },
  { name: 'Shuangjiang', chineseName: '霜降', meaning: 'Frost Descent', degree: 210, type: 'Zhongqi' },
  { name: 'Lidong', chineseName: '立冬', meaning: 'Beginning of Winter', degree: 225, type: 'Jie' },
  { name: 'Xiaoxue', chineseName: '小雪', meaning: 'Slight Snow', degree: 240, type: 'Zhongqi' },
  { name: 'Daxue', chineseName: '大雪', meaning: 'Great Snow', degree: 255, type: 'Jie' },
  { name: 'Dongzhi', chineseName: '冬至', meaning: 'Winter Solstice', degree: 270, type: 'Zhongqi' },
  { name: 'Xiaohan', chineseName: '小寒', meaning: 'Slight Cold', degree: 285, type: 'Jie' },
  { name: 'Dahan', chineseName: '大寒', meaning: 'Great Cold', degree: 300, type: 'Zhongqi' }
];

export const SOLAR_TERM_MONTHS = [
  { term: 'Lichun', month: 1, branch: '寅' },
  { term: 'Jingzhe', month: 2, branch: '卯' },
  { term: 'Qingming', month: 3, branch: '辰' },
  { term: 'Lixia', month: 4, branch: '巳' },
  { term: 'Mangzhong', month: 5, branch: '午' },
  { term: 'Xiaoshu', month: 6, branch: '未' },
  { term: 'Liqiu', month: 7, branch: '申' },
  { term: 'Bailu', month: 8, branch: '酉' },
  { term: 'Hanlu', month: 9, branch: '戌' },
  { term: 'Lidong', month: 10, branch: '亥' },
  { term: 'Daxue', month: 11, branch: '子' },
  { term: 'Xiaohan', month: 12, branch: '丑' }
];

export const INTERACTIONS = {
  combinations: [
    { branches: ['子', '丑'], result: 'Earth' },
    { branches: ['寅', '亥'], result: 'Wood' },
    { branches: ['卯', '戌'], result: 'Fire' },
    { branches: ['辰', '酉'], result: 'Metal' },
    { branches: ['巳', '申'], result: 'Water' },
    { branches: ['午', '未'], result: 'Fire' }
  ],
  
  threeHarmonies: [
    { branches: ['申', '子', '辰'], result: 'Water' },
    { branches: ['亥', '卯', '未'], result: 'Wood' },
    { branches: ['寅', '午', '戌'], result: 'Fire' },
    { branches: ['巳', '酉', '丑'], result: 'Metal' }
  ],
  
  clashes: [
    { branches: ['子', '午'] },
    { branches: ['丑', '未'] },
    { branches: ['寅', '申'] },
    { branches: ['卯', '酉'] },
    { branches: ['辰', '戌'] },
    { branches: ['巳', '亥'] }
  ],
  
  harms: [
    { branches: ['子', '未'] },
    { branches: ['丑', '午'] },
    { branches: ['寅', '巳'] },
    { branches: ['卯', '辰'] },
    { branches: ['申', '亥'] },
    { branches: ['酉', '戌'] }
  ],
  
  penalties: {
    selfPenalty: ['辰', '午', '酉', '亥'],
    uncivilizedPenalty: ['子', '卯'],
    threeWayPenalties: [
      { branches: ['寅', '巳', '申'] },
      { branches: ['丑', '未', '戌'] }
    ]
  },
  
  destructions: [
    { branches: ['子', '酉'] },
    { branches: ['卯', '午'] },
    { branches: ['辰', '丑'] },
    { branches: ['未', '戌'] },
    { branches: ['寅', '亥'] },
    { branches: ['巳', '申'] }
  ]
};

const FIVE_TIGERS_RULE = {
  '甲': '丙', '己': '丙',
  '乙': '戊', '庚': '戊',
  '丙': '庚', '辛': '庚',
  '丁': '壬', '壬': '壬',
  '戊': '甲', '癸': '甲'
};

const FIVE_RATS_RULE = {
  '甲': '甲', '己': '甲',
  '乙': '丙', '庚': '丙',
  '丙': '戊', '辛': '戊',
  '丁': '庚', '壬': '庚',
  '戊': '壬', '癸': '壬'
};

// Export all calculation functions
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
    300: { month: 1, day: 20 }
  };
  
  const date = approxDates[longitude];
  return new Date(year, date.month - 1, date.day, 12, 0, 0);
}

export function calculateYearPillar(birthDate, location) {
  const birthYear = birthDate.getFullYear();
  const lichunCurrentYear = calculateSolarTerm(birthYear, 315);
  const lichunPreviousYear = calculateSolarTerm(birthYear - 1, 315);
  
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  const yearForPillar = solarBirthTime < lichunCurrentYear ? birthYear - 1 : birthYear;
  
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
    lichunTime: solarBirthTime < lichunCurrentYear ? lichunPreviousYear : lichunCurrentYear
  };
}

export function calculateMonthPillar(birthDate, yearPillar, location) {
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  const year = solarBirthTime.getFullYear();
  
  const solarTermDates = SOLAR_TERMS
    .filter(term => term.type === 'Jie')
    .map(term => ({
      term: term.name,
      date: calculateSolarTerm(year, term.degree)
    }));
  
  solarTermDates.push({
    term: 'Lichun',
    date: calculateSolarTerm(year + 1, 315)
  });
  
  let monthTermIndex = solarTermDates.findIndex(
    (term, index, array) => {
      return solarBirthTime >= term.date && 
            (index === array.length - 1 || solarBirthTime < array[index + 1].date);
    }
  );
  
  if (monthTermIndex < 0) monthTermIndex = 0;
  
  const monthInfo = SOLAR_TERM_MONTHS[monthTermIndex];
  const monthBranch = EARTHLY_BRANCHES.find(branch => branch.chinese === monthInfo.branch);
  
  const yearStem = yearPillar.stem.chinese;
  const firstMonthStem = HEAVENLY_STEMS.find(stem => stem.chinese === FIVE_TIGERS_RULE[yearStem]);
  
  let monthStemIndex = (firstMonthStem.number - 1 + monthInfo.month - 1) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  
  return {
    month: monthInfo.month,
    stem: monthStem,
    branch: monthBranch,
    solarTerm: solarTermDates[monthTermIndex].term
  };
}

export function calculateDayPillar(birthDate, location) {
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  const year = solarBirthTime.getFullYear();
  const month = solarBirthTime.getMonth() + 1;
  const day = solarBirthTime.getDate();
  const hour = solarBirthTime.getHours();
  const minute = solarBirthTime.getMinutes();
  const second = solarBirthTime.getSeconds();
  
  const julianDay = calculateJulianDay(year, month, day, hour, minute, second);
  
  const referenceJDN = 2415021;
  const referenceIndex = 47;
  
  let daySexagenaryIndex = Math.floor(julianDay + 0.5) - referenceJDN + referenceIndex;
  daySexagenaryIndex = daySexagenaryIndex % 60;
  if (daySexagenaryIndex < 0) daySexagenaryIndex += 60;
  
  const stemIndex = daySexagenaryIndex % 10;
  const branchIndex = daySexagenaryIndex % 12;
  
  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex];
  
  return {
    stem: stem,
    branch: branch,
    julianDay: julianDay
  };
}

export function calculateHourPillar(birthDate, dayPillar, location) {
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  const hour = solarBirthTime.getHours();
  const minute = solarBirthTime.getMinutes();
  
  let hourBranch = null;
  for (const branch of EARTHLY_BRANCHES) {
    const [start, end] = branch.hourRange;
    
    if (start > end) {
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
  
  const dayStem = dayPillar.stem.chinese;
  const ziHourStem = HEAVENLY_STEMS.find(stem => stem.chinese === FIVE_RATS_RULE[dayStem]);
  
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
  
  const yearStemYang = yearPillar.stem.number % 2 === 1;
  const isForwardProgression = (gender === 'male' && yearStemYang) || 
                              (gender === 'female' && !yearStemYang);
  
  const nextJieTerm = findNextJieTerm(birthDate, location, isForwardProgression);
  
  const birthDateTime = birthDate.getTime();
  const solarTermTime = nextJieTerm.date.getTime();
  const differenceInDays = Math.abs(solarTermTime - birthDateTime) / (1000 * 60 * 60 * 24);
  
  const startAge = Math.round(differenceInDays / 3);
  
  const luckPillars = [];
  
  const monthStemIndex = HEAVENLY_STEMS.findIndex(stem => 
    stem.chinese === monthPillar.stem.chinese);
  const monthBranchIndex = EARTHLY_BRANCHES.findIndex(branch => 
    branch.chinese === monthPillar.branch.chinese);
  
  for (let i = 0; i < 10; i++) {
    let stemIndex, branchIndex;
    
    if (isForward) {
    return jieTerms.find(term => term.date > solarBirthTime);
  } else {
    const reversedTerms = [...jieTerms].reverse();
    return reversedTerms.find(term => term.date < solarBirthTime);
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
  
  INTERACTIONS.combinations.forEach(combo => {
    const [branch1, branch2] = combo.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.combinations.push({
        type: 'SixCombination',
        branches: combo.branches,
        result: combo.result,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
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
        complete: count === 3,
        pillars: pillars
      });
    }
  });
  
  INTERACTIONS.clashes.forEach(clash => {
    const [branch1, branch2] = clash.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.clashes.push({
        type: 'SixClash',
        branches: clash.branches,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
  INTERACTIONS.harms.forEach(harm => {
    const [branch1, branch2] = harm.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.harms.push({
        type: 'SixHarm',
        branches: harm.branches,
        pillars: [...pillars1, ...pillars2]
      });
    }
  });
  
  INTERACTIONS.penalties.selfPenalty.forEach(branch => {
    const count = allBranches.filter(b => b === branch).length;
    
    if (count >= 2) {
      const pillars = findPillarsWithBranch(baziChart, branch);
      
      results.penalties.push({
        type: 'SelfPenalty',
        branch: branch,
        pillars: pillars
      });
    }
  });
  
  const [uncivBranch1, uncivBranch2] = INTERACTIONS.penalties.uncivilizedPenalty;
  if (allBranches.includes(uncivBranch1) && allBranches.includes(uncivBranch2)) {
    const pillars1 = findPillarsWithBranch(baziChart, uncivBranch1);
    const pillars2 = findPillarsWithBranch(baziChart, uncivBranch2);
    
    results.penalties.push({
      type: 'UncivilizedPenalty',
      branches: [uncivBranch1, uncivBranch2],
      pillars: [...pillars1, ...pillars2]
    });
  }
  
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
        pillars: pillars
      });
    }
  });
  
  INTERACTIONS.destructions.forEach(destruction => {
    const [branch1, branch2] = destruction.branches;
    
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      const pillars1 = findPillarsWithBranch(baziChart, branch1);
      const pillars2 = findPillarsWithBranch(baziChart, branch2);
      
      results.destructions.push({
        type: 'Destruction',
        branches: destruction.branches,
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
  const yearPillar = calculateYearPillar(birthDate, location);
  const monthPillar = calculateMonthPillar(birthDate, yearPillar, location);
  const dayPillar = calculateDayPillar(birthDate, location);
  const hourPillar = calculateHourPillar(birthDate, dayPillar, location);
  
  const baziChart = {
    birthDate: birthDate,
    location: location,
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

// Export a test function that displays the constants correctly
export function displayConstants() {
  const html = `
    <h3>BaZi Constants</h3>
    <h4>Heavenly Stems (天干)</h4>
    <table>
      <tr><th>Chinese</th><th>Pinyin</th><th>Element</th><th>Number</th></tr>
      ${HEAVENLY_STEMS.map(stem => `
        <tr>
          <td class="chinese-text">${stem.chinese}</td>
          <td>${stem.pinyin}</td>
          <td>${stem.element}</td>
          <td>${stem.number}</td>
        </tr>
      `).join('')}
    </table>
    
    <h4>Earthly Branches (地支)</h4>
    <table>
      <tr><th>Chinese</th><th>Pinyin</th><th>Animal</th><th>Element</th><th>Number</th><th>Hour Range</th></tr>
      ${EARTHLY_BRANCHES.map(branch => `
        <tr>
          <td class="chinese-text">${branch.chinese}</td>
          <td>${branch.pinyin}</td>
          <td>${branch.animal}</td>
          <td>${branch.element}</td>
          <td>${branch.number}</td>
          <td>${branch.hourRange[0]}:00-${branch.hourRange[1]}:00</td>
        </tr>
      `).join('')}
    </table>
    
    <h4>Solar Terms (节气)</h4>
    <table>
      <tr><th>Name</th><th>Chinese</th><th>Meaning</th><th>Degree</th><th>Type</th></tr>
      ${SOLAR_TERMS.map(term => `
        <tr>
          <td>${term.name}</td>
          <td class="chinese-text">${term.chineseName}</td>
          <td>${term.meaning}</td>
          <td>${term.degree}°</td>
          <td>${term.type}</td>
        </tr>
      `).join('')}
    </table>
  `;
  
  return html;
}dProgression) {
      stemIndex = (monthStemIndex + i + 1) % 10;
      branchIndex = (monthBranchIndex + i + 1) % 12;
    } else {
      stemIndex = (monthStemIndex - i - 1 + 10) % 10;
      branchIndex = (monthBranchIndex - i - 1 + 12) % 12;
    }
    
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];
    
    luckPillars.push({
      startAge: startAge + i * 10,
      endAge: startAge + (i + 1) * 10 - 1,
      stem: stem,
      branch: branch
    });
  }
  
  return luckPillars;
}

export function findNextJieTerm(birthDate, location, isForward) {
  const solarBirthTime = calculateLocalSolarTime(
    birthDate,
    location.longitude,
    location.timezone * 60
  );
  
  const year = solarBirthTime.getFullYear();
  
  const jieTerms = SOLAR_TERMS
    .filter(term => term.type === 'Jie')
    .map(term => ({
      name: term.name,
      date: calculateSolarTerm(year, term.degree)
    }));
  
  jieTerms.push({
    name: 'Lichun',
    date: calculateSolarTerm(year + 1, 315)
  });
  
  jieTerms.unshift({
    name: 'Xiaohan',
    date: calculateSolarTerm(year - 1, 285)
  });
  
  jieTerms.sort((a, b) => a.date - b.date);
  
  if (isForwar
