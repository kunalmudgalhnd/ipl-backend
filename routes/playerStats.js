// routes/playerStats.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/stats/ipl2025/top-performers'); // Adjust API as needed

    const topBatsmen = response.data.orangeCap.map(player => ({
      name: player.name,
      team: player.teamName,
      runs: player.runs,
      average: player.average,
      strikeRate: player.strikeRate
    }));

    const topBowlers = response.data.purpleCap.map(player => ({
      name: player.name,
      team: player.teamName,
      wickets: player.wickets,
      average: player.average,
      economy: player.economy
    }));

    res.json({
      orangeCap: topBatsmen,
      purpleCap: topBowlers
    });
  } catch (error) {
    console.error('Fetch error (Player Stats):', error.message);
    res.status(500).json({ error: 'Unable to fetch player stats.' });
  }
});

module.exports = router;