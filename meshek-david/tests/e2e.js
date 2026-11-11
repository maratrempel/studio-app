const { chromium } = require('playwright');
const fs = require('fs');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const B = 'http://localhost:8765/meshek-david/';
const SHOTS = process.argv[2];
async function axe(pg, label) {
  await pg.addScriptTag({ content: axeSrc });
  const r = await pg.evaluate(() => axe.run(document, { runOnly: ['wcag2a','wcag2aa','wcag21aa','best-practice'] }));
  console.log(`axe[${label}]: ${r.violations.length}`, r.violations.map(v => v.id + ':' + v.nodes[0].target).join(', '));
}
const ok = (c, m) => console.log((c ? 'PASS ' : 'FAIL ') + m);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));

  // 1. כניסה לחנות → חלון יישוב
  await pg.goto(B + 'shop.html'); await pg.waitForTimeout(700);
  ok(await pg.locator('#gate-dialog[open]').count() === 1, 'gate dialog opens on first visit');
  ok(await pg.evaluate(() => document.activeElement.id) === 'gate-input', 'focus in settlement input');
  await axe(pg, 'shop+gate');
  await pg.keyboard.type('נתנ'); await pg.waitForTimeout(100);
  await pg.keyboard.press('ArrowDown'); await pg.keyboard.press('Enter');
  ok(await pg.inputValue('#gate-input') === 'נתניה', 'combobox keyboard select');
  await pg.keyboard.press('Enter'); await pg.waitForTimeout(150);
  ok((await pg.textContent('#gate-result')).includes('מגיעים לנתניה'), 'settlement found');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/gate-ok.png' });
  // יישוב לא קיים
  await pg.fill('#gate-input', 'אילת'); await pg.click('#gate-form button[type=submit]'); await pg.waitForTimeout(150);
  ok((await pg.textContent('#gate-result')).includes('עדיין לא מגיעים'), 'settlement not found → pickup offer');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/gate-no.png' });
  await pg.fill('#gate-input', 'בורגתה'); await pg.click('#gate-form button[type=submit]'); await pg.waitForTimeout(100);
  await pg.click('#gate-result [data-close]'); await pg.waitForTimeout(100);
  ok(await pg.locator('#gate-dialog[open]').count() === 0, 'gate closes');
  await axe(pg, 'shop grid');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/shop.png', fullPage: false });

  // 2. סינון מארזים
  await pg.click('#cat-filter button:has-text("מארזים")');
  ok((await pg.locator('.product-card').count()) === 3, 'packages filter = 3 products');
  await pg.click('#cat-filter button:has-text("הכל")');

  // 3. תצוגה מהירה — גבינה ביחידות
  await pg.click('[data-quick="yuval"]'); await pg.waitForTimeout(100);
  const opts = await pg.$$eval('#qv-qty option', o => o.slice(0,3).map(x => x.textContent));
  ok(opts[1].startsWith('2 יחידות'), 'unit qty options: ' + opts.join(' / '));
  await axe(pg, 'quickview');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/quickview-unit.png' });
  await pg.selectOption('#qv-qty', '2'); await pg.click('#qv-form button[type=submit]');
  ok(await pg.evaluate(() => document.activeElement.dataset.quick) === 'yuval', 'focus returns to trigger');
  // גבינה חתוכה
  await pg.click('[data-quick="yarden"]');
  const o2 = await pg.$$eval('#qv-qty option', o => o.slice(0,3).map(x => x.textContent));
  ok(o2[0].startsWith('150 גרם') && o2[2].startsWith('450 גרם'), 'portion options: ' + o2.join(' / '));
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/quickview-portion.png' });
  await pg.selectOption('#qv-qty', '2'); await pg.click('#qv-form button[type=submit]');
  ok((await pg.textContent('.cart-count')) === '4', 'cart badge = 4');

  // 4. עגלה
  await pg.goto(B + 'cart.html');
  const cartTxt = await pg.textContent('#cart-root');
  ok(cartTxt.includes('300 גרם') && cartTxt.includes('משלוח לבורגתה'), 'cart shows portions & settlement');
  await axe(pg, 'cart');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/cart.png', fullPage: true });

  // 5. קופה — שגיאות
  await pg.goto(B + 'checkout.html');
  ok(await pg.inputValue('#billSettlement') === 'בורגתה', 'checkout prefilled settlement from gate');
  const order = await pg.$$eval('#address-fields input', i => i.map(x => x.id));
  ok(order.indexOf('billSettlement') < order.indexOf('street'), 'settlement before street');
  ok(await pg.isChecked('#marketing'), 'marketing checkbox checked by default');
  await pg.click('#checkout-form button[type=submit]');
  ok(await pg.evaluate(() => document.activeElement.id) === 'error-summary', 'error summary focused');
  await axe(pg, 'checkout errors');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/checkout-errors.png', fullPage: true });
  await pg.fill('#firstName', 'נועה'); await pg.fill('#lastName', 'כהן'); await pg.fill('#phone', '050-1234567'); await pg.fill('#email', 'noa@example.com');
  await pg.fill('#street', 'הזית'); await pg.fill('#house', '4');
  // מתנה לכתובת אחרת שאין אליה משלוח
  await pg.check('#is-gift'); await pg.fill('#giftMessage', 'מזל טוב!');
  await pg.check('#ship-different');
  await pg.fill('#shipName', 'דנה'); await pg.fill('#shipPhone', '052-7654321'); await pg.fill('#shipSettlement', 'אילת');
  await pg.locator('#shipSettlement').dispatchEvent('change');
  await pg.fill('#shipStreet', 'הים'); await pg.fill('#shipHouse', '1'); await pg.check('#terms');
  await pg.click('#checkout-form button[type=submit]');
  ok((await pg.textContent('#error-summary')).includes('אין משלוח ליישוב היעד'), 'ship-to settlement validated');
  await pg.fill('#shipSettlement', 'חדרה'); await pg.locator('#shipSettlement').dispatchEvent('change');
  ok((await pg.textContent('#order-summary')).includes('משלוח לחדרה'), 'summary fee follows ship-to settlement');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/checkout-filled.png', fullPage: true });
  await pg.click('#checkout-form button[type=submit]'); await pg.waitForURL(/thank-you/);
  ok((await pg.textContent('#thanks-root')).includes('לחדרה'), 'thank-you shows delivery');

  // 6. לקוח חוזר — לא קופץ חלון
  await pg.evaluate(() => localStorage.removeItem('md_settlement'));
  await pg.goto(B + 'shop.html'); await pg.waitForTimeout(700);
  ok(await pg.locator('#gate-dialog[open]').count() === 0, 'returning customer: no gate');
  await pg.goto(B + 'account.html');
  ok((await pg.locator('.order').count()) === 1, 'order history in account');
  ok((await pg.textContent('.account-label')).includes('נועה'), 'header greets customer');
  await axe(pg, 'account');
  // שינוי כתובת → בדיקה מחדש
  await pg.fill('#accSettlement', 'אילת'); await pg.click('#acc-form button[type=submit]');
  ok((await pg.textContent('#acc-settlement-msg')).includes('אין משלוח'), 'address change rechecks settlement');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/account.png', fullPage: true });

  // 7. סרגל נגישות
  await pg.goto(B + 'index.html');
  await pg.click('.a11y-toggle'); await pg.click('[data-a11y-toggle="contrast"]'); await pg.click('[data-a11y="bigger"]');
  ok(await pg.evaluate(() => document.documentElement.classList.contains('a11y-contrast')), 'contrast mode');
  if (SHOTS) await pg.screenshot({ path: SHOTS + '/a11y-contrast.png' });
  await pg.click('[data-a11y="reset"]');

  // 8. מקלדת: דלג לתוכן
  await pg.goto(B + 'index.html'); await pg.keyboard.press('Tab');
  ok(await pg.evaluate(() => document.activeElement.className) === 'skip-link', 'first tab = skip link');
  if (SHOTS) { await pg.screenshot({ path: SHOTS + '/home.png' }); }

  // 9. נייד
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  await m.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await m.goto(B + 'index.html'); await m.click('.nav-toggle');
  ok(await m.isVisible('#primary-nav a[href="shop.html"]'), 'mobile menu opens');
  const ov = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  ok(!ov, 'no horizontal scroll on mobile');
  if (SHOTS) await m.screenshot({ path: SHOTS + '/mobile-home.png' });

  console.log(errs.length ? 'JS ERRORS: ' + errs.join(' | ') : 'no JS errors');
  await b.close();
})();
