const createHandleChangeFile = (done: (file: File) => void) => ({ target }: Event) => {
  const file = (<HTMLInputElement>target).files![0]

  done(file)
}

export default createHandleChangeFile
