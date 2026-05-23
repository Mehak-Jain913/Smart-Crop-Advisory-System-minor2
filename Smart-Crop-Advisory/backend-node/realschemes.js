import puppeteer from 'puppeteer';
import Scheme from './scheme.js';

const url = 'https://www.myscheme.gov.in/search/ministry/Ministry%20Of%20Agriculture%20and%20Farmers%20Welfare';

console.log('Server started');

async function scrapper() {
  console.log('Scraper started');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 40,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
  );

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

 let pageCount = 1;

while (true) {
  console.log(`Scraping page ${pageCount}`);

  // wait for cards
  await page.waitForFunction(
    () => document.querySelectorAll('a[href*="/schemes/"]').length > 0,
    { timeout: 15000 }
  );

  // scrape current page
  const products = await page.evaluate(() => {
  const cards = Array.from(
    document.querySelectorAll('div.flex.flex-col')
  );

  return cards
    .map(card => {
      const link = card.querySelector('a[href*="/schemes/"]');
      if (!link) return null;

      const lines = card.innerText
  .split('\n')
  .map(l => l.trim())
  .filter(Boolean);
      return {
        title:
          card.querySelector('h2')?.innerText.trim() ||
          link.innerText.trim(),

        url: link.href,

        // ✅ FULL CARD TEXT (description, ministry, etc.)
        card: lines.slice(1).join(' '),

        source: 'govt-website',
      };
    })
    .filter(Boolean);
});

 

  if (products.length === 0) {
    console.log('No products found, stopping.');
    break;
  }

  // upsert into MongoDB
  const bulkOps = products.map(p => ({
    updateOne: {
      filter: { url: p.url },
      update: { $set: p },
      upsert: true,
    },
  }));

  await Scheme.bulkWrite(bulkOps);
  console.log(`Saved ${products.length} schemes`);

  // 🔍 get current active page number
  // 🔍 get current active page number
const currentPage = await page.evaluate(() => {
  const active = document.querySelector('li.bg-green-700');
  return active ? active.innerText.trim() : null;
});

if (!currentPage) {
  console.log('No active page found, stopping.');
  break;
}

const nextPageNumber = String(Number(currentPage) + 1);

// 🔍 find next page li
const nextPageHandle = await page.evaluateHandle(
  (nextPageNumber) => {
    const items = Array.from(document.querySelectorAll('li'));
    return items.find(
      li => li.innerText.trim() === nextPageNumber
    );
  },
  nextPageNumber
);

if (!nextPageHandle) {
  console.log('No next page li found. Finished.');
  break;
}

// 📸 store first scheme URL to detect content change
const firstUrlBefore = products[0]?.url;

// 👉 click next page
await nextPageHandle.click();

// ⏳ wait for DOM to change
await page.waitForFunction(
  prevUrl => {
    const firstLink =
      document.querySelector('a[href*="/schemes/"]');
    return firstLink && firstLink.href !== prevUrl;
  },
  {},
  firstUrlBefore
);

 

  pageCount++;

  // polite delay
  await new Promise(r => setTimeout(r, 1200));

  // safety stop
  if (pageCount > 100) break;
}

  await browser.close();
  console.log('✅ Scraping completed');
}

scrapper();
export default scrapper;
