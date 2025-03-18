// routes/commentary.js
const express = require('express');
const router = express.Router();
const cache = require('../cache/dataCache');

router.get('/', (req, res) => {
  res.json({
    lastUpdated: cache.lastUpdated.commentary,
    commentaries: cache.commentary
  });
});

module.exports = router;