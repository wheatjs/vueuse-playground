import { init, parse } from 'es-module-lexer'
import type { editor as Editor } from 'monaco-editor'
import config from '@playground/config'
import { createMonacoInstance } from '..'
import type { EditorPlugin } from './types'
import { useProjectStore } from '~/modules/project'

const { css } = useStyleTag('')

function generateStyles() {
  let style = ''
  const project = useProjectStore()

  project.packages.forEach((pkg) => {
    style += `.editor-decoration-package.package-version-${pkg.id}:after {content: 'v${pkg.version}' !important;} `
  })

  css.value = style
}

interface State {
  decorations: string[]
  possiblePackages: Record<string, string>
}

const state: State = {
  decorations: [],
  possiblePackages: {},
}

let packageNames: string[] = []

const doDecorations = async(editor: Editor.IStandaloneCodeEditor) => {
  await init
  const { monaco } = await createMonacoInstance()
  const model = editor.getModel()
  const [imports] = parse(editor.getValue())
  const project = useProjectStore()

  if (!model || !imports)
    return

  packageNames = imports.map(i => i.n as string)
  const decorations: Editor.IModelDecoration[] = []

  const shouldDecorate = (pkg: string) => {
    if (config.editor.ambientModules && config.editor.ambientModules.includes(pkg))
      return false

    if (pkg.startsWith('./') || pkg.startsWith('../') || pkg.startsWith('/'))
      return false

    if (pkg in project.files)
      return false

    return true
  }

  imports
    .filter(({ n }) => shouldDecorate(n!))
    .forEach((i) => {
      const realName = i.n!.split('.').length > 1 ? i.n!.substring(0, i.n!.lastIndexOf('/')) : i.n!
      // console.log(realName)

      const startPosition = model.getPositionAt(i.se)
      const pkg = project.packages.find(p => p.name === realName)
      const version = pkg?.version || 'none'

      decorations.push({
        id: i.n ? i.n + version : '',
        ownerId: 0,
        range: new monaco.Range(startPosition.lineNumber, startPosition.column, startPosition.lineNumber, startPosition.column),
        options: {
          afterContentClassName: pkg ? `editor-decoration-package package-version-${pkg.id}` : `editor-decoration-package package-index-${packageNames.indexOf(i.n!)}`,
        },
      })
    })

  state.decorations = editor.deltaDecorations(state.decorations, decorations)
}

export const PackageInstallerPlugin: EditorPlugin = {
  language: 'typescript',
  init: (editor) => {
    generateStyles()
    doDecorations(editor)

    // const packages = usePackages()
    const project = useProjectStore()

    editor.onMouseUp((e) => {
      if (e.target.element?.classList.contains('editor-decoration-package')) {
        const packageVersionId = Array.from(e.target.element.classList).find(c => c.startsWith('package-version-'))
        const packageIndex = Array.from(e.target.element.classList).find(c => c.startsWith('package-index-'))

        if (packageVersionId) {
          const id = packageVersionId.split('-')[2]
          const pkg = Object.values(project.packages).find(p => p.id === id)

          console.log(pkg)
        }
        else if (packageIndex) {
          const index = packageIndex.split('-')[2] as unknown as number
          const pkg = packageNames[index]

          project.addPackage([{
            name: pkg,
            version: 'latest',
          }])
        }
      }
    })

    project.onPackageAdded(() => {
      generateStyles()
      doDecorations(editor)
    })
    project.onPackageRemoved(() => {
      generateStyles()
      doDecorations(editor)
    })
  },

  /**
   * Add decorators to packages imported.
   */
  async onContentChanged(editor) {
    doDecorations(editor)
  },
}
