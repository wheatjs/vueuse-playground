/**
 * Downloads data from the vueuse demos
 */

import { dirname, join, normalize, parse as parsePath, resolve } from 'node:path'
import { outputFile } from 'fs-extra'
import { init, parse } from 'es-module-lexer'
import { match } from 'minimatch'
import { parse as vueParse } from '@vue/compiler-sfc'

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

interface File {
  name: string
  path: string
  templateContent?: string
  scriptContent?: string
  styleContent?: string
}

interface Demo {
  package: string
  name: string
  files: File[]
}

async function resolveFiles(demo: PackageFile, tree: PackageTree) {
  const files: File[] = []
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
      if (n?.startsWith('./')) {
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

  // Find dependencies
  if (demo.path.endsWith('.vue')) {
    const { descriptor: { scriptSetup, script, template, styles } } = vueParse(data)
    const content = scriptSetup?.content || script?.content

    templateContent = template?.content
    styleContent = styles.at(0)?.content
    scriptContent = content

    if (content)
      await resolveDeps(content)
  }
  else if (demo.path.endsWith('.ts') || demo.path.endsWith('.js')) {
    scriptContent = data
    await resolveDeps(data)
  }

  files.push({
    name: parsePath(demo.path).base,
    scriptContent,
    templateContent,
    styleContent,
    path: demo.path,
  })

  return files
}

async function resolveDemo(demo: PackageFile, tree: PackageTree): Promise<Demo> {
  return {
    package: demo.path.split('/')[1],
    name: demo.path.split('/')[2],
    files: (await resolveFiles(demo, tree)).reverse(),
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
    const { package: pkg, name, files } = await resolveDemo(demo, tree)
    const demoFile = JSON.stringify(files, null, 2)

    await outputFile(resolve(demos_dir, `./${pkg}/${name}.ts`), `export default ${demoFile}\n`, { encoding: 'utf8' })
    indexCode += `  { package: '${pkg}', name: '${name}', files: () => import('./${pkg}/${name}') },\n`
  }

  indexCode += ']\n'

  outputFile(resolve(demos_dir, './index.ts'), indexCode, { encoding: 'utf8' })
  console.log(indexCode)
}

generate()
