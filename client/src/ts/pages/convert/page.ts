import getImageOptions from './get-image-options'
import createShowError from '../../utils/create-show-error'
import { toggleHide, removeHidden, addHidden } from '../../utils/hidden'
import fetchFile from '../../utils/fetch-file'
import validateFileFormat from '../../utils/validate-file-format'
import createHandleChangeFile from '../../utils/create-handle-change-file'
import validateFileSize from '../../utils/validate-file-size'
import handleDragEvent from '../../utils/handle-drag-event'

export default () => {
  const form = document.getElementById('form')! as HTMLFormElement
  const formImage = document.getElementById('form-image')! as HTMLImageElement
  const inputFileElement = form.file as HTMLInputElement
  const selectElement = form.format as HTMLSelectElement
  const submitButton = form['submit-button'] as HTMLButtonElement
  const spinner = document.getElementById('spinner')!
  const dropZone = document.getElementById('drop-zone')!
  const selectLabel = document.getElementById('format')!
  const result = document.getElementById('result')!
  const cancelButton = document.getElementById('cancel-button')!
  const backLink = document.getElementById('back-link')!
  const downloadLink = document.getElementById('download-link')! as HTMLAnchorElement
  let formFile: File | null = null

  const showError = createShowError(form)

  const resetForm = () => {
    form.reset()
    formFile = null
  }

  const toggleFormPage = () => {
    toggleHide(selectElement)
    toggleHide(selectLabel)
    toggleHide(submitButton)
    toggleHide(dropZone)
    toggleHide(formImage)
    toggleHide(inputFileElement)
    toggleHide(cancelButton)
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    removeHidden(spinner)
    addHidden(cancelButton)
    addHidden(form)

    interface FileData {
      file: File,
      format: string
    }

    interface Result{
      url: string
    }

    fetchFile<FileData, Result>({ route: 'convert', data: { file: formFile!, format: form.format.value } })
      .then(({ url }) => {
        downloadLink.href = url
        removeHidden(result)
        removeHidden(cancelButton)
      })
      .catch((error) => {
        console.error(error)
        showError(window.translations.error)

        removeHidden(form)
        addHidden(cancelButton)
        removeHidden(backLink)
        toggleFormPage()
      })
      .finally(() => {
        addHidden(spinner)
        resetForm()
      })
  }

  const procressFile = (file: File) => {
    formFile = file
    const options = getImageOptions(file)

    selectElement.textContent = ''
    selectElement.appendChild(options)
    toggleFormPage()
    addHidden(backLink)
  }

  const handleChangeFile = createHandleChangeFile(procressFile)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()

    const file = e.dataTransfer!.items![0].getAsFile()!

    if (!validateFileFormat(file.type)) return showError(window.translations.error)

    if (validateFileSize(file)) {
      showError(window.translations['error-file-size'])
      return
    }

    procressFile(file)
  }

  const handleCancel = () => {
    resetForm()

    removeHidden(form)
    removeHidden(dropZone)
    removeHidden(inputFileElement)
    removeHidden(backLink)
    addHidden(formImage)
    addHidden(selectElement)
    addHidden(selectLabel)
    addHidden(submitButton)
    addHidden(cancelButton)
    addHidden(result)
  }

  form.addEventListener('submit', handleSubmit)
  inputFileElement.addEventListener('change', handleChangeFile)
  dropZone.addEventListener('dragover', handleDragEvent)
  dropZone.addEventListener('dragleave', handleDragEvent)
  dropZone.addEventListener('drop', handleDrop)
  cancelButton.addEventListener('click', handleCancel)
}
