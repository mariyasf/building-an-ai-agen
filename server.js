require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { analyzeGoal } = require("./ai-agents");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API ENDPOINTS
app.get("/", (req, res) => {
  res.send("Welcome to the AI Task Agent API!");
});

app.post("/api/goals", async (req, res) => {
  try {
    const { goalText, durationDays } = req.body;
    console.log("Received goal: ", goalText, "Duration: ", durationDays);

    if (!goalText || !durationDays) {
      return res.status(400).json({
        error: "Goal and duration are required!",
      });
    }

    const plan = await analyzeGoal(goalText, durationDays);


    res.json(plan);
  } catch (err) {
    console.error(err);
  }
});

// ============ SERVER START ============

app.listen(PORT, () => {
  console.log(`🚀 AI Task Agent running on http://localhost:${PORT}`);
});
