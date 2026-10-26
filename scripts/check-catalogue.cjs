const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({});
for (const file of ['sources', 'provinces', 'sambals', 'sambals-regional', 'sambals-additional']) {
  vm.runInContext(read(`js/data/${file}.js`), context);
}
vm.runInContext(read('js/art.js'), context);
const {profiles, additions, styles, provinces, sources, illustrations} = vm.runInContext(`({profiles:S, additions:S.slice(241), styles:STYLE, provinces:PROV, sources:SRC, illustrations:S.map(s => sambalArt(s))})`, context);
assert.equal(profiles.length, 257);
assert.equal(new Set(profiles.map(s => s.id)).size, profiles.length, 'Duplicate IDs');
assert.equal(new Set(profiles.map(s => s.name.toLowerCase())).size, profiles.length, 'Duplicate names');
const schemaIDs = [...read('supabase/schema.sql').matchAll(/^\('([^']+)'\)/gm)].map(m => m[1]);
assert.deepEqual([...schemaIDs].sort(), Array.from(profiles, s => s.id).sort(), 'Schema catalogue mismatch');
for (const s of additions) {
  for (const key of ['id', 'name', 'region', 'note', 'profileBasis']) assert.ok(s[key]?.trim(), `${s.id}: ${key}`);
  assert.ok(s.prov === 'ID' || provinces[s.prov], `${s.id}: unknown province`);
  assert.ok(styles[s.style], `${s.id}: unknown style`);
  assert.equal(s.p.length, 6);
  assert.ok(s.p.every(n => Number.isInteger(n) && n >= 0 && n <= 5));
  assert.equal(s.heat, s.p[0]);
  for (const key of ['ing', 'serve', 'persona', 'src']) assert.ok(s[key].length >= (key === 'src' ? 1 : 2));
  for (const url of s.src) assert.ok(sources[url]?.u === url && url.startsWith('https://'));
  assert.ok(read('supabase/additional-sambals.sql').includes(`('${s.id}')`));
}
for (const svg of illustrations) {
  assert.ok(svg.includes('<svg'));
  assert.ok(!/NaN|undefined/.test(svg));
}
const html = read('index.html');
assert.ok(html.indexOf('js/data/sambals-additional.js') < html.indexOf('js/core.js'));
assert.ok(html.includes('All 257 sambals'));
console.log('PASS: 257 unique profiles, 16 complete additions, valid illustrations, sources, script order, and matching SQL IDs.');
