import type { editor as Editor } from 'monaco-editor'

type Monaco = typeof import('monaco-editor')

export function tsCompiler(monaco: Monaco, model: Editor.ITextModel) {
  const getWorker = monaco.languages.typescript.getTypeScriptWorker

  const getWorkerProcess = async(): Promise<any> => {
    try {
      const worker = await getWorker()
      return await worker(model.uri)
    }
    catch (error) {
      return getWorkerProcess()
    }
  }

  const getEmitResult = async() => {
    const client = await getWorkerProcess()
    return await client.getEmitOutput(model.uri.toString())
  }

  const getDTSForCode = async() => {
    const result = await getEmitResult()
    return result.outputFiles.find((o: any) => o.name.endsWith('.d.ts'))!.text
  }

  const compile = async() => {
    const result = await getEmitResult()
    return {
      js: result.outputFiles.find((o: any) => o.name.endsWith('.js'))!.text,
      dts: result.outputFiles.find((o: any) => o.name.endsWith('.d.ts'))!.text,
    }
  }

  return {
    compile,
    dts: getDTSForCode,
  }
}
