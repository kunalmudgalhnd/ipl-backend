const axios = require('axios');
const cache = require('./cache/dataCache');

async function refreshLiveMatches() {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/cricket-match/live');
    cache.liveMatches = response.data.matches || [];
    cache.lastUpdated.liveMatches = new Date().toISOString();
    console.log('Live Matches refreshed');
  } catch (error) {
    console.error('Error refreshing live matches:', error.message);
  }
}

async function refreshPointsTable() {
  try {
    const response = await axios.get('https://www.cricbuzz.com/api/series/points-table/ipl-2025');
    const points = response.data.pointsTable;

    cache.pointsTable = points.map(team => ({
      teamName: team.teamName,
      matchesPlayed: team.matchesPlayed,
      wins: team.wins,
      losses: team.losses,
      ties: team.ties,
      noResult: team.noResult,
      points: team.points,
      netRunRate: team.netRunRate
    }));

    cache.lastUpdated.pointsTable = new Date().toISOString();
    console.log('Points Table refreshed');
  } catch (error) {
    console.error('Error refreshing points table:', error.message);
  }
}

// Add similar refresh functions for commentary, playerStats, multiLive, stats...

// Call all refresh functions every 30 seconds
function startAutoRefresh() {
  refreshLiveMatches();
  refreshPointsTable();
  // Add more refresh functions here
  setInterval(() => {
    refreshLiveMatches();
    refreshPointsTable();
    // Add more refresh functions here
  }, 30000); // 30 seconds
}

module.exports = startAutoRefresh;