const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-match/live');

    const liveMatches = response.data.matches
      .filter(match => match.state === 'LIVE')
      .map(match => ({
        matchTitle: `${match.team1.name} vs ${match.team2.name}`,
        score: match.score,
        status: match.status
      }));

    res.json({ liveMatches });
  } catch (error) {
    console.error('Multi-Live Error:', error.message);
    res.status(500).json({ error: 'Unable to fetch live matches.' });
  }
});

module.exports = router;