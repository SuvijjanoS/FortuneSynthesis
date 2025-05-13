# FortuneSynthesis

Astrosynthesis: Multi-System Astrological Analysis Tool PRD
1. Executive Summary
Astrosynthesis is a comprehensive web application for astrological analysis that synthesizes multiple astrological systems (Chinese, Thai, Vedic, and Western) to provide users with a cohesive understanding of their cosmic influences across different frameworks. The application will calculate and display astrological charts, meaningful periods, and interpretations based on a user's birth details.
The application will support birth dates from 1850 to 2150 and provide projections up to 120 years from the birth date (extending to 2270 for those born in 2150). It will feature a modular design with five progressive levels of astrological insight, from basic date conversion to complex synthesis across systems.
Key Objectives

Create an accurate, user-friendly astrological analysis tool that integrates multiple cultural traditions
Provide precise calculations for various astrological systems without approximations
Enable both online (API-driven) and offline functionality
Design for future expansion to iOS/Android platforms and subscription-based feature unlocking
Synthesize cross-system astrological insights to identify periods of significant convergence

2. Product Overview
2.1 Product Description
Astrosynthesis is a multi-system astrological analysis web application that performs calculations across Chinese, Thai, Vedic, and Western astrological frameworks. Starting from simple date conversions, it builds to complex chart creation and ultimately provides a synthesis of interpretations across systems to identify periods of significant astrological importance.
2.2 Target Users

Astrology enthusiasts seeking deeper insights beyond a single system
Professional astrologers requiring accurate multi-system calculations
Researchers interested in comparative astrological systems
Spiritual seekers looking for guidance from multiple traditions
General users curious about astrological influences on their lives

2.3 Value Proposition

Multi-system integration: Combines insights from diverse astrological traditions that are typically analyzed in isolation
High precision: Uses accurate astronomical calculations rather than approximations
Cross-system synthesis: Identifies periods where multiple systems indicate similar influences
Progressive depth: Allows users to engage with increasing complexity as desired
Flexibility: Functions both online (for maximum accuracy) and offline (for convenience)

3. Feature Requirements
3.1 Input Requirements

Birth Date: Calendar selector for date (1850-2150)
Birth Time: Hour and minute selectors in 24-hour format
Birth Location:

Text field with autocomplete for city/location names
Ability to fine-tune with map selection or manual lat/long entry
Option to input time zone or have it auto-detected from location



3.2 Level One: Basic Date Conversion

Display user's input birth details (date, time, location)
Convert Gregorian date/time to precise Julian date
Convert Julian date to exact Chinese sexagenary date
Display day of week for birth date
Show local solar time for the birth location

Technical Requirements:

Implement accurate Julian Day Number calculation
Calculate Chinese solar terms accurately using astronomical data
Determine correct Heavenly Stem and Earthly Branch for year, month, and day

3.3 Level Two: Life Graph (Thai Astrology)

Calculate and display the 12 numbers of the Thai Life Graph
Plot the life graph visually showing fortune levels across the lifespan
Identify and highlight peak years and challenging years
Provide interpretation guide explaining how to read the graph
Allow toggling between different visualization modes (line graph, table, etc.)

Technical Requirements:

Implement Thai lunar calendar conversion
Calculate weekday influence correctly
Determine lunar month and 12-year animal cycle
Generate the 12 numerical values and their corresponding years

3.4 Level Three: BaZi Chart Analysis

Calculate and display the Four Pillars (Year, Month, Day, Hour)
Show each pillar's Heavenly Stem and Earthly Branch with:

Simplified Chinese characters
Pinyin pronunciation
English meaning/element association


Display hidden stems for each Earthly Branch
Calculate Ten-Year Luck Pillars from birth to 120 years
Identify and highlight all combinations, clashes, harms, penalties, and destructions
Provide interpretation of significant interactions

Technical Requirements:

Calculate precise solar term dates for determining Year and Month pillars
Implement time zone and daylight saving time corrections
Determine starting age and direction of Luck Pillars
Identify all traditional interactions between stems and branches

3.5 Level Four: House-Based Transit Analysis

Calculate and display the 12 astrological houses based on birth data
Show natal planet placements in houses and signs
Calculate and display transits of slow-moving planets (Sun excluded, plus Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto) through houses
Show entry and exit dates for each transit
Organize transits chronologically from birth to 120 years
Filter options for specific planets or time periods

Technical Requirements:

Implement house system calculations (Whole Sign or Placidus)
Calculate accurate planetary positions using ephemeris data
Compute house cusps and planet positions for birth chart
Project planetary movements for transit calculations

3.6 Level Five: Cross-System Synthesis

Analyze implications from all four levels (Chinese dates, Life Graph, BaZi, and Transits)
Identify periods where 2, 3, or 4 systems indicate similar influences
Highlight these convergence periods with specific dates/months/years
Summarize implications of convergence periods
Provide rationale based on the associated techniques
Allow filtering by type of influence (challenging, fortunate, transformative, etc.)

Technical Requirements:

Develop algorithm to compare implications across systems
Create categorization system for similar types of influences
Implement scoring mechanism for strength of convergence
Design clear visual presentation of synthesis results

3.7 User Interface Requirements

Clean, intuitive interface with responsive design
Progressive disclosure of complexity (clear path from Level 1 to Level 5)
Chart visualization with interactive elements
Toggle between simplified/detailed views
Save/export functionality for charts and analyses
Dark/light mode options
Language options (at minimum English, with framework for adding Chinese, Thai)

3.8 Non-Functional Requirements

Performance: Chart calculations complete within 3 seconds
Offline Functionality: Core features work without internet connection
Data Storage: Local storage of ephemeris data for offline use
Security: User data not stored on servers unless explicitly requested
Scalability: Architecture supports future expansion to mobile platforms
Accessibility: WCAG 2.1 AA compliance

4. Technical Architecture
4.1 System Components

Frontend UI Layer

React-based web application
Chart visualization using D3.js or Chart.js
Progressive web app capabilities for offline use


Calculation Engine

Core calculation modules for each astrological system
Cross-system synthesis algorithm
Ephemeris data processor


Data Storage

Local storage for user preferences and saved charts
IndexedDB for storing ephemeris data offline
Optional cloud storage for premium users


API Integration Layer

Swiss Ephemeris API integration
Geocoding API for location services
Authentication services (for future subscription features)



4.2 Key APIs and Data Sources

Swiss Ephemeris API

For precise planetary positions
Solar term calculations
House cusp determinations


Geocoding API (Google Maps or similar)

Location lookup and validation
Timezone determination
Latitude/longitude resolution


Chinese Calendar Conversion API

For verification of sexagenary dates
Cross-checking BaZi calculations


Offline Data Storage

Pre-calculated solar terms for 1850-2270
Planetary position tables at regular intervals
Location database with timezone information



4.3 Data Models
User Input Model
json{
  "birthDate": "YYYY-MM-DD",
  "birthTime": "HH:MM:SS",
  "birthLocation": {
    "name": "City, Country",
    "latitude": 0.0000,
    "longitude": 0.0000,
    "timezone": "Region/City",
    "offsetUTC": "+/-HH:MM"
  }
}
Julian Date Model
json{
  "julianDay": 0.0000,
  "modifiedJulianDay": 0.0000,
  "localSolarTime": "HH:MM:SS"
}
Chinese Calendar Model
json{
  "year": {
    "stem": {
      "chinese": "甲",
      "pinyin": "Jiǎ",
      "element": "Yang Wood",
      "number": 1
    },
    "branch": {
      "chinese": "子",
      "pinyin": "Zǐ",
      "animal": "Rat",
      "element": "Water",
      "number": 1
    }
  },
  "month": {
    "stem": { /* similar structure */ },
    "branch": { /* similar structure */ },
    "lunarMonth": 1,
    "isLeapMonth": false
  },
  "day": {
    "stem": { /* similar structure */ },
    "branch": { /* similar structure */ }
  },
  "hour": {
    "stem": { /* similar structure */ },
    "branch": { /* similar structure */ }
  }
}
Life Graph Model
json{
  "baseNumbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "ageMapping": {
    "1": 1950,
    "2": 1951,
    /* mapping continues */
  },
  "peaks": [
    { "age": 23, "value": 12, "year": 1973 },
    /* other peaks */
  ],
  "valleys": [
    { "age": 27, "value": 3, "year": 1977 },
    /* other valleys */
  ]
}
BaZi Chart Model
json{
  "pillars": {
    "year": {
      "stem": { /* as in Chinese Calendar Model */ },
      "branch": { /* as in Chinese Calendar Model */ },
      "hiddenStems": [
        { /* stem details */ }
      ]
    },
    "month": { /* similar structure */ },
    "day": { /* similar structure */ },
    "hour": { /* similar structure */ }
  },
  "luckPillars": [
    {
      "startAge": 3,
      "endAge": 13,
      "stem": { /* details */ },
      "branch": { /* details */ }
    },
    /* more luck pillars */
  ],
  "interactions": {
    "combinations": [
      {
        "type": "SixCombination",
        "elements": ["year.branch", "month.branch"],
        "result": "Water",
        "strength": 0.8
      },
      /* more combinations */
    ],
    "clashes": [ /* clash details */ ],
    "harms": [ /* harm details */ ],
    "penalties": [ /* penalty details */ ],
    "destructions": [ /* destruction details */ ]
  }
}
Astrological Houses Model
json{
  "houseSystem": "Placidus",
  "houses": [
    {
      "number": 1,
      "cusp": 15.5, // degrees in zodiac
      "sign": "Aries",
      "planets": [
        {
          "name": "Sun",
          "position": 18.2,
          "sign": "Aries",
          "retrograde": false
        },
        /* other planets */
      ]
    },
    /* houses 2-12 */
  ],
  "transits": [
    {
      "planet": "Saturn",
      "enterHouse": 10,
      "enterDate": "1975-06-18",
      "exitHouse": 10,
      "exitDate": "1977-09-21",
      "retrograde": true
    },
    /* more transits */
  ]
}
Synthesis Model
json{
  "convergencePeriods": [
    {
      "startDate": "1975-06-18",
      "endDate": "1975-08-25",
      "level": 3, // number of systems converging
      "systems": ["BaZi", "Life Graph", "Transit"],
      "nature": "Challenging",
      "description": "Period of significant career challenge with potential for growth",
      "rationale": {
        "BaZi": "Clash between Day and Luck Pillar...",
        "Life Graph": "Fortune level at 3, indicating...",
        "Transit": "Saturn entering 10th house..."
      }
    },
    /* more convergence periods */
  ]
}
5. Calculation Methods
5.1 Julian Date Calculation
The Julian Date (JD) is calculated using the formula:
JD = (1461 × (Y + 4800 + (M - 14)/12))/4 + (367 × (M - 2 - 12 × ((M - 14)/12)))/12 - (3 × ((Y + 4900 + (M - 14)/12)/100))/4 + D - 32075.5 + (H - 12)/24 + Min/1440 + Sec/86400
Where:

Y is the year
M is the month
D is the day
H is the hour
Min is the minutes
Sec is the seconds

Local solar time needs to be calculated based on:

Exact longitude
Equation of time on the given date

5.2 Chinese Sexagenary Date Calculation
5.2.1 Year Pillar
The Year Pillar is determined by:

Calculate the exact time of Lichun (Beginning of Spring) for both the birth year and previous year

Lichun occurs when the Sun's longitude reaches 315° (typically around February 3-5)


If birth datetime is before Lichun of the birth year, use previous year's pillar
Otherwise, use the birth year's pillar

The Heavenly Stem and Earthly Branch for a year are calculated:

Stem Index = (Year - 4) % 10 (giving values 0-9)
Branch Index = (Year - 4) % 12 (giving values 0-11)

These indexes map to the traditional stems and branches:

Stems: 甲(Jiǎ), 乙(Yǐ), 丙(Bǐng), 丁(Dīng), 戊(Wù), 己(Jǐ), 庚(Gēng), 辛(Xīn), 壬(Rén), 癸(Guǐ)
Branches: 子(Zǐ), 丑(Chǒu), 寅(Yín), 卯(Mǎo), 辰(Chén), 巳(Sì), 午(Wǔ), 未(Wèi), 申(Shēn), 酉(Yǒu), 戌(Xū), 亥(Hài)

5.2.2 Month Pillar
The Month Pillar is determined by:

Identify which solar term period the birth date falls in:

1st month (Tiger): Lichun to Jingzhe
2nd month (Rabbit): Jingzhe to Qingming
And so on through the 12 solar term periods


Determine the month's Heavenly Stem based on the Year Stem using the "Five Tigers" rule:

If Year Stem is Jia(甲) or Ji(己), 1st month's stem is Bing(丙)
If Year Stem is Yi(乙) or Geng(庚), 1st month's stem is Wu(戊)
If Year Stem is Bing(丙) or Xin(辛), 1st month's stem is Geng(庚)
If Year Stem is Ding(丁) or Ren(壬), 1st month's stem is Ren(壬)
If Year Stem is Wu(戊) or Gui(癸), 1st month's stem is Jia(甲)


From the 1st month's stem, subsequent months follow in sequence through the 10 stems

5.2.3 Day Pillar
The Day Pillar requires:

Calculate the Julian Day Number (JDN) for the birth date
Use a reference JDN with known stem-branch (e.g., Jan 1, 1900 was a Gengwu day)
Calculate: DaySexagenaryIndex = (JDN - ReferenceJDN + ReferenceIndex) % 60
Map this index to the appropriate stem and branch

5.2.4 Hour Pillar
The Hour Pillar is determined by:

Identify which two-hour period the birth time falls into:

Zi (11pm-1am), Chou (1am-3am), etc.


Determine the hour's Heavenly Stem based on the Day Stem using the "Five Rats" rule:

If Day Stem is Jia(甲) or Ji(己), Zi hour's stem is Jia(甲)
If Day Stem is Yi(乙) or Geng(庚), Zi hour's stem is Bing(丙)
If Day Stem is Bing(丙) or Xin(辛), Zi hour's stem is Wu(戊)
If Day Stem is Ding(丁) or Ren(壬), Zi hour's stem is Geng(庚)
If Day Stem is Wu(戊) or Gui(癸), Zi hour's stem is Ren(壬)


From the Zi hour's stem, subsequent hours follow in sequence through the 10 stems

5.3 Thai Life Graph Calculation
The Life Graph requires:

Determine the day of the week of birth (Sun=1, Mon=2, etc.)
Determine the birth lunar month in the Thai calendar
Determine the birth year in the 12-year animal cycle
For each of the 12 columns:

Add the corresponding numbers from steps 1-3
If the sum exceeds 12, subtract 12 repeatedly until ≤ 12


The resulting twelve 1-12 values are the Life Graph numbers
Map these values to ages corresponding to the person's life

5.4 BaZi Chart Calculation
The BaZi chart calculation has several components:

Calculate the Four Pillars (Year, Month, Day, Hour) as described in 5.2
Determine the Hidden Stems for each Earthly Branch:

Zi (Rat): Gui
Chou (Ox): Ji, Gui, Xin
Yin (Tiger): Jia, Bing, Wu
Mao (Rabbit): Yi
Chen (Dragon): Wu, Yi, Gui
Si (Snake): Bing, Geng, Wu
Wu (Horse): Ding, Ji
Wei (Goat): Ji, Ding, Yi
Shen (Monkey): Geng, Ren, Wu
You (Rooster): Xin
Xu (Dog): Wu, Xin, Ding
Hai (Pig): Ren, Jia


Calculate Ten-Year Luck Pillars:

Determine direction (forward/backward) based on gender and year stem:

Yang Male or Yin Female: forward
Yin Male or Yang Female: backward


Calculate starting age based on days to next or previous solar term
Generate the sequence of luck pillars following the stem-branch cycle


Identify all interactions between elements:

Combinations (Three Harmonies, Six Combinations)
Clashes (Six Clashes)
Harms (Six Harms)
Penalties (Self, Uncivilized, Three-Way)
Destructions (Six Destructions)



5.5 Astrological Houses and Transits

Calculate house cusps using either:

Whole Sign system
Placidus system


Calculate natal planet positions:

Determine ecliptic longitude for each planet at birth time
Assign to appropriate houses


Calculate transits:

For each slow-moving planet (Jupiter, Saturn, Uranus, Neptune, Pluto)
Calculate when planet enters and exits each house
For planets Mercury, Venus, Mars, calculate only significant transits
Generate transit timeline from birth to 120 years



5.6 Cross-System Synthesis

Categorize influences from each system:

Life Graph peaks and valleys
BaZi interactions (positive and challenging)
House transits by nature (beneficial, challenging, transformative)


Create timeline of all influences:

Map each influence to specific date ranges
Tag with categories (career, relationships, health, etc.)
Tag with nature (positive, challenging, transformative)


Identify convergence points:

Find date ranges where multiple systems indicate similar influences
Score by number of systems converging (2, 3, or 4)
Generate detailed rationale from each contributing system



6. Data Requirements
6.1 Ephemeris Data
For accurate calculations spanning 1850-2270, we need:

Solar Term Data

Exact times for all 24 solar terms from 1850-2270
Approximately 10,080 data points (24 terms × 420 years)


Planetary Position Data

Daily positions for Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn
Weekly positions for Uranus, Neptune, Pluto
Total data points: ~2.5 million



6.2 Reference Tables

Chinese Calendar Conversion Tables

Stem-Branch assignments for years 1850-2270
Leap month information for lunar calculations


Thai Calendar Conversion Tables

Lunar month data for 1850-2270
Weekday calculations


BaZi Reference Data

Hidden Stems for each Earthly Branch
Interaction matrices for combinations, clashes, etc.


Astrological House Reference Data

House meanings and correspondences
Planet-house interpretation guidelines



6.3 Data Acquisition and Storage

Online Sources

Swiss Ephemeris API for precise astronomical calculations
Hong Kong Observatory for solar term verification
Chinese Calendar API for cross-checking BaZi calculations


Local Storage Strategy

Pre-compute and store solar terms for offline use
Store sampled planetary positions at regular intervals
Store location database with timezone information
Implement interpolation algorithms for positions between stored points



7. User Experience Flow
7.1 Initial Setup and Input

User lands on welcome screen explaining the application
User enters birth details:

Date selection via calendar
Time selection via hour/minute pickers
Location selection via searchable dropdown with map confirmation


Application validates input and proceeds to Level One

7.2 Level Navigation

Level One displays automatically after input validation
Clear navigation controls allow movement between levels:

"Next Level" button to progress
Tab/pill navigation to jump between levels
"Back to Input" option to modify birth details



7.3 Level One Experience

Display user's input birth details
Show calculated day of week
Display Julian Date with explanation
Show Chinese sexagenary date with:

Year, Month, Day, Hour pillars
Chinese characters, pinyin, and meanings


Offer option to save/export this basic information

7.4 Level Two Experience

Display the 12 Life Graph numbers in a table
Visualize the Life Graph as an interactive line chart:

X-axis showing ages and corresponding years
Y-axis showing fortune levels (1-12)
Highlighting of peaks and valleys


Provide interpretation guide explaining:

What each number means
How to read patterns in the graph
Significance of peaks and valleys


Allow toggling between visualization modes

7.5 Level Three Experience

Display BaZi chart in traditional table format:

Year, Month, Day, Hour pillars
Heavenly Stems and Earthly Branches with Chinese characters, pinyin, and meanings


Show Hidden Stems for each branch
Display Ten-Year Luck Pillars with:

Age ranges
Corresponding years
Stems and branches


Highlight all interactions:

Color-coding for combinations, clashes, etc.
Interactive tooltips explaining each interaction


Provide interpretation section summarizing key aspects of the chart

7.6 Level Four Experience

Display natal chart with 12 houses:

House cusps and signs
Natal planet placements


Show timeline of significant transits:

Chronological listing from birth to 120 years
Entry and exit dates for each planet-house combination


Provide filtering options:

By planet
By house
By time period


Include interpretation guidelines for major transits

7.7 Level Five Experience

Display synthesis overview showing:

Timeline bar with color-coding for convergence intensity
Year-by-year summary of influences


Highlight convergence periods:

Sections where multiple systems indicate similar influences
Color-coding for 2, 3, or 4 system convergence


Provide detailed analysis for each convergence period:

Date ranges
Contributing systems
Nature of influence
Detailed rationale


Allow filtering by influence type, time period, or convergence level

8. Implementation Plan
8.1 Phase 1: Foundation (Months 1-2)

Set up project architecture and development environment
Implement core calculation modules:

Julian Date conversion
Chinese calendar conversion
Solar term calculations


Build basic UI framework with input collection
Develop data acquisition and storage strategy
Implement Level One functionality

8.2 Phase 2: Primary Systems (Months 3-4)

Implement Thai Life Graph calculations
Develop BaZi chart generation
Build interpretation engines for each system
Create visualization components for charts
Implement Levels Two and Three functionality

8.3 Phase 3: Advanced Systems (Months 5-6)

Implement astrological house calculations
Develop planetary transit engine
Create house-based interpretation system
Build transit timeline visualization
Implement Level Four functionality

8.4 Phase 4: Synthesis & Refinement (Months 7-8)

Develop cross-system synthesis algorithm
Implement convergence detection
Create synthesis visualization and reporting
Enhance all modules for accuracy and performance
Implement Level Five functionality

8.5 Phase 5: Finalization (Months 9-10)

Complete offline functionality
Optimize performance
Conduct comprehensive testing against reference data
Polish UI/UX
Prepare for deployment and launch

9. Technical Challenges and Mitigations
9.1 Calculation Accuracy
Challenge: Achieving precision in astronomical calculations across a 420-year span.
Mitigation:

Use high-precision ephemeris data from Swiss Ephemeris
Implement rigorous validation against multiple reference sources
Store pre-calculated values for critical points like solar terms
Use interpolation algorithms for positions between stored points

9.2 Data Size Management
Challenge: Managing the potentially large dataset needed for offline functionality.
Mitigation:

Use selective data sampling (store positions at intervals, interpolate between)
Implement progressive data loading
Compress data where possible
Employ smart caching strategies for frequently accessed data

9.3 Cross-System Interpretation
Challenge: Creating meaningful synthesis across different astrological traditions.
Mitigation:

Develop standardized categorization of influences
Create mapping tables between systems
Implement weighted scoring for convergence detection
Allow user customization of synthesis parameters

9.4 Offline Functionality
Challenge: Providing accurate calculations without internet access.
Mitigation:

Pre-compute and store essential ephemeris data
Implement efficient data storage and retrieval
Provide clear indicators when calculations might be approximate
Synchronize with online data when connection is available

10. Future Expansion
10.1 Mobile Applications

Develop native iOS application
Develop native Android application
Ensure data synchronization across platforms

10.2 Subscription Features

Premium chart styles and visualizations
Advanced interpretation modules
Personal notes and tracking
Chart comparison tools

10.3 Additional Astrological Systems

Western Progressions and Solar Returns
Hellenistic Time Lords
Mayan Calendar
Extended Vedic techniques

10.4 AI-Enhanced Interpretations

Natural language interpretations
Pattern recognition in life events
Personalized forecasting

11. Success Metrics

Calculation Accuracy: 99.9% match with reference sources for date conversions and chart generation
User Retention: 40%+ users progress from Level One to Level Two; 20%+ reach Level Five
Performance: Chart calculations complete within 3 seconds; synthesis within 5 seconds
User Satisfaction: 4.5+ star rating; positive feedback on synthesis insights
Technical: Offline functionality works for 95%+ of core features
