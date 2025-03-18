// routes/notification.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-schedule/upcoming');
    const upcoming = response.data.fixtures.slice(0, 5); // Next 5 matches

    const notifications = upcoming.map(match => ({
      matchId: match.matchId,
      matchTitle: `${match.team1.name} vs ${match.team2.name}`,
      startTime: match.date,
      venue: match.venue
    }));

    res.json({ upcomingNotifications: notifications });
  } catch (error) {
    console.error('Fetch error (Notifications):', error.message);
    res.status(500).json({ error: 'Unable to fetch match notifications.' });
  }
});

module.exports = router;