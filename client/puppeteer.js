import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

class Pupetter {
  async initialize () {
    this.puppeteer = await puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
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
