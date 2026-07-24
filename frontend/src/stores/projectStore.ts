import { create } from 'zustand'
import type { Project, AnalysisResult, Strategy, GeneratedAsset } from '@/types'

interface ProjectStore {
  currentProject: Project | null
  analysisResults: AnalysisResult[]
  strategy: Strategy | null
  generatedAssets: GeneratedAsset[]
  isLoading: boolean
  analysisStep: number
  setCurrentProject: (project: Project | null) => void
  setAnalysisResults: (results: AnalysisResult[]) => void
  setStrategy: (strategy: Strategy | null) => void
  setGeneratedAssets: (assets: GeneratedAsset[]) => void
  setIsLoading: (loading: boolean) => void
  setAnalysisStep: (step: number) => void
  reset: () => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  currentProject: null,
  analysisResults: [],
  strategy: null,
  generatedAssets: [],
  isLoading: false,
  analysisStep: 0,
  setCurrentProject: (project) => set({ currentProject: project }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setStrategy: (strategy) => set({ strategy }),
  setGeneratedAssets: (assets) => set({ generatedAssets: assets }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setAnalysisStep: (step) => set({ analysisStep: step }),
  reset: () => set({
    currentProject: null,
    analysisResults: [],
    strategy: null,
    generatedAssets: [],
    isLoading: false,
    analysisStep: 0,
  }),
}))
