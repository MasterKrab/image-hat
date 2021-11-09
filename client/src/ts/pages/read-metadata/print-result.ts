import { removeHidden } from '../../utils/hidden'
import camelCaseToNormal from '../../utils/camel-case-to-normal'

const printResult = (data: object) => {
  const fragment = document.createDocumentFragment()
  const result = document.getElementById('result')!

  result.textContent = ''

  Object.entries(data).forEach(([key, value]) => {
    const itemElement = document.createElement('li')
    itemElement.classList.add('metadata__item')

    const keyElement = document.createElement('span')
    keyElement.classList.add('metadata__key')

    keyElement.textContent = camelCaseToNormal(key)
    itemElement.appendChild(keyElement)

    const valueElement = document.createElement('span')
    valueElement.classList.add('metadata__value')

    valueElement.textContent = value
    itemElement.appendChild(valueElement)

    fragment.appendChild(itemElement)
  })

  removeHidden(result)
  result.appendChild(fragment)
}

export default printResult
