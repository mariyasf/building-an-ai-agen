const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [{ role: "user", content: "Hi mariya!" }],
  });

  console.log("From main: ", completion.choices[0].message.content);
}
const analyzeGoal = async () => {
  const goalText = "learn JavaScript";
  const durationDays = 30;

  const prompt = `User wants to ${goalText} within ${durationDays} days. 
    create a structured learning/execution plan with:
    1. main milestones for each week.
    2. success matrices
    3. potential challenges
    4. motivational approch

    Return as JSON with this structure:
    {
      "milestones": ["milestone1", "milestone2", "milestone3"],
      "dailyTasks": [{"day": 1, "title": "....", "description": "..."}],
      "successMetrics": ["metric 1", "metric 2", "metric 3"],
      "challenges": ["challenge 1"],
      "motivationalApproach": "...."
    } 
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("From analyzeGoal: ", completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
};

console.log("Running main function...");
main();
console.log("Analyzing goal...");
analyzeGoal();
