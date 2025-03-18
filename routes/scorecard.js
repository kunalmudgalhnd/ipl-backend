// routes/scorecard.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:matchId', async (req, res) => {
  const matchId = req.params.matchId;

  try {
    const response = await axios.get(`https://www.cricbuzz.com/api/cricket-match/scorecard/${matchId}`);
    const innings = response.data.scorecard;

    const scorecardData = innings.map(inning => ({
      inningsTitle: inning.inningsName,
      runs: inning.runs,
      wickets: inning.wickets,
      overs: inning.overs,
      batsmen: inning.batsmen.map(player => ({
        name: player.name,
        runs: player.runs,
        balls: player.balls,
        fours: player.fours,
        sixes: player.sixes,
        strikeRate: player.strikeRate
      })),
      bowlers: inning.bowlers.map(player => ({
        name: player.name,
        overs: player.overs,
        maidens: player.maidens,
        runsConceded: player.runs,
        wickets: player.wickets,
        economy: player.economy
      }))
    }));

    res.json({ matchId, scorecard: scorecardData });
  } catch (error) {
    console.error('Fetch error (Scorecard):', error.message);
    res.status(500).json({ error: 'Unable to fetch scorecard.' });
  }
});

module.exports = router;