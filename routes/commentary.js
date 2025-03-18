// routes/commentary.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // Fetch all live matches
    const liveRes = await axios.get('https://www.cricbuzz.com/api/cricket-match/live');
    const liveMatches = liveRes.data.matches;

    const commentaryResults = await Promise.all(liveMatches.map(async match => {
      const matchId = match.matchId;
      const matchTitle = `${match.team1.name} vs ${match.team2.name}`;
      let commentaryData = [];

      try {
        const commRes = await axios.get(`https://www.cricbuzz.com/api/cricket-match/commentary/${matchId}`);
        commentaryData = commRes.data.commentary.map(item => ({
          over: item.overNumber,
          ball: item.ballNumber,
          time: item.timestamp,
          text: item.commentaryText
        }));
      } catch (err) {
        console.error(`Error fetching commentary for ${matchTitle}:`, err.message);
      }

      return { matchTitle, matchId, commentary: commentaryData };
    }));

    res.json({ liveCommentaries: commentaryResults });
  } catch (error) {
    console.error('Fetch error (Commentary):', error.message);
    res.status(500).json({ error: 'Unable to fetch live commentary.' });
  }
});

module.exports = router;