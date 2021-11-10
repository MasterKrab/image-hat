import loadPage from './load-page'
import loadNewLanguage from './load-new-language'

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

  loadNewLanguage(language)
}

export default { push, changeLanguage }
