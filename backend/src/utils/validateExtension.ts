const validateExtension = (extension: string) => {
  const validExtensions = ['jpeg', 'jpg', 'png', 'gif']
  return validExtensions.includes(extension)
}

export default validateExtension
