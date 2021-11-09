const validateFileFormat = (format: string): boolean => {
  const regex = /jpeg|jpg|png|webp/

  return regex.test(format)
}

export default validateFileFormat
