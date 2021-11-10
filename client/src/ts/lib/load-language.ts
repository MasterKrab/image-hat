import languages, { defaultLanguage } from './languages'

const getTranslationsScript = () => document.getElementById('translations-json')

const loadLanguage = async (languageToChange?: string) => {
  if (!languageToChange) {
    const language = window.location.pathname.split('/')[1]
    const isValidLanguage = languages.includes(language)

    window.currentLanguage = language

    if (!isValidLanguage) {
      window.currentLanguage = languages.find((language) => navigator.language.startsWith(language)) || defaultLanguage

      window.currentLanguage !== defaultLanguage && document.body.removeAttribute('data-page')
    }
  }

  if (!document.body.dataset.page) {
    try {
      const response = await fetch(`/translations/${languageToChange || window.currentLanguage}.json`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-type': 'application/json'
        }
      })
      const result = await response.json()

      window.translations = result

      const script = document.createElement('script')
      script.id = 'translations-json'
      script.type = 'application/json'
      script.text = JSON.stringify(result)

      languageToChange
        ? getTranslationsScript()?.remove()
        : document.head.insertBefore(script, document.getElementById('script')!)
    } catch (error) {
      console.error(error)
    }
  } else {
    window.translations = JSON.parse(getTranslationsScript()!.textContent!)
  }
}

export default loadLanguage
