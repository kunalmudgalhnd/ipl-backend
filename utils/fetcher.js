const axios = require('axios');

// Base function to fetch data from URL
const fetchFromUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Fetch error at ${url}:`, error.message);
    return null;
  }
};

// 🟢 1. Fetch Live Matches
const fetchLiveMatches = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-match/live-matches';
  return await fetchFromUrl(url);
};

// 🔵 2. Fetch Finished Matches
const fetchFinishedMatches = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-match/finished-matches';
  return await fetchFromUrl(url);
};

// 🟡 3. Fetch Upcoming Matches
const fetchUpcomingMatches = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-match/upcoming-matches';
  return await fetchFromUrl(url);
};

// ⚪ 4. Fetch Teams & Squads
const fetchTeams = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-series/teams/ipl-2024';
  return await fetchFromUrl(url);
};

// 🟣 5. Fetch Multi-Live Matches (if available)
const fetchMultiLiveMatches = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-match/live-matches'; // Same as live
  return await fetchFromUrl(url);
};

// 🟠 6. Fetch Points Table
const fetchPointsTable = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-series/points-table/ipl-2024';
  return await fetchFromUrl(url);
};

// 🟤 7. Fetch Player Stats (Top Scorers / Wicket Takers)
const fetchPlayerStats = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-series/player-stats/ipl-2024';
  return await fetchFromUrl(url);
};

// 🔴 8. Fetch Match Schedule
const fetchMatchSchedule = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-series/schedule/ipl-2024';
  return await fetchFromUrl(url);
};

// 🔵 9. Fetch Scorecard for Specific Match
const fetchScorecard = async (matchId) => {
  const url = `https://www.cricbuzz.com/api/cricket-match/scorecard/${matchId}`;
  return await fetchFromUrl(url);
};

// 🟢 10. Fetch Commentary for Specific Match
const fetchCommentary = async (matchId) => {
  const url = `https://www.cricbuzz.com/api/cricket-match/commentary/${matchId}`;
  return await fetchFromUrl(url);
};

// 🔶 11. Fetch Match Highlights
const fetchHighlights = async () => {
  const url = 'https://www.cricbuzz.com/api/cricket-series/highlights/ipl-2024';
  return await fetchFromUrl(url);
};

// Export all fetch functions
module.exports = {
  fetchLiveMatches,
  fetchFinishedMatches,
  fetchUpcomingMatches,
  fetchTeams,
  fetchMultiLiveMatches,
  fetchPointsTable,
  fetchPlayerStats,
  fetchMatchSchedule,
  fetchScorecard,
  fetchCommentary,
  fetchHighlights
};