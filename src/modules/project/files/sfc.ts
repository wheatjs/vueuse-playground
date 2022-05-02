import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface SFCFileOptions extends FileOptions {
  script?: string
  template?: string
  style?: string
}

export class SFCFile extends BaseFile {
  public template: Document
  public script: Document
  public style: Document
  public type = 'sfc'

  public compiled = {
    js: '',
    css: '',
    ssr: '',
  }

  constructor(options: SFCFileOptions) {
    super(options)

    this.template = new Document(this.filename.replace('.vue', '_template.html'), {
      onUpdate: () => this.onUpdate(),
      language: 'html',
      initialContent: options.template,
    })
    this.script = new Document(this.filename.replace('.vue', '_script.ts'), {
      onUpdate: () => this.onUpdate(),
      language: 'typescript',
      initialContent: options.script,
    })
    this.style = new Document(this.filename.replace('.vue', '_style.css'), {
      onUpdate: () => this.onUpdate(),
      language: 'css',
      initialContent: options.style,
    })
  }

  public override get documents() {
    return [this.script, this.style, this.template]
  }

  public override exportDocuments() {
    return {
      template: this.template.toString(),
      script: this.script.toString(),
      style: this.style.toString(),
    }
  }

  public override importDocuments(imports: any) {
    this.template.import(imports.template)
    this.script.import(imports.script)
    this.style.import(imports.style)
  }

  public async compile() {
    const { compileFile } = await import('~/modules/compiler')
    const { compiled } = await compileFile(this)
    this.compiled = { ...this.compiled, ...compiled }
  }

  public override toString() {
    return `<script setup lang="ts">\n${this.script.toString()}\n</script>\n
<template>\n${this.template.toString()}\n</template>\n
<style>\n${this.style.toString()}\n</style>
    `
  }
}
