const formats = new Set(['jpg', 'png', 'webp'])

const getImageOptions = ({ type }: File) => {
  const currentFormats = new Set(formats)

  const format = type === 'image/jpeg' ? 'jpg' : type.slice(6)

  currentFormats.delete(format)

  const fragment = document.createDocumentFragment()

  currentFormats.forEach(format => {
    const option = document.createElement('option')
    option.value = format
    option.textContent = format.toUpperCase()
    fragment.appendChild(option)
  })

  return fragment
}

export default getImageOptions
