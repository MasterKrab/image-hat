import loadPage from './load-page'
import loadLanguage from './load-language'
import loadChangeLanguage from './load-change-language'

const changeRoute = (route: string) => window.history.pushState({}, '', route)

const startsWithLanguage = (): boolean => window.location.pathname.startsWith(`/${window.currentLanguage}`)

const push = (route: string) => {
  const languageRoute = `/${window.currentLanguage}`
  const language = route && startsWithLanguage() ? languageRoute : ''
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`

  changeRoute(`${language}${normalizedRoute}`)
  loadPage()
}

const changeLanguage = async (language: string) => {
  const { pathname } = window.location
  changeRoute(`/${language}${startsWithLanguage() ? pathname.slice(window.currentLanguage.length + 1) : pathname}`)

  window.currentLanguage = language

  document.body.removeAttribute('data-page')

  await loadLanguage(language)

  loadChangeLanguage()

  loadPage()
}

export default { push, changeLanguage }
