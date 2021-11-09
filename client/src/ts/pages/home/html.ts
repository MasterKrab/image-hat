
const pages = ['convert', 'read-metadata', 'remove-metadata']

const language = window.location.pathname.split('/')[1] === window.currentLanguage ? `${window.currentLanguage}/` : ''

export default () => `
  <h1 class="title title--main" lang="en">ImageHat</h1>
  <p class="subtitle">${window.translations.subtitle}</p>
  <nav>
    <ul class="menu">
      ${pages.reduce((acummulatedHtml, href) => `
        ${acummulatedHtml}
        <li class="menu__item">
          <a is="router-link" class="menu__link" href="${language}${href}">${window.translations[href]}</a>
        </li>`, '')}
    </ul>
  </nav>
`
