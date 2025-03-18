// routes/schedule.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-schedule/upcoming');
    const fixtures = response.data.fixtures;

    const schedule = fixtures.map(match => ({
      matchId: match.matchId,
      series: match.seriesName,
      matchTitle: `${match.team1.name} vs ${match.team2.name}`,
      date: match.date,
      venue: match.venue
    }));

    res.json({ schedule });
  } catch (error) {
    console.error('Fetch error (Schedule):', error.message);
    res.status(500).json({ error: 'Unable to fetch match schedule.' });
  }
});

module.exports = router;