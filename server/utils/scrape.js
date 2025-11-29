import { chromium } from "playwright";

export async function scrapeWebsite(url) {
  let browser;

  try {
    console.log("Scraping:", url);

    browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Extract full readable text from the page
    const text = await page.evaluate(() => {
      return document.body.innerText.replace(/\s+/g, " ").trim();
    });

    return text;
  } catch (err) {
    console.error("Playwright scrape error:", err);
    throw new Error("Failed to scrape website");
  } finally {
    if (browser) await browser.close();
  }
}
