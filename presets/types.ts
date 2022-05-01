import type { BaseFile, CssFile, JsonFile, ProjectSolution, SFCFile, ScriptFile } from '~/modules/project'

export interface ProjectSolutionPreset extends Omit<ProjectSolution, 'files'> {
  icon?: string
  featured?: boolean
  files: ConstructorParameters<typeof BaseFile | typeof SFCFile | typeof ScriptFile | typeof JsonFile | typeof CssFile>[0][]
}

export function definePreset(preset: ProjectSolutionPreset) {
  return preset
}
