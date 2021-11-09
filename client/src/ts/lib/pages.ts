import homePage from '../pages/home/index'
import convertPage from '../pages/convert/index'
import readMetadataPage from '../pages/read-metadata/index'
import removeMetadataPage from '../pages/remove-metadata/index'

export interface Page {
  html: () => string
  title: string
  description: string
  page?: () => void
}

interface Pages {
  [key: string]: Page
}

const getPages = () => {
  const getTexts = (page: string) => {
    const title = window.translations[`page.${page}.title`]
    const description = window.translations[`page.${page}.description`]

    return { title, description }
  }

  const pages: Pages = {
    home: {
      ...getTexts('home'),
      ...homePage
    },
    convert: {
      ...getTexts('convert'),
      ...convertPage
    },
    'read-metadata': {
      ...getTexts('read-metadata'),
      ...readMetadataPage
    },
    'remove-metadata': {
      ...getTexts('remove-metadata'),
      ...removeMetadataPage
    }
  }

  return pages
}

export default getPages
