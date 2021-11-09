import router from '../lib/router'

class RouterLink extends HTMLAnchorElement {
  constructor () {
    super()

    if (!this.hasAttribute('href')) throw new Error('RouterLink must have an href attribute')

    this.addEventListener('click', (e: Event) => {
      e.preventDefault()

      const href = this.getAttribute('href')!

      router.push(href)
    })
  }
}

window.customElements.define('router-link', RouterLink, { extends: 'a' })
