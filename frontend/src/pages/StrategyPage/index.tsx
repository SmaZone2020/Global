import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight, RefreshCw } from 'lucide-react'
import { projectApi } from '@/services/api'
import type { Strategy } from '@/types'
import GoldParticles from '@/components/shared/GoldParticles'
import PositioningCard from './PositioningCard'
import SkuPlanCard from './SkuPlanCard'
import PackagingCard from './PackagingCard'
import PricingCard from './PricingCard'
import ChannelsCard from './ChannelsCard'
import RoadmapCard from './RoadmapCard'
import CultureReconCard from './CultureReconCard'

export default function StrategyPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const projectId = Number(id)

  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [cultureContent, setCultureContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchStrategy = useCallback(async () => {
    try {
      const [stratRes, analysisRes] = await Promise.all([
        projectApi.getStrategy(projectId),
        projectApi.getAnalysis(projectId),
      ])
      if (stratRes.success && stratRes.data) {
        setStrategy(stratRes.data)
      }
      if (analysisRes.success && analysisRes.data) {
        const culture = analysisRes.data.find((r) => r.type === 'culture')
        if (culture) setCultureContent(culture.content)
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }, [projectId])

  const generateStrategy = async () => {
    setGenerating(true)
    setError(null)
    try {
      const res = await projectApi.generateStrategy(projectId)
      if (res.success && res.data) {
        setStrategy(res.data)
      } else {
        setError(res.message || '策略生成失败')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '策略生成失败')
    } finally {
      setGenerating(false)
    }
  }

  const regenerateSection = async (section: string) => {
    setRegeneratingSection(section)
    try {
      const res = await projectApi.regenerateStrategySection(projectId, section)
      if (res.success && res.data) {
        setStrategy((prev) => prev ? { ...prev, [section]: res.data } : prev)
      }
    } catch {
      // silent
    } finally {
      setRegeneratingSection(null)
    }
  }

  useEffect(() => {
    fetchStrategy()
  }, [fetchStrategy])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <p className="text-ink/40 text-sm mt-3">加载策略数据...</p>
      </div>
    )
  }

  if (!strategy) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
        <p className="text-ink/50">暂无策略数据，点击生成出海策略</p>
        {error && <p className="text-unverified text-sm">{error}</p>}
        <motion.button
          onClick={generateStrategy}
          disabled={generating}
          className="group relative flex items-center gap-2 px-8 py-3 text-sm
                     font-semibold overflow-hidden cursor-pointer disabled:opacity-50"
          whileHover={!generating ? { scale: 1.03 } : {}}
          whileTap={!generating ? { scale: 0.97 } : {}}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
          <span className="relative z-10 text-ink flex items-center gap-2">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {generating ? '生成中...' : '生成出海策略'}
          </span>
        </motion.button>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none">
        <GoldParticles count={10} />
      </div>

      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-ink mb-1 font-serif">出海策略</h2>
          <p className="text-xs text-gold/30 tracking-wider uppercase">Go-to-Market Strategy</p>
        </div>
        <motion.button
          onClick={() => navigate(`/project/${projectId}/marketing`)}
          className="group relative flex items-center gap-2 px-6 py-2.5 text-sm
                     font-semibold overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
          <span className="relative z-10 text-ink flex items-center gap-2">
            AI 营销工作台
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </motion.button>
      </motion.div>

      <div className="space-y-6">
        <PositioningCard
          data={strategy.positioning}
          onRegenerate={() => regenerateSection('positioning')}
          regenerating={regeneratingSection === 'positioning'}
        />
        {cultureContent && <CultureReconCard content={cultureContent} />}
        <SkuPlanCard
          data={strategy.skuPlan}
          onRegenerate={() => regenerateSection('skuPlan')}
          regenerating={regeneratingSection === 'skuPlan'}
        />
        <PackagingCard
          data={strategy.packaging}
          onRegenerate={() => regenerateSection('packaging')}
          regenerating={regeneratingSection === 'packaging'}
        />
        <PricingCard
          data={strategy.pricing}
          onRegenerate={() => regenerateSection('pricing')}
          regenerating={regeneratingSection === 'pricing'}
        />
        <ChannelsCard
          data={strategy.channels}
          onRegenerate={() => regenerateSection('channels')}
          regenerating={regeneratingSection === 'channels'}
        />
        <RoadmapCard
          data={strategy.roadmap}
          onRegenerate={() => regenerateSection('roadmap')}
          regenerating={regeneratingSection === 'roadmap'}
        />
      </div>
    </div>
  )
}
