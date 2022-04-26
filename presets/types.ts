import type { BaseFile, ProjectSolution } from '~/modules/project'

export interface ProjectSolutionPreset extends Omit<ProjectSolution, 'files'> {
  files: () => BaseFile[]
}

export function definePreset(preset: ProjectSolutionPreset) {
  return preset
}
