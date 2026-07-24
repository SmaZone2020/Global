export interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: string | null
}

export type ProjectStatus = 'draft' | 'analyzing' | 'awaitingConfirm' | 'strategyReady' | 'assetsReady' | 'exported'
export type AnalysisType = 'product' | 'culture' | 'market'
export type AssetStatus = 'generated' | 'edited' | 'approved'
export type CredibilityLevel = 'verified' | 'publicData' | 'aiInference' | 'unverified'

export interface Project {
  id: number
  name: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  brand?: Brand
  products: Product[]
}

export interface Brand {
  id: number
  projectId: number
  name: string
  origin: string
  history: string
  brandVoice: string
  prohibitedClaims: string
  establishedYear?: number
}

export interface Product {
  id: number
  brandId: number
  name: string
  category: string
  sku: string
  specs: string
  ingredients: string
  process: string
  domesticPrice?: number
  imageUrl: string
}

export interface AnalysisResult {
  id: number
  projectId: number
  type: AnalysisType
  content: any
  sources: Source[]
  createdAt: string
}

export interface Source {
  title: string
  type: CredibilityLevel
  excerpt: string
  capturedAt: string
}

export interface MarketCandidate {
  id: number
  projectId: number
  country: string
  totalScore: number
  dimensionScores: DimensionScores
  evidence: string[]
  risks: string[]
  isSelected: boolean
}

export interface DimensionScores {
  demand: number
  cultureFit: number
  competition: number
  channelAccess: number
  compliance: number
  economics: number
}

export interface StrategyPositioning {
  targetCountry: string
  coreAudience: string
  categoryReference: string
  differentiation: string
}

export interface SkuPlanItem {
  name: string
  role: string
  reason: string
}

export interface PricingRange {
  tier: string
  range: string
  channel: string
}

export interface RoadmapPhase {
  period: string
  title: string
  actions: string[]
  metrics: string[]
}

export interface Strategy {
  id: number
  projectId: number
  positioning: StrategyPositioning
  skuPlan: { primary: SkuPlanItem; test: SkuPlanItem; premium: SkuPlanItem }
  packaging: { volume: string; labelInfo: string[]; visualDirection: string }
  pricing: { strategy: string; ranges: PricingRange[]; costAssumptions: string }
  channels: { priority: { channel: string; cities: string[]; action: string }[] }
  roadmap: { phase1: RoadmapPhase; phase2: RoadmapPhase; phase3: RoadmapPhase }
  createdAt: string
}

export interface GeneratedAsset {
  id: number
  projectId: number
  channel: string
  style: string
  audience: string
  contentType: string
  content: string
  imageUrl: string
  status: AssetStatus
  createdAt: string
}

export interface CreateProjectRequest {
  name: string
  brandName: string
  brandOrigin: string
  brandHistory: string
  brandVoice: string
  prohibitedClaims: string
  establishedYear?: number
  products: ProductInput[]
  targetCountries?: string[]
}

export interface ProductInput {
  name: string
  category: string
  sku: string
  specs: string
  ingredients: string
  process: string
  domesticPrice?: number
  imageUrl: string
}

export interface MarketingRequest {
  channel: string
  style: string
  audience: string
}

export interface GeneratedPoster {
  id: number
  projectId: number
  styleKey: string
  styleLabel: string
  finalPrompt: string
  imageUrl: string
  status: string
  createdAt: string
}

export interface PosterPresetInfo {
  key: string
  label: string
  description: string
  previewKeywords: string[]
}
