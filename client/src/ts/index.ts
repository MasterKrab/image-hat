import '../scss/styles.scss'
import 'whatwg-fetch'
import '@ungap/custom-elements'
import 'element-polyfill'
import 'focus-visible'
import './custom-elements/link'
import { load } from 'webfontloader'
import loadLanguage from './lib/load-language'
import loadDefaultElements from './lib/load-default-elements'
import loadChangeLanguage from './lib/load-change-language'
import loadPage from './lib/load-page'
import loadNewLanguage from './lib/load-new-language'

document.addEventListener('DOMContentLoaded', async () => {
  await loadLanguage()

  if (!document.body.dataset.page) {
    load({
      google: {
        families: ['Poppins', 'Nunito Sans']
      }
    })

    document.body.textContent = ''

    loadDefaultElements()
  }

  loadChangeLanguage()
  loadPage()

  window.addEventListener('popstate', (e: Event) => {
    e.preventDefault()

    const { lang } = document.documentElement
    const { location, currentLanguage } = window
    const { pathname } = location

    if (pathname.startsWith(`/${lang}/`) && lang === currentLanguage) return loadPage()

    const language = pathname.split('/')[1]

    language !== currentLanguage ? loadNewLanguage(language) : loadPage()
  })
})
