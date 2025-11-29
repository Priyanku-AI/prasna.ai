import { scrapeWebsite } from "../utils/scrape.js";

(async () => {
  const text = await scrapeWebsite("https://bymoon.vercel.app/");
  console.log("Scraped content:");
  console.log(text.substring(0, 300)); // print first 300 chars
})();
