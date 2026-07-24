import axios from 'axios'
import type {
  CreateProjectRequest,
  Project,
  AnalysisResult,
  Strategy,
  GeneratedAsset,
  MarketingRequest,
} from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const projectApi = {
  create: (data: CreateProjectRequest) =>
    api.post<Project>('/projects', data),

  get: (id: number) =>
    api.get<Project>(`/projects/${id}`),

  initDemo: () =>
    api.post<Project>('/projects/demo'),

  upload: (id: number, formData: FormData) =>
    api.post(`/projects/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  analyze: (id: number) =>
    api.post(`/projects/${id}/analyze`),

  getAnalysis: (id: number) =>
    api.get<AnalysisResult[]>(`/projects/${id}/analysis`),

  confirmMarket: (id: number, country: string) =>
    api.post(`/projects/${id}/confirmMarket`, { selectedCountry: country }),

  generateStrategy: (id: number) =>
    api.post<Strategy>(`/projects/${id}/strategy`),

  getStrategy: (id: number) =>
    api.get<Strategy>(`/projects/${id}/strategy`),

  generateMarketing: (id: number, data: MarketingRequest) =>
    api.post<GeneratedAsset>(`/projects/${id}/marketing`, data),

  getMarketing: (id: number) =>
    api.get<GeneratedAsset[]>(`/projects/${id}/marketing`),

  generatePoster: (id: number) =>
    api.post(`/projects/${id}/poster`),

  getReport: (id: number) =>
    api.get(`/projects/${id}/report`),
}
