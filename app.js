// Main application JavaScript
import { calculateBaziChart, HEAVENLY_STEMS, EARTHLY_BRANCHES, SOLAR_TERMS } from './bazi.js';
import { calculateLifeGraph, interpretLifeGraph } from './lifegraph.js';
import { calculateVedicChart, calculateTransits } from './vedic.js';
import synthesis from './synthesis.js';

// Supabase configuration - PLEASE UPDATE THESE VALUES
const SUPABASE_URL = 'https://bpyllzwabiseudjplixz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweWxsendhYmlzZXVkanBsaXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMDk0MzcsImV4cCI6MjA2MjY4NTQzN30.kQl_L5DhUTU-GMkdveGGu_mSoW11fqDMAmlsmaHo7BA';

// Initialize Supabase client
let supabase;

// Application state
let currentChart = null;
let currentLocation = null;

// DOM elements
const elements = {
    birthDate: document.getElementById('birth-date'),
    birthTime: document.getElementById('birth-time'),
    gender: document.getElementById('gender'),
    birthLocation: document.getElementById('birth-location'),
    latitude: document.getElementById('latitude'),
    longitude: document.getElementById('longitude'),
    timezone: document.getElementById('timezone'),
    calculateBtn: document.getElementById('calculate-btn'),
    resultsSection: document.getElementById('results-section'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('error-message'),
    locationSuggestions: document.getElementById('location-suggestions')
};

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active panel
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    });
});

// Location search functionality
let searchTimeout;
elements.birthLocation.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;
    
    if (query.length < 3) {
        elements.locationSuggestions.style.display = 'none';
        return;
    }
    
    searchTimeout = setTimeout(() => {
        searchLocation(query);
    }, 300);
});

async function searchLocation(query) {
    try {
        // Using OpenStreetMap Nominatim API
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        
        if (data.length === 0) {
            elements.locationSuggestions.style.display = 'none';
            return;
        }
        
        elements.locationSuggestions.innerHTML = '';
        data.forEach(location => {
            const div = document.createElement('div');
            div.className = 'location-suggestion';
            div.textContent = location.display_name;
            div.onclick = () => selectLocation(location);
            elements.locationSuggestions.appendChild(div);
        });
        
        elements.locationSuggestions.style.display = 'block';
    } catch (error) {
        console.error('Location search error:', error);
    }
}

async function selectLocation(location) {
    elements.birthLocation.value = location.display_name;
    
    // Set hidden inputs
    const lat = parseFloat(location.lat);
    const lon = parseFloat(location.lon);
    
    elements.latitude.value = lat;
    elements.longitude.value = lon;
    
    // Get timezone for this location
    const timezone = await getTimezoneForLocation(lat, lon);
    elements.timezone.value = timezone;
    
    currentLocation = {
        latitude: lat,
        longitude: lon,
        timezone: timezone
    };
    
    elements.locationSuggestions.style.display = 'none';
}

async function getTimezoneForLocation(lat, lon) {
    try {
        // Using timezone API (you might need to replace this with your preferred service)
        const timestamp = Math.floor(Date.now() / 1000);
        const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&key=YOUR_GOOGLE_API_KEY`);
        const data = await response.json();
        
        if (data.status === 'OK') {
            // Return offset in hours
            return (data.rawOffset + data.dstOffset) / 3600;
        }
    } catch (error) {
        console.error('Timezone fetch error:', error);
    }
    
    // Fallback: estimate timezone from longitude
    return Math.round(lon / 15);
}

// Calculate button handler
elements.calculateBtn.addEventListener('click', calculateCharts);

async function calculateCharts() {
    // Validate inputs
    if (!validateInputs()) {
        return;
    }
    
    try {
        showLoading(true);
        hideError();
        
        // Get birth date and time
        const birthDate = new Date(
            elements.birthDate.value + 'T' + 
            elements.birthTime.value + ':00'
        );
        
        const location = {
            latitude: parseFloat(elements.latitude.value),
            longitude: parseFloat(elements.longitude.value),
            timezone: parseFloat(elements.timezone.value)
        };
        
        const gender = elements.gender.value;
        
        // Level 1: Calculate basic dates
        const dateConversions = calculateDateConversions(birthDate);
        displayDateConversions(dateConversions);
        
        // Level 2: Calculate Life Graph
        const lifeGraph = calculateLifeGraph(birthDate);
        displayLifeGraph(lifeGraph);
        
        // Level 3: Calculate BaZi Chart
        const baziChart = calculateBaziChart(birthDate, location, gender);
        currentChart = baziChart;
        displayBaziChart(baziChart);
        
        // Level 4: Calculate Vedic Chart
        const vedicChart = await calculateVedicChart(birthDate, location);
        const transits = await calculateTransits(birthDate, location, 120);
        displayVedicChart(vedicChart, transits);
        
        // Level 5: Synthesis
        const synthesisResult = synthesis.analyzeSynthesis(baziChart, lifeGraph, vedicChart, transits);
        displaySynthesis(synthesisResult);
        
        // Show results
        elements.resultsSection.style.display = 'block';
        
        // Save to Supabase (optional)
        if (supabase) {
            await saveToSupabase({
                birthDate,
                location,
                gender,
                baziChart,
                lifeGraph,
                vedicChart,
                transits,
                synthesis: synthesisResult
            });
        }
        
    } catch (error) {
        console.error('Calculation error:', error);
        showError('An error occurred during calculation: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function validateInputs() {
    if (!elements.birthDate.value) {
        showError('Please enter a birth date');
        return false;
    }
    
    if (!elements.birthTime.value) {
        showError('Please enter a birth time');
        return false;
    }
    
    if (!elements.gender.value) {
        showError('Please select a gender');
        return false;
    }
    
    if (!elements.birthLocation.value || !elements.latitude.value || !elements.longitude.value) {
        showError('Please select a birth location');
        return false;
    }
    
    return true;
}

// Level 1: Date Conversions
function calculateDateConversions(birthDate) {
    // Calculate Julian Day
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const hour = birthDate.getHours();
    const minute = birthDate.getMinutes();
    
    let julianDay = calculateJulianDay(year, month, day, hour, minute, 0);
    
    // Convert to Chinese Sexagenary Calendar
    // Base reference: Jan 1, 1900 was a Gengwu day
    const referenceJD = 2415021;
    const daysSinceReference = Math.floor(julianDay - referenceJD);
    let sexagenaryIndex = (47 + daysSinceReference) % 60;
    if (sexagenaryIndex < 0) sexagenaryIndex += 60;
    
    const stemIndex = sexagenaryIndex % 10;
    const branchIndex = sexagenaryIndex % 12;
    
    return {
        gregorianDate: birthDate.toLocaleString(),
        julianDay: julianDay,
        sexagenary: {
            stem: HEAVENLY_STEMS[stemIndex],
            branch: EARTHLY_BRANCHES[branchIndex],
            combined: HEAVENLY_STEMS[stemIndex].chinese + EARTHLY_BRANCHES[branchIndex].chinese
        }
    };
}

function calculateJulianDay(year, month, day, hour, minute, second) {
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

function displayDateConversions(conversions) {
    const container = document.getElementById('date-conversions');
    container.innerHTML = `
        <div>
            <h4>Gregorian Date</h4>
            <p>${conversions.gregorianDate}</p>
        </div>
        <div>
            <h4>Julian Day Number</h4>
            <p>${conversions.julianDay.toFixed(5)}</p>
        </div>
        <div>
            <h4>Chinese Sexagenary Date</h4>
            <p>
                <span class="chinese-char">${conversions.sexagenary.combined}</span><br>
                <span class="pinyin">${conversions.sexagenary.stem.pinyin} ${conversions.sexagenary.branch.pinyin}</span><br>
                <span class="element">${conversions.sexagenary.stem.element} ${conversions.sexagenary.branch.animal}</span>
            </p>
        </div>
    `;
}

// Level 2: Life Graph
function displayLifeGraph(lifeGraph) {
    const canvas = document.getElementById('life-graph');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw life graph
    const padding = 40;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw life curve
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < lifeGraph.length; i++) {
        const x = padding + (i / (lifeGraph.length - 1)) * graphWidth;
        const y = canvas.height - padding - (lifeGraph[i].value / 100) * graphHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Draw interpretation
    const interpretation = interpretLifeGraph(lifeGraph);
    document.getElementById('life-graph-interpretation').innerHTML = `
        <h4>Life Graph Interpretation</h4>
        <p>${interpretation}</p>
    `;
}

// Level 3: BaZi Chart
function displayBaziChart(baziChart) {
    const container = document.getElementById('bazi-chart');
    
    // Create main chart table
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Pillar</th>
            <th>Hour</th>
            <th>Day</th>
            <th>Month</th>
            <th>Year</th>
        </tr>
        <tr>
            <td>Heavenly Stem</td>
            <td class="stem-cell">${formatStem(baziChart.hourPillar.stem)}</td>
            <td class="stem-cell">${formatStem(baziChart.dayPillar.stem)}</td>
            <td class="stem-cell">${formatStem(baziChart.monthPillar.stem)}</td>
            <td class="stem-cell">${formatStem(baziChart.yearPillar.stem)}</td>
        </tr>
        <tr>
            <td>Earthly Branch</td>
            <td class="branch-cell">${formatBranch(baziChart.hourPillar.branch)}</td>
            <td class="branch-cell">${formatBranch(baziChart.dayPillar.branch)}</td>
            <td class="branch-cell">${formatBranch(baziChart.monthPillar.branch)}</td>
            <td class="branch-cell">${formatBranch(baziChart.yearPillar.branch)}</td>
        </tr>
        <tr>
            <td>Hidden Stems</td>
            <td>${formatHiddenStems(baziChart.hourPillar.branch)}</td>
            <td>${formatHiddenStems(baziChart.dayPillar.branch)}</td>
            <td>${formatHiddenStems(baziChart.monthPillar.branch)}</td>
            <td>${formatHiddenStems(baziChart.yearPillar.branch)}</td>
        </tr>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
    
    // Display luck pillars
    displayLuckPillars(baziChart.luckPillars);
    
    // Display interactions
    displayInteractions(baziChart.interactions);
}

function formatStem(stem) {
    return `
        <div>
            <span class="chinese-char">${stem.chinese}</span><br>
            <span class="pinyin">${stem.pinyin}</span><br>
            <span class="element">${stem.element}</span>
        </div>
    `;
}

function formatBranch(branch) {
    return `
        <div>
            <span class="chinese-char">${branch.chinese}</span><br>
            <span class="pinyin">${branch.pinyin}</span><br>
            <span class="element">${branch.animal}, ${branch.element}</span>
        </div>
    `;
}

function formatHiddenStems(branch) {
    if (!branch.hiddenStems) return '';
    
    return branch.hiddenStems.map(stem => `
        <span class="element">${stem.chinese} (${stem.element})</span>
    `).join('<br>');
}

function displayLuckPillars(luckPillars) {
    const container = document.getElementById('luck-pillars');
    
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Age</th>';
    
    luckPillars.forEach(pillar => {
        const th = document.createElement('th');
        th.textContent = `${pillar.startAge}-${pillar.endAge}`;
        headerRow.appendChild(th);
    });
    
    const stemRow = document.createElement('tr');
    stemRow.innerHTML = '<td>Stem</td>';
    
    const branchRow = document.createElement('tr');
    branchRow.innerHTML = '<td>Branch</td>';
    
    luckPillars.forEach(pillar => {
        const stemCell = document.createElement('td');
        stemCell.innerHTML = formatStem(pillar.stem);
        stemRow.appendChild(stemCell);
        
        const branchCell = document.createElement('td');
        branchCell.innerHTML = formatBranch(pillar.branch);
        branchRow.appendChild(branchCell);
    });
    
    table.appendChild(headerRow);
    table.appendChild(stemRow);
    table.appendChild(branchRow);
    
    container.innerHTML = '';
    container.appendChild(table);
}

function displayInteractions(interactions) {
    const container = document.getElementById('interactions');
    
    let html = '';
    
    // Combinations
    if (interactions.combinations.length > 0) {
        html += '<h4>Combinations (六合)</h4><ul>';
        interactions.combinations.forEach(combo => {
            html += `<li>${combo.branches.join(' + ')} → ${combo.result}</li>`;
        });
        html += '</ul>';
    }
    
    // Three Harmonies
    if (interactions.threeHarmonies.length > 0) {
        html += '<h4>Three Harmonies (三合)</h4><ul>';
        interactions.threeHarmonies.forEach(harmony => {
            const status = harmony.complete ? 'Complete' : 'Partial';
            html += `<li>${harmony.branches.join(' + ')} → ${harmony.result} (${status})</li>`;
        });
        html += '</ul>';
    }
    
    // Clashes
    if (interactions.clashes.length > 0) {
        html += '<h4>Clashes (六冲)</h4><ul>';
        interactions.clashes.forEach(clash => {
            html += `<li>${clash.branches.join(' ↔ ')}</li>`;
        });
        html += '</ul>';
    }
    
    // Harms
    if (interactions.harms.length > 0) {
        html += '<h4>Harms (六害)</h4><ul>';
        interactions.harms.forEach(harm => {
            html += `<li>${harm.branches.join(' × ')}</li>`;
        });
        html += '</ul>';
    }
    
    // Penalties
    if (interactions.penalties.length > 0) {
        html += '<h4>Penalties (刑)</h4><ul>';
        interactions.penalties.forEach(penalty => {
            if (penalty.type === 'SelfPenalty') {
                html += `<li>Self-penalty: ${penalty.branch}</li>`;
            } else if (penalty.type === 'UncivilizedPenalty') {
                html += `<li>Uncivilized penalty: ${penalty.branches.join(' + ')}</li>`;
            } else if (penalty.type === 'ThreeWayPenalty') {
                html += `<li>Three-way penalty: ${penalty.presentBranches.join(' + ')}</li>`;
            }
        });
        html += '</ul>';
    }
    
    // Destructions
    if (interactions.destructions.length > 0) {
        html += '<h4>Destructions (破)</h4><ul>';
        interactions.destructions.forEach(destruction => {
            html += `<li>${destruction.branches.join(' ⚡ ')}</li>`;
        });
        html += '</ul>';
    }
    
    container.innerHTML = html;
}

// Level 4: Vedic Chart
function displayVedicChart(vedicChart, transits) {
    // Display birth chart houses
    const housesContainer = document.getElementById('birth-houses');
    housesContainer.innerHTML = '<h4>12 Houses at Birth</h4>';
    
    const houseTable = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>House</th><th>Zodiac Sign</th><th>Planets</th><th>Significance</th>';
    houseTable.appendChild(headerRow);
    
    vedicChart.houses.forEach((house, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>House ${index + 1}</td>
            <td>${house.sign}</td>
            <td>${house.planets.map(p => p.name).join(', ') || 'None'}</td>
            <td>${getHouseSignificance(index + 1)}</td>
        `;
        houseTable.appendChild(row);
    });
    
    housesContainer.appendChild(houseTable);
    
    // Display transits
    const transitsContainer = document.getElementById('transits');
    transitsContainer.innerHTML = '<h4>Major Planetary Transits</h4>';
    
    transits.forEach(transit => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'transit-event';
        eventDiv.innerHTML = `
            <strong>${transit.date.toLocaleDateString()}</strong><br>
            ${transit.planet} enters House ${transit.toHouse}<br>
            <em>${transit.interpretation}</em>
        `;
        transitsContainer.appendChild(eventDiv);
    });
}

function getHouseSignificance(houseNumber) {
    const significances = {
        1: "Self, personality, appearance",
        2: "Wealth, possessions, values",
        3: "Communication, siblings, short trips",
        4: "Home, family, roots",
        5: "Creativity, children, romance",
        6: "Health, service, daily work",
        7: "Partnerships, marriage, contracts",
        8: "Transformation, shared resources, death",
        9: "Philosophy, higher education, travel",
        10: "Career, reputation, public image",
        11: "Friends, groups, hopes, wishes",
        12: "Spirituality, hidden things, endings"
    };
    
    return significances[houseNumber] || "";
}

// Level 5: Synthesis
function displaySynthesis(synthesisResult) {
    const container = document.getElementById('synthesis');
    
    let html = '<h4>Character Analysis</h4>';
    html += `<p>${synthesisResult.character.description}</p>`;
    
    html += '<h4>Major Life Themes</h4><ul>';
    synthesisResult.lifeThemes.forEach(theme => {
        html += `<li>${theme}</li>`;
    });
    html += '</ul>';
    
    html += '<h4>Significant Periods</h4>';
    synthesisResult.significantPeriods.forEach(period => {
        const overlapClass = `overlap-${period.overlapCount}`;
        html += `
            <div class="transit-event">
                <strong>${period.startDate.toLocaleDateString()} - ${period.endDate.toLocaleDateString()}</strong>
                <span class="overlap-indicator ${overlapClass}">${period.overlapCount} overlaps</span><br>
                <em>Sources:</em> ${period.sources}<br>
                <p>${period.interpretation}</p>
            </div>
        `;
    });
    
    html += '<h4>All Convergence Periods</h4>';
    synthesisResult.convergencePeriods.forEach(period => {
        if (!synthesisResult.significantPeriods.includes(period)) {
            const overlapClass = `overlap-${period.overlapCount}`;
            html += `
                <div class="transit-event">
                    <strong>${period.startDate.toLocaleDateString()} - ${period.endDate.toLocaleDateString()}</strong>
                    <span class="overlap-indicator ${overlapClass}">${period.overlapCount} overlaps</span><br>
                    <em>Sources:</em> ${period.systems.join(', ')}<br>
                    <p>${period.interpretation}</p>
                </div>
            `;
        }
    });
    
    container.innerHTML = html;
}

// Utility functions
function showLoading(show) {
    elements.loading.style.display = show ? 'block' : 'none';
    elements.calculateBtn.disabled = show;
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.display = 'block';
}

function hideError() {
    elements.errorMessage.style.display = 'none';
}

// Initialize Supabase
async function initializeSupabase() {
    try {
        if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
            supabase = window.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
    }
}

async function saveToSupabase(data) {
    if (!supabase) return;
    
    try {
        const { error } = await supabase
            .from('calculations')
            .insert({
                birth_date: data.birthDate,
                location: data.location,
                gender: data.gender,
                bazi_chart: data.baziChart,
                life_graph: data.lifeGraph,
                vedic_chart: data.vedicChart,
                transits: data.transits,
                synthesis: data.synthesis,
                created_at: new Date()
            });
            
        if (error) throw error;
        
        console.log('Saved to Supabase');
    } catch (error) {
        console.error('Failed to save to Supabase:', error);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeSupabase();
});

// Export functions for testing
export {
    calculateCharts,
    calculateDateConversions,
    displayBaziChart,
    displayLifeGraph,
    displayVedicChart,
    displaySynthesis
};
