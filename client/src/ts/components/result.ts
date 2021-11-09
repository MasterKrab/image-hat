export default () => `
  <p class="result hidden" id="result">
    <img class="result__image" src="/assets/icons/download.gif" alt="${window.translations.download}" />
    ${window.translations['result-text']}
    <a class="result__link" id="download-link" href="" target="_blank" rel="noopener noreferrer">
      ${window.translations.download}
    </a>
  </p>
`
