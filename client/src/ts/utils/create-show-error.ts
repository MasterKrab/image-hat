const createShowError = (container: HTMLElement, timeToRemove = 3000) => (message: string) => {
  const lastElement = container.lastElementChild!
  lastElement.classList.contains('error') && lastElement.remove()

  const errorElement = document.createElement('p')
  errorElement.classList.add('error')
  errorElement.setAttribute('role', 'alert')
  errorElement.textContent = message
  container.appendChild(errorElement)

  setTimeout(() => errorElement.remove(), timeToRemove)
}

export default createShowError
