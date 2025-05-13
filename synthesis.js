// synthesis.js - Cross-System Synthesis Module

// Import necessary constants from other modules
import { INTERACTIONS } from './bazi.js';

// Define influence categories
const INFLUENCE_CATEGORIES = {
  FORTUNATE: 'fortunate',
  CHALLENGING: 'challenging',
  TRANSFORMATIVE: 'transformative',
  NEUTRAL: 'neutral',
  CAREER: 'career',
  RELATIONSHIP: 'relationship',
  HEALTH: 'health',
  WEALTH: 'wealth',
  SPIRITUAL: 'spiritual',
  FAMILY: 'family'
};

// Define overlap thresholds
const OVERLAP_THRESHOLD = {
  TWO_SYSTEMS: 2,
  THREE_SYSTEMS: 3,
  FOUR_SYSTEMS: 4
};

// Define element relationships for BaZi analysis
const ELEMENT_RELATIONSHIPS = {
  Wood: { generates: 'Fire', controlledBy: 'Metal', controls: 'Earth' },
  Fire: { generates: 'Earth', controlledBy: 'Water', controls: 'Metal' },
  Earth: { generates: 'Metal', controlledBy: 'Wood', controls: 'Water' },
  Metal: { generates: 'Water', controlledBy: 'Fire', controls: 'Wood' },
  Water: { generates: 'Wood', controlledBy: 'Earth', controls: 'Fire' }
};

/**
 * Main synthesis function
 * @param {Object} baziChart - Calculated BaZi chart
 * @param {Array} lifeGraph - Life graph data
 * @param {Object} vedicChart - Vedic chart with houses
 * @param {Array} transits - Planetary transits
 * @returns {Object} Complete synthesis analysis
 */
export function analyzeSynthesis(baziChart, lifeGraph, vedicChart, transits) {
  // Extract baseline character analysis
  const character = analyzeBaselineCharacter(baziChart, lifeGraph, vedicChart);
  
  // Extract time-based influences from each system
  const baziInfluences = extractBaZiInfluences(baziChart);
  const lifeGraphInfluences = extractLifeGraphInfluences(lifeGraph, baziChart.birthDate);
  const transitInfluences = extractTransitInfluences(transits, vedicChart);
  const chineseCalendarInfluences = extractChineseCalendarInfluences(baziChart);
  
  // Combine all influences into a timeline
  const allInfluences = [
    ...baziInfluences,
    ...lifeGraphInfluences,
    ...transitInfluences,
    ...chineseCalendarInfluences
  ];
  
  // Group influences by time period
  const groupedInfluences = groupInfluencesByPeriod(allInfluences);
  
  // Identify convergence periods
  const convergencePeriods = identifyConvergencePeriods(groupedInfluences);
  
  // Extract major life themes
  const lifeThemes = extractLifeThemes(character, convergencePeriods);
  
  // Identify significant periods
  const significantPeriods = identifySignificantPeriods(convergencePeriods);
  
  return {
    character,
    lifeThemes,
    significantPeriods,
    convergencePeriods,
    timeline: groupedInfluences
  };
}

/**
 * Analyze baseline character from birth charts
 */
function analyzeBaselineCharacter(baziChart, lifeGraph, vedicChart) {
  const character = {
    elements: analyzeElementBalance(baziChart),
    strengths: [],
    challenges: [],
    description: ''
  };
  
  // BaZi character analysis
  const dayMaster = baziChart.dayPillar.stem.element;
  character.strengths.push(`Day Master: ${dayMaster}`);
  
  // Check element balance
  if (character.elements.balanced) {
    character.strengths.push('Balanced element composition');
  } else {
    character.challenges.push(`Imbalanced elements: ${character.elements.dominant} is too strong`);
  }
  
  // Life Graph initial value
  const initialLifeValue = lifeGraph[0].value;
  if (initialLifeValue >= 70) {
    character.strengths.push('Strong initial life fortune');
  } else if (initialLifeValue <= 30) {
    character.challenges.push('Challenging early life circumstances');
  }
  
  // Vedic ascendant
  character.ascendant = vedicChart.ascendantSign;
  character.strengths.push(`${vedicChart.ascendantSign} Ascendant`);
  
  // Generate description
  character.description = generateCharacterDescription(character);
  
  return character;
}

/**
 * Extract BaZi influences
 */
function extractBaZiInfluences(baziChart) {
  const influences = [];
  
  // Luck pillars
  baziChart.luckPillars.forEach(pillar => {
    const startDate = new Date(baziChart.birthDate);
    startDate.setFullYear(startDate.getFullYear() + pillar.startAge);
    
    const endDate = new Date(baziChart.birthDate);
    endDate.setFullYear(endDate.getFullYear() + pillar.endAge);
    
    const nature = analyzePillarNature(pillar, baziChart);
    
    influences.push({
      system: 'BaZi',
      type: 'Luck Pillar',
      startDate,
      endDate,
      description: `${pillar.stem.element} ${pillar.branch.animal} period`,
      nature: nature.category,
      categories: nature.categories,
      strength: nature.strength,
      details: nature.details
    });
  });
  
  // Annual pillars
  for (let year = 0; year <= 120; year++) {
    const yearDate = new Date(baziChart.birthDate);
    yearDate.setFullYear(yearDate.getFullYear() + year);
    
    const annualPillar = calculateAnnualPillar(yearDate);
    const nature = analyzeAnnualInfluence(annualPillar, baziChart);
    
    influences.push({
      system: 'BaZi',
      type: 'Annual Pillar',
      startDate: yearDate,
      endDate: new Date(yearDate.getFullYear(), 11, 31),
      description: `Annual ${annualPillar.stem.element} ${annualPillar.branch.animal}`,
      nature: nature.category,
      categories: nature.categories,
      strength: nature.strength,
      details: nature.details
    });
  }
  
  return influences;
}

/**
 * Extract Life Graph influences
 */
function extractLifeGraphInfluences(lifeGraph, birthDate) {
  const influences = [];
  
  lifeGraph.forEach(point => {
    const yearDate = new Date(birthDate);
    yearDate.setFullYear(yearDate.getFullYear() + point.age - 1);
    
    let category = INFLUENCE_CATEGORIES.NEUTRAL;
    let description = '';
    const normalizedValue = point.value / 100; // Normalize to 0-1
    
    if (normalizedValue >= 0.833) { // Value 10-12 on original scale
      category = INFLUENCE_CATEGORIES.FORTUNATE;
      description = 'Peak fortune period';
    } else if (normalizedValue <= 0.25) { // Value 1-3 on original scale
      category = INFLUENCE_CATEGORIES.CHALLENGING;
      description = 'Challenging period requiring caution';
    } else if (normalizedValue >= 0.583) { // Value 7-9 on original scale
      category = INFLUENCE_CATEGORIES.FORTUNATE;
      description = 'Good fortune period';
    }
    
    const areaFocus = getLifeGraphAreaFocus(Math.round(normalizedValue * 12));
    
    influences.push({
      system: 'Thai Life Graph',
      type: 'Annual Fortune',
      startDate: yearDate,
      endDate: new Date(yearDate.getFullYear(), 11, 31),
      description: `Life Graph value ${Math.round(normalizedValue * 12)}: ${description}`,
      nature: category,
      categories: [category, ...areaFocus],
      strength: normalizedValue,
      details: {
        value: Math.round(normalizedValue * 12),
        age: point.age
      }
    });
  });
  
  return influences;
}

/**
 * Extract transit influences
 */
function extractTransitInfluences(transits, vedicChart) {
  const influences = [];
  
  transits.forEach((transit, index) => {
    const nature = analyzeTransitNature(transit);
    
    // Calculate end date (next transit of same planet or estimate)
    let endDate;
    const nextTransit = transits.find((t, i) => 
      i > index && t.planet === transit.planet
    );
    
    if (nextTransit) {
      endDate = nextTransit.date;
    } else {
      // Estimate based on average transit duration
      endDate = new Date(transit.date);
      endDate.setMonth(endDate.getMonth() + getAverageTransitDuration(transit.planet));
    }
    
    influences.push({
      system: 'Vedic Transit',
      type: `${transit.planet} Transit`,
      startDate: transit.date,
      endDate: endDate,
      description: transit.interpretation,
      nature: nature.category,
      categories: nature.categories,
      strength: nature.strength,
      details: transit
    });
  });
  
  return influences;
}

/**
 * Extract Chinese calendar influences
 */
function extractChineseCalendarInfluences(baziChart) {
  const influences = [];
  const birthYear = baziChart.birthDate.getFullYear();
  
  for (let year = 0; year <= 120; year++) {
    const currentYear = birthYear + year;
    const zodiacYear = getChineseZodiacYear(currentYear);
    
    // Ben Ming Nian (natal year return)
    if (zodiacYear.animal === baziChart.yearPillar.branch.animal) {
      influences.push({
        system: 'Chinese Calendar',
        type: 'Ben Ming Nian',
        startDate: new Date(currentYear, 0, 1),
        endDate: new Date(currentYear, 11, 31),
        description: `Natal year return - ${zodiacYear.animal} year`,
        nature: INFLUENCE_CATEGORIES.CHALLENGING,
        categories: [INFLUENCE_CATEGORIES.CHALLENGING, INFLUENCE_CATEGORIES.TRANSFORMATIVE],
        strength: 0.8,
        details: {
          recommendation: 'Wear red, be cautious, make offerings to Tai Sui'
        }
      });
    }
    
    // Check zodiac compatibility
    const compatibility = checkZodiacCompatibility(
      baziChart.yearPillar.branch.animal,
      zodiacYear.animal
    );
    
    if (compatibility.type === 'clash' || compatibility.type === 'harm') {
      influences.push({
        system: 'Chinese Calendar',
        type: 'Zodiac Clash/Harm',
        startDate: new Date(currentYear, 0, 1),
        endDate: new Date(currentYear, 11, 31),
        description: `${compatibility.type} with ${zodiacYear.animal} year`,
        nature: INFLUENCE_CATEGORIES.CHALLENGING,
        categories: [INFLUENCE_CATEGORIES.CHALLENGING],
        strength: compatibility.strength,
        details: compatibility
      });
    }
  }
  
  return influences;
}

/**
 * Group influences by overlapping time periods
 */
function groupInfluencesByPeriod(influences) {
  // Sort by start date
  const sorted = influences.sort((a, b) => a.startDate - b.startDate);
  
  const groups = [];
  let currentGroup = null;
  
  sorted.forEach(influence => {
    if (!currentGroup || influence.startDate > currentGroup.endDate) {
      // Start new group
      currentGroup = {
        startDate: influence.startDate,
        endDate: influence.endDate,
        influences: [influence]
      };
      groups.push(currentGroup);
    } else {
      // Add to current group
      currentGroup.influences.push(influence);
      if (influence.endDate > currentGroup.endDate) {
        currentGroup.endDate = influence.endDate;
      }
    }
  });
  
  return groups;
}

/**
 * Identify convergence periods where multiple systems align
 */
function identifyConvergencePeriods(groupedInfluences) {
  const convergencePeriods = [];
  
  groupedInfluences.forEach(period => {
    const systemCount = new Set(period.influences.map(i => i.system)).size;
    
    if (systemCount >= OVERLAP_THRESHOLD.TWO_SYSTEMS) {
      const analysis = analyzeConvergence(period.influences);
      
      convergencePeriods.push({
        startDate: period.startDate,
        endDate: period.endDate,
        systemCount,
        systems: [...new Set(period.influences.map(i => i.system))],
        influences: period.influences,
        overlapCount: systemCount,
        dominantNature: analysis.dominantNature,
        dominantCategories: analysis.dominantCategories,
        strength: analysis.strength,
        interpretation: generateConvergenceInterpretation(analysis, period.influences)
      });
    }
  });
  
  return convergencePeriods;
}

/**
 * Analyze convergence of multiple influences
 */
function analyzeConvergence(influences) {
  const categoryCounts = {};
  let totalStrength = 0;
  
  influences.forEach(influence => {
    influence.categories.forEach(category => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    totalStrength += influence.strength;
  });
  
  // Find dominant nature
  let dominantNature = INFLUENCE_CATEGORIES.NEUTRAL;
  let maxCount = 0;
  
  Object.entries(categoryCounts).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantNature = category;
    }
  });
  
  // Get top categories
  const dominantCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category);
  
  return {
    dominantNature,
    dominantCategories,
    strength: totalStrength / influences.length,
    categoryCounts
  };
}

/**
 * Extract major life themes
 */
function extractLifeThemes(character, convergencePeriods) {
  const themes = [];
  
  // Based on character analysis
  if (character.elements.dominant) {
    themes.push(`Strong ${character.elements.dominant} element influence throughout life`);
  }
  
  // Based on recurring patterns in convergence periods
  const patternCounts = {};
  convergencePeriods.forEach(period => {
    period.dominantCategories.forEach(category => {
      patternCounts[category] = (patternCounts[category] || 0) + 1;
    });
  });
  
  Object.entries(patternCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([category, count]) => {
      if (count >= 3) {
        themes.push(`Recurring ${category} themes throughout life`);
      }
    });
  
  return themes;
}

/**
 * Identify the most significant periods
 */
function identifySignificantPeriods(convergencePeriods) {
  // Filter for periods with 3+ system overlaps or very strong influences
  return convergencePeriods
    .filter(period => 
      period.systemCount >= OVERLAP_THRESHOLD.THREE_SYSTEMS ||
      period.strength >= 0.8
    )
    .sort((a, b) => b.systemCount - a.systemCount || b.strength - a.strength)
    .map(period => ({
      ...period,
      sources: period.systems.join(', ')
    }));
}

// Helper functions

function analyzeElementBalance(baziChart) {
  const elementCounts = {};
  
  // Count elements from all pillars
  [baziChart.yearPillar, baziChart.monthPillar, baziChart.dayPillar, baziChart.hourPillar].forEach(pillar => {
    const stemElement = pillar.stem.element.split(' ')[1]; // Remove Yin/Yang prefix
    const branchElement = pillar.branch.element;
    
    elementCounts[stemElement] = (elementCounts[stemElement] || 0) + 1;
    elementCounts[branchElement] = (elementCounts[branchElement] || 0) + 1;
  });
  
  // Find dominant element
  let dominant = null;
  let maxCount = 0;
  
  Object.entries(elementCounts).forEach(([element, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = element;
    }
  });
  
  const balanced = maxCount <= 3; // Considered balanced if no element appears more than 3 times
  
  return {
    counts: elementCounts,
    dominant,
    balanced
  };
}

function generateCharacterDescription(character) {
  let description = `This person has a ${character.elements.dominant || 'balanced'} element composition`;
  
  if (character.ascendant) {
    description += ` with ${character.ascendant} Ascendant`;
  }
  
  if (character.strengths.length > 0) {
    description += `. Strengths include: ${character.strengths.join(', ')}`;
  }
  
  if (character.challenges.length > 0) {
    description += `. Challenges: ${character.challenges.join(', ')}`;
  }
  
  return description;
}

function analyzePillarNature(pillar, baziChart) {
  const categories = [];
  let category = INFLUENCE_CATEGORIES.NEUTRAL;
  let strength = 0.5;
  const details = {};
  
  // Check interactions with natal chart
  const interactions = checkPillarInteractions(pillar, baziChart);
  
  if (interactions.combinations.length > 0) {
    category = INFLUENCE_CATEGORIES.FORTUNATE;
    strength += 0.1 * interactions.combinations.length;
    categories.push(INFLUENCE_CATEGORIES.FORTUNATE);
    details.combinations = interactions.combinations;
  }
  
  if (interactions.clashes.length > 0) {
    category = INFLUENCE_CATEGORIES.CHALLENGING;
    strength -= 0.15 * interactions.clashes.length;
    categories.push(INFLUENCE_CATEGORIES.CHALLENGING);
    details.clashes = interactions.clashes;
  }
  
  // Add specific categories based on pillar position
  if (interactions.affects.career) categories.push(INFLUENCE_CATEGORIES.CAREER);
  if (interactions.affects.relationship) categories.push(INFLUENCE_CATEGORIES.RELATIONSHIP);
  if (interactions.affects.health) categories.push(INFLUENCE_CATEGORIES.HEALTH);
  if (interactions.affects.wealth) categories.push(INFLUENCE_CATEGORIES.WEALTH);
  
  return {
    category,
    categories,
    strength: Math.max(0, Math.min(1, strength)),
    details
  };
}

function calculateAnnualPillar(date) {
  // Simplified annual pillar calculation
  const year = date.getFullYear();
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  return {
    stem: { element: getHeavenlyStemElement(stemIndex) },
    branch: { 
      animal: getEarthlyBranchAnimal(branchIndex),
      element: getEarthlyBranchElement(branchIndex)
    }
  };
}

function analyzeAnnualInfluence(annualPillar, baziChart) {
  const nature = analyzePillarNature(annualPillar, baziChart);
  
  // Additional annual-specific analysis
  if (annualPillar.stem.element === baziChart.dayPillar.stem.element) {
    nature.categories.push(INFLUENCE_CATEGORIES.TRANSFORMATIVE);
    nature.details.selfStar = true;
  }
  
  return nature;
}

function getLifeGraphAreaFocus(value) {
  const focusMap = {
    1: [INFLUENCE_CATEGORIES.CHALLENGING],
    2: [INFLUENCE_CATEGORIES.CAREER],
    3: [INFLUENCE_CATEGORIES.CAREER, INFLUENCE_CATEGORIES.CHALLENGING],
    4: [INFLUENCE_CATEGORIES.NEUTRAL],
    5: [INFLUENCE_CATEGORIES.HEALTH],
    6: [INFLUENCE_CATEGORIES.RELATIONSHIP],
    7: [INFLUENCE_CATEGORIES.NEUTRAL],
    8: [INFLUENCE_CATEGORIES.FORTUNATE],
    9: [INFLUENCE_CATEGORIES.FAMILY],
    10: [INFLUENCE_CATEGORIES.FORTUNATE, INFLUENCE_CATEGORIES.RELATIONSHIP],
    11: [INFLUENCE_CATEGORIES.WEALTH, INFLUENCE_CATEGORIES.FORTUNATE],
    12: [INFLUENCE_CATEGORIES.FORTUNATE, INFLUENCE_CATEGORIES.SPIRITUAL]
  };
  
  return focusMap[value] || [INFLUENCE_CATEGORIES.NEUTRAL];
}

function analyzeTransitNature(transit) {
  const categories = [];
  let category = INFLUENCE_CATEGORIES.NEUTRAL;
  let strength = 0.5;
  
  // Planet-specific analysis
  const planetNatures = {
    'Sun': { nature: INFLUENCE_CATEGORIES.NEUTRAL, strength: 0.6 },
    'Mars': { nature: INFLUENCE_CATEGORIES.TRANSFORMATIVE, strength: 0.7 },
    'Jupiter': { nature: INFLUENCE_CATEGORIES.FORTUNATE, strength: 0.8 },
    'Saturn': { nature: INFLUENCE_CATEGORIES.CHALLENGING, strength: 0.8 },
    'Rahu': { nature: INFLUENCE_CATEGORIES.TRANSFORMATIVE, strength: 0.7 },
    'Ketu': { nature: INFLUENCE_CATEGORIES.SPIRITUAL, strength: 0.6 }
  };
  
  if (planetNatures[transit.planet]) {
    category = planetNatures[transit.planet].nature;
    strength = planetNatures[transit.planet].strength;
  }
  
  // House-specific categories
  const houseCategories = getHouseCategories(transit.toHouse);
  categories.push(category, ...houseCategories);
  
  return {
    category,
    categories,
    strength
  };
}

function getAverageTransitDuration(planet) {
  const durations = {
    'Sun': 1,
    'Mars': 1.5,
    'Jupiter': 12,
    'Saturn': 30,
    'Rahu': 18,
    'Ketu': 18
  };
  
  return durations[planet] || 6;
}

function getChineseZodiacYear(year) {
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
  
  const animalIndex = (year - 4) % 12;
  const elementIndex = Math.floor(((year - 4) % 10) / 2);
  
  return {
    animal: animals[animalIndex >= 0 ? animalIndex : animalIndex + 12],
    element: elements[elementIndex >= 0 ? elementIndex : elementIndex + 5],
    year
  };
}

function checkZodiacCompatibility(animal1, animal2) {
  const clashes = {
    'Rat': 'Horse', 'Horse': 'Rat',
    'Ox': 'Goat', 'Goat': 'Ox',
    'Tiger': 'Monkey', 'Monkey': 'Tiger',
    'Rabbit': 'Rooster', 'Rooster': 'Rabbit',
    'Dragon': 'Dog', 'Dog': 'Dragon',
    'Snake': 'Pig', 'Pig': 'Snake'
  };
  
  const harms = {
    'Rat': 'Goat', 'Goat': 'Rat',
    'Ox': 'Horse', 'Horse': 'Ox',
    'Tiger': 'Snake', 'Snake': 'Tiger',
    'Rabbit': 'Dragon', 'Dragon': 'Rabbit',
    'Monkey': 'Pig', 'Pig': 'Monkey',
    'Rooster': 'Dog', 'Dog': 'Rooster'
  };
  
  if (clashes[animal1] === animal2) {
    return { type: 'clash', strength: 0.8 };
  } else if (harms[animal1] === animal2) {
    return { type: 'harm', strength: 0.6 };
  }
  
  return { type: 'neutral', strength: 0.5 };
}

function checkPillarInteractions(pillar, baziChart) {
  const interactions = {
    combinations: [],
    clashes: [],
    harms: [],
    affects: {
      career: false,
      relationship: false,
      health: false,
      wealth: false
    }
  };
  
  const natalPillars = [
    { type: 'year', pillar: baziChart.yearPillar },
    { type: 'month', pillar: baziChart.monthPillar },
    { type: 'day', pillar: baziChart.dayPillar },
    { type: 'hour', pillar: baziChart.hourPillar }
  ];
  
  natalPillars.forEach(natal => {
    if (natal.pillar && natal.pillar.branch) {
      const interaction = checkBranchInteraction(
        pillar.branch.chinese || pillar.branch.animal,
        natal.pillar.branch.chinese
      );
      
      if (interaction) {
        interactions[interaction.type + 's'].push({
          ...interaction,
          with: natal.type
        });
        
        // Set affected areas
        if (natal.type === 'month' || natal.type === 'hour') {
          interactions.affects.career = true;
        }
        if (natal.type === 'day') {
          interactions.affects.relationship = true;
        }
        if (natal.type === 'year') {
          interactions.affects.health = true;
        }
      }
    }
  });
  
  return interactions;
}

function checkBranchInteraction(branch1, branch2) {
  // Find combinations
  const combination = INTERACTIONS.combinations.find(combo =>
    (combo.branches[0] === branch1 && combo.branches[1] === branch2) ||
    (combo.branches[0] === branch2 && combo.branches[1] === branch1)
  );
  
  if (combination) {
    return { type: 'combination', details: combination };
  }
  
  // Find clashes
  const clash = INTERACTIONS.clashes.find(c =>
    (c.branches[0] === branch1 && c.branches[1] === branch2) ||
    (c.branches[0] === branch2 && c.branches[1] === branch1)
  );
  
  if (clash) {
    return { type: 'clash', details: clash };
  }
  
  // Find harms
  const harm = INTERACTIONS.harms.find(h =>
    (h.branches[0] === branch1 && h.branches[1] === branch2) ||
    (h.branches[0] === branch2 && h.branches[1] === branch1)
  );
  
  if (harm) {
    return { type: 'harm', details: harm };
  }
  
  return null;
}

function getHouseCategories(houseNumber) {
  const categoryMap = {
    1: [INFLUENCE_CATEGORIES.TRANSFORMATIVE],
    2: [INFLUENCE_CATEGORIES.WEALTH],
    3: [INFLUENCE_CATEGORIES.NEUTRAL],
    4: [INFLUENCE_CATEGORIES.FAMILY],
    5: [INFLUENCE_CATEGORIES.FORTUNATE],
    6: [INFLUENCE_CATEGORIES.HEALTH, INFLUENCE_CATEGORIES.CHALLENGING],
    7: [INFLUENCE_CATEGORIES.RELATIONSHIP],
    8: [INFLUENCE_CATEGORIES.TRANSFORMATIVE, INFLUENCE_CATEGORIES.WEALTH],
    9: [INFLUENCE_CATEGORIES.SPIRITUAL, INFLUENCE_CATEGORIES.FORTUNATE],
    10: [INFLUENCE_CATEGORIES.CAREER],
    11: [INFLUENCE_CATEGORIES.WEALTH, INFLUENCE_CATEGORIES.FORTUNATE],
    12: [INFLUENCE_CATEGORIES.SPIRITUAL, INFLUENCE_CATEGORIES.CHALLENGING]
  };
  
  return categoryMap[houseNumber] || [INFLUENCE_CATEGORIES.NEUTRAL];
}

function generateConvergenceInterpretation(analysis, influences) {
  let interpretation = '';
  
  const natureDescriptions = {
    fortunate: 'highly favorable period',
    challenging: 'period requiring caution and preparation',
    transformative: 'significant transformation period',
    neutral: 'balanced period with mixed influences',
    career: 'career-focused period',
    relationship: 'relationship-focused period',
    health: 'health-focused period',
    wealth: 'wealth-focused period',
    spiritual: 'spiritual growth period',
    family: 'family-focused period'
  };
  
  interpretation += `This is a ${natureDescriptions[analysis.dominantNature] || 'significant period'} `;
  interpretation += `with ${influences.length} systems converging. `;
  
  const themeDescriptions = {
    career: 'Career and professional matters',
    relationship: 'Relationships and partnerships',
    health: 'Health and wellbeing',
    wealth: 'Financial matters',
    spiritual: 'Spiritual growth',
    family: 'Family dynamics'
  };
  
  const themes = analysis.dominantCategories
    .filter(cat => themeDescriptions[cat])
    .map(cat => themeDescriptions[cat]);
  
  if (themes.length > 0) {
    interpretation += `Key themes include: ${themes.join(', ')}. `;
  }
  
  return interpretation;
}

// Helper functions for element calculations
function getHeavenlyStemElement(index) {
  const stems = [
    'Yang Wood', 'Yin Wood', 'Yang Fire', 'Yin Fire', 'Yang Earth',
    'Yin Earth', 'Yang Metal', 'Yin Metal', 'Yang Water', 'Yin Water'
  ];
  return stems[index >= 0 ? index : index + 10];
}

function getEarthlyBranchAnimal(index) {
  const animals = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ];
  return animals[index >= 0 ? index : index + 12];
}

function getEarthlyBranchElement(index) {
  const elements = [
    'Water', 'Earth', 'Wood', 'Wood', 'Earth', 'Fire',
    'Fire', 'Earth', 'Metal', 'Metal', 'Earth', 'Water'
  ];
  return elements[index >= 0 ? index : index + 12];
}

// Export the main function
export default {
  analyzeSynthesis
};
