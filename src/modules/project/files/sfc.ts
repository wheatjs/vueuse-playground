import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface SFCFileOptions extends FileOptions {
  initialScriptContent?: string
  initialTemplateContent?: string
  initialStyleContent?: string
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
      initialContent: options.initialTemplateContent,
    })
    this.script = new Document(this.filename.replace('.vue', '_script.ts'), {
      onUpdate: () => this.onUpdate(),
      language: 'typescript',
      initialContent: options.initialScriptContent,
    })
    this.style = new Document(this.filename.replace('.vue', '_style.css'), {
      onUpdate: () => this.onUpdate(),
      language: 'css',
      initialContent: options.initialStyleContent,
    })
  }

  public override get documents() {
    return [this.script, this.style, this.template]
  }

  public override exportDocuments(asPlainText = false) {
    return {
      template: asPlainText ? this.template.text : this.template.export(),
      script: asPlainText ? this.script.text : this.script.export(),
      style: asPlainText ? this.style.text : this.style.export(),
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
    return `<script setup lang="ts">\n${this.script.text}\n</script>\n
<template>\n${this.template.text}\n</template>\n
<style>\n${this.style.text}\n</style>
    `
  }
}
