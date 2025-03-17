const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is Live ✅");
});

app.get("/score", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.cricbuzz.com/cricket-match/live-scores");
    const $ = cheerio.load(data);

    const match = $(".cb-mtch-lst.cb-col.cb-col-100.cb-tms-itm").first();

    const team1 = match.find(".cb-hmscg-tm-nm").first().text().trim();
    const team2 = match.find(".cb-hmscg-tm-nm").last().text().trim();
    const matchTitle = `${team1} vs ${team2}`;

    let score = match.find(".cb-hmscg-tm-bat-scr").first().text().trim();
    
    // If score is still empty, try another selector (for completed matches)
    if (!score) {
      score = match.find(".cb-scr-wll-chvrn.cb-ltst-crd").first().text().trim();
    }

    const status = match.find(".cb-text-live, .cb-text-complete, .cb-text-preview").first().text().trim();

    res.json({
      matchTitle,
      score: score || "Score not available",
      status
    });

  } catch (error) {
    console.error("Scraping Error:", error.message);
    res.status(500).json({ error: "Error fetching live score." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
