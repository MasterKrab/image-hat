import printResult from './print-result'
import createShowError from '../../utils/create-show-error'
import { removeHidden, addHidden } from '../../utils/hidden'
import validateFileSize from '../../utils/validate-file-size'
import fetchFile from '../../utils/fetch-file'
import createHandleChangeFile from '../../utils/create-handle-change-file'
import createHandleDrop from '../../utils/create-handle-drop'
import handleDragEvent from '../../utils/handle-drag-event'

export default () => {
  const main = document.getElementById('main')!
  const inputFileElement = document.getElementById('file')! as HTMLInputElement
  const dropZone = document.getElementById('drop-zone')!
  const resultElement = document.getElementById('result')!
  const spinner = document.getElementById('spinner')!
  const cancelButton = document.getElementById('cancel-button')!
  const backLink = document.getElementById('back-link')!

  const showError = createShowError(main)

  const sendFile = (file: File) => {
    interface FileData {
      file: File
    }

    if (validateFileSize(file)) {
      showError(window.translations['error-file-size'])
      return
    }

    addHidden(dropZone)
    addHidden(backLink)
    removeHidden(spinner)

    fetchFile<FileData, object>({ route: 'metadata', data: { file } })
      .then((result) => {
        removeHidden(resultElement)
        printResult(result)
        removeHidden(cancelButton)
      }).catch((error) => {
        console.log(error)

        removeHidden(dropZone)
        removeHidden(backLink)
        showError(window.translations.error)
      })
      .finally(() => {
        addHidden(spinner)
      })
  }

  const handleChangeFile = createHandleChangeFile(sendFile)

  const handleDrop = createHandleDrop(showError, sendFile)

  const handleCancel = () => {
    addHidden(cancelButton)
    addHidden(resultElement)
    removeHidden(dropZone)
    removeHidden(backLink)
  }

  inputFileElement.addEventListener('change', handleChangeFile)
  dropZone.addEventListener('dragover', handleDragEvent)
  dropZone.addEventListener('dragleave', handleDragEvent)
  dropZone.addEventListener('drop', handleDrop)
  cancelButton.addEventListener('click', handleCancel)
}
