/**
 * Calculate Julian Day Number from Gregorian date
 * @param {number} year - The Gregorian year
 * @param {number} month - The Gregorian month (1-12)
 * @param {number} day - The Gregorian day of month
 * @param {number} hour - The hour (0-23)
 * @param {number} minute - The minute (0-59)
 * @param {number} second - The second (0-59)
 * @returns {number} The Julian Day Number
 */
function calculateJulianDay(year, month, day, hour = 0, minute = 0, second = 0) {
  // Adjust month and year for the formula (January and February are considered the 13th and 14th months of the previous year)
  if (month <= 2) {
    month += 12;
    year -= 1;
  }
  
  // Calculate the Julian Day Number
  const a = Math.floor(year / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (year + 4716));
  const f = Math.floor(30.6001 * (month + 1));
  
  // Day fraction from hours, minutes, and seconds
  const dayFraction = (hour - 12) / 24 + minute / 1440 + second / 86400;
  
  // Combine all parts to get the Julian Day Number
  const julianDay = c + day + e + f - 1524.5 + dayFraction;
  
  return julianDay;
}

/**
 * Calculate the local solar time based on actual longitude
 * @param {Date} utcDate - The UTC date and time
 * @param {number} longitude - The longitude of the location
 * @param {number} timezoneOffset - The timezone offset in minutes
 * @returns {Date} The local solar time
 */
function calculateLocalSolarTime(utcDate, longitude, timezoneOffset) {
  // Get the timezone offset in hours
  const tzOffsetHours = timezoneOffset / 60;
  
  // Calculate the standard meridian for the timezone (15° per hour)
  const standardMeridian = 15 * tzOffsetHours;
  
  // Calculate the equation of time (simplified version)
  // In a real implementation, this would be a more complex calculation
  // based on the day of the year and orbital parameters
  const dayOfYear = getDayOfYear(utcDate);
  const equationOfTime = calculateEquationOfTime(dayOfYear);
  
  // Calculate the longitude correction (4 minutes per degree)
  const longitudeCorrection = (longitude - standardMeridian) * 4 / 60; // in hours
  
  // Calculate the total correction in milliseconds
  const totalCorrection = (longitudeCorrection + equationOfTime) * 60 * 60 * 1000;
  
  // Create a new date with the correction applied
  const solarTime = new Date(utcDate.getTime() + totalCorrection);
  
  return solarTime;
}

/**
 * Calculate the equation of time correction (simplified)
 * @param {number} dayOfYear - The day of the year (1-366)
 * @returns {number} The equation of time in hours
 */
function calculateEquationOfTime(dayOfYear) {
  // This is a simplified approximation
  // A proper implementation would use a more accurate formula
  const b = 2 * Math.PI * (dayOfYear - 81) / 365;
  const equation = 9.87 * Math.sin(2*b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  return equation / 60; // Convert from minutes to hours
}

/**
 * Get the day of the year for a given date
 * @param {Date} date - The date
 * @returns {number} The day of the year (1-366)
 */
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Calculate the solar term time for a specific sun longitude
 * @param {number} year - The year to calculate for
 * @param {number} longitude - The sun's longitude in degrees
 * @returns {Date} The date and time of the solar term
 */
function calculateSolarTerm(year, longitude) {
  // This is a placeholder for the actual astronomical calculation
  // For real implementation, this would use Swiss Ephemeris API or similar
  // to get the exact time when the sun reaches the specified longitude
  
  // For now, we'll return an approximate date based on common knowledge
  // This will be replaced by actual API calls or astronomical calculations
  
  // Find the solar term in our array
  const solarTerm = SOLAR_TERMS.find(term => term.degree === longitude);
  
  if (!solarTerm) {
    throw new Error(`Solar term for longitude ${longitude} not found`);
  }
  
  // Approximate dates for solar terms (very rough estimates)
  // In reality, these vary year by year and need precise calculation
  const approxDates = {
    315: { month: 2, day: 4 },  // Lichun (Beginning of Spring)
    330: { month: 2, day: 19 }, // Yushui (Rain Water)
    345: { month: 3, day: 6 },  // Jingzhe (Awakening of Insects)
    0: { month: 3, day: 21 },   // Chunfen (Spring Equinox)
    15: { month: 4, day: 5 },   // Qingming (Pure Brightness)
    30: { month: 4, day: 20 },  // Guyu (Grain Rain)
    45: { month: 5, day: 6 },   // Lixia (Beginning of Summer)
    60: { month: 5, day: 21 },  // Xiaoman (Grain Full)
    75: { month: 6, day: 6 },   // Mangzhong (Grain in Ear)
    90: { month: 6, day: 21 },  // Xiazhi (Summer Solstice)
    105: { month: 7, day: 7 },  // Xiaoshu (Slight Heat)
    120: { month: 7, day: 23 }, // Dashu (Great Heat)
    135: { month: 8, day: 8 },  // Liqiu (Beginning of Autumn)
    150: { month: 8, day: 23 }, // Chushu (Limit of Heat)
    165: { month: 9, day: 8 },  // Bailu (White Dew)
    180: { month: 9, day: 23 }, // Qiufen (Autumn Equinox)
    195: { month: 10, day: 8 }, // Hanlu (Cold Dew)
    210: { month: 10, day: 24 },// Shuangjiang (Frost Descent)
    225: { month: 11, day: 8 }, // Lidong (Beginning of Winter)
    240: { month: 11, day: 22 },// Xiaoxue (Slight Snow)
    255: { month: 12, day: 7 }, // Daxue (Great Snow)
    270: { month: 12, day: 22 },// Dongzhi (Winter Solstice)
    285: { month: 1, day: 6 },  // Xiaohan (Slight Cold)
    300: { month: 1, day: 20 }  // Dahan (Great Cold)
  };
  
  const date = approxDates[longitude];
  return new Date(year, date.month - 1, date.day, 12, 0, 0); // Noon is a reasonable default
}

/**
 * Determine the year pillar based on birth date and Lichun time
 * @param {Date} birthDate - The birth date in local time
 * @param {Object} location - The birth location with latitude and longitude
 * @returns {Object} The year pillar with stem and branch
 */
function calculateYearPillar(birthDate, location) {
  // Get the Gregorian year of birth
  const birthYear = birthDate.getFullYear();
  
  // Calculate Lichun (Start of Spring) for the birth year and previous year
  // Lichun occurs when the sun's longitude reaches 315°
  const lichunCurrentYear = calculateSolarTerm(birthYear, 315);
  const lichunPreviousYear = calculateSolarTerm(birthYear - 1, 315);
  
  // Adjust the birth date for solar time based on location
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60 // Convert timezone hours to minutes
  );
  
  // Determine which year to use based on whether birth is before or after Lichun
  // If birth is before Lichun of the birth year, use previous year
  const yearForPillar = solarBirthTime < lichunCurrentYear ? birthYear - 1 : birthYear;
  
  // Calculate stem index: (Year - 4) % 10
  const stemIndex = (yearForPillar - 4) % 10;
  // Calculate branch index: (Year - 4) % 12
  const branchIndex = (yearForPillar - 4) % 12;
  
  // Handle negative indices (for years before 4 CE)
  const actualStemIndex = stemIndex >= 0 ? stemIndex : (stemIndex + 10);
  const actualBranchIndex = branchIndex >= 0 ? branchIndex : (branchIndex + 12);
  
  // Get the stem and branch
  const stem = HEAVENLY_STEMS[actualStemIndex];
  const branch = EARTHLY_BRANCHES[actualBranchIndex];
  
  return {
    year: yearForPillar,
    stem: stem,
    branch: branch,
    lichunTime: solarBirthTime < lichunCurrentYear ? lichunPreviousYear : lichunCurrentYear
  };
}

/**
 * Determine the month pillar based on solar term and year stem
 * @param {Date} birthDate - The birth date in local time
 * @param {Object} yearPillar - The year pillar with stem and branch
 * @param {Object} location - The birth location with latitude and longitude
 * @returns {Object} The month pillar with stem and branch
 */
function calculateMonthPillar(birthDate, yearPillar, location) {
  // Adjust the birth date for solar time based on location
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  // Find which solar term period the birth date falls in
  // We need to check all Jie terms (the start of each solar month)
  const year = solarBirthTime.getFullYear();
  
  // Get all solar terms for the year
  const solarTermDates = SOLAR_TERMS
    .filter(term => term.type === 'Jie')
    .map(term => ({
      term: term.name,
      date: calculateSolarTerm(year, term.degree)
    }));
  
  // Add Lichun from the next year to complete the cycle
  solarTermDates.push({
    term: 'Lichun',
    date: calculateSolarTerm(year + 1, 315)
  });
  
  // Find which solar term period the birth date falls in
  let monthTermIndex = solarTermDates.findIndex(
    (term, index, array) => {
      // If birth is after this term but before the next term
      return solarBirthTime >= term.date && 
            (index === array.length - 1 || solarBirthTime < array[index + 1].date);
    }
  );
  
  // If not found (should never happen), default to 0 (first month)
  if (monthTermIndex < 0) monthTermIndex = 0;
  
  // Get the month number and branch
  const monthInfo = SOLAR_TERM_MONTHS[monthTermIndex];
  const monthBranch = EARTHLY_BRANCHES.find(branch => branch.chinese === monthInfo.branch);
  
  // Apply the Five Tigers Rule to determine the first month stem
  const yearStem = yearPillar.stem.chinese;
  const firstMonthStem = HEAVENLY_STEMS.find(stem => stem.chinese === FIVE_TIGERS_RULE[yearStem]);
  
  // Calculate month stem by advancing from the first month
  // Each subsequent month gets the next stem in the sequence
  let monthStemIndex = (firstMonthStem.number - 1 + monthInfo.month - 1) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  
  return {
    month: monthInfo.month,
    stem: monthStem,
    branch: monthBranch,
    solarTerm: solarTermDates[monthTermIndex].term
  };
}

/**
 * Determine the day pillar based on the Julian day number
 * @param {Date} birthDate - The birth date
 * @param {Object} location - The birth location with latitude and longitude
 * @returns {Object} The day pillar with stem and branch
 */
function calculateDayPillar(birthDate, location) {
  // Convert to solar time
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  // Extract date parts
  const year = solarBirthTime.getFullYear();
  const month = solarBirthTime.getMonth() + 1; // JavaScript months are 0-based
  const day = solarBirthTime.getDate();
  const hour = solarBirthTime.getHours();
  const minute = solarBirthTime.getMinutes();
  const second = solarBirthTime.getSeconds();
  
  // Calculate the Julian day number at midnight
  // We'll use a reference point method
  const julianDay = calculateJulianDay(year, month, day, hour, minute, second);
  
  // Reference date: January 1, 1900 was a Gengwu (庚午) day, JDN = 2415021
  const referenceJDN = 2415021; // Julian day for Jan 1, 1900
  const referenceIndex = 47;    // Gengwu is the 47th in the 60-day cycle (Geng=7, Wu=7)
  
  // Calculate the sexagenary day index
  let daySexagenaryIndex = Math.floor(julianDay + 0.5) - referenceJDN + referenceIndex;
  daySexagenaryIndex = daySexagenaryIndex % 60;
  if (daySexagenaryIndex < 0) daySexagenaryIndex += 60;
  
  // Convert to stem and branch
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

/**
 * Determine the hour pillar based on the hour and day stem
 * @param {Date} birthDate - The birth date
 * @param {Object} dayPillar - The day pillar with stem and branch
 * @param {Object} location - The birth location with latitude and longitude
 * @returns {Object} The hour pillar with stem and branch
 */
function calculateHourPillar(birthDate, dayPillar, location) {
  // Convert to solar time
  const solarBirthTime = calculateLocalSolarTime(
    birthDate, 
    location.longitude, 
    location.timezone * 60
  );
  
  // Get the hour component
  const hour = solarBirthTime.getHours();
  const minute = solarBirthTime.getMinutes();
  
  // Special handling for Zi hour (23:00-01:00)
  // If birth time is between 23:00-00:00, it technically belongs to the next day's stem
  // We need to adjust for this in a real implementation
  
  // For simplicity here, we'll just determine the hour branch based on the time
  let hourBranch = null;
  for (const branch of EARTHLY_BRANCHES) {
    const [start, end] = branch.hourRange;
    
    // Handle the special case where the hour spans midnight
    if (start > end) { // Like Zi hour: 23-1
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
  
  // Apply the Five Rats Rule to determine the Zi hour stem
  const dayStem = dayPillar.stem.chinese;
  const ziHourStem = HEAVENLY_STEMS.find(stem => stem.chinese === FIVE_RATS_RULE[dayStem]);
  
  // Find the index of the hour branch
  const hourBranchIndex = EARTHLY_BRANCHES.findIndex(branch => branch.chinese === hourBranch.chinese);
  
  // Calculate hour stem by advancing from the Zi hour
  // Each subsequent hour gets the next stem in the sequence
  let hourStemIndex = (ziHourStem.number - 1 + hourBranchIndex) % 10;
  const hourStem = HEAVENLY_STEMS[hourStemIndex];
  
  return {
    stem: hourStem,
    branch: hourBranch,
    hour: hour,
    minute: minute
  };
}

/**
 * Calculate the Ten-Year Luck Pillars
 * @param {Object} birthData - The complete birth data with all pillars
 * @param {string} gender - 'male' or 'female'
 * @returns {Array} The luck pillars with start age and stem-branch
 */
function calculateLuckPillars(birthData, gender) {
  const { yearPillar, monthPillar, dayPillar, birthDate, location } = birthData;
  
  // Determine the direction of luck pillar progression
  // Yang Male or Yin Female: forward progression
  // Yin Male or Yang Female: reverse progression
  const yearStemYang = yearPillar.stem.number % 2 === 1; // Odd numbers are Yang
  const isForwardProgression = (gender === 'male' && yearStemYang) || 
                              (gender === 'female' && !yearStemYang);
  
  // Find the relevant solar term for calculating start age
  const nextJieTerm = findNextJieTerm(birthDate, location, isForwardProgression);
  
  // Calculate days difference between birth and the solar term
  const birthDateTime = birthDate.getTime();
  const solarTermTime = nextJieTerm.date.getTime();
  const differenceInDays = Math.abs(solarTermTime - birthDateTime) / (1000 * 60 * 60 * 24);
  
  // Calculate start age: every 3 days corresponds to 1 year
  // Round to nearest whole or use more precise formula as needed
  const startAge = Math.round(differenceInDays / 3);
  
  // Generate the sequence of luck pillars
  const luckPillars = [];
  
  // Get the month pillar's stem and branch indices
  const monthStemIndex = HEAVENLY_STEMS.findIndex(stem => 
    stem.chinese === monthPillar.stem.chinese);
  const monthBranchIndex = EARTHLY_BRANCHES.findIndex(branch => 
    branch.chinese === monthPillar.branch.chinese);
  
  // Generate 10 luck pillars (covering 100 years)
  for (let i = 0; i < 10; i++) {
    // Calculate the stem and branch for this luck pillar
    let stemIndex, branchIndex;
    
    if (isForwardProgression) {
      // Forward: incrementing from the month pillar
      stemIndex = (monthStemIndex + i) % 10;
      branchIndex = (monthBranchIndex + i) % 12;
    } else {
      // Reverse: decrementing from the month pillar
      stemIndex = (monthStemIndex - i + 10) % 10;
      branchIndex = (monthBranchIndex - i + 12) % 12;
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

/**
 * Find the next or previous Jie term (solar term that starts a month)
 * @param {Date} birthDate - The birth date
 * @param {Object} location - The birth location
 * @param {boolean} isForward - Whether to look forward or backward
 * @returns {Object} The next/previous Jie term with date
 */
function findNextJieTerm(birthDate, location, isForward) {
  // Adjust for solar time
  const solarBirthTime = calculateLocalSolarTime(
    birthDate,
    location.longitude,
    location.timezone * 60
  );
  
  const year = solarBirthTime.getFullYear();
  
  // Get all Jie terms for the year
  const jieTerms = SOLAR_TERMS
    .filter(term => term.type === 'Jie')
    .map(term => ({
      name: term.name,
      date: calculateSolarTerm(year, term.degree)
    }));
  
  // Add Lichun from next year to complete the cycle
  jieTerms.push({
    name: 'Lichun',
    date: calculateSolarTerm(year + 1, 315)
  });
  
  // Add Dahan from previous year (the last Jie of the previous year)
  jieTerms.unshift({
    name: 'Dahan',
    date: calculateSolarTerm(year - 1, 300)
  });
  
  if (isForward) {
    // Find the next Jie term after birth
    return jieTerms.find(term => term.date > solarBirthTime);
  } else {
    // Find the previous Jie term before birth
    // Reverse the array to find the last term before birth
    const reversedTerms = [...jieTerms].reverse();
    return reversedTerms.find(term => term.date < solarBirthTime);
  }
}

/**
 * Identify all interactions between elements in the chart
 * @param {Object} baziChart - The complete BaZi chart
 * @returns {Object} All interactions categorized
 */
function identifyInteractions(baziChart) {
  const { yearPillar, monthPillar, dayPillar, hourPillar, luckPillars } = baziChart;
  
  // Extract all branches in the chart for checking interactions
  const mainBranches = [
    yearPillar.branch.chinese,
    monthPillar.branch.chinese,
    dayPillar.branch.chinese,
    hourPillar.branch.chinese
  ];
  
  // Also include luck pillars' branches if available
  const allBranches = [...mainBranches];
  if (luckPillars && luckPillars.length > 0) {
    luckPillars.forEach(pillar => {
      allBranches.push(pillar.branch.chinese);
    });
  }
  
  // Initialize results object
  const results = {
    combinations: [],
    threeHarmonies: [],
    clashes: [],
    harms: [],
    penalties: [],
    destructions: []
  };
  
  // Check for Six Combinations (Liuhe)
  INTERACTIONS.combinations.forEach(combo => {
    const [branch1, branch2] = combo.branches;
    
    // Check if both branches exist in the chart
    if (allBranches.includes(branch1) && allBranches.includes(branch2)) {
      // Find which pillars contain these branches
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
  
  // Check for Three Harmonies (Sanhe)
  INTERACTIONS.threeHarmonies.forEach(harmony => {
    const [branch1, branch2, branch3] = harmony.branches;
    const count = allBranches.filter(b => 
      b === branch1 || b === branch2 || b === branch3).length;
    
    // If at least two branches from the trinity exist, it's a partial harmony
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
  
  // Check for Six Clashes (Liuchong)
  INTERACTIONS.clashes.forEach(clash => {
    const [branch1, branch2] = clash.branches;
    
    // Check if both branches exist in the chart
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
  
  // Check for Six Harms (Liuhai)
  INTERACTIONS.harms.forEach(harm => {
    const [branch1, branch2] = harm.branches;
    
    // Check if both branches exist in the chart
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
  
  // Check for Penalties (Xing)
  // 1. Self Penalty
  INTERACTIONS.penalties.selfPenalty.forEach(branch => {
    // Count occurrences of this branch
    const count = allBranches.filter(b => b === branch).length;
    
    // If there are at least 2 of the same branch
    if (count >= 2) {
      const pillars = findPillarsWithBranch(baziChart, branch);
      
      results.penalties.push({
        type: 'SelfPenalty',
        branch: branch,
        pillars: pillars
      });
    }
  });
  
  // 2. Uncivilized Penalty (子卯 - Rat and Rabbit)
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
  
  // 3. Three-Way Penalties
  INTERACTIONS.penalties.threeWayPenalties.forEach(penalty => {
    const [branch1, branch2, branch3] = penalty.branches;
    
    // Count how many of these branches are present
    const presentBranches = [];
    if (allBranches.includes(branch1)) presentBranches.push(branch1);
    if (allBranches.includes(branch2)) presentBranches.push(branch2);
    if (allBranches.includes(branch3)) presentBranches.push(branch3);
    
    // If at least 2 branches from the trio exist
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
  
  // Check for Destructions (Po)
  INTERACTIONS.destructions.forEach(destruction => {
    const [branch1, branch2] = destruction.branches;
    
    // Check if both branches exist in the chart
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

/**
 * Find which pillars contain a specific branch
 * @param {Object} baziChart - The BaZi chart
 * @param {string} branch - The branch to find
 * @returns {Array} Array of pillar identifiers
 */
function findPillarsWithBranch(baziChart, branch) {
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
  
  // Also check luck pillars if available
  if (luckPillars && luckPillars.length > 0) {
    luckPillars.forEach((pillar, index) => {
      if (pillar.branch.chinese === branch) {
        pillars.push({ type: 'luck', index: index, pillar: pillar });
      }
    });
  }
  
  return pillars;
}

/**
 * Calculate the complete BaZi chart
 * @param {Date} birthDate - The birth date and time
 * @param {Object} location - The birth location with latitude, longitude, and timezone
 * @param {string} gender - 'male' or 'female'
 * @returns {Object} The complete BaZi chart with all pillars and interactions
 */
function calculateBaziChart(birthDate, location, gender) {
  // 1. Calculate the Year Pillar
  const yearPillar = calculateYearPillar(birthDate, location);
  
  // 2. Calculate the Month Pillar
  const monthPillar = calculateMonthPillar(birthDate, yearPillar, location);
  
  // 3. Calculate the Day Pillar
  const dayPillar = calculateDayPillar(birthDate, location);
  
  // 4. Calculate the Hour Pillar
  const hourPillar = calculateHourPillar(birthDate, dayPillar, location);
  
  // Create the BaZi chart structure
  const baziChart = {
    birthDate: birthDate,
    location: location,
    gender: gender,
    yearPillar: yearPillar,
    monthPillar: monthPillar,
    dayPillar: dayPillar,
    hourPillar: hourPillar
  };
  
  // 5. Calculate the Ten-Year Luck Pillars
  baziChart.luckPillars = calculateLuckPillars(baziChart, gender);
  
  // 6. Identify all interactions between elements
  baziChart.interactions = identifyInteractions(baziChart);
  
  return baziChart;
}

// Export the main functions
module.exports = {
  calculateJulianDay,
  calculateLocalSolarTime,
  calculateBaziChart,
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  SOLAR_TERMS
};/**
 * Five Rats (Wushutu) rule for determining the Hour Stem from Day Stem
 * Maps Day Stem to the Hour Stem of the Zi hour (Rat hour, 11pm-1am)
 */
const FIVE_RATS_RULE = {
  '甲': '甲', // Jia day -> Jia is Zi hour stem
  '己': '甲', // Ji day -> Jia is Zi hour stem
  '乙': '丙', // Yi day -> Bing is Zi hour stem
  '庚': '丙', // Geng day -> Bing is Zi hour stem
  '丙': '戊', // Bing day -> Wu is Zi hour stem
  '辛': '戊', // Xin day -> Wu is Zi hour stem
  '丁': '庚', // Ding day -> Geng is Zi hour stem
  '壬': '庚', // Ren day -> Geng is Zi hour stem
  '戊': '壬', // Wu day -> Ren is Zi hour stem
  '癸': '壬'  // Gui day -> Ren is Zi hour stem
};// Define Solar Terms (24 Jieqi) with their approximate degrees
const SOLAR_TERMS = [
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

// Solar Term Months Mapping
const SOLAR_TERM_MONTHS = [
  { term: 'Lichun', month: 1, branch: '寅' },      // 1st month = Tiger
  { term: 'Jingzhe', month: 2, branch: '卯' },     // 2nd month = Rabbit
  { term: 'Qingming', month: 3, branch: '辰' },    // 3rd month = Dragon
  { term: 'Lixia', month: 4, branch: '巳' },       // 4th month = Snake
  { term: 'Mangzhong', month: 5, branch: '午' },   // 5th month = Horse
  { term: 'Xiaoshu', month: 6, branch: '未' },     // 6th month = Goat
  { term: 'Liqiu', month: 7, branch: '申' },       // 7th month = Monkey
  { term: 'Bailu', month: 8, branch: '酉' },       // 8th month = Rooster
  { term: 'Hanlu', month: 9, branch: '戌' },       // 9th month = Dog
  { term: 'Lidong', month: 10, branch: '亥' },     // 10th month = Pig
  { term: 'Daxue', month: 11, branch: '子' },      // 11th month = Rat
  { term: 'Xiaohan', month: 12, branch: '丑' }     // 12th month = Ox
];

// Define BaZi interactions
const INTERACTIONS = {
  // Six Combinations (Liuhe)
  combinations: [
    { branches: ['子', '丑'], result: 'Earth' },
    { branches: ['寅', '亥'], result: 'Wood' },
    { branches: ['卯', '戌'], result: 'Fire' },
    { branches: ['辰', '酉'], result: 'Metal' },
    { branches: ['巳', '申'], result: 'Water' },
    { branches: ['午', '未'], result: 'Fire' }
  ],
  
  // Three Harmonies (Sanhe)
  threeHarmonies: [
    { branches: ['申', '子', '辰'], result: 'Water' },
    { branches: ['亥', '卯', '未'], result: 'Wood' },
    { branches: ['寅', '午', '戌'], result: 'Fire' },
    { branches: ['巳', '酉', '丑'], result: 'Metal' }
  ],
  
  // Six Clashes (Liuchong)
  clashes: [
    { branches: ['子', '午'] },
    { branches: ['丑', '未'] },
    { branches: ['寅', '申'] },
    { branches: ['卯', '酉'] },
    { branches: ['辰', '戌'] },
    { branches: ['巳', '亥'] }
  ],
  
  // Six Harms (Liuhai)
  harms: [
    { branches: ['子', '未'] },
    { branches: ['丑', '午'] },
    { branches: ['寅', '巳'] },
    { branches: ['卯', '辰'] },
    { branches: ['申', '亥'] },
    { branches: ['酉', '戌'] }
  ],
  
  // Penalties (Xing)
  penalties: {
    selfPenalty: ['辰', '午', '酉', '亥'],
    uncivilizedPenalty: ['子', '卯'],
    threeWayPenalties: [
      { branches: ['寅', '巳', '申'] },  // Tiger, Snake, Monkey
      { branches: ['丑', '未', '戌'] }   // Ox, Goat, Dog
    ]
  },
  
  // Destructions (Po)
  destructions: [
    { branches: ['子', '酉'] },
    { branches: ['卯', '午'] },
    { branches: ['辰', '丑'] },
    { branches: ['未', '戌'] },
    { branches: ['寅', '亥'] },
    { branches: ['巳', '申'] }
  ]
};

/**
 * Five Tigers (Wuhutu) rule for determining the Month Stem from Year Stem
 * Maps Year Stem to the Month Stem of the first month (Tiger month)
 */
const FIVE_TIGERS_RULE = {
  '甲': '丙', // Jia year -> Bing is first month stem
  '己': '丙', // Ji year -> Bing is first month stem
  '乙': '戊', // Yi year -> Wu is first month stem
  '庚': '戊', // Geng year -> Wu is first month stem
  '丙': '庚', // Bing year -> Geng is first month stem
  '辛': '庚', // Xin year -> Geng is first month stem
  '丁': '壬', // Ding year -> Ren is first month stem
  '壬': '壬', // Ren year -> Ren is first month stem
  '戊': '甲', // Wu year -> Jia is first month stem
  '癸': '甲'  // Gui year -> Jia is first month stem
};/**
 * BaZi Calculation Module
 * 
 * This module provides precise calculation of BaZi (Four Pillars) charts based on
 * birth date, time, and location. It uses astronomical calculations for solar terms
 * and implements traditional Chinese astrology rules.
 * 
 * The calculations follow the astronomical (true) positions of the sun for determining
 * solar terms, which is essential for accurate Year and Month pillars. This module also
 * handles time zone adjustments, daylight saving time, and solar time corrections
 * based on longitude.
 */

// Constants
// Define Heavenly Stems with their properties
const HEAVENLY_STEMS = [
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

// Define Earthly Branches with their properties and hour ranges
// Define Earthly Branches with their properties and hour ranges
const EARTHLY_BRANCHES = [
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

window.calcBaziChart = calculateBaziChart;   // makes it callable from the page
js\nwindow.calcBaziChart = calculateBaziChart;\n
