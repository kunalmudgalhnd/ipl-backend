// routes/pointsTable.js
const express = require('express');
const router = express.Router();
const cache = require('../cache/dataCache');

router.get('/', (req, res) => {
  if (!cache.pointsTable || cache.pointsTable.length === 0) {
    return res.status(503).json({ error: 'Points table not available yet. Please try again shortly.' });
  }

  res.json({
    lastUpdated: cache.lastUpdated.pointsTable,
    pointsTable: cache.pointsTable
  });
});

module.exports = router;