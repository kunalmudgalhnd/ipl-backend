// routes/highlights.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-match/finished');
    const finishedMatches = response.data.matches.slice(0, 5);

    const highlights = finishedMatches.map(match => ({
      matchId: match.matchId,
      matchTitle: `${match.team1.name} vs ${match.team2.name}`,
      videoLink: match.highlightsUrl || 'https://youtube.com',
      result: match.result
    }));

    res.json({ highlights });
  } catch (error) {
    console.error('Fetch error (Highlights):', error.message);
    res.status(500).json({ error: 'Unable to fetch highlights.' });
  }
});

module.exports = router;