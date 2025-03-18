// routes/pointsTable.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/series/points-table/ipl-2025'); // Update to actual series ID if needed
    const points = response.data.pointsTable;

    const tableData = points.map(team => ({
      teamName: team.teamName,
      matchesPlayed: team.matchesPlayed,
      wins: team.wins,
      losses: team.losses,
      ties: team.ties,
      noResult: team.noResult,
      points: team.points,
      netRunRate: team.netRunRate
    }));

    res.json({ pointsTable: tableData });
  } catch (error) {
    console.error('Fetch error (Points Table):', error.message);
    res.status(500).json({ error: 'Unable to fetch points table.' });
  }
});

module.exports = router;