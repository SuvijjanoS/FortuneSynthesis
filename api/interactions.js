// api/interactions.js - BaZi chart interaction identification
export function identifyInteractions(chart) {
  // Extract branches from the four pillars
  const branches = [
    chart.yearPillar.branch.chinese,
    chart.monthPillar.branch.chinese,
    chart.dayPillar.branch.chinese,
    chart.hourPillar.branch.chinese
  ];
  
  // Identify different types of interactions
  const combinations = identifySixCombinations(branches);
  const threeHarmonies = identifyThreeHarmonies(branches);
  const clashes = identifySixClashes(branches);
  const harms = identifySixHarms(branches);
  const penalties = identifyPenalties(branches);
  const destructions = identifyDestructions(branches);
  
  return {
    combinations,
    threeHarmonies,
    clashes,
    harms,
    penalties,
    destructions
  };
}

// Six Combinations (六合 - Liùhé)
function identifySixCombinations(branches) {
  const combinationPairs = [
    ['子', '丑'], // Rat + Ox = Water
    ['寅', '亥'], // Tiger + Pig = Wood
    ['卯', '戌'], // Rabbit + Dog = Wood
    ['辰', '酉'], // Dragon + Rooster = Metal
    ['巳', '申'], // Snake + Monkey = Metal
    ['午', '未']  // Horse + Goat = Fire
  ];
  
  const results = [];
  
  combinationPairs.forEach(pair => {
    const [branch1, branch2] = pair;
    
    if (branches.includes(branch1) && branches.includes(branch2)) {
      let element = '';
      
      if (pair[0] === '子' || pair[0] === '亥') element = 'Water';
      else if (pair[0] === '寅' || pair[0] === '卯') element = 'Wood';
      else if (pair[0] === '巳' || pair[0] === '午') element = 'Fire';
      else if (pair[0] === '辰' || pair[0] === '戌') element = 'Earth';
      else element = 'Metal';
      
      results.push({
        branches: [branch1, branch2],
        result: element
      });
    }
  });
  
  return results;
}

// Three Harmonies (三合 - Sānhé)
function identifyThreeHarmonies(branches) {
  const harmonyGroups = [
    ['寅', '午', '戌'], // Tiger + Horse + Dog = Fire
    ['亥', '卯', '未'], // Pig + Rabbit + Goat = Wood
    ['申', '子', '辰'], // Monkey + Rat + Dragon = Water
    ['巳', '酉', '丑']  // Snake + Rooster + Ox = Metal
  ];
  
  const results = [];
  
  harmonyGroups.forEach(group => {
    const presentBranches = group.filter(branch => branches.includes(branch));
    
    if (presentBranches.length >= 2) {
      let element = '';
      
      if (group[0] === '寅') element = 'Fire';
      else if (group[0] === '亥') element = 'Wood';
      else if (group[0] === '申') element = 'Water';
      else element = 'Metal';
      
      results.push({
        branches: presentBranches,
        result: element,
        complete: presentBranches.length === 3
      });
    }
  });
  
  return results;
}

// Six Clashes (六冲 - Liùchōng)
function identifySixClashes(branches) {
  const clashPairs = [
    ['子', '午'], // Rat vs Horse
    ['丑', '未'], // Ox vs Goat
    ['寅', '申'], // Tiger vs Monkey
    ['卯', '酉'], // Rabbit vs Rooster
    ['辰', '戌'], // Dragon vs Dog
    ['巳', '亥']  // Snake vs Pig
  ];
  
  const results = [];
  
  clashPairs.forEach(pair => {
    const [branch1, branch2] = pair;
    
    if (branches.includes(branch1) && branches.includes(branch2)) {
      results.push({
        branches: [branch1, branch2]
      });
    }
  });
  
  return results;
}

// Six Harms (六害 - Liùhài)
function identifySixHarms(branches) {
  const harmPairs = [
    ['子', '未'], // Rat vs Goat
    ['丑', '午'], // Ox vs Horse
    ['寅', '巳'], // Tiger vs Snake
    ['卯', '辰'], // Rabbit vs Dragon
    ['申', '亥'], // Monkey vs Pig
    ['酉', '戌']  // Rooster vs Dog
  ];
  
  const results = [];
  
  harmPairs.forEach(pair => {
    const [branch1, branch2] = pair;
    
    if (branches.includes(branch1) && branches.includes(branch2)) {
      results.push({
        branches: [branch1, branch2]
      });
    }
  });
  
  return results;
}

// Penalties (刑 - Xíng)
function identifyPenalties(branches) {
  const results = [];
  
  // Self-penalty
  if (branches.includes('午')) {
    results.push({
      type: 'SelfPenalty',
      branch: '午'
    });
  }
  
  // Uncivilized penalty
  const uncivilizedPenaltyGroups = [
    ['寅', '巳'],  // Tiger penalties Snake
    ['巳', '申'],  // Snake penalties Monkey
    ['申', '寅']   // Monkey penalties Tiger
  ];
  
  uncivilizedPenaltyGroups.forEach(pair => {
    const [branch1, branch2] = pair;
    
    if (branches.includes(branch1) && branches.includes(branch2)) {
      results.push({
        type: 'UncivilizedPenalty',
        branches: [branch1, branch2]
      });
    }
  });
  
  // Three-way penalty
  const threeWayPenaltyGroups = [
    ['丑', '戌', '未'],  // Ox, Dog, Goat
    ['子', '卯', '酉'],  // Rat, Rabbit, Rooster
    ['辰', '亥']         // Dragon, Pig
  ];
  
  threeWayPenaltyGroups.forEach(group => {
    const presentBranches = group.filter(branch => branches.includes(branch));
    
    if (presentBranches.length >= 2) {
      results.push({
        type: 'ThreeWayPenalty',
        presentBranches,
        completeGroup: group
      });
    }
  });
  
  return results;
}

// Destructions (破 - Pò)
function identifyDestructions(branches) {
  const destructionPairs = [
    ['子', '酉'], // Rat destroys Rooster
    ['丑', '辰'], // Ox destroys Dragon
    ['寅', '亥'], // Tiger destroys Pig
    ['卯', '戌'], // Rabbit destroys Dog
    ['辰', '丑'], // Dragon destroys Ox
    ['巳', '申'], // Snake destroys Monkey
    ['午', '巳'], // Horse destroys Snake
    ['未', '午'], // Goat destroys Horse
    ['申', '寅'], // Monkey destroys Tiger
    ['酉', '子'], // Rooster destroys Rat
    ['戌', '卯'], // Dog destroys Rabbit
    ['亥', '未']  // Pig destroys Goat
  ];
  
  const results = [];
  
  destructionPairs.forEach(pair => {
    const [branch1, branch2] = pair;
    
    if (branches.includes(branch1) && branches.includes(branch2)) {
      results.push({
        branches: [branch1, branch2]
      });
    }
  });
  
  return results;
}
