// routes/liveMatches.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-match/live');
    const matches = response.data.matches;

    const liveData = matches.map(match => ({
      matchTitle: `${match.team1.name} vs ${match.team2.name}`,
      matchId: match.matchId,
      venue: match.venue.name,
      status: match.status,
      startTime: match.startTime,
      team1: match.team1.name,
      team2: match.team2.name
    }));

    res.json({ liveMatches: liveData });
  } catch (error) {
    console.error('Fetch error (Live Matches):', error.message);
    res.status(500).json({ error: 'Unable to fetch live matches.' });
  }
});

module.exports = router;