// api/constants.js - BaZi calculation constants
export const HEAVENLY_STEMS = [
  {
    chinese: '甲',
    pinyin: 'Jiǎ',
    number: 1,
    element: 'Yang Wood',
    color: '#90ee90',
    textColor: '#006400',
    description: 'Yang Wood represents the beginning of growth, like a seed sprouting or a young plant'
  },
  {
    chinese: '乙',
    pinyin: 'Yǐ',
    number: 2,
    element: 'Yin Wood',
    color: '#90ee90',
    textColor: '#006400',
    description: 'Yin Wood represents mature trees, flowers, and flexible wooden items'
  },
  {
    chinese: '丙',
    pinyin: 'Bǐng',
    number: 3,
    element: 'Yang Fire',
    color: '#ffcccc',
    textColor: '#8b0000',
    description: 'Yang Fire represents the sun, intense heat, and illuminating flame'
  },
  {
    chinese: '丁',
    pinyin: 'Dīng',
    number: 4,
    element: 'Yin Fire',
    color: '#ffcccc',
    textColor: '#8b0000',
    description: 'Yin Fire represents candles, cooking fire, and subtle warmth'
  },
  {
    chinese: '戊',
    pinyin: 'Wù',
    number: 5,
    element: 'Yang Earth',
    color: '#f5deb3',
    textColor: '#8b4513',
    description: 'Yang Earth represents mountains, large landscapes, and strong foundation'
  },
  {
    chinese: '己',
    pinyin: 'Jǐ',
    number: 6,
    element: 'Yin Earth',
    color: '#f5deb3',
    textColor: '#8b4513',
    description: 'Yin Earth represents soil, farming land, and pottery'
  },
  {
    chinese: '庚',
    pinyin: 'Gēng',
    number: 7,
    element: 'Yang Metal',
    color: '#d3d3d3',
    textColor: '#2f4f4f',
    description: 'Yang Metal represents hard metals, weapons, and firm determination'
  },
  {
    chinese: '辛',
    pinyin: 'Xīn',
    number: 8,
    element: 'Yin Metal',
    color: '#d3d3d3',
    textColor: '#2f4f4f',
    description: 'Yin Metal represents jewelry, decorative metals, and precision instruments'
  },
  {
    chinese: '壬',
    pinyin: 'Rén',
    number: 9,
    element: 'Yang Water',
    color: '#add8e6',
    textColor: '#00008b',
    description: 'Yang Water represents oceans, large rivers, and strong currents'
  },
  {
    chinese: '癸',
    pinyin: 'Guǐ',
    number: 10,
    element: 'Yin Water',
    color: '#add8e6',
    textColor: '#00008b',
    description: 'Yin Water represents rain, dew, small streams, and gentle moisture'
  }
];

export const EARTHLY_BRANCHES = [
  {
    chinese: '子',
    pinyin: 'Zǐ',
    animal: 'Rat',
    element: 'Yang Water',
    color: '#add8e6',
    textColor: '#00008b',
    hiddenStems: [
      { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water' }
    ],
    hours: '23:00-00:59',
    direction: 'North',
    season: 'Mid-Winter',
    month: 11
  },
  {
    chinese: '丑',
    pinyin: 'Chǒu',
    animal: 'Ox',
    element: 'Yin Earth',
    color: '#f5deb3',
    textColor: '#8b4513',
    hiddenStems: [
      { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth' },
      { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water' },
      { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal' }
    ],
    hours: '01:00-02:59',
    direction: 'North-Northeast',
    season: 'Late Winter',
    month: 12
  },
  {
    chinese: '寅',
    pinyin: 'Yín',
    animal: 'Tiger',
    element: 'Yang Wood',
    color: '#90ee90',
    textColor: '#006400',
    hiddenStems: [
      { chinese: '甲', pinyin: 'Jiǎ', element: 'Yang Wood' },
      { chinese: '丙', pinyin: 'Bǐng', element: 'Yang Fire' },
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth' }
    ],
    hours: '03:00-04:59',
    direction: 'East-Northeast',
    season: 'Early Spring',
    month: 1
  },
  {
    chinese: '卯',
    pinyin: 'Mǎo',
    animal: 'Rabbit',
    element: 'Yin Wood',
    color: '#90ee90',
    textColor: '#006400',
    hiddenStems: [
      { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood' }
    ],
    hours: '05:00-06:59',
    direction: 'East',
    season: 'Mid-Spring',
    month: 2
  },
  {
    chinese: '辰',
    pinyin: 'Chén',
    animal: 'Dragon',
    element: 'Yang Earth',
    color: '#f5deb3',
    textColor: '#8b4513',
    hiddenStems: [
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth' },
      { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood' },
      { chinese: '癸', pinyin: 'Guǐ', element: 'Yin Water' }
    ],
    hours: '07:00-08:59',
    direction: 'East-Southeast',
    season: 'Late Spring',
    month: 3
  },
  {
    chinese: '巳',
    pinyin: 'Sì',
    animal: 'Snake',
    element: 'Yin Fire',
    color: '#ffcccc',
    textColor: '#8b0000',
    hiddenStems: [
      { chinese: '丙', pinyin: 'Bǐng', element: 'Yang Fire' },
      { chinese: '庚', pinyin: 'Gēng', element: 'Yang Metal' },
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth' }
    ],
    hours: '09:00-10:59',
    direction: 'South-Southeast',
    season: 'Early Summer',
    month: 4
  },
  {
    chinese: '午',
    pinyin: 'Wǔ',
    animal: 'Horse',
    element: 'Yang Fire',
    color: '#ffcccc',
    textColor: '#8b0000',
    hiddenStems: [
      { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire' },
      { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth' }
    ],
    hours: '11:00-12:59',
    direction: 'South',
    season: 'Mid-Summer',
    month: 5
  },
  {
    chinese: '未',
    pinyin: 'Wèi',
    animal: 'Goat',
    element: 'Yin Earth',
    color: '#f5deb3',
    textColor: '#8b4513',
    hiddenStems: [
      { chinese: '己', pinyin: 'Jǐ', element: 'Yin Earth' },
      { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire' },
      { chinese: '乙', pinyin: 'Yǐ', element: 'Yin Wood' }
    ],
    hours: '13:00-14:59',
    direction: 'South-Southwest',
    season: 'Late Summer',
    month: 6
  },
  {
    chinese: '申',
    pinyin: 'Shēn',
    animal: 'Monkey',
    element: 'Yang Metal',
    color: '#d3d3d3',
    textColor: '#2f4f4f',
    hiddenStems: [
      { chinese: '庚', pinyin: 'Gēng', element: 'Yang Metal' },
      { chinese: '壬', pinyin: 'Rén', element: 'Yang Water' },
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth' }
    ],
    hours: '15:00-16:59',
    direction: 'West-Southwest',
    season: 'Early Autumn',
    month: 7
  },
  {
    chinese: '酉',
    pinyin: 'Yǒu',
    animal: 'Rooster',
    element: 'Yin Metal',
    color: '#d3d3d3',
    textColor: '#2f4f4f',
    hiddenStems: [
      { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal' }
    ],
    hours: '17:00-18:59',
    direction: 'West',
    season: 'Mid-Autumn',
    month: 8
  },
  {
    chinese: '戌',
    pinyin: 'Xū',
    animal: 'Dog',
    element: 'Yang Earth',
    color: '#f5deb3',
    textColor: '#8b4513',
    hiddenStems: [
      { chinese: '戊', pinyin: 'Wù', element: 'Yang Earth' },
      { chinese: '辛', pinyin: 'Xīn', element: 'Yin Metal' },
      { chinese: '丁', pinyin: 'Dīng', element: 'Yin Fire' }
    ],
    hours: '19:00-20:59',
    direction: 'West-Northwest',
    season: 'Late Autumn',
    month: 9
  },
  {
    chinese: '亥',
    pinyin: 'Hài',
    animal: 'Pig',
    element: 'Yin Water',
    color: '#add8e6',
    textColor: '#00008b',
    hiddenStems: [
      { chinese: '壬', pinyin: 'Rén', element: 'Yang Water' },
      { chinese: '甲', pinyin: 'Jiǎ', element: 'Yang Wood' }
    ],
    hours: '21:00-22:59',
    direction: 'North-Northwest',
    season: 'Early Winter',
    month: 10
  }
];

export const SOLAR_TERMS = [
  { term: 'Lichun', meaning: 'Spring begins', type: 'Jie' },
  { term: 'Yushui', meaning: 'Rain water', type: 'Qi' },
  { term: 'Jingzhe', meaning: 'Insects awaken', type: 'Jie' },
  { term: 'Chunfen', meaning: 'Spring equinox', type: 'Qi' },
  { term: 'Qingming', meaning: 'Clear and bright', type: 'Jie' },
  { term: 'Guyu', meaning: 'Grain rain', type: 'Qi' },
  { term: 'Lixia', meaning: 'Summer begins', type: 'Jie' },
  { term: 'Xiaoman', meaning: 'Grain full', type: 'Qi' },
  { term: 'Mangzhong', meaning: 'Grain in ear', type: 'Jie' },
  { term: 'Xiazhi', meaning: 'Summer solstice', type: 'Qi' },
  { term: 'Xiaoshu', meaning: 'Slight heat', type: 'Jie' },
  { term: 'Dashu', meaning: 'Great heat', type: 'Qi' },
  { term: 'Liqiu', meaning: 'Autumn begins', type: 'Jie' },
  { term: 'Chushu', meaning: 'End of heat', type: 'Qi' },
  { term: 'Bailu', meaning: 'White dew', type: 'Jie' },
  { term: 'Qiufen', meaning: 'Autumn equinox', type: 'Qi' },
  { term: 'Hanlu', meaning: 'Cold dew', type: 'Jie' },
  { term: 'Shuangjiang', meaning: 'Frost descends', type: 'Qi' },
  { term: 'Lidong', meaning: 'Winter begins', type: 'Jie' },
  { term: 'Xiaoxue', meaning: 'Light snow', type: 'Qi' },
  { term: 'Daxue', meaning: 'Heavy snow', type: 'Jie' },
  { term: 'Dongzhi', meaning: 'Winter solstice', type: 'Qi' },
  { term: 'Xiaohan', meaning: 'Slight cold', type: 'Jie' },
  { term: 'Dahan', meaning: 'Great cold', type: 'Qi' }
];

export const SOLAR_TERM_MONTHS = {
  'Lichun': 1,
  'Jingzhe': 2,
  'Qingming': 3,
  'Lixia': 4,
  'Mangzhong': 5,
  'Xiaoshu': 6,
  'Liqiu': 7,
  'Bailu': 8,
  'Hanlu': 9,
  'Lidong': 10,
  'Daxue': 11,
  'Xiaohan': 12
};
