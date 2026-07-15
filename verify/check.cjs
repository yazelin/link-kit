// 用法: NODE_PATH=$(npm root -g) node verify/check.cjs <url>
// 桌機:填表→產出 3 列(預設 FB/IG/LINE)+ QR canvas 非空白;手機:無橫向捲動
const { chromium, devices } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:8001/';
  const opts = process.env.PW_CHANNEL === 'none' ? {} : { channel: 'chrome' };
  const browser = await chromium.launch(opts);

  // 桌機功能
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.fill('#url', 'yazelin.github.io/marketing-toolbox/?utm_source=old');
  await page.fill('#campaign', 'verify-test');
  await page.click('#go');
  await page.waitForSelector('#rows tr');
  const rows = await page.locator('#rows tr').count();
  const firstUrl = await page.locator('#rows td.urlcell').first().textContent();
  const qrOk = await page.evaluate(() => {
    const cv = document.querySelector('#rows canvas');
    const ctx = cv.getContext('2d');
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    let dark = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i] < 128) dark++;
    return dark > 100;
  });
  const histShown = await page.locator('#histwrap').isVisible();
  const okUrl = firstUrl.includes('utm_source=facebook') && firstUrl.includes('utm_campaign=verify-test')
    && firstUrl.startsWith('https://') && !firstUrl.includes('utm_source=old');

  // 手機 RWD
  const m = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
  await m.goto(url, { waitUntil: 'networkidle' });
  await m.fill('#url', 'example.com');
  await m.fill('#campaign', 'm');
  await m.tap('#go');
  await m.waitForSelector('#rows tr');
  const hscroll = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

  console.log(JSON.stringify({ rows, okUrl, qrOk, histShown, hscroll }));
  await browser.close();
  if (rows < 3 || !okUrl || !qrOk || !histShown || hscroll) process.exit(1);
})().catch((e) => { console.error(e.message); process.exit(1); });
