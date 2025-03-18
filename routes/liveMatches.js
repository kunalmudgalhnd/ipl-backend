// routes/liveMatches.js
const express = require('express');
const router = express.Router();
const cache = require('../cache/dataCache');

router.get('/', (req, res) => {
  res.json({
    lastUpdated: cache.lastUpdated.liveMatches,
    matches: cache.liveMatches
  });
});

module.exports = router;