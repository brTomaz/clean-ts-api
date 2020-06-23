export class EmailInUseError extends Error {
  constructor () {
    super()
    this.name = 'EmailInUse'
    this.message = 'The received email is already in use'
  }
}
