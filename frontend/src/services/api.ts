import axios from 'axios'
import type {
  ApiResponse,
  CreateProjectRequest,
  Project,
  AnalysisResult,
  Strategy,
  GeneratedAsset,
  GeneratedPoster,
  PosterPresetInfo,
  MarketingRequest,
} from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || '请求失败'
    return Promise.reject(new Error(message))
  }
)

type ApiCall<T> = Promise<ApiResponse<T>>

export const projectApi = {
  create: (data: CreateProjectRequest): ApiCall<Project> =>
    api.post('/projects', data),

  get: (id: number): ApiCall<Project> =>
    api.get(`/projects/${id}`),

  initDemo: (): ApiCall<Project> =>
    api.post('/projects/demo'),

  upload: (id: number, formData: FormData): ApiCall<{ id: number; fileName: string; parsedContent: string }> =>
    api.post(`/projects/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  analyze: (id: number): ApiCall<{ status: string; steps: { name: string; label: string; status: string }[] }> =>
    api.post(`/projects/${id}/analyze`),

  getAnalysis: (id: number): ApiCall<AnalysisResult[]> =>
    api.get(`/projects/${id}/analysis`),

  confirmMarket: (id: number, country: string): ApiCall<{ status: string; selectedCountry: string }> =>
    api.post(`/projects/${id}/confirmMarket`, { selectedCountry: country }),

  generateStrategy: (id: number): ApiCall<Strategy> =>
    api.post(`/projects/${id}/strategy`),

  getStrategy: (id: number): ApiCall<Strategy> =>
    api.get(`/projects/${id}/strategy`),

  regenerateStrategySection: (id: number, section: string): ApiCall<any> =>
    api.post(`/projects/${id}/strategy/${section}`),

  generateMarketing: (id: number, data: MarketingRequest): ApiCall<GeneratedAsset[]> =>
    api.post(`/projects/${id}/marketing`, data),

  getMarketing: (id: number): ApiCall<GeneratedAsset[]> =>
    api.get(`/projects/${id}/marketing`),

  generatePoster: (id: number, data: { styleKey: string; customPrompt: string }): ApiCall<GeneratedPoster> =>
    api.post(`/projects/${id}/poster`, data),

  getPosters: (id: number): ApiCall<GeneratedPoster[]> =>
    api.get(`/projects/${id}/posters`),

  getPosterPresets: (): ApiCall<PosterPresetInfo[]> =>
    api.get('/projects/poster/presets'),

  getReport: (id: number): ApiCall<any> =>
    api.get(`/projects/${id}/report`),
}
