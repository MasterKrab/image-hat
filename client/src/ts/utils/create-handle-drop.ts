import validateFileFormat from './validate-file-format'

const createHandleDrop = (showError: (message: string) => void, done: (file: File) => void): (e: DragEvent) => void => (e: DragEvent) => {
  e.preventDefault()

  const file = e.dataTransfer!.items![0].getAsFile()!

  if (!validateFileFormat(file.type)) return showError(window.translations['error-format'])

  done(file)
}

export default createHandleDrop
