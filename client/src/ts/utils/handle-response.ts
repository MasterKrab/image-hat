const handleResponse = (response: Response) => {
  if (response.ok) return response.json()
  throw new Error(response.statusText)
}

export default handleResponse
