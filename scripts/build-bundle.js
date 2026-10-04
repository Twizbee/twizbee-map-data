const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  console.log('📦 Bundling interactive-svg-map plugin with esbuild...');

  const distDir = path.join(__dirname, '..', 'dist');
  fs.mkdirSync(distDir, { recursive: true });

  // 1. IIFE / Global Browser Bundle
  await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    format: 'iife',
    globalName: 'GeoMapPlugin',
    footer: {
      js: 'window.GeoMap = GeoMapPlugin.GeoMap; window.InteractiveSVGMap = GeoMapPlugin.GeoMap;'
    },
    outfile: 'dist/interactive-svg-map.js',
    sourcemap: true
  });
  console.log('✓ Created dist/interactive-svg-map.js (Browser IIFE)');

  // 2. Minified Browser Bundle
  await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'GeoMapPlugin',
    footer: {
      js: 'window.GeoMap = GeoMapPlugin.GeoMap; window.InteractiveSVGMap = GeoMapPlugin.GeoMap;'
    },
    outfile: 'dist/interactive-svg-map.min.js',
    sourcemap: true
  });
  console.log('✓ Created dist/interactive-svg-map.min.js (Minified)');

  // 3. ESM Bundle
  await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/interactive-svg-map.esm.js',
    sourcemap: true
  });
  console.log('✓ Created dist/interactive-svg-map.esm.js (ES Module)');

  // 4. CSS Distribution
  const cssSource = fs.readFileSync('src/styles/map.css', 'utf8');
  fs.writeFileSync('dist/interactive-svg-map.css', cssSource);

  // Minify CSS
  const minifiedCss = cssSource
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();
  fs.writeFileSync('dist/interactive-svg-map.min.css', minifiedCss);
  console.log('✓ Created dist/interactive-svg-map.css & min.css');

  // 5. TypeScript Declaration Distribution
  const dtsSource = fs.readFileSync('src/index.d.ts', 'utf8');
  fs.writeFileSync('dist/interactive-svg-map.d.ts', dtsSource);
  fs.writeFileSync('dist/interactive-svg-map.esm.d.ts', dtsSource);
  console.log('✓ Created dist/interactive-svg-map.d.ts (TypeScript Typings)');

  // 6. Offline Data Bundle (states overview + search index)
  if (fs.existsSync('data/usa/states.json') && fs.existsSync('data/usa/search-index.json')) {
    const states = JSON.parse(fs.readFileSync('data/usa/states.json', 'utf8'));
    const searchIndex = JSON.parse(fs.readFileSync('data/usa/search-index.json', 'utf8'));
    const jsBundleData = `window.__USA_MAP_DATA__ = ${JSON.stringify({
      states: states,
      searchIndex: searchIndex
    })};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.__USA_MAP_DATA__;
}
`;
    fs.writeFileSync(path.join(distDir, 'usa-all-data.js'), jsBundleData);
    console.log('✓ Created dist/usa-all-data.js (Offline USA Data Bundle)');
  }

  console.log('🎉 Plugin bundle build complete!');
}

build().catch(err => {
  console.error('Bundle build failed:', err);
  process.exit(1);
});
