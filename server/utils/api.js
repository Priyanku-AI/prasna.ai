import "../config/env.js";
import fetch from "node-fetch";

/**
 * Call AI API with scraped content and user question
 * Returns AI-generated answer
 */
export async function askAI(question, scrapedContent) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `${scrapedContent}\n\nQuestion: ${question}`,
          },
        ],
      }),
    });

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (err) {
    console.error("AI API error:", err);
    throw new Error("Failed to get AI response");
  }
}
