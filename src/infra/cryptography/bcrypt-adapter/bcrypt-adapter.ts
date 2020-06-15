import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/protocols/cryptography/hasher'
import { HashComparator } from '../../../data/protocols/cryptography/hash-comparator'

export class BcryptAdapter implements Hasher, HashComparator {
  private readonly saltOrRounds: number;

  constructor (saltOrRounds: number) {
    this.saltOrRounds = saltOrRounds
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltOrRounds)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
