import { askAI } from "../utils/api.js";

(async () => {
  const scrapedContent = "This is a test website about programming tutorials.";
  const question = "What is this website about?";
  
  const answer = await askAI(question, scrapedContent);
  console.log("AI Answer:", answer);
})();
