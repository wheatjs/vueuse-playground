import sdk from '@stackblitz/sdk'
import packageTemplate from './_template/_package.json?raw'
import tsconfigTemplate from './_template/_tsconfig.json?raw'
import tsconfigNodeTemplate from './_template/_tsconfig.node.json?raw'
import viteConfigTemplate from './_template/_vite.config?raw'
import indexTemplate from './_template/_index.html?raw'
import envTemplate from './_template/_env.d.ts?raw'
import { filesystem } from '~/modules/filesystem'
import { usePackages } from '~/modules/packages'

export function openInStackblitz() {
  const packages = usePackages()
  const includePackages = packages.packages.reduce((acc: Record<string, string>, pkg) => {
    acc[pkg.name] = pkg.version
    return acc
  }, {})

  const packagesT = JSON.parse(packageTemplate)
  packagesT.dependencies = {
    ...packagesT.dependencies,
    ...includePackages,
  }

  const coreFiles: Record<string, string> = {
    'package.json': JSON.stringify(packagesT, null, 2),
    'vite.config.ts': viteConfigTemplate,
    'tsconfig.json': tsconfigTemplate,
    'tsconfig.node.json': tsconfigNodeTemplate,
    'src/env.d.ts': envTemplate,
    'index.html': indexTemplate,
  }

  const files = Object.values(filesystem.files)
    .filter(file => file.filename !== 'settings.json')
    .reduce((acc: Record<string, string>, file) => {
      if (file.filename === 'main.ts')
        acc[`src/${file.filename}`] = `import '@unocss/reset/tailwind.css'\nimport 'uno.css'\n${file.content}`
      else
        acc[`src/${file.filename}`] = file.content
      return acc
    }, {})

  sdk.openProject({
    title: 'VueUse Playground Fork',
    description: '',
    template: 'node',
    files: {
      ...coreFiles,
      ...files,
    },
  })
}
