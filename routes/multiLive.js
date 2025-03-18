// routes/multilive.js
const express = require('express');
const router = express.Router();
const cache = require('../cache/dataCache');

router.get('/', (req, res) => {
  const liveCards = cache.liveMatches.map(match => ({
    matchId: match.matchId,
    matchTitle: `${match.team1.name} vs ${match.team2.name}`,
    score: match.score || 'Score not available',
    status: match.status || 'Live',
  }));

  res.json({
    lastUpdated: cache.lastUpdated.liveMatches,
    liveMatches: liveCards
  });
});

module.exports = router;