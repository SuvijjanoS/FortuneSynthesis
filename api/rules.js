// api/rules.js - BaZi calculation rules
export const FIVE_TIGERS_RULE = {
  '甲': '甲', // Jia or Ji year, Zi month starts with Jia
  '乙': '丙', // Yi or Geng year, Zi month starts with Bing
  '丙': '戊', // Bing or Xin year, Zi month starts with Wu
  '丁': '庚', // Ding or Ren year, Zi month starts with Geng
  '戊': '壬', // Wu or Gui year, Zi month starts with Ren
  '己': '甲', // Jia or Ji year, Zi month starts with Jia (same as 甲)
  '庚': '丙', // Yi or Geng year, Zi month starts with Bing (same as 乙)
  '辛': '戊', // Bing or Xin year, Zi month starts with Wu (same as 丙)
  '壬': '庚', // Ding or Ren year, Zi month starts with Geng (same as 丁)
  '癸': '壬'  // Wu or Gui year, Zi month starts with Ren (same as 戊)
};

export const FIVE_RATS_RULE = {
  '甲': '甲',
  '乙': '丙',
  '丙': '戊',
  '丁': '庚',
  '戊': '壬',
  '己': '甲',
  '庚': '丙',
  '辛': '戊',
  '壬': '庚',
  '癸': '壬'
};
