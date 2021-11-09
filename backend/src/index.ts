import express, { Application } from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import imagesRouter from './router/images'

fs.mkdirSync(path.join(__dirname, 'public', 'images'), { recursive: true })

const app: Application = express()

const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', imagesRouter)

app.listen(port, () => {
  console.log('Server working', port)
})
