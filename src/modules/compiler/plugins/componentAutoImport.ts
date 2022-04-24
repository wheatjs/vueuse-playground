/**
 * Inspired by Antfu's unplugin-vue-components plugin
 *
 * https://github.com/antfu/unplugin-vue-components
 */

import type { MagicString } from '@vue/compiler-sfc'
import { SupportedTransformer } from 'unplugin-vue-components/types'

export interface ResolveResult {
  rawName: string
  replace: (resolved: string) => void
}

export function pascalCase(str: string) {
  return capitalize(camelCase(str))
}

export function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const resolve = (code: string, s: MagicString) => {
  const results: ResolveResult[] = []

  for (const match of code.matchAll(/_resolveComponent\("(.+?)"\)/g)) {
    const matchedName = match[1]

    if (match.index != null && matchedName && !matchedName.startsWith('_')) {
      const start = match.index
      const end = start + match[0].length

      results.push({
        rawName: matchedName,
        replace: resolved => s.overwrite(start, end, resolved),
      })
    }
  }

  return results
}

// export default async function transformComponent(code: string, transformer: SupportedTransformer, s: MagicString, ctx: Context) {
//   let no = 0

//   const results = resolve(code, s)

//   for (const { rawName, replace } of results) {
//     const name = pascalCase(rawName)
//   }
// }
