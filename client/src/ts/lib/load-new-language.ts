import loadPage from './load-page'
import loadLanguage from './load-language'
import loadChangeLanguage from './load-change-language'

const loadNewLanguage = async (language: string) => {
  window.currentLanguage = language

  document.body.removeAttribute('data-page')

  await loadLanguage(language)

  loadChangeLanguage()

  loadPage()
}

export default loadNewLanguage
