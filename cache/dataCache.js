// cache/dataCache.js
const axios = require('axios');

// Central cache object
const cache = {
  liveMatches: [],
  pointsTable: [],
  commentary: [],
  playerStats: [],
  stats: [],
  multiLive: [],
  lastUpdated: {}
};

// Individual fetch functions
const fetchLiveMatches = async () => {
  const res = await axios.get('https://www.cricbuzz.com/api/cricket-match/live');
  return res.data.matches || [];
};

const fetchPointsTable = async () => {
  const res = await axios.get('https://www.cricbuzz.com/api/series/points-table/ipl-2025');
  return res.data.pointsTable || [];
};

const fetchCommentary = async () => {
  const res = await axios.get('https://www.cricbuzz.com/api/cricket-match/live');
  const liveMatches = res.data.matches || [];

  const results = [];
  for (const match of liveMatches) {
    const matchId = match.matchId;
    const matchTitle = `${match.team1.name} vs ${match.team2.name}`;

    try {
      const commRes = await axios.get(`https://www.cricbuzz.com/api/cricket-match/commentary/${matchId}`);
      const commentaryData = commRes.data.commentary.map(item => ({
        over: item.overNumber,
        ball: item.ballNumber,
        time: item.timestamp,
        text: item.commentaryText
      }));

      results.push({
        matchId,
        matchTitle,
        commentary: commentaryData
      });
    } catch (err) {
      console.error(`Commentary error for ${matchTitle}:`, err.message);
    }
  }

  return results;
};

const fetchPlayerStats = async () => {
  const res = await axios.get('https://www.cricbuzz.com/api/stats/player');
  return res.data.players || [];
};

const fetchStats = async () => {
  const res = await axios.get('https://www.cricbuzz.com/api/stats/global');
  return res.data || [];
};

const fetchMultiLive = async () => {
  const res = await axios.get('https://www.cricbuzz.com/api/multi-live');
  return res.data.matches || [];
};

// Master fetch map
const fetchFunctions = {
  liveMatches: fetchLiveMatches,
  pointsTable: fetchPointsTable,
  commentary: fetchCommentary,
  playerStats: fetchPlayerStats,
  stats: fetchStats,
  multiLive: fetchMultiLive
};

// Auto-refresh function
const refreshAllData = async () => {
  for (const key of Object.keys(fetchFunctions)) {
    try {
      const data = await fetchFunctions[key]();
      cache[key] = data;
      cache.lastUpdated[key] = new Date().toISOString();
      console.log(`[${key}] refreshed at ${cache.lastUpdated[key]}`);
    } catch (error) {
      console.error(`Failed to refresh ${key}:`, error.message);
    }
  }
};

// Start refreshing every 30 seconds
refreshAllData(); // Run at startup
setInterval(refreshAllData, 30000);

module.exports = cache;