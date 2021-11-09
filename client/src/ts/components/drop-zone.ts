export default () => `
  <label class="drop-zone" for="file" id="drop-zone">
    <img
      class="drop-zone__image"
      src="/assets/icons/image.svg"
      alt="${window.translations['image-file-alt']}"
    />
    <span class="drop-zone__text">${window.translations['drop-zone-text-1']}</span>
    <span class="drop-zone__text">${window.translations['drop-zone-text-2']}</span>
    <span class="drop-zone__button">${window.translations['drop-zone-text-3']}</span>
  </label>
`
