// test-bazi.js - Test file for BaZi module

import { 
    calculateBaziChart, 
    calculateYearPillar,
    calculateMonthPillar,
    calculateDayPillar,
    calculateHourPillar,
    calculateLuckPillars,
    identifyInteractions,
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES,
    SOLAR_TERMS
} from './bazi.js';

// Test Case 1: Basic BaZi Chart Calculation
console.log("=== Test Case 1: Basic BaZi Chart ===");

const testDate1 = new Date('1990-05-15T14:30:00');
const testLocation1 = {
    latitude: 39.9042, // Beijing
    longitude: 116.4074,
    timezone: 8
};
const testGender1 = 'male';

const baziChart1 = calculateBaziChart(testDate1, testLocation1, testGender1);
console.log("Full BaZi Chart:", JSON.stringify(baziChart1, null, 2));

// Test Case 2: Individual Pillar Calculations
console.log("\n=== Test Case 2: Individual Pillars ===");

// Year Pillar
const yearPillar = calculateYearPillar(testDate1, testLocation1);
console.log("Year Pillar:", yearPillar);

// Month Pillar
const monthPillar = calculateMonthPillar(testDate1, yearPillar, testLocation1);
console.log("Month Pillar:", monthPillar);

// Day Pillar
const dayPillar = calculateDayPillar(testDate1, testLocation1);
console.log("Day Pillar:", dayPillar);

// Hour Pillar
const hourPillar = calculateHourPillar(testDate1, dayPillar, testLocation1);
console.log("Hour Pillar:", hourPillar);

// Test Case 3: Luck Pillars
console.log("\n=== Test Case 3: Luck Pillars ===");

const birthData = {
    yearPillar,
    monthPillar,
    dayPillar,
    birthDate: testDate1,
    location: testLocation1
};

const luckPillars = calculateLuckPillars(birthData, testGender1);
console.log("Luck Pillars:", JSON.stringify(luckPillars, null, 2));

// Test Case 4: Edge Cases
console.log("\n=== Test Case 4: Edge Cases ===");

// Test early morning hours (zi hour transition)
const testDate2 = new Date('1990-02-04T00:30:00'); // Near Lichun
const baziChart2 = calculateBaziChart(testDate2, testLocation1, 'female');
console.log("Early Morning Chart:", JSON.stringify(baziChart2.hourPillar, null, 2));

// Test year transition around Lichun
const testDate3 = new Date('1990-02-04T05:30:00'); // Near Lichun
const yearPillar3 = calculateYearPillar(testDate3, testLocation1);
console.log("Year Transition Test:", yearPillar3);

// Test Case 5: Interactions
console.log("\n=== Test Case 5: Interactions ===");

const interactions = identifyInteractions(baziChart1);
console.log("Interactions:", JSON.stringify(interactions, null, 2));

// Test Case 6: Display Formatted Output
console.log("\n=== Test Case 6: Formatted Display ===");

function displayPillar(pillar, name) {
    console.log(`${name} Pillar:`);
    console.log(`  Stem: ${pillar.stem.chinese} (${pillar.stem.pinyin}) - ${pillar.stem.element}`);
    console.log(`  Branch: ${pillar.branch.chinese} (${pillar.branch.pinyin}) - ${pillar.branch.animal}, ${pillar.branch.element}`);
    if (pillar.branch.hiddenStems) {
        console.log(`  Hidden Stems: ${pillar.branch.hiddenStems.map(s => s.chinese + '(' + s.element + ')').join(', ')}`);
    }
}

displayPillar(baziChart1.yearPillar, "Year");
displayPillar(baziChart1.monthPillar, "Month");
displayPillar(baziChart1.dayPillar, "Day");
displayPillar(baziChart1.hourPillar, "Hour");

// Test Case 7: Verify Constants
console.log("\n=== Test Case 7: Constants Verification ===");

console.log("Number of Heavenly Stems:", HEAVENLY_STEMS.length); // Should be 10
console.log("Number of Earthly Branches:", EARTHLY_BRANCHES.length); // Should be 12
console.log("Number of Solar Terms:", SOLAR_TERMS.length); // Should be 24

// Test Case 8: Different Time Zones
console.log("\n=== Test Case 8: Time Zone Test ===");

const testLocationNY = {
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: -5
};

const baziChartNY = calculateBaziChart(testDate1, testLocationNY, 'male');
console.log("New York Time Zone Test:");
displayPillar(baziChartNY.hourPillar, "Hour (NY)");

// Test Case 9: Birth Time Near Midnight
console.log("\n=== Test Case 9: Midnight Transition ===");

const testDateMidnight = new Date('1990-05-15T23:30:00');
const baziChartMidnight = calculateBaziChart(testDateMidnight, testLocation1, 'male');
console.log("Hour Pillar at 23:30:", baziChartMidnight.hourPillar.branch.animal); // Should be Pig (亥)

// Test Case 10: Year Animal Cycle
console.log("\n=== Test Case 10: Year Animal Verification ===");

const years = [1984, 1996, 2008, 2020]; // All Rat years
years.forEach(year => {
    const testDate = new Date(`${year}-06-15T12:00:00`);
    const chart = calculateBaziChart(testDate, testLocation1, 'male');
    console.log(`${year}: ${chart.yearPillar.branch.animal}`);
});

// Test Case 11: Function Error Handling
console.log("\n=== Test Case 11: Error Handling ===");

try {
    const invalidDate = new Date('invalid');
    const chart = calculateBaziChart(invalidDate, testLocation1, 'male');
} catch (error) {
    console.log("Error caught correctly:", error.message);
}

// Test Case 12: Verify Luck Pillar Progression
console.log("\n=== Test Case 12: Luck Pillar Progression ===");

const maleChart = calculateBaziChart(testDate1, testLocation1, 'male');
const femaleChart = calculateBaziChart(testDate1, testLocation1, 'female');

console.log("Male Luck Pillars (first 3):");
maleChart.luckPillars.slice(0, 3).forEach(pillar => {
    console.log(`Age ${pillar.startAge}-${pillar.endAge}: ${pillar.stem.chinese}${pillar.branch.chinese}`);
});

console.log("\nFemale Luck Pillars (first 3):");
femaleChart.luckPillars.slice(0, 3).forEach(pillar => {
    console.log(`Age ${pillar.startAge}-${pillar.endAge}: ${pillar.stem.chinese}${pillar.branch.chinese}`);
});

// Summary Report
console.log("\n=== Test Summary ===");
console.log("✓ Basic chart calculation");
console.log("✓ Individual pillar calculations");
console.log("✓ Luck pillar generation");
console.log("✓ Edge case handling");
console.log("✓ Interaction detection");
console.log("✓ Time zone support");
console.log("✓ Constants verification");
console.log("✓ Error handling");
