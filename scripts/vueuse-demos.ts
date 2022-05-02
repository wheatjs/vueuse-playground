/**
 * Downloads data from the vueuse demos
 */

import { dirname, join, normalize, parse as parsePath, resolve } from 'node:path'
import { outputFile } from 'fs-extra'
import { init, parse } from 'es-module-lexer'
import { match } from 'minimatch'
import { parse as vueParse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'
import config from '../vueuse-playground.config'

/**
 * Github Access token and username required to prevent rate limiting.
 */
const GITHUB_USERNAME = ''
const GITHUB_ACCESS_TOKEN = ''
const repo_url = 'https://api.github.com/repos/vueuse/vueuse/git/trees/main?recursive=1'

interface PackageFile {
  path: string
  mode: string
  type: string
  size: number
  sha: string
  url: string
}

interface PackageTree {
  sha: string
  url: string
  tree: PackageFile[]
}

export interface DemoFile {
  filename: string
  template?: string
  script?: string
  style?: string
}

export interface Demo {
  package: string
  name: string
  files: DemoFile[]
  includeUtils: boolean
  includeComponents: string[]
  extraDependencies: Record<string, string>
}

async function resolveFiles(demo: PackageFile, tree: PackageTree) {
  const files: DemoFile[] = []
  let scriptContent
  let templateContent
  let styleContent

  const data = await fetch(demo.url, {
    headers: {
      Authorization: `Basic ${btoa(`${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}`)}`,
    },
  })
    .then(res => res.json())
    .then(f => Buffer.from(f.content, 'base64').toString())

  const resolveDeps = async(content: string) => {
    const [imports] = parse(content)

    for (const { n } of imports) {
      if (n?.startsWith('./') || n?.startsWith('../')) {
        const path = normalize(join(dirname(demo.path), n))
        let file

        if (parsePath(path).ext)
          file = tree.tree.find(f => f.path === path)

        else
          file = tree.tree.find(f => f.path === `${path}.js` || f.path === `${path}.ts`)

        if (file)
          files.push(...(await resolveFiles(file, tree)))
      }
    }
  }

  /**
   * Nested imports should be rewritten to a flat import.
   * ./components/Button/Button.vue -> './Button.vue'
   */
  const rewriteImports = (content: string) => {
    const [imports] = parse(content)
    const newContent = new MagicString(content)

    for (const { n, s, e } of imports) {
      if (n) {
        if (n.startsWith('./') || n?.startsWith('../')) {
          const filename = parsePath(n).base
          newContent.overwrite(s, e, `./${filename}`)
        }

        if (n in config.project.packages.redirects)
          newContent.overwrite(s, e, config.project.packages.redirects[n])
      }
    }

    return newContent.toString()
  }

  // Find dependencies
  if (demo.path.endsWith('.vue')) {
    const { descriptor: { scriptSetup, script, template, styles } } = vueParse(data)
    const content = scriptSetup?.content || script?.content

    templateContent = template?.content.trim()
    styleContent = styles.at(0)?.content.trim()
    scriptContent = content

    if (content)
      await resolveDeps(content)
  }
  else if (demo.path.endsWith('.ts') || demo.path.endsWith('.js')) {
    scriptContent = data
    await resolveDeps(data)
  }

  if (scriptContent)
    scriptContent = rewriteImports(scriptContent).trim()

  files.push({
    filename: parsePath(demo.path).base,
    script: scriptContent,
    template: templateContent,
    style: styleContent,
  })

  return files
}

async function resolveDemo(demo: PackageFile, tree: PackageTree): Promise<Demo> {
  console.log('Resolving Demo', demo.path)
  const globalComponents = ['BooleanDisplay', 'Note']

  const files = (await resolveFiles(demo, tree)).reverse()
  const includeUtils = files.some(f => f.script ? f.script.includes('./utils') : false)
  const extraDependencies = files.reduce((acc: Record<string, string>, f) => {
    if (f.script) {
      const [imports] = parse(f.script)

      for (const { n } of imports) {
        if (n && !(n.startsWith('./') || n.startsWith('../')))
          acc[n] = 'latest'
      }
    }

    return acc
  }, {})
  const includeComponents = Array.from(new Set(files.map((f) => {
    const components = []

    for (const c of globalComponents) {
      if (f.template?.toLowerCase().includes(c.toLowerCase()))
        components.push(c)
    }

    return components
  }).flat()))

  return {
    package: demo.path.split('/')[1],
    name: demo.path.split('/')[2],
    files,
    includeUtils,
    includeComponents,
    extraDependencies,
  }
}

async function generate() {
  const demos_dir = resolve(__dirname, '../demos')

  await init
  const tree: PackageTree = await fetch(repo_url, {
    headers: {
      Authorization: `Basic ${btoa(`${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}`)}`,
    },
  }).then(res => res.json())

  const demos = tree.tree.filter(file => match([file.path], 'packages/**/!(_template)/demo.vue').length > 0)
  let indexCode = 'export default [\n'

  for await (const demo of demos) {
    const { package: pkg, name, files, includeComponents, includeUtils, extraDependencies } = await resolveDemo(demo, tree)
    const demoFile = JSON.stringify(files, null, 2)

    await outputFile(resolve(demos_dir, `./${pkg}/${name}.ts`), `export default ${demoFile}\n`, { encoding: 'utf8' })
    indexCode += `  { package: '${pkg}', name: '${name}', files: () => import('./${pkg}/${name}'), includeComponents: ${JSON.stringify(includeComponents)}, includeUtils: ${includeUtils}, extraDependencies: ${JSON.stringify(extraDependencies)} },\n`
  }

  indexCode += ']\n'

  outputFile(resolve(demos_dir, './index.ts'), indexCode, { encoding: 'utf8' })
  console.log(indexCode)
}

generate()
