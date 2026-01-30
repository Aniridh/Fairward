const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.join(process.cwd(), 'public/mock-bills/generator.html');
  await page.goto(`file://${htmlPath}`);
  
  // Wait for Tailwind to load (rough estimate)
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot MRI Bill
  const mriElement = await page.$('#bill-mri');
  await mriElement.screenshot({
    path: 'public/mock-bills/mri_brain_bill.png'
  });
  console.log('Created mri_brain_bill.png');

  // Screenshot Blood Test Bill
  const bloodElement = await page.$('#bill-blood');
  await bloodElement.screenshot({
    path: 'public/mock-bills/blood_test_bill.png'
  });
  console.log('Created blood_test_bill.png');

  await browser.close();
})();
