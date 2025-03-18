// routes/stats.js
const express = require('express');
const router = express.Router();
const cache = require('../cache/dataCache');

router.get('/', (req, res) => {
  res.json({
    lastUpdated: cache.lastUpdated.playerStats,
    topBatsmen: cache.playerStats.topScorers,
    topBowlers: cache.playerStats.topWicketTakers
  });
});

module.exports = router;