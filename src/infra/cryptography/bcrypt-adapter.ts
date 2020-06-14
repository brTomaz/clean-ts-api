import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography/hasher'

export class BcryptAdapter implements Hasher {
  private readonly saltOrRounds: number;

  constructor (saltOrRounds: number) {
    this.saltOrRounds = saltOrRounds
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltOrRounds)
    return hash
  }
}
