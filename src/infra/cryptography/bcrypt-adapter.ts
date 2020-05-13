import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export default class BcryptAdapter implements Encrypter {
  private readonly saltOrRounds: number;

  constructor (saltOrRounds: number) {
    this.saltOrRounds = saltOrRounds
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltOrRounds)
    return hash
  }
}
