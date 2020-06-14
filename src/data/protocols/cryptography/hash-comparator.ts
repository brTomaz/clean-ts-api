export interface HashComparator {
  compare(password: string, hash: string): Promise<boolean>
}
