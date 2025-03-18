// routes/finished.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-match/finished');
    const matches = response.data.matches.slice(0, 15); // Last 15 matches

    const finishedData = matches.map(match => ({
      matchTitle: `${match.team1.name} vs ${match.team2.name}`,
      matchId: match.matchId,
      venue: match.venue.name,
      status: match.status,
      result: match.matchResult,
      date: match.startTime
    }));

    res.json({ finishedMatches: finishedData });
  } catch (error) {
    console.error('Fetch error (Finished Matches):', error.message);
    res.status(500).json({ error: 'Unable to fetch finished matches.' });
  }
});

module.exports = router;