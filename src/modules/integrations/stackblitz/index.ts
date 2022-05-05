import sdk from '@stackblitz/sdk'
import packageTemplate from './_template/_package.json'
import tsconfigTemplate from './_template/_tsconfig.json?raw'
import tsconfigNodeTemplate from './_template/_tsconfig.node.json?raw'
import viteConfigTemplate from './_template/_vite.config?raw'
import indexTemplate from './_template/_index.html?raw'
import envTemplate from './_template/_env.d.ts?raw'
// import { filesystem } from '~/modules/filesystem'
import { useProjectStore } from '~/modules/project'

export function openInStackblitz() {
  const project = useProjectStore()
  const exportedProject = project.exportProject()

  const files = exportedProject.files.reduce((acc: Record<string, string>, file) => {
    acc[`${file.dir}${file.filename}`] = file.content
    return acc
  }, {})

  // @ts-expect-error leave me alone
  packageTemplate.dependencies = exportedProject.packages

  sdk.openProject({
    title: 'VueUse Playground Fork',
    description: '',
    template: 'node',
    files: {
      ...files,
      'package.json': JSON.stringify(packageTemplate, null, 2),
      'index.html': indexTemplate,
      'src/env.d.ts': envTemplate,
      'tsconfig.json': tsconfigTemplate,
      'vite.config.ts': viteConfigTemplate,
      'tsconfig.node.json': tsconfigNodeTemplate,
    },
  })

  // sdk.openProject({
  //   files:
  // })

  // const coreFiles: Record<string, string> = {
  //   'package.json': JSON.stringify(packagesT, null, 2),
  // }

  // const files = Object.values(filesystem.files)
  //   .filter(file => file.filename !== 'settings.json')
  //   .reduce((acc: Record<string, string>, file) => {
  //     if (file.filename === 'main.ts')
  //       acc[`src/${file.filename}`] = `import '@unocss/reset/tailwind.css'\nimport 'uno.css'\n${file.content}`
  //     else
  //       acc[`src/${file.filename}`] = file.content
  //     return acc
  //   }, {})

  // sdk.openProject({
  //   title: 'VueUse Playground Fork',
  //   description: '',
  //   template: 'node',
  //   files: {
  //     ...coreFiles,
  //     ...files,
  //   },
  // })
}
