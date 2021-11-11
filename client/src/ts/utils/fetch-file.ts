import handleResponse from './handle-response'

const API_URL = 'https://image-tool-api.herokuapp.com'

interface Parameters<TypeData> {
  route: 'convert' | 'metadata'
  method?: 'post' | 'delete'
  data: TypeData
}

const fetchFile = async <TypeData, TypeResult>({ route, method = 'post', data }: Parameters<TypeData>): Promise<TypeResult> => {
  const formData = new window.FormData()

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response = await window.fetch(`${API_URL}/${route}`, {
    method,
    body: formData,
  })

  const result: TypeResult = await handleResponse(response)

  return result
}

export default fetchFile
