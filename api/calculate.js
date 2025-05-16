// api/calculate.js - API endpoint for BaZi calculations
import calculateBaziChart from './bazi.js';

export default async function handler(req, res) {
  try {
    // Extract birth information from request
    const { year, month, day, hour, minute, gender, longitude, timezone, dst } = req.body;
    
    // Create birth date object
    const birthDate = new Date(year, month - 1, day, hour, minute);
    birthDate.dst = dst === 'yes'; // Add DST flag to date object
    
    // Create location object
    const location = {
      longitude: parseFloat(longitude),
      timezone: parseInt(timezone) * 60, // Convert hours to minutes
      dst: dst === 'yes'
    };
    
    // Calculate BaZi chart
    const chart = await calculateBaziChart(birthDate, location, gender);
    
    // Return the chart data
    res.status(200).json({ success: true, chart });
  } catch (error) {
    console.error('BaZi calculation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred during calculation'
    });
  }
}
