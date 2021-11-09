import translations, { languages } from './translations'
import url from '@rollup/plugin-url'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import fs from 'fs'
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssVariables from 'postcss-css-variables'
import postcssFocusVisible from 'postcss-focus-visible'
import scrollbar from 'postcss-scrollbar'
import sass from 'sass'
import { terser } from 'rollup-plugin-terser'
import dev from 'rollup-plugin-dev'
import prerenderSpaPlugin from 'rollup-plugin-prerender-spa-plugin'

const extensions = ['.js', '.ts']

const pagesFolder = path.join(__dirname, 'src/ts/pages')

const createFolder = (folder) => !fs.existsSync(folder) && fs.mkdirSync(folder, { recursive: true })

const getRoutes = () => {
  const routes = []

  fs.readdirSync(pagesFolder)
    .filter((file) => fs.lstatSync(path.join(pagesFolder, file)).isDirectory())
    .forEach((page) => {
      page = page === 'home' ? '' : page
      page = page ? `/${page}` : '/'

      routes.push(page)

      languages.forEach((language) => routes.push(`/${language}${page}`))
    })

  routes.forEach((route) =>
    createFolder(path.join(__dirname, 'public', route))
  )

  return routes
}

const translationsResult = {}

export default {
  input: 'src/ts/index.ts',
  output: {
    dir: 'public',
    format: 'umd'
  },
  plugins: [
    (() => ({
      buildStart: async () => {
        const createFolder = (folder) => !fs.existsSync(folder) && fs.mkdirSync(folder, { recursive: true })

        languages.forEach((language) => {
          translationsResult[language] = {}

          Object.keys(translations).forEach((key) => {
            translationsResult[language][key] = translations[key][language]
          })
        })

        const translationsFolder = path.join(__dirname, 'public/translations')

        createFolder(translationsFolder)

        languages.forEach((language) => {
          fs.writeFileSync(path.join(translationsFolder, `${language}.json`), JSON.stringify(translationsResult[language]))
        })

        fs.writeFileSync(
          path.join(__dirname, 'public/index.html'),
          fs.readFileSync(path.join(__dirname, 'src/template.html'))
        )
      }
    }))(),
    nodeResolve(
      { extensions }
    ),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      include: ['src/**/*'],
      presets: [
        '@babel/typescript',
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: '3',
          targets: {
            browsers: [
              'edge >= 16',
              'safari >= 9',
              'firefox >= 57',
              'ie >= 11',
              'ios >= 9',
              'chrome >= 49'
            ]
          }
        }]
      ],
      plugins: [
        'es6-promise',
        '@babel/plugin-transform-runtime'
      ]
    }),
    postcss({
      preprocessor: (_, id) => async () => ({ code: sass.renderSync({ file: id }).css.toString() }),
      plugins: [
        autoprefixer(),
        cssVariables({ preserve: true }),
        postcssFocusVisible,
        scrollbar
      ],
      extract: true,
      minimize: true,
      extensions: ['.scss', '.css']
    }),
    url(),
    terser(),
    dev({ dirs: ['public'], spa: true }),
    prerenderSpaPlugin({
      staticDir: path.resolve(__dirname, 'public'),
      routes: getRoutes()
    })
  ]
}
