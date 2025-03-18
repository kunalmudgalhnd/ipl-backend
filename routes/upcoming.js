// routes/upcoming.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-match/upcoming');
    const matches = response.data.matches.slice(0, 10); // Next 10 matches

    const upcomingData = matches.map(match => ({
      matchTitle: `${match.team1.name} vs ${match.team2.name}`,
      matchId: match.matchId,
      venue: match.venue.name,
      startTime: match.startTime,
      status: match.status
    }));

    res.json({ upcomingMatches: upcomingData });
  } catch (error) {
    console.error('Fetch error (Upcoming Matches):', error.message);
    res.status(500).json({ error: 'Unable to fetch upcoming matches.' });
  }
});

module.exports = router;