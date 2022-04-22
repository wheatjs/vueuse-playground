import { init, parse } from 'es-module-lexer'
import type { editor as Editor } from 'monaco-editor'
import { createMonacoInstance } from '..'
import type { EditorPlugin } from './types'
import { onPackageAdded, onPackageRemoved, usePackages } from '~/modules/packages'

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
  const packages = usePackages()

  if (!model || !imports)
    return

  packageNames = imports.map(i => i.n as string)
  const decorations: Editor.IModelDecoration[] = []

  imports
    .filter(({ n }) => !n?.startsWith('./') && !n?.startsWith('../') && !n?.startsWith('/'))
    .forEach((i) => {
      const startPosition = model.getPositionAt(i.se)
      const pkg = packages.packages.find(p => p.name === i.n)

      decorations.push({
        id: i.n || '',
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
    doDecorations(editor)

    const packages = usePackages()

    editor.onMouseUp((e) => {
      if (e.target.element?.classList.contains('editor-decoration-package')) {
        const packageVersionId = Array.from(e.target.element.classList).find(c => c.startsWith('package-version-'))
        const packageIndex = Array.from(e.target.element.classList).find(c => c.startsWith('package-index-'))

        if (packageVersionId) {
          const id = packageVersionId.split('-')[2]
          const pkg = packages.packages.find(p => p.id === id)

          console.log('Open settings for', pkg.name)
        }
        else if (packageIndex) {
          const index = packageIndex.split('-')[2] as unknown as number
          const pkg = packageNames[index]

          packages.addPackage(pkg)
        }
      }
    })

    onPackageAdded(() => doDecorations(editor))
    onPackageRemoved(() => doDecorations(editor))
  },

  /**
   * Add decorators to packages imported.
   */
  async onContentChanged(editor) {
    doDecorations(editor)
  },
}
