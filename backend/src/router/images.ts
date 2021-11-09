import express, { Request, Response } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import { exiftool } from 'exiftool-vendored'
import { nanoid as generateId } from 'nanoid'
import fs from 'fs'
import path from 'path'

const Router = express.Router()
const upload = multer({
  limits: { fileSize: 5000000 },
  fileFilter: (_, file, callback) => {
    const regex = /jpeg|jpg|png|webp/
    const mimetype = regex.test(file.mimetype)

    mimetype
      ? callback(null, true)
      : callback(new Error('File must be a valid image'))
  }
})

const generateFilename = (extension: string): string => `image-${generateId()}.${extension}`

const imagesPath = path.join(__dirname, '../public/images')

const saveImage = (buffer: string, extension: string): string => {
  const filename = generateFilename(extension)

  fs.writeFileSync(path.join(imagesPath, filename), buffer, { encoding: 'base64' })

  return filename
}

const generateImageUrl = (request: Request, filename: string): string => `${request.protocol}://${request.get('host')}/images/${filename}`

const procressBuffer = (request: Request, response: Response, buffer: Buffer, format: string) => {
  const filename: string = saveImage(buffer.toString('base64'), format)

  const url: string = generateImageUrl(request, filename)

  response.status(201).json({ filename, url })
}
Router.post('/convert', upload.single('file'), async (request: Request, response: Response) => {
  const { body, file } = request
  const { buffer } = file!

  const format = body.format === 'jpg' ? 'jpeg' : body.format as 'jpeg' | 'png' | 'webp'

  const options = {
    jpeg: { mozjpeg: true },
    png: { compressionLevel: 9 },
    webp: { lossless: true }
  }

  const image = sharp(buffer)

  if (!image[format] || !options[format]) {
    return response.status(400).json({
      error: 'Format not supported'
    })
  }

  image[format](options[format])
    .withMetadata()
    .toBuffer()
    .then((buffer: Buffer) =>
      procressBuffer(request, response, buffer, format)
    )
    .catch((error: any) => {
      console.error(error)

      response.status(500).json({
        error: 'An error has ocurred'
      })
    })
})

Router.post('/metadata', upload.single('file'), async (request: Request, response: Response) => {
  const { file } = request
  const { buffer, mimetype } = file!

  const filename = saveImage(buffer.toString('base64'), mimetype.split('/')[1])
  const filePath = path.join(imagesPath, filename)

  const metadata: any = await exiftool.read(filePath)

  fs.unlinkSync(filePath)

  const normalizedMetadata: any = {}

  Object.entries(metadata).forEach(([key, value]: (string|any)[]) => {
    if (key === 'SourceFile' || key === 'FileName' || key === 'errors' || key === 'Directory') return

    if (key === 'FileCreateDate' || key === 'FileModifyDate' || key === 'FileAccessDate' || key === 'FileInodeChangeDate') {
      normalizedMetadata[key] = value.rawValue
      return
    }

    if (key === 'Abs') {
      return value.forEach((ad: string, index: any) => {
        Object.entries(ad).forEach(([key, value]: (string | number)[]) => {
          normalizedMetadata[`Abs-${index}: ${key}`] = value
        })
      })
    }

    if (typeof value === 'string' || typeof value === 'number') {
      normalizedMetadata[key] = value
    }
  })

  response.status(201).json(normalizedMetadata)
})

Router.delete('/metadata', upload.single('file'), async (request: Request, response: Response) => {
  const { file } = request
  const { buffer, mimetype } = file!

  const resultBuffer = await sharp(buffer).toBuffer()

  procressBuffer(request, response, resultBuffer, mimetype.split('/')[1])
})

export default Router
