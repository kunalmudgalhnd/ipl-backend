const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

let latestScore = {
  team1: 'Loading...',
  team2: 'Loading...',
  score1: '0/0 (0.0)',
  score2: 'Yet to Bat',
  toss: 'Fetching toss...',
  commentary: ['Waiting for commentary...']
};

// Replace with your API URL (or fake for demo)
const fetchLiveScore = async () => {
  try {
    // Example: You can use any API or Cricbuzz unofficial endpoint
    const response = await axios.get('https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY&offset=0');

    const match = response.data.data[0]; // First match
    latestScore.team1 = match.teams[0];
    latestScore.team2 = match.teams[1];
    latestScore.score1 = match.score[0]?.r + '/' + match.score[0]?.w + ' (' + match.score[0]?.o + ' ov)';
    latestScore.score2 = match.score[1] ? match.score[1].r + '/' + match.score[1].w + ' (' + match.score[1].o + ' ov)' : 'Yet to Bat';
    latestScore.toss = match.tossWinner + ' won the toss and chose ' + match.tossDecision;
    latestScore.commentary = [match.status];
    
    console.log('Score updated!');
  } catch (error) {
    console.log('Error fetching score:', error.message);
  }
};

// Fetch every 30 seconds
cron.schedule('*/30 * * * * *', fetchLiveScore);

// Initial fetch
fetchLiveScore();

// API Endpoint
app.get('/live-score', (req, res) => {
  res.json(latestScore);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});