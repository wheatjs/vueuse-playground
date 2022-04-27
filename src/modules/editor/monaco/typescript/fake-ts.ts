import type { FileReference, PreProcessedFileInfo } from 'typescript'
import { init, parse } from 'es-module-lexer'

// Rather than use the real typescript compiler, we fake one for ata to reduece the size of the app.
export async function createFakeTs() {
  await init

  const preProcessFile = (file: string): PreProcessedFileInfo => {
    const isLibFile = false
    const ambientExternalModules: string[] | undefined = undefined
    const importedFiles: FileReference[] = []
    const libReferenceDirectives: FileReference[] = []
    const referencedFiles: FileReference[] = []
    const typeReferenceDirectives: FileReference[] = []

    const results = parse(file)
    const lines = file.split('\n').filter(s => s)

    /**
     * Go through each line and find all triple-slash directives.
     * They will all be at the top of the file, so if we find any non-slash
     * start characters, we can exit early.
     */
    let currentIndex = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line[0] !== '/')
        break

      // Found triple-slash directive.
      if (line[1] === '/' && line[2] === '/') {
        let startIndex = 0
        let endIndex = 0
        let isInAttribute = false

        for (let j = 0; j < line.length; j++) {
          const char = line[j]

          if (char === '"' && !isInAttribute) {
            isInAttribute = true
            startIndex = j + 1
          }
          else if (char === '"' && isInAttribute) {
            isInAttribute = false
            endIndex = j
          }
        }

        if (line.includes('lib="')) {
          const fileName = line.substring(startIndex, endIndex)

          libReferenceDirectives.push({
            fileName,
            pos: currentIndex + startIndex,
            end: currentIndex + startIndex + fileName.length,
          })
        }
        else if (line.includes('path="')) {
          const fileName = line.substring(startIndex, endIndex)

          referencedFiles.push({
            fileName,
            pos: currentIndex + startIndex,
            end: currentIndex + startIndex + fileName.length,
          })
        }
      }

      currentIndex += line.length + 1
    }

    for (const result of results[0]) {
      importedFiles.push({
        fileName: result.n!,
        pos: result.s - 1,
        end: result.e - 1,
      })
    }

    return {
      ambientExternalModules,
      importedFiles,
      isLibFile,
      libReferenceDirectives,
      referencedFiles,
      typeReferenceDirectives,
    }
  }

  const libMap = new Map([
    ['es5', 'lib.es5.d.ts'],
    ['es6', 'lib.es2015.d.ts'],
    ['es2015', 'lib.es2015.d.ts'],
    ['es7', 'lib.es2016.d.ts'],
    ['es2016', 'lib.es2016.d.ts'],
    ['es2017', 'lib.es2017.d.ts'],
    ['es2018', 'lib.es2018.d.ts'],
    ['es2019', 'lib.es2019.d.ts'],
    ['es2020', 'lib.es2020.d.ts'],
    ['es2021', 'lib.es2021.d.ts'],
    ['esnext', 'lib.esnext.d.ts'],
    ['dom', 'lib.dom.d.ts'],
    ['dom.iterable', 'lib.dom.iterable.d.ts'],
    ['webworker', 'lib.webworker.d.ts'],
    ['webworker.importscripts', 'lib.webworker.importscripts.d.ts'],
    ['webworker.iterable', 'lib.webworker.iterable.d.ts'],
    ['scripthost', 'lib.scripthost.d.ts'],
    ['es2015.core', 'lib.es2015.core.d.ts'],
    ['es2015.collection', 'lib.es2015.collection.d.ts'],
    ['es2015.generator', 'lib.es2015.generator.d.ts'],
    ['es2015.iterable', 'lib.es2015.iterable.d.ts'],
    ['es2015.promise', 'lib.es2015.promise.d.ts'],
    ['es2015.proxy', 'lib.es2015.proxy.d.ts'],
    ['es2015.reflect', 'lib.es2015.reflect.d.ts'],
    ['es2015.symbol', 'lib.es2015.symbol.d.ts'],
    ['es2015.symbol.wellknown', 'lib.es2015.symbol.wellknown.d.ts'],
    ['es2016.array.include', 'lib.es2016.array.include.d.ts'],
    ['es2017.object', 'lib.es2017.object.d.ts'],
    ['es2017.sharedmemory', 'lib.es2017.sharedmemory.d.ts'],
    ['es2017.string', 'lib.es2017.string.d.ts'],
    ['es2017.intl', 'lib.es2017.intl.d.ts'],
    ['es2017.typedarrays', 'lib.es2017.typedarrays.d.ts'],
    ['es2018.asyncgenerator', 'lib.es2018.asyncgenerator.d.ts'],
    ['es2018.asynciterable', 'lib.es2018.asynciterable.d.ts'],
    ['es2018.intl', 'lib.es2018.intl.d.ts'],
    ['es2018.promise', 'lib.es2018.promise.d.ts'],
    ['es2018.regexp', 'lib.es2018.regexp.d.ts'],
    ['es2019.array', 'lib.es2019.array.d.ts'],
    ['es2019.object', 'lib.es2019.object.d.ts'],
    ['es2019.string', 'lib.es2019.string.d.ts'],
    ['es2019.symbol', 'lib.es2019.symbol.d.ts'],
    ['es2020.bigint', 'lib.es2020.bigint.d.ts'],
    ['es2020.promise', 'lib.es2020.promise.d.ts'],
    ['es2020.sharedmemory', 'lib.es2020.sharedmemory.d.ts'],
    ['es2020.string', 'lib.es2020.string.d.ts'],
    ['es2020.symbol.wellknown', 'lib.es2020.symbol.wellknown.d.ts'],
    ['es2020.intl', 'lib.es2020.intl.d.ts'],
    ['es2021.promise', 'lib.es2021.promise.d.ts'],
    ['es2021.string', 'lib.es2021.string.d.ts'],
    ['es2021.weakref', 'lib.es2021.weakref.d.ts'],
    ['es2021.intl', 'lib.es2021.intl.d.ts'],
    ['esnext.array', 'lib.es2019.array.d.ts'],
    ['esnext.symbol', 'lib.es2019.symbol.d.ts'],
    ['esnext.asynciterable', 'lib.es2018.asynciterable.d.ts'],
    ['esnext.intl', 'lib.esnext.intl.d.ts'],
    ['esnext.bigint', 'lib.es2020.bigint.d.ts'],
    ['esnext.string', 'lib.es2021.string.d.ts'],
    ['esnext.promise', 'lib.es2021.promise.d.ts'],
    ['esnext.weakref', 'lib.es2021.weakref.d.ts'],
  ])

  return {
    preProcessFile,
    libMap,
  }
}
