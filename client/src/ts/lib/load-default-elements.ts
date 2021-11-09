const loadDefaultElements = () => {
  const header = document.createElement('header')
  header.id = 'header'

  const skipToMain = document.createElement('a')
  skipToMain.href = '#main'
  skipToMain.classList.add('skip-to-main')
  skipToMain.textContent = window.translations['skip-to-main']

  header.appendChild(skipToMain)

  const main = document.createElement('main')
  main.classList.add('main')
  main.id = 'main'

  document.body.appendChild(header)
  document.body.appendChild(main)
}

export default loadDefaultElements
