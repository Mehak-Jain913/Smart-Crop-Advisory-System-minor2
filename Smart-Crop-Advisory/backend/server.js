import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { fetchWeatherApi } from 'openmeteo';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
// import realschemes from './realschemes.js';
import User from './models/User.js';
import ChatHistory from './models/ChatHistory.js';
import Recommendation from './models/Recommendation.js';
import Scheme from './scheme.js';

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'smartcrop_secret';
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcrop';

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
console.log('🚀 Starting SmartCrop Backend...');
// ─── MongoDB ───────────────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected:', MONGO_URI))
  .catch((err) => console.error('❌ MongoDB error:', err.message));

// ─── Gemini AI ─────────────────────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

async function geminiText(prompt) {
  // const res = await ai.models.generateContent({
  //   model: 'gemini-2.0-flash',
  //   contents: prompt,
  // });
  // return res.text;

  //const {prompt}=req.body
    console.log(prompt)
   
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "gemma4",
      prompt,
      stream: false
    }
  );

  return response.data.response;
}


// ─── Auth Middleware ───────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token' });
    return;
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

// ══════════════════════════════════════════════════════════════════════════════
//  AUTH ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' });
    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
//  WEATHER ROUTE  (Open-Meteo — free, no key needed)
// ══════════════════════════════════════════════════════════════════════════════

app.get('/api/weather', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) ;
    const lon = parseFloat(req.query.lon) ;
    console.log(lat,lon)
    const params = {
      latitude: lat,
      longitude: lon,
      hourly: ['temperature_2m', 'relative_humidity_2m', 'precipitation_probability', 'rain', 'windspeed_10m'],
      daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max', 'weathercode'],
      forecast_days: 7,
      timezone: 'Asia/Kolkata',
    };

    const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
    const r = responses[0];
    const hourly = r.hourly();
    const daily = r.daily();

   // console.log(r)

    const toArr = (start, end, step) => {
      const a = [];
      for (let t = Number(start); t < Number(end); t += step) {
        a.push(new Date(t * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      }
      return a;
    };

    const hourlyTimes = toArr(hourly.time(), hourly.timeEnd(), hourly.interval());
    const dailyTimes = toArr(daily.time(), daily.timeEnd(), 86400);

    const WMO = {
      0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Icy Fog', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
      61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
      71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow',
      80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers',
      95: 'Thunderstorm', 96: 'Thunderstorm w/ Hail', 99: 'Heavy Thunderstorm',
    };

    const hourlyData = hourlyTimes.slice(0, 24).map((time, i) => ({
      time,
      temperature: Math.round(hourly.variables(0).valuesArray()[i] * 10) / 10,
      humidity: Math.round(hourly.variables(1).valuesArray()[i]),
      rainChance: Math.round(hourly.variables(2).valuesArray()[i]),
      rain: Math.round(hourly.variables(3).valuesArray()[i] * 10) / 10,
      windSpeed: Math.round(hourly.variables(4).valuesArray()[i] * 10) / 10,
    }));

    const dailyData = dailyTimes.map((date, i) => ({
      date,
      maxTemp: Math.round(daily.variables(0).valuesArray()[i]),
      minTemp: Math.round(daily.variables(1).valuesArray()[i]),
      rainChance: Math.round(daily.variables(2).valuesArray()[i]),
      condition: WMO[daily.variables(3).valuesArray()[i]] || 'Clear',
    }));

    const current = hourlyData[0];
 console.log(current)
    res.json({
      current: {
        temperature: `${current.temperature}°C`,
        humidity: `${current.humidity}%`,
        rainfall: `${current.rainChance}% chance`,
        windSpeed: `${current.windSpeed} km/h`,
        condition: dailyData[0]?.condition || 'Clear',
      },
      hourly: hourlyData,
      daily: dailyData,
      location: { lat: r.latitude(), lon: r.longitude() },
    });
  } catch (err) {
    console.error('Weather error:', err);
    // Fallback mock when Open-Meteo is unreachable
    res.json({
      current: { temperature: '28°C', humidity: '65%', rainfall: '20% chance', windSpeed: '14 km/h', condition: 'Partly Cloudy' },
      hourly: [],
      daily: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-IN'),
        maxTemp: 32 - i, minTemp: 22 - i, rainChance: 20 + i * 5, condition: 'Partly Cloudy',
      })),
      location: { lat: 22.7196, lon: 75.8577 },
    });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
//  MARKET PRICES ROUTE (Realistic live-ish data with daily variation)
// ══════════════════════════════════════════════════════════════════════════════

const BASE_PRICES = [
  { crop: 'Wheat', base: 2125, location: 'Punjab', unit: '₹/Qtl' },
  { crop: 'Rice (Basmati)', base: 4200, location: 'Haryana', unit: '₹/Qtl' },
  { crop: 'Rice (Common)', base: 1940, location: 'UP', unit: '₹/Qtl' },
  { crop: 'Cotton', base: 6080, location: 'Gujarat', unit: '₹/Qtl' },
  { crop: 'Sugarcane', base: 315, location: 'Maharashtra', unit: '₹/Qtl' },
  { crop: 'Maize', base: 1962, location: 'Bihar', unit: '₹/Qtl' },
  { crop: 'Soybean', base: 4300, location: 'MP', unit: '₹/Qtl' },
  { crop: 'Mustard', base: 5400, location: 'Rajasthan', unit: '₹/Qtl' },
  { crop: 'Chickpea (Chana)', base: 5200, location: 'MP', unit: '₹/Qtl' },
  { crop: 'Turmeric', base: 7800, location: 'Telangana', unit: '₹/Qtl' },
];

function getMarketData() {
  // Daily seed ensures consistent prices per day but varies each day
  const seed = Math.floor(Date.now() / (1000 * 60 * 30)); // changes every 30 min
  return BASE_PRICES.map((item, idx) => {
    const variation = Math.sin(seed + idx) * 0.04; // ±4%
    const price = Math.round(item.base * (1 + variation));
    const prevPrice = Math.round(item.base * (1 + Math.sin(seed - 1 + idx) * 0.04));
    const trend = price > prevPrice ? 'up' : price < prevPrice ? 'down' : 'stable';
    const changePct = (((price - prevPrice) / prevPrice) * 100).toFixed(1);
    return {
      id: idx + 1,
      crop: item.crop,
      price: `₹${price.toLocaleString('en-IN')} / Qtl`,
      priceRaw: price,
      location: item.location,
      trend,
      change: `${changePct > 0 ? '+' : ''}${changePct}%`,
      unit: item.unit,
      lastUpdated: new Date().toLocaleTimeString('en-IN'),
    };
  });
}

app.get('/api/market', (req, res) => {
  res.json(getMarketData());
});

// ══════════════════════════════════════════════════════════════════════════════
//  CROP RECOMMENDATION  (Gemini AI)
// ══════════════════════════════════════════════════════════════════════════════

app.post('/api/recommend', async (req, res) => {
  try {
    const { location, soilType, landArea, season, userId } = req.body;
    if (!location || !soilType || !landArea || !season) {
      return res.status(400).json({ message: 'location, soilType, landArea, season are required' });
    }

    const prompt = `You are an expert Indian agricultural advisor. A farmer has the following farm details:
- Location: ${location}
- Soil Type: ${soilType}
- Land Area: ${landArea} acres
- Season: ${season}

Based on these details, provide a JSON recommendation (only return raw JSON, no markdown):
{
  "crop": "Best crop name",
  "yield": "Expected yield like '4,200 Kg'",
  "profit": "Expected profit like '₹88,000'",
  "reason": "2-3 sentence explanation",
  "mixFarming": {
    "suggestion": "Crop A + Crop B",
    "benefit": "Main benefit",
    "profitIncrease": "₹18,000 Extra"
  },
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    const rawAI = await geminiText(prompt);
    const jsonMatch = rawAI.match(/\{[\s\S]*\}/);
    let result;
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0]);
    } else {
      // Fallback if AI doesn't return clean JSON
      result = {
        crop: 'Wheat', yield: '4,200 Kg', profit: '₹88,000',
        reason: 'Wheat is ideal for this soil and season combination.',
        mixFarming: { suggestion: 'Wheat + Mustard', benefit: 'Higher Profit & Pest Control', profitIncrease: '₹18,000 Extra' },
        tips: ['Use certified seeds', 'Irrigate at crown root initiation', 'Apply DAP fertilizer at sowing'],
      };
    }

    // Save to MongoDB
    const rec = await Recommendation.create({
      userId: userId || null,
      input: { location, soilType, landArea: Number(landArea), season },
      result: { ...result, rawAI },
    });

    res.json({ ...result, id: rec._id });
  } catch (err) {
    console.error('Recommend error:', err);
    res.status(500).json({ message: 'AI recommendation failed', error: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
//  CHATBOT  (Gemini AI — Kisan Mitra)
// ══════════════════════════════════════════════════════════════════════════════

const KISAN_SYSTEM_PROMPT = `You are Kisan Mitra, a friendly and knowledgeable Indian agricultural AI assistant. You help farmers with:
- Crop recommendations and farming techniques
- Weather interpretation for farming
- Disease identification and treatment
- Government schemes and subsidies
- Market prices and selling strategies
- Irrigation and water management
- Fertilizer and pesticide guidance

Rules:
- Answer in the same language the user writes (Hindi or English or mix)
- Be warm, practical, and use simple language farmers understand
- Keep answers concise but complete (2-4 sentences usually)
- When giving chemical recommendations, always mention safety precautions
- If a question is unrelated to agriculture, politely redirect to farming topics`;

app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    // Build conversation history if sessionId provided
    let historyContext = '';
    if (sessionId) {
      const history = await ChatHistory.findOne({ sessionId }).lean();
      if (history && history.messages.length > 0) {
        const recent = history.messages.slice(-6); // last 3 exchanges
        historyContext = recent.map(m => `${m.role === 'user' ? 'Farmer' : 'Kisan Mitra'}: ${m.text}`).join('\n');
      }
    }

    const fullPrompt = `${KISAN_SYSTEM_PROMPT}\n\n${historyContext ? `Recent conversation:\n${historyContext}\n\n` : ''}Farmer: ${message}\nKisan Mitra:`;

    const reply = await geminiText(fullPrompt);

    // Save to MongoDB
    if (sessionId) {
      await ChatHistory.findOneAndUpdate(
        { sessionId },
        {
          $set: { userId: userId || null },
          $push: {
            messages: {
              $each: [
                { role: 'user', text: message },
                { role: 'model', text: reply },
              ],
            },
          },
        },
        { upsert: true, new: true }
      );
    }

    res.json({ reply, sessionId });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ message: 'Chatbot error', error: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
//  DISEASE DETECTION  (Gemini Vision)
// ══════════════════════════════════════════════════════════════════════════════

app.post('/api/disease', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body;
    if (!imageBase64) return res.status(400).json({ message: 'imageBase64 is required' });

    const prompt = `You are an expert plant pathologist. Analyze this crop/plant image and identify any diseases or pests.
Return ONLY raw JSON (no markdown):
{
  "disease": "Disease name (or 'Healthy Plant' if no disease)",
  "confidence": "Percentage like '94%'",
  "severity": "Low / Medium / High / None",
  "solution": "Practical treatment steps (2-3 sentences)",
  "pesticide": "Specific chemical recommendation with dosage",
  "prevention": "Prevention tip for future",
  "isHealthy": false
}`;

    // const res2 = await ai.models.generateContent({
    //   model: 'gemini-2.0-flash',
    //   contents: [
    //     {
    //       parts: [
    //         { text: prompt },
    //         { inlineData: { mimeType, data: imageBase64 } },
    //       ],
    //     },
    //   ],
    // });

    const rawAI = geminiText(prompt + `\n\n[Image data: ${mimeType}; base64, length: ${imageBase64.length} chars]`);
    //const jsonMatch = rawAI.match(/\{[\s\S]*\}/);
    // let result;
    // if (jsonMatch) {
    //   result = JSON.parse(jsonMatch[0]);
    // } else {
    //   result = {
    //     disease: 'Unable to analyze', confidence: 'N/A', severity: 'Unknown',
    //     solution: 'Please upload a clearer image of the affected plant part.',
    //     pesticide: 'Consult a local agronomist.',
    //     prevention: 'Maintain proper plant hygiene and spacing.',
    //     isHealthy: false,
    //   };
    // }
console.log(rawAI)
    res.json(rawAI);
  } catch (err) {
    console.error('Disease detection error:', err);
    res.status(500).json({ message: 'Disease detection failed', error: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD  (Aggregated: Weather + Market + Stats)
// ══════════════════════════════════════════════════════════════════════════════

app.post('/api/dashboard', async (req, res) => {
  console.log('Received dashboard request with body:', req.body);
  try {
    let weatherSummary = { temperature: '28°C', condition: 'Clear', humidity: '65%' };
    try {
      console.log('Fetching weather for dashboard...');
      const wRes = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
        latitude: 22.635622499999997, longitude: 75.88755025,
        hourly: ['temperature_2m', 'relative_humidity_2m'],
        daily: ['temperature_2m_max', 'weathercode'],
        forecast_days: 1, timezone: 'Asia/Kolkata',
      });
      const w = wRes[0];
      const temp = Math.round(w.hourly().variables(0).valuesArray()[0]);
      const hum = Math.round(w.hourly().variables(1).valuesArray()[0]);
      const WMO = { 0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast', 61: 'Rainy', 80: 'Showers', 95: 'Thunderstorm' };
      const code = w.daily().variables(1).valuesArray()[0];
      weatherSummary = { temperature: `${temp}°C`, condition: WMO[code] || 'Clear', humidity: `${hum}%` };
    } catch (_) { }

    const market = getMarketData();
    const topCrop = market.filter(m => m.trend === 'up').sort((a, b) => b.priceRaw - a.priceRaw)[0];

    // DB Stats
    const [totalUsers, totalRecs] = await Promise.all([
      User.countDocuments(),
      Recommendation.countDocuments(),
    ]);

    const yieldData = [
      { name: 'Jan', yield: 400 }, { name: 'Feb', yield: 300 }, { name: 'Mar', yield: 550 },
      { name: 'Apr', yield: 480 }, { name: 'May', yield: 700 }, { name: 'Jun', yield: 650 },
    ];

    res.json({
      weather: weatherSummary,
      recommendedCrop: 'Wheat',
      expectedYield: '7.2 Tons',
      estimatedProfit: '₹1.4 Lakhs',
      irrigation: { requirement: '15 mm Water', timing: 'Tomorrow, 6:00 AM' },
      topMarketCrop: topCrop ? { name: topCrop.crop, price: topCrop.price, trend: topCrop.trend } : null,
      yieldData,
      priceData: market.slice(0, 4).map(m => ({ name: m.crop.split(' ')[0], price: m.priceRaw })),
      stats: { totalUsers, totalRecommendations: totalRecs },
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
//  SCHEMES  (Static Gov Data)
// ══════════════════════════════════════════════════════════════════════════════

app.post('/api/schemes', async(req, res) => {
  const govscheme= await Scheme.find({})
  console.log(govscheme.data)
  res.json(govscheme);
});

// ─── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.post('/profile',async(req,res)=>{
  const email=req.body.email
  const user=await User.findOne({email:email})
  console.log(user)
  res.json({user})
})

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 SmartCrop Backend running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB: ${MONGO_URI}`);
  console.log(`🤖 Gemini AI: Enabled`);
});
