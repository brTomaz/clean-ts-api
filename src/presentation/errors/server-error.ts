export class ServerError extends Error {
  constructor (stack: string) {
    super()
    this.name = 'ServerError'
    this.message = 'Internal server error'
    this.stack = stack
  }
}
