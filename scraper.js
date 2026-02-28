const { chromium } = require("playwright");

async function scrape(seed) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    // wait for dynamic JS table
    await page.waitForSelector("table");

    const numbers = await page.$$eval("td", cells =>
        cells
            .map(c => c.innerText.trim())
            .filter(x => /^[0-9]+$/.test(x))   // keep only pure numbers
            .map(Number)
    );

    await browser.close();
    return numbers.reduce((a, b) => a + b, 0);
}

(async () => {
    const seeds = [78,79,80,81,82,83,84,85,86,87];
    let total = 0;

    for (const seed of seeds) {
        const sum = await scrape(seed);
        console.log(`Seed ${seed} sum = ${sum}`);
        total += sum;
    }

    console.log("FINAL TOTAL =", total);
})();
