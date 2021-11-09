import { createRequire } from 'module'
import postcssPlugin from '@chialab/esbuild-plugin-postcss'

const require = createRequire(import.meta.url)
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['build/js/scripts.js'],
  bundle: true,
  outfile: 'build/public/bundle.js',
  plugins: [postcssPlugin()]
}).catch((e) => console.error(e.message))
