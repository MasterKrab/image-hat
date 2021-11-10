import chromium from 'chrome-aws-lambda'
import 'puppeteer-core'

class Pupetter {
  async initialize () {
    this.puppeteer = await chromium.puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      timeout: 0
    })

    return this.puppeteer
  }

  async renderRoutes (routes, Prerenderer) {
    const rootOptions = Prerenderer.getOptions()

    return Promise.all(
      routes.map(
        async (route) => {
          const page = await this.puppeteer.newPage()

          page.setDefaultNavigationTimeout(0)

          await page.goto(`http://localhost:${rootOptions.server.port}/${route}`, { waitUntil: 'networkidle0' })

          const result = {
            route,
            html: await page.content()
          }

          await page.close()
          return result
        }

      )
    )
  }

  destroy () {
    this.puppeteer.close()
  }
}

export default Pupetter
