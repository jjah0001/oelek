// Generate public config for GitHub Pages or a local preview.
const fs = require('node:fs');
const path = require('node:path');
const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || '';
if (!!url !== !!key) throw Error('Set both SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
if (url && new URL(url).protocol !== 'https:') throw Error('Use an HTTPS Supabase URL.');
if (key && !key.startsWith('sb_publishable_')) {
  let role; try { role=JSON.parse(Buffer.from(key.split('.')[1],'base64url')).role; } catch {}
  if(role!=='anon') throw Error('Only a publishable or legacy anon key may be included in the browser.');
}
fs.writeFileSync(path.join(__dirname,'../js/ratings-config.js'), '"use strict";\nconst RATINGS_CONFIG = '+JSON.stringify({supabaseUrl:url,supabasePublishableKey:key})+';\n');
console.log(url ? 'Public ratings configuration generated.' : 'Ratings unconfigured; shelf remains available.');
