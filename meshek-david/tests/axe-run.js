const { chromium } = require('playwright');
const fs = require('fs');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const pages = ['index','story','cheeses','shop','hosting','contact','cart','checkout','account','delivery','terms','privacy','accessibility','thank-you'];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext();
  // block external font requests (offline)
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  for (const p of pages) {
    const pg = await ctx.newPage();
    const errs = [];
    pg.on('pageerror', e => errs.push(e.message));
    pg.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_FAILED/.test(m.text())) errs.push(m.text()); });
    await pg.goto(`http://localhost:8765/meshek-david/${p}.html`);
    await pg.waitForTimeout(600);
    await pg.addScriptTag({ content: axeSrc });
    const r = await pg.evaluate(() => axe.run(document, { runOnly: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice'] }));
    console.log(`\n== ${p}: ${r.violations.length} violations ${errs.length ? 'JS ERRORS: ' + errs.join(' | ') : ''}`);
    r.violations.forEach(v => console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}) e.g. ${v.nodes[0].target.join(' ')}`));
    await pg.close();
  }
  await b.close();
})();
