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

(async () => {
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
})()
