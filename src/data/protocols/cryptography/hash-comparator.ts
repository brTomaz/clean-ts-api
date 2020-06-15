export interface HashComparator {
  compare(value: string, hash: string): Promise<boolean>
}
