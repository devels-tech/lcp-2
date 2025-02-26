const onlyNumbersRegex = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}