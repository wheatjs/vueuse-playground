export function flatColors(colors: any, head?: string) {
  let flatten: { [ key: string ]: string } = {}
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string')
      flatten[(head && key === 'DEFAULT') ? head : head ? `${head}-${key}` : key] = value
    else if (typeof value === 'function')
      flatten[(head && key === 'DEFAULT') ? head : head ? `${head}-${key}` : key] = 'currentColor'
    else
      flatten = { ...flatten, ...flatColors(value, head ? `${head}-${key}` : key) }
  }
  return flatten
}

export function isAttrVariant(word: string, variants: any): boolean {
  const lastKey = word.match(/[^:-]+$/)?.[0] || word
  return lastKey in variants
}

export function isAttrUtility(word: string, attrs: any): string | undefined {
  if (!word)
    return

  const lastKey = word.match(/[^:-]+$/)?.[0] || word
  return lastKey in attrs ? lastKey : undefined
}
