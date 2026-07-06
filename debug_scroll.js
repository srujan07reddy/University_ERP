const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8081');
  
  // Wait for load and click admin
  await page.waitForSelector('text/ADMIN');
  const adminElements = await page.$$('div');
  for (const el of adminElements) {
     const text = await page.evaluate(e => e.textContent, el);
     if (text && text.includes('ADMIN') && text.length < 20) {
        await el.click();
        break;
     }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click Sign In
  const signinElements = await page.$$('div');
  for (const el of signinElements) {
     const text = await page.evaluate(e => e.textContent, el);
     if (text && text === 'Sign In') {
        await el.click();
        break;
     }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Click Analytics
  const tabs = await page.$$('div');
  for (const el of tabs) {
     const text = await page.evaluate(e => e.textContent, el);
     if (text === 'Analytics') {
        await el.click();
        break;
     }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Find the Academic Intelligence container
  const ai = await page.$('text/Academic Intelligence');
  if (!ai) {
     console.log('Could not find Academic Intelligence');
     process.exit(1);
  }
  
  const hierarchy = await page.evaluate((el) => {
     const result = [];
     let curr = el;
     while (curr && curr.tagName !== 'BODY') {
        const style = window.getComputedStyle(curr);
        const rect = curr.getBoundingClientRect();
        result.push({
           tag: curr.tagName,
           id: curr.id,
           className: curr.className,
           height: rect.height,
           clientHeight: curr.clientHeight,
           scrollHeight: curr.scrollHeight,
           overflowY: style.overflowY,
           display: style.display,
           flex: style.flex,
           flexDirection: style.flexDirection,
           minHeight: style.minHeight,
           maxHeight: style.maxHeight,
        });
        curr = curr.parentElement;
     }
     return result;
  }, ai);
  
  console.log(JSON.stringify(hierarchy, null, 2));
  
  await browser.close();
})();
