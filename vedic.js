// vedic.js - Vedic Astrology Module with Swiss Ephemeris Data
// Requires ephemeris data files named semo_00.se1 through semo_162.se1
// and sepl_00.se1 through sepl_162.se1

// Constants
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const PLANETS = {
  Sun: { swissId: 0, symbol: '☉' },
  Moon: { swissId: 1, symbol: '☽' },
  Mercury: { swissId: 2, symbol: '☿' },
  Venus: { swissId: 3, symbol: '♀' },
  Mars: { swissId: 4, symbol: '♂' },
  Jupiter: { swissId: 5, symbol: '♃' },
  Saturn: { swissId: 6, symbol: '♄' },
  Rahu: { swissId: 11, symbol: '☊', isMeanNode: true }, // mean node
  Ketu: { swissId: 11, symbol: '☋', isMeanNode: true }  // derived
};

const MAJOR_PLANETS = ['Sun', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];

// Ephemeris data cache
const ephemerisCache = new Map();

// Swiss Ephemeris file mapping
// Each file covers a specific date range
const EPHE_FILE_MAPPING = {
  // These are approximations - you'll need to determine the exact date ranges
  // Each file typically covers 600 years (50 years per segment)
  dateToFileIndex: function(date) {
    const year = date.getFullYear();
    
    // Assuming files are organized as:
    // 00: 1200-1250, 01: 1250-1300, etc.
    // Adjust this based on your actual file structure
    const baseYear = 1200;
    const yearsPerFile = 50;
    
    const index = Math.floor((year - baseYear) / yearsPerFile);
    
    // Clamp to available range (0-162)
    return Math.max(0, Math.min(162, index));
  }
};

// Load ephemeris data file
async function loadEphemerisFile(filename) {
  if (ephemerisCache.has(filename)) {
    return ephemerisCache.get(filename);
  }
  
  try {
    const response = await fetch(`/data/ephe/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.arrayBuffer();
    ephemerisCache.set(filename, data);
    return data;
  } catch (error) {
    console.error(`Failed to load ephemeris file ${filename}:`, error);
    return null;
  }
}

// Calculate Julian Day
function dateToJulianDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;
  
  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // Add time fraction
  jd += (hour - 12) / 24 + minute / 1440 + second / 86400;
  
  return jd;
}

// Get ephemeris filename for a given date
function getEphemerisFilename(date) {
  const fileIndex = EPHE_FILE_MAPPING.dateToFileIndex(date);
  const paddedIndex = fileIndex.toString().padStart(2, '0');
  
  return {
    planets: `sepl_${paddedIndex}.se1`,
    moon: `semo_${paddedIndex}.se1`
  };
}

// Parse Swiss Ephemeris binary format (simplified)
function parseEphemerisData(buffer, jd, planetId) {
  // This is a simplified parser - the actual format is complex
  // Swiss Ephemeris uses a sophisticated compression and interpolation scheme
  
  // For now, we'll use approximations
  // In production, you should use a proper parser or pre-converted data
  
  // Basic structure of SE1 files:
  // - Header with file info
  // - Index of date ranges
  // - Compressed position data
  
  const view = new DataView(buffer);
  
  // Read header (simplified)
  const version = view.getInt16(0, true);
  const startJD = view.getFloat64(8, true);
  const endJD = view.getFloat64(16, true);
  
  // Check if our JD is in range
  if (jd < startJD || jd > endJD) {
    throw new Error(`JD ${jd} outside file range ${startJD}-${endJD}`);
  }
  
  // In reality, you'd need to:
  // 1. Find the correct segment for the JD
  // 2. Decompress the data
  // 3. Interpolate between data points
  
  // For now, return an approximation
  return calculateApproximatePosition(new Date((jd - 2440587.5) * 86400000), planetId);
}

// Read planet position from ephemeris data
async function readPlanetPosition(date, planetId, useMoon = false) {
  const files = getEphemerisFilename(date);
  const filename = useMoon ? files.moon : files.planets;
  
  try {
    const data = await loadEphemerisFile(filename);
    
    if (!data) {
      throw new Error('Ephemeris data not available');
    }
    
    const jd = dateToJulianDay(date);
    return parseEphemerisData(data, jd, planetId);
    
  } catch (error) {
    console.warn(`Failed to read position from ${filename}:`, error);
    // Fall back to approximation
    return calculateApproximatePosition(date, planetId);
  }
}

// Fallback approximate calculations
function calculateApproximatePosition(date, planetId) {
  const daysSinceJ2000 = (date - new Date(2000, 0, 1, 12, 0, 0)) / (1000 * 60 * 60 * 24);
  
  // Mean orbital elements (J2000)
  const orbitalElements = {
    0: { L: 280.46646, rate: 0.98564736 },  // Sun
    1: { L: 218.31665, rate: 13.17639648 }, // Moon
    2: { L: 252.25084, rate: 4.09233445 },  // Mercury
    3: { L: 181.97973, rate: 1.60213049 },  // Venus
    4: { L: 355.43300, rate: 0.52403249 },  // Mars
    5: { L: 34.35119, rate: 0.08308529 },   // Jupiter
    6: { L: 50.07744, rate: 0.03348786 },   // Saturn
    11: { L: 125.04452, rate: -0.05295376 } // Mean Node (Rahu)
  };
  
  const elem = orbitalElements[planetId];
  if (!elem) return 0;
  
  let longitude = elem.L + elem.rate * daysSinceJ2000;
  longitude = longitude % 360;
  if (longitude < 0) longitude += 360;
  
  return longitude;
}

// Calculate Ayanamsa (Lahiri)
function calculateAyanamsa(date) {
  const jd = dateToJulianDay(date);
  const T = (jd - 2451545) / 36525; // Julian centuries since J2000
  
  // Lahiri ayanamsa formula
  const ayanamsa = 23.85 + 1.27 * T + 0.00018 * T * T;
  
  return ayanamsa;
}

// Calculate Local Sidereal Time
function calculateLST(date, longitude) {
  const jd = dateToJulianDay(date);
  const T = (jd - 2451545) / 36525;
  
  // Greenwich sidereal time at 0h UT
  let GST = 280.46061837 + 360.98564736629 * (jd - 2451545) + 
            0.000387933 * T * T - T * T * T / 38710000;
  
  GST = GST % 360;
  if (GST < 0) GST += 360;
  
  // Local sidereal time
  const lst = GST + longitude;
  return lst % 360;
}

// Calculate Ascendant
function calculateAscendant(date, location) {
  const lst = calculateLST(date, location.longitude);
  const lat = location.latitude * Math.PI / 180;
  
  // RAMC (Right Ascension of Midheaven)
  const RAMC = lst;
  
  // Calculate Ascendant using trigonometry
  const tanLat = Math.tan(lat);
  const cosRAMC = Math.cos(RAMC * Math.PI / 180);
  
  let ascendant = Math.atan2(-cosRAMC, tanLat * Math.sin(RAMC * Math.PI / 180));
  ascendant = ascendant * 180 / Math.PI;
  if (ascendant < 0) ascendant += 360;
  
  // Apply ayanamsa for sidereal
  const ayanamsa = calculateAyanamsa(date);
  ascendant -= ayanamsa;
  if (ascendant < 0) ascendant += 360;
  
  return ascendant;
}

// Calculate House Cusps (Whole Sign Houses)
function calculateHouses(date, location) {
  const ascendant = calculateAscendant(date, location);
  const ascSign = Math.floor(ascendant / 30);
  
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const signIndex = (ascSign + i) % 12;
    houses.push({
      house: i + 1,
      sign: ZODIAC_SIGNS[signIndex],
      cusp: signIndex * 30
    });
  }
  
  return {
    ascendant,
    houses,
    ascendantSign: ZODIAC_SIGNS[ascSign]
  };
}

// Calculate Planet Positions
async function calculatePlanetPositions(date) {
  const ayanamsa = calculateAyanamsa(date);
  const positions = {};
  
  // Process all planets in parallel for better performance
  const planetPromises = [];
  
  for (const [name, data] of Object.entries(PLANETS)) {
    if (name === 'Ketu') continue; // Calculate Ketu after Rahu
    
    planetPromises.push(
      readPlanetPosition(date, data.swissId, name === 'Moon')
        .then(longitude => {
          // Convert to sidereal
          longitude -= ayanamsa;
          if (longitude < 0) longitude += 360;
          positions[name] = longitude;
        })
        .catch(error => {
          console.warn(`Failed to read ${name} position:`, error);
          let longitude = calculateApproximatePosition(date, data.swissId);
          longitude -= ayanamsa;
          if (longitude < 0) longitude += 360;
          positions[name] = longitude;
        })
    );
  }
  
  await Promise.all(planetPromises);
  
  // Calculate Ketu (opposite Rahu)
  positions.Ketu = (positions.Rahu + 180) % 360;
  
  return positions;
}

// Main function to calculate Vedic chart
export async function calculateVedicChart(birthDate, location) {
  const houses = calculateHouses(birthDate, location);
  const planets = await calculatePlanetPositions(birthDate);
  
  // Assign planets to houses
  const houseData = [];
  for (let i = 0; i < 12; i++) {
    const houseCusp = houses.houses[i].cusp;
    const planetsInHouse = [];
    
    for (const [planet, position] of Object.entries(planets)) {
      const planetSign = Math.floor(position / 30);
      const houseSign = Math.floor(houseCusp / 30);
      
      if (planetSign === houseSign) {
        planetsInHouse.push({
          name: planet,
          degree: position,
          sign: ZODIAC_SIGNS[planetSign],
          symbol: PLANETS[planet].symbol
        });
      }
    }
    
    houseData.push({
      house: i + 1,
      sign: houses.houses[i].sign,
      cusp: houseCusp,
      planets: planetsInHouse
    });
  }
  
  return {
    ascendant: houses.ascendant,
    ascendantSign: houses.ascendantSign,
    houses: houseData,
    planets: planets,
    ayanamsa: calculateAyanamsa(birthDate)
  };
}

// Calculate transits for major planets
export async function calculateTransits(birthDate, location, years = 120) {
  const transits = [];
  const endDate = new Date(birthDate);
  endDate.setFullYear(endDate.getFullYear() + years);
  
  const natalChart = await calculateVedicChart(birthDate, location);
  const natalAscSign = Math.floor(natalChart.ascendant / 30);
  
  // For each major planet
  for (const planet of MAJOR_PLANETS) {
    let currentDate = new Date(birthDate);
    let lastHouse = null;
    let checkInterval = 7; // days
    
    // Adjust check interval based on planet speed
    if (planet === 'Saturn') checkInterval = 30;
    else if (planet === 'Jupiter') checkInterval = 30;
    else if (planet === 'Rahu' || planet === 'Ketu') checkInterval = 30;
    else if (planet === 'Mars') checkInterval = 7;
    else if (planet === 'Sun') checkInterval = 1;
    
    while (currentDate < endDate) {
      currentDate.setDate(currentDate.getDate() + checkInterval);
      
      try {
        const positions = await calculatePlanetPositions(currentDate);
        const planetPosition = positions[planet];
        const planetSign = Math.floor(planetPosition / 30);
        
        // Calculate which house the planet is transiting (whole sign)
        const currentHouse = ((planetSign - natalAscSign + 12) % 12) + 1;
        
        if (lastHouse !== null && currentHouse !== lastHouse) {
          // Refine the date by binary search
          let lo = new Date(currentDate);
          lo.setDate(lo.getDate() - checkInterval);
          let hi = new Date(currentDate);
          
          while (hi - lo > 86400000) { // 1 day in milliseconds
            const mid = new Date((lo.getTime() + hi.getTime()) / 2);
            const midPositions = await calculatePlanetPositions(mid);
            const midSign = Math.floor(midPositions[planet] / 30);
            const midHouse = ((midSign - natalAscSign + 12) % 12) + 1;
            
            if (midHouse === lastHouse) {
              lo = mid;
            } else {
              hi = mid;
            }
          }
          
          transits.push({
            date: hi,
            planet: planet,
            fromHouse: lastHouse,
            toHouse: currentHouse,
            fromSign: ZODIAC_SIGNS[(natalAscSign + lastHouse - 1) % 12],
            toSign: ZODIAC_SIGNS[(natalAscSign + currentHouse - 1) % 12],
            interpretation: getTransitInterpretation(planet, currentHouse)
          });
        }
        
        lastHouse = currentHouse;
      } catch (error) {
        console.error(`Error calculating transit for ${planet} on ${currentDate}:`, error);
      }
    }
  }
  
  // Sort transits by date
  transits.sort((a, b) => a.date - b.date);
  
  return transits;
}

// Transit interpretation helper
function getTransitInterpretation(planet, house) {
  const interpretations = {
    Sun: {
      1: "Focus on self, new beginnings, vitality",
      2: "Financial matters, values, possessions",
      3: "Communication, siblings, short trips",
      4: "Home, family, emotional foundation",
      5: "Creativity, children, romance",
      6: "Health, work, daily routine",
      7: "Partnerships, relationships, marriage",
      8: "Transformation, shared resources",
      9: "Philosophy, travel, higher education",
      10: "Career, reputation, public image",
      11: "Friends, groups, aspirations",
      12: "Spirituality, isolation, hidden matters"
    },
    Mars: {
      1: "Energy, initiative, aggression",
      2: "Financial conflicts, material desires",
      3: "Communication disputes, travel issues",
      4: "Home conflicts, property matters",
      5: "Creative passion, romantic conflicts",
      6: "Health issues, work conflicts",
      7: "Relationship conflicts, competition",
      8: "Deep transformation, joint ventures",
      9: "Philosophical battles, long journeys",
      10: "Career ambition, public conflicts",
      11: "Group dynamics, goal conflicts",
      12: "Hidden enemies, spiritual battles"
    },
    Jupiter: {
      1: "Personal growth, optimism, expansion",
      2: "Financial growth, increased resources",
      3: "Communication expansion, learning",
      4: "Home expansion, family blessings",
      5: "Creative growth, children, romance",
      6: "Health improvement, work growth",
      7: "Relationship blessings, partnerships",
      8: "Shared resource growth, transformation",
      9: "Higher learning, spiritual growth",
      10: "Career advancement, public success",
      11: "Social expansion, goal achievement",
      12: "Spiritual growth, hidden blessings"
    },
    Saturn: {
      1: "Personal challenges, maturity",
      2: "Financial restrictions, hard work",
      3: "Communication delays, mental discipline",
      4: "Home responsibilities, family duties",
      5: "Creative blocks, child responsibilities",
      6: "Health concerns, work burdens",
      7: "Relationship tests, commitments",
      8: "Deep transformation, shared burdens",
      9: "Philosophical tests, travel delays",
      10: "Career responsibilities, public tests",
      11: "Social restrictions, delayed goals",
      12: "Isolation, spiritual tests"
    },
    Rahu: {
      1: "Obsession with self, new identity",
      2: "Material obsessions, unusual gains",
      3: "Communication obsession, unusual ideas",
      4: "Home obsessions, family karma",
      5: "Creative obsession, unusual romance",
      6: "Health obsessions, unusual work",
      7: "Relationship obsession, unusual partners",
      8: "Transformation obsession, occult interests",
      9: "Philosophical obsession, foreign interests",
      10: "Career obsession, public ambition",
      11: "Social obsession, unusual groups",
      12: "Spiritual obsession, hidden desires"
    },
    Ketu: {
      1: "Spiritual detachment, self-dissolution",
      2: "Material detachment, financial losses",
      3: "Mental detachment, communication issues",
      4: "Home detachment, family separation",
      5: "Creative detachment, child issues",
      6: "Health detachment, work dissolution",
      7: "Relationship detachment, separation",
      8: "Transformation detachment, losses",
      9: "Philosophical detachment, travel issues",
      10: "Career detachment, reputation loss",
      11: "Social detachment, goal dissolution",
      12: "Deep spirituality, complete detachment"
    }
  };
  
  return interpretations[planet]?.[house] || `${planet} transiting house ${house}`;
}

// Export functions
export default {
  calculateVedicChart,
  calculateTransits,
  ZODIAC_SIGNS,
  PLANETS,
  MAJOR_PLANETS
};
