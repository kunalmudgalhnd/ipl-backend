// routes/stats.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:matchId', async (req, res) => {
  const matchId = req.params.matchId;

  try {
    const response = await axios.get(`https://www.cricbuzz.com/api/cricket-match/stats/${matchId}`);

    const stats = {
      extras: response.data.extras,
      partnerships: response.data.partnerships,
      fallOfWickets: response.data.fallOfWickets
    };

    res.json({ matchId, stats });
  } catch (error) {
    console.error('Fetch error (Stats):', error.message);
    res.status(500).json({ error: 'Unable to fetch match stats.' });
  }
});

module.exports = router;