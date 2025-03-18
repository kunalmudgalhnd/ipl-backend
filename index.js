const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Load cached data with auto-refresh
const cache = require('./cache/dataCache');

// ================= ROUTES =================
app.use('/api/liveMatches', require('./routes/liveMatches'));
app.use('/api/pointsTable', require('./routes/pointsTable'));
app.use('/api/commentary', require('./routes/commentary'));
app.use('/api/playerStats', require('./routes/playerStats'));
app.use('/api/multilive', require('./routes/multilive'));
app.use('/api/stats', require('./routes/stats'));

// Optional: Add other routes if needed
app.use('/api/fixtures', require('./routes/fixtures'));
app.use('/api/finished', require('./routes/finished'));
app.use('/api/highlights', require('./routes/highlights'));
app.use('/api/notification', require('./routes/notification'));
app.use('/api/scorecard', require('./routes/scorecard'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/upcoming', require('./routes/upcoming'));

// =========================================

// Test Route
app.get('/', (req, res) => {
  res.send('IPL Backend Server is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});