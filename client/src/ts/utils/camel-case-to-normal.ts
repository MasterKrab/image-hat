const camelCaseToNormal = (string: string) => string.replace(/([A-Z])/g, ' $1').replace(/^./, (string) => string.toUpperCase())

export default camelCaseToNormal
