export type StyleSheetRules = Record<string, string>

export function useStyleSheet() {
  const el: HTMLStyleElement = document.createElement('style')
  el.type = 'text/css'
  document.head.appendChild(el)
  const rules = ref<Record<string, string>>({})

  watch(rules, () => {
    el.innerHTML = ''
    el.appendChild(document.createTextNode(Object.entries(rules.value).map(([selector, rule]) => `${selector} {${rule}}`).join('\n')))
  })

  return {
    rules,
  }
}
