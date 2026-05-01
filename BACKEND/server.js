const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Security & Data Parsing)
app.use(cors());
app.use(express.json()); // HTML form ki jagah JSON data read karne ke liye

// ==========================================
// 🍃 MONGODB DATABASE CONNECTION
// ==========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 [VAULT UNLOCKED] MongoDB Database Connected!'))
    .catch((err) => console.log('❌ [CRITICAL ERROR] Database Connection Failed:', err.message));

// ==========================================
// 🚀 RADAR CHECK (Test Route)
// ==========================================
app.get('/', (req, res) => {
    res.json({ 
        status: "success", 
        message: "🚀 OrbitX Backend Engine is LIVE and receiving transmissions!" 
    });
});

// IGNITION sequence
app.listen(PORT, () => {
    console.log(`\n======================================`);
    console.log(`🛸 ORBITX ENGINE RUNNING ON PORT ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`======================================\n`);
});