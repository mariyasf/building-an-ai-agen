const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [
      {
        role: "system",
        content:
          "You are an expert personal productivity coach and learning specialist. Create actionable, structured plans.",
      },
      { role: "user", content: "Hi mariya!" },
    ],
  });

  console.log(completion.choices[0].message.content);
}
main();
