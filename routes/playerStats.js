// routes/playerStats.js
const express = require('express');
const router = express.Router();
const cache = require('../cache/dataCache');

router.get('/', (req, res) => {
  res.json({
    lastUpdated: cache.lastUpdated.playerStats,
    topScorers: cache.playerStats.topScorers,
    topWicketTakers: cache.playerStats.topWicketTakers
  });
});

module.exports = router;