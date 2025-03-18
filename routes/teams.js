const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-series/ipl-2025/teams');

    const teamsData = response.data.teams.map(team => ({
      teamName: team.name,
      squad: team.players.map(player => player.name)
    }));

    res.json({ teams: teamsData });
  } catch (error) {
    console.error('Teams Error:', error.message);
    res.status(500).json({ error: 'Unable to fetch teams.' });
  }
});

module.exports = router;