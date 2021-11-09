import languages from './languages'
import getPages, { Page } from './pages'
import printMetatags from './print-metatags'
import page404 from '../pages/404/html'

const loadPage = () => {
  const pathnames = window.location.pathname.split('/')
  const firstPathname = pathnames[1] || 'home'
  const secondPathname = pathnames[2] || 'home'

  const currentPage = languages.includes(firstPathname) ? secondPathname : firstPathname as 'convert' | 'metadata' | 'home'

  const currentPageData: Page = getPages()[currentPage]

  const { body, documentElement } = document

  const main = document.getElementById('main')!

  if (!currentPageData) {
    main.innerHTML = page404()
    return
  }

  const { html, title, description } = currentPageData

  if (body.dataset.page !== currentPage) {
    documentElement.lang = window.currentLanguage
    main.innerHTML = html()
    printMetatags(title, description)
  }

  body.dataset.page = currentPage
  currentPageData.page && currentPageData.page()
}

window.addEventListener('popstate', (e: Event) => {
  e.preventDefault()

  loadPage()
})

export default loadPage
