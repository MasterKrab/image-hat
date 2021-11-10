import { completeLanguages } from './languages'
import router from './router'

const loadChangeLanguage = () => {
  const header = document.getElementById('header')!

  document.getElementById('change-language')?.remove()

  const changeLanguage = document.createElement('section')
  changeLanguage.id = 'change-language'
  changeLanguage.setAttribute('aria-label', window.translations['change-language'])
  changeLanguage.classList.add('change-language')

  const toggleButton = document.createElement('button')
  toggleButton.setAttribute('role', 'switch')
  toggleButton.setAttribute('aria-checked', 'false')
  toggleButton.classList.add('change-language__button')

  const toggleButtonText = document.createElement('span')
  toggleButtonText.textContent = window.translations['change-language']
  toggleButtonText.classList.add('visually-hidden')

  toggleButton.appendChild(toggleButtonText)
  changeLanguage.appendChild(toggleButton)

  const languagesContainer = document.createElement('div')
  languagesContainer.setAttribute('aria-live', 'polite')
  languagesContainer.classList.add('change-language__languages')

  const label = document.createElement('p')
  label.textContent = window.translations['change-language']
  label.setAttribute('aria-label', window.translations['change-language-description'])
  label.classList.add('change-language__label')

  label.id = 'change-language-label'
  label.lang = window.currentLanguage
  languagesContainer.appendChild(label)

  const buttons = document.createElement('ul')
  buttons.classList.add('change-language__buttons')

  completeLanguages.forEach(({ label, value, flag }) => {
    const languageButton = document.createElement('button')
    languageButton.classList.add('change-language__select-language')
    value === window.currentLanguage && languageButton.classList.add('change-language__select-language--active')

    languageButton.setAttribute('aria-describedby', 'change-language-label')
    languageButton.title = window.translations[value]
    languageButton.textContent = label
    languageButton.lang = value

    const languageImage = document.createElement('img')

    languageImage.src = `/assets/flags/${value}.svg`
    languageImage.classList.add('change-language__flag')
    languageImage.alt = flag

    languageButton.prepend(languageImage)

    buttons.appendChild(languageButton)
  })

  languagesContainer.appendChild(buttons)

  const handleClickBody = (e: Event) => {
    const target = e.target as HTMLElement

    if (target.closest('.change-language__languages')) return

    languagesContainer.classList.remove('change-language__languages--active')
    toggleButton.classList.remove('change-language__button--active')
    toggleButton.setAttribute('aria-checked', 'false')
    document.body.removeEventListener('click', handleClickBody)
  }

  changeLanguage.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('change-language__button')) {
      if (toggleButton.classList.contains('change-language__button--active')) return

      toggleButton.classList.add('change-language__button--active')
      toggleButton.setAttribute('aria-checked', 'true')
      languagesContainer.classList.add('change-language__languages--active')

      setTimeout(() =>
        document.body.addEventListener('click', handleClickBody)
      , 0)

      return
    }

    if (target.classList.contains('change-language__select-language')) {
      languagesContainer.classList.remove('change-language__languages--active')
      router.changeLanguage(target.lang)
    }
  })

  changeLanguage.appendChild(languagesContainer)

  header.appendChild(changeLanguage)
}

export default loadChangeLanguage
