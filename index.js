const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/score", async (req, res) => {
  try {
    const response = await axios.get("https://www.cricbuzz.com/match-api/livematches.json");
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live score." });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is Live 🔥");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
