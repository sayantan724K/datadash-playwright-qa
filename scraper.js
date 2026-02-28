const { chromium } = require("playwright");

async function scrape(seed) {
    const url = `https://sanand0.github.io/tdsdata/assignment2/${seed}.html`;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const numbers = await page.$$eval("td", tds =>
        tds.map(td => td.innerText.trim())
           .filter(x => /^[0-9]+$/.test(x))
           .map(Number)
    );

    await browser.close();
    return numbers.reduce((a, b) => a + b, 0);
}

(async () => {
    const seeds = [78,79,80,81,82,83,84,85,86,87];
    let total = 0;
    for (const seed of seeds) {
        const s = await scrape(seed);
        console.log(`Seed ${seed} sum = ${s}`);
        total += s;
    }
    console.log("FINAL TOTAL =", total);
})();
