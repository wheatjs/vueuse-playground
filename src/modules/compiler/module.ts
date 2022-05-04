import {
  MagicString,
  babelParse,
  extractIdentifiers,
  isInDestructureAssignment,
  isStaticProperty,
  walk,
  walkIdentifiers,
} from '@vue/compiler-sfc'
import type { ExportSpecifier, Identifier, Node } from '@babel/types'
import type { BaseFile, Package, ScriptFile } from '~/modules/project'
import { urlBase } from '~/modules/project'

const cssCache: Record<string, string> = {}

const modulesKey = '__modules__'
const exportKey = '__export__'
const dynamicImportKey = '__dynamic_import__'
const moduleKey = '__module__'

export interface CompileFilesAsModulesOptions {
  main: ScriptFile
}

export async function compileFilesAsModules({ main }: CompileFilesAsModulesOptions, files: Record<string, BaseFile>, packages: Package[] = []) {
  const _imports = await processFile(main, files, packages)

  const sorted = Array.from(_imports).sort((a, b) => {
    if (a.dependencies.includes(b.filename))
      return 1

    return -1
  })

  const styles = sorted.slice().reverse().map(file => file.css).join('\n')

  return [
    ...sorted.slice(0, -1).map(c => c.code),
    sorted.slice(-1)[0]!.code += `\nwindow.__css__ = ${JSON.stringify(styles)}`,
  ]
}

async function processFile(file: BaseFile, files: Record<string, BaseFile>, packages: Package[], seen = new Set<BaseFile>()) {
  if (seen.has(file))
    return []

  seen.add(file)

  // @ts-expect-error It is fine
  // eslint-disable-next-line prefer-const
  let { js, css } = file.compiled

  const s = new MagicString(js)

  const ast = babelParse(js, {
    sourceFilename: file.filename,
    sourceType: 'module',
    plugins: [],
  }).program.body

  const idToImportMap = new Map<string, string>()
  const declaredConst = new Set<string>()
  const importedFiles = new Set<string>()
  const importToIdMap = new Map<string, string>()

  function defineImport(node: Node, source: string) {
    let filename = source.replace(/^\.\/+/, '')

    // Should match .ts/.js if no extension is provided
    const hasExtension = filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)

    if (hasExtension) {
      if (!(filename in files))
        throw new Error(`File "${filename}" does not exist.`)
    }
    else {
      if (`${filename}.ts` in files)
        filename = `${filename}.ts`
      else if (`${filename}.js` in files)
        filename = `${filename}.js`
      else
        throw new Error(`File "${filename}" does not exist.`)
    }

    if (importedFiles.has(filename))
      return importToIdMap.get(filename)!

    importedFiles.add(filename)
    const id = `__import_${importedFiles.size}__`
    importToIdMap.set(filename, id)
    s.appendLeft(
      node.start!,
      `const ${id} = ${modulesKey}[${JSON.stringify(filename)}]\n`,
    )
    return id
  }

  function defineExport(name: string, local = name) {
    s.append(`\n${exportKey}(${moduleKey}, "${name}", () => ${local})`)
  }

  // 0. instantiate module
  s.prepend(
    `const ${moduleKey} = __modules__[${JSON.stringify(
      file.filename,
    )}] = { [Symbol.toStringTag]: "Module" }\n\n`,
  )

  // 1. check all import statements and record id -> importName map
  for (const node of ast) {
    // import foo from 'foo' --> foo -> __import_foo__.default
    // import { baz } from 'foo' --> baz -> __import_foo__.baz
    // import * as ok from 'foo' --> ok -> __import_foo__
    if (node.type === 'ImportDeclaration') {
      const source = node.source.value
      if (source.startsWith('./')) {
        const importId = defineImport(node, node.source.value)
        for (const spec of node.specifiers) {
          if (spec.type === 'ImportSpecifier') {
            idToImportMap.set(
              spec.local.name,
              `${importId}.${(spec.imported as Identifier).name}`,
            )
          }
          else if (spec.type === 'ImportDefaultSpecifier') {
            idToImportMap.set(spec.local.name, `${importId}.default`)
          }
          else {
            // namespace specifier
            idToImportMap.set(spec.local.name, importId)
          }
        }
        s.remove(node.start!, node.end!)
      }
      else if (Object.values(files).some(f => f.asModule && f.filename === source)) {
        const importId = defineImport(node, node.source.value)
        for (const spec of node.specifiers) {
          if (spec.type === 'ImportSpecifier') {
            idToImportMap.set(
              spec.local.name,
              `${importId}.${(spec.imported as Identifier).name}`,
            )
          }
          else if (spec.type === 'ImportDefaultSpecifier') {
            idToImportMap.set(spec.local.name, `${importId}.default`)
          }
          else {
            // namespace specifier
            idToImportMap.set(spec.local.name, importId)
          }
        }
        s.remove(node.start!, node.end!)
      }
      else if (source.endsWith('.css')) {
        const pkg = source.substring(0, source.lastIndexOf('/'))

        for (const p of packages) {
          if (p.name === pkg) {
            try {
              const url = urlBase(p) + source.split('/').pop()
              if (!(url in cssCache)) {
                const result = await (await fetch(url)).text()
                cssCache[url] = result
              }

              css += cssCache[url]
            }
            catch (error) {
              // eslint-disable-next-line no-console
              console.log('Failed to resolve css for', source)
            }
          }
        }
        s.remove(node.start!, node.end!)
      }
    }
  }

  // 2. check all export statements and define exports
  for (const node of ast) {
    // named exports
    if (node.type === 'ExportNamedDeclaration') {
      if (node.declaration) {
        if (
          node.declaration.type === 'FunctionDeclaration'
          || node.declaration.type === 'ClassDeclaration'
        ) {
          // export function foo() {}
          defineExport(node.declaration.id!.name)
        }
        else if (node.declaration.type === 'VariableDeclaration') {
          // export const foo = 1, bar = 2
          for (const decl of node.declaration.declarations) {
            for (const id of extractIdentifiers(decl.id))
              defineExport(id.name)
          }
        }
        s.remove(node.start!, node.declaration.start!)
      }
      else if (node.source) {
        // export { foo, bar } from './foo'
        const importId = defineImport(node, node.source.value)
        for (const spec of node.specifiers) {
          defineExport(
            (spec.exported as Identifier).name,
            `${importId}.${(spec as ExportSpecifier).local.name}`,
          )
        }
        s.remove(node.start!, node.end!)
      }
      else {
        // export { foo, bar }
        for (const spec of node.specifiers) {
          const local = (spec as ExportSpecifier).local.name
          const binding = idToImportMap.get(local)
          defineExport((spec.exported as Identifier).name, binding || local)
        }
        s.remove(node.start!, node.end!)
      }
    }

    // default export
    if (node.type === 'ExportDefaultDeclaration') {
      if ('id' in node.declaration && node.declaration.id) {
        // named hoistable/class exports
        // export default function foo() {}
        // export default class A {}
        const { name } = node.declaration.id
        s.remove(node.start!, node.start! + 15)
        s.append(`\n${exportKey}(${moduleKey}, "default", () => ${name})`)
      }
      else {
        // anonymous default exports
        s.overwrite(node.start!, node.start! + 14, `${moduleKey}.default =`)
      }
    }

    // export * from './foo'
    if (node.type === 'ExportAllDeclaration') {
      const importId = defineImport(node, node.source.value)
      s.remove(node.start!, node.end!)
      s.append(`\nfor (const key in ${importId}) {
          if (key !== 'default') {
            ${exportKey}(${moduleKey}, key, () => ${importId}[key])
          }
        }`)
    }
  }

  // 3. convert references to import bindings
  for (const node of ast) {
    if (node.type === 'ImportDeclaration')
      continue
    walkIdentifiers(node, (id, parent, parentStack) => {
      const binding = idToImportMap.get(id.name)
      if (!binding)
        return

      if (isStaticProperty(parent) && parent.shorthand) {
        // let binding used in a property shorthand
        // { foo } -> { foo: __import_x__.foo }
        // skip for destructure patterns
        if (
          !(parent as any).inPattern
          || isInDestructureAssignment(parent, parentStack)
        )
          s.appendLeft(id.end!, `: ${binding}`)
      }
      else if (
        parent.type === 'ClassDeclaration'
        && id === parent.superClass
      ) {
        if (!declaredConst.has(id.name)) {
          declaredConst.add(id.name)
          // locate the top-most node containing the class declaration
          const topNode = parentStack[1]
          s.prependRight(topNode.start!, `const ${id.name} = ${binding};\n`)
        }
      }
      else {
        s.overwrite(id.start!, id.end!, binding)
      }
    })
  }

  // 4. convert dynamic imports
  (walk as any)(ast, {
    enter(node: Node, parent: Node) {
      if (node.type === 'Import' && parent.type === 'CallExpression') {
        const arg = parent.arguments[0]
        if (arg.type === 'StringLiteral' && arg.value.startsWith('./')) {
          s.overwrite(node.start!, node.start! + 6, dynamicImportKey)
          s.overwrite(
            arg.start!,
            arg.end!,
            JSON.stringify(arg.value.replace(/^\.\/+/, '')),
          )
        }
      }
    },
  })

  // append CSS injection code
  // if (css)
  //   s.append(`\nwindow.__css__ += ${JSON.stringify(css)}`)

  const processed = [
    {
      css,
      code: s.toString(),
      filename: file.filename,
      dependencies: Array.from(importedFiles.values()),
    },
  ]

  if (importedFiles.size) {
    for (const imported of importedFiles)
      processed.push(...(await processFile(files[imported], files, packages, seen)))
  }

  return processed
}
