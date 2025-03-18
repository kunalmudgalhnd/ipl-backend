const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-schedule/matches');

    // Extract IPL fixtures
    const iplFixtures = response.data.matches
      .filter(match => match.seriesName.includes('Indian Premier League'))
      .map(match => ({
        matchTitle: `${match.team1.name} vs ${match.team2.name}`,
        date: match.startDate,
        time: match.startTime,
        venue: match.venue.name
      }));

    res.json({ fixtures: iplFixtures });
  } catch (error) {
    console.error('Fixtures Error:', error.message);
    res.status(500).json({ error: 'Unable to fetch fixtures.' });
  }
});

module.exports = router;