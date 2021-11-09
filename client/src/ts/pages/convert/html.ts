import title from '../../components/title'
import inputFile from '../../components/input-file'
import dropZone from '../../components/drop-zone'
import spinner from '../../components/spinner'
import result from '../../components/result'
import cancelButton from '../../components/cancel-button'
import backLink from '../../components/back-link'

export default () => `
  ${title('convert')}
  <form class="form" id="form">
    <img
      class="form__image hidden"
      src="/assets/icons/image.svg"
      alt="${window.translations['image-file-alt']}"
      id="form-image"
    />
    ${inputFile()}
    ${dropZone()}
    <label class="form__label-select hidden" id="format">${window.translations['select-format']}</label>
    <select class="form__select hidden" name="format" id="format" required></select>
    <button class="form__submit hidden" name="submit-button">${window.translations['page.convert.title']}</button>
  </form>
  ${spinner('convert')}
  ${result()}
  ${cancelButton()}
  ${backLink()}
`
