export default (page: string) => `
  <p class="spinner hidden" id="spinner">
    <img class="spinner__image" src="/assets/icons/loader.gif" alt="${window.translations.loading}" />
    <span class="spinner__text">${window.translations[`loading-${page}`]}</span>.
  </p>
`
