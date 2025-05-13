// lifegraph.js - ES Module Version

// Thai lunar month names and properties
const THAI_LUNAR_MONTHS = [
  { number: 1, thai: 'เดือนอ้าย', transliteration: 'Ai', westernEquiv: 'Dec-Jan' },
  { number: 2, thai: 'เดือนยี่', transliteration: 'Yi', westernEquiv: 'Jan-Feb' },
  { number: 3, thai: 'เดือนสาม', transliteration: 'Sam', westernEquiv: 'Feb-Mar' },
  { number: 4, thai: 'เดือนสี่', transliteration: 'Si', westernEquiv: 'Mar-Apr' },
  { number: 5, thai: 'เดือนห้า', transliteration: 'Ha', westernEquiv: 'Apr-May' },
  { number: 6, thai: 'เดือนหก', transliteration: 'Hok', westernEquiv: 'May-Jun' },
  { number: 7, thai: 'เดือนเจ็ด', transliteration: 'Chet', westernEquiv: 'Jun-Jul' },
  { number: 8, thai: 'เดือนแปด', transliteration: 'Paet', westernEquiv: 'Jul-Aug' },
  { number: 9, thai: 'เดือนเก้า', transliteration: 'Kao', westernEquiv: 'Aug-Sep' },
  { number: 10, thai: 'เดือนสิบ', transliteration: 'Sip', westernEquiv: 'Sep-Oct' },
  { number: 11, thai: 'เดือนสิบเอ็ด', transliteration: 'Sip-Et', westernEquiv: 'Oct-Nov' },
  { number: 12, thai: 'เดือนสิบสอง', transliteration: 'Sip-Song', westernEquiv: 'Nov-Dec' }
];

// Thai zodiac animal cycle
const THAI_ZODIAC_ANIMALS = [
  { number: 1, thai: 'ชวด', animal: 'Rat', element: 'Water' },
  { number: 2, thai: 'ฉลู', animal: 'Ox', element: 'Earth' },
  { number: 3, thai: 'ขาล', animal: 'Tiger', element: 'Wood' },
  { number: 4, thai: 'เถาะ', animal: 'Rabbit', element: 'Wood' },
  { number: 5, thai: 'มะโรง', animal: 'Dragon', element: 'Earth' },
  { number: 6, thai: 'มะเส็ง', animal: 'Snake', element: 'Fire' },
  { number: 7, thai: 'มะเมีย', animal: 'Horse', element: 'Fire' },
  { number: 8, thai: 'มะแม', animal: 'Goat', element: 'Earth' },
  { number: 9, thai: 'วอก', animal: 'Monkey', element: 'Metal' },
  { number: 10, thai: 'ระกา', animal: 'Rooster', element: 'Metal' },
  { number: 11, thai: 'จอ', animal: 'Dog', element: 'Earth' },
  { number: 12, thai: 'กุน', animal: 'Pig', element: 'Water' }
];

// Day of week in Thai system (Sunday = 1)
const THAI_WEEKDAYS = [
  { number: 1, thai: 'อาทิตย์', english: 'Sunday' },
  { number: 2, thai: 'จันทร์', english: 'Monday' },
  { number: 3, thai: 'อังคาร', english: 'Tuesday' },
  { number: 4, thai: 'พุธ', english: 'Wednesday' },
  { number: 5, thai: 'พฤหัสบดี', english: 'Thursday' },
  { number: 6, thai: 'ศุกร์', english: 'Friday' },
  { number: 7, thai: 'เสาร์', english: 'Saturday' }
];

/**
 * Convert Gregorian date to Thai lunar date
 */
function convertToThaiLunarDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  
  let thaiLunarMonth;
  
  if (month === 12 && date.getDate() > 15) thaiLunarMonth = 1;
  else if (month === 1 && date.getDate() <= 15) thaiLunarMonth = 1;
  else if (month === 1 && date.getDate() > 15) thaiLunarMonth = 2;
  else if (month === 2 && date.getDate() <= 15) thaiLunarMonth = 2;
  else thaiLunarMonth = month - 1;
  
  const isAfterThaiNewYear = month > 4 || (month === 4 && date.getDate() >= 13);
  const thaiYear = isAfterThaiNewYear ? year + 543 : year + 542;
  
  const animalYearIndex = (year - 4) % 12;
  const animalYear = THAI_ZODIAC_ANIMALS[animalYearIndex >= 0 ? animalYearIndex : animalYearIndex + 12];
  
  return {
    month: THAI_LUNAR_MONTHS[thaiLunarMonth - 1],
    animal: animalYear,
    year: thaiYear,
    westernYear: year
  };
}

/**
 * Get the day of the week number (Sunday = 1, Monday = 2, etc.)
 */
function getThaiWeekday(date) {
  const jsDay = date.getDay();
  const thaiDayNumber = jsDay + 1;
  return THAI_WEEKDAYS[jsDay];
}

/**
 * Map the 12 columns to a person's lifespan
 */
function mapColumnsToLifespan(columns, birthDate) {
  const birthYear = birthDate.getFullYear();
  const lifeGraph = [];
  
  for (let age = 1; age <= 120; age++) {
    const columnIndex = (age - 1) % 12;
    const year = birthYear + age;
    
    lifeGraph.push({
      age: age,
      year: year,
      value: columns[columnIndex].sum,
      column: columnIndex + 1
    });
  }
  
  return lifeGraph;
}

/**
 * Calculate the life graph based on Thai astrology
 * Returns a simple array for compatibility with app.js
 */
export function calculateLifeGraph(birthDate) {
  // Step 1: Determine the day of week (1-7)
  const weekday = getThaiWeekday(birthDate);
  const weekdayNumber = weekday.number;
  
  // Step 2: Convert to Thai lunar calendar to get month and year
  const thaiDate = convertToThaiLunarDate(birthDate);
  const lunarMonthNumber = thaiDate.month.number;
  const animalYearNumber = thaiDate.animal.number;
  
  // Step 3: Generate the 12 columns
  const columns = [];
  
  for (let i = 0; i < 12; i++) {
    const monthValue = ((lunarMonthNumber + i - 1) % 12) + 1;
    const yearValue = ((animalYearNumber + i - 1) % 12) + 1;
    const dayValue = ((weekdayNumber + i - 1) % 7) + 1;
    
    let sum = dayValue + monthValue + yearValue;
    
    while (sum > 12) {
      sum -= 12;
    }
    
    columns.push({
      column: i + 1,
      weekday: dayValue,
      month: monthValue,
      year: yearValue,
      sum: sum
    });
  }
  
  // Step 4: Map these values to ages and years
  const lifeGraph = mapColumnsToLifespan(columns, birthDate);
  
  // Return simplified array for app.js compatibility
  // Each item has value property which is a percentage (0-100)
  return lifeGraph.map(point => ({
    ...point,
    value: (point.value / 12) * 100 // Convert to percentage for graph display
  }));
}

/**
 * Interpret the life graph
 * This is exported separately for app.js to use
 */
export function interpretLifeGraph(lifeGraph) {
  // Convert percentage values back to 1-12 scale for interpretation
  const interpretableGraph = lifeGraph.map(point => ({
    ...point,
    value: Math.round((point.value / 100) * 12)
  }));
  
  // Find peaks (values 10-12)
  const peaks = interpretableGraph.filter(point => point.value >= 10);
  
  // Find valleys (values 1-3)
  const valleys = interpretableGraph.filter(point => point.value <= 3);
  
  // Find transitions
  const transitions = [];
  for (let i = 1; i < interpretableGraph.length - 1; i++) {
    const prev = interpretableGraph[i-1].value;
    const current = interpretableGraph[i].value;
    const next = interpretableGraph[i+1].value;
    
    if ((current > prev && current > next) || (current < prev && current < next)) {
      transitions.push(interpretableGraph[i]);
    }
  }
  
  // Create interpretation text
  let interpretation = `Based on your Thai Life Graph:\n\n`;
  
  if (peaks.length > 0) {
    interpretation += `Peak fortune periods at ages: ${peaks.slice(0, 5).map(p => p.age).join(', ')}\n`;
  }
  
  if (valleys.length > 0) {
    interpretation += `Challenging periods at ages: ${valleys.slice(0, 5).map(v => v.age).join(', ')}\n`;
  }
  
  interpretation += `\nValue meanings:\n`;
  interpretation += `1-3: Challenging periods requiring caution\n`;
  interpretation += `4-6: Moderate periods with steady progress\n`;
  interpretation += `7-9: Good fortune and opportunities\n`;
  interpretation += `10-12: Peak periods for success and prosperity`;
  
  return interpretation;
}

// Export constants if needed by other modules
export {
  THAI_LUNAR_MONTHS,
  THAI_ZODIAC_ANIMALS,
  THAI_WEEKDAYS
};
