const printMetatags = (title: string, description: string) => {
  const url = window.location.origin

  const metadata = [
    {
      name: 'title',
      content: title
    },
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: url
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'twitter:title',
      content: title
    },
    {
      propery: 'twitter:description',
      content: description
    }
  ]

  const titleElement = document.head.querySelector('title')!
  titleElement.textContent = `ImageHat | ${title}`

  document.head.querySelectorAll('.meta-tag').forEach((metaTag) => metaTag.remove())

  metadata.forEach((tagInfo) => {
    Object.entries(tagInfo).forEach(([key, value]) => {
      const metaTag = document.createElement('meta')
      metaTag.classList.add('meta-tag')
      metaTag.setAttribute(key, value)
      titleElement.after(metaTag)
    })
  })
}

export default printMetatags
