import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'
import type { AnalysisResult } from '@/types'
import GoldParticles from '@/components/shared/GoldParticles'
import AnalysisProgress from './AnalysisProgress'
import ProductTab from './ProductTab'
import CultureTab from './CultureTab'
import MarketTab from './MarketTab'
import CountryConfirmModal from './CountryConfirmModal'

const tabs = [
  { key: 'product', label: '产品分析', subtitle: 'Product' },
  { key: 'culture', label: '文化解码', subtitle: 'Culture' },
  { key: 'market', label: '市场洞察', subtitle: 'Market' },
] as const

type TabKey = (typeof tabs)[number]['key']

export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentProject, setCurrentProject, setAnalysisResults } = useProjectStore()

  const [activeTab, setActiveTab] = useState<TabKey>('product')
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analyzeSteps, setAnalyzeSteps] = useState<{ name: string; label: string; status: string }[]>([])
  const [showModal, setShowModal] = useState(false)
  const [marketConfirmed, setMarketConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const projectId = Number(id)

  const fetchAnalysis = useCallback(async () => {
    try {
      const res = await projectApi.getAnalysis(projectId)
      if (res.success && res.data && res.data.length > 0) {
        setResults(res.data)
        setAnalysisResults(res.data)
        setIsAnalyzing(false)
        if (pollingRef.current) {
          clearInterval(pollingRef.current)
          pollingRef.current = null
        }
      }
    } catch {
      // Keep polling on error
    }
  }, [projectId, setAnalysisResults])

  const fetchProject = useCallback(async () => {
    try {
      const res = await projectApi.get(projectId)
      if (res.success && res.data) {
        setCurrentProject(res.data)
        if (res.data.status === 'awaitingConfirm' || res.data.status === 'strategyReady') {
          setMarketConfirmed(res.data.status === 'strategyReady')
          setIsAnalyzing(false)
          await fetchAnalysis()
        } else if (res.data.status === 'analyzing') {
          setIsAnalyzing(true)
          setAnalyzeSteps([
            { name: 'documentParsing', label: '文档解析与信息提取', status: 'completed' },
            { name: 'productAnalysis', label: '产品分析', status: 'inProgress' },
            { name: 'marketScan', label: '全球市场扫描', status: 'pending' },
            { name: 'cultureDecode', label: '文化解码', status: 'pending' },
            { name: 'marketInsight', label: '市场深度洞察', status: 'pending' },
          ])
          pollingRef.current = setInterval(fetchAnalysis, 5000)
        } else {
          await fetchAnalysis()
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取项目失败')
      setIsAnalyzing(false)
    }
  }, [projectId, setCurrentProject, fetchAnalysis])

  useEffect(() => {
    fetchProject()
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [fetchProject])

  const handleConfirmMarket = async (country: string) => {
    const res = await projectApi.confirmMarket(projectId, country)
    if (res.success) {
      setMarketConfirmed(true)
      setShowModal(false)
    }
  }

  const getContent = (type: string) => {
    const result = results.find((r) => r.type === type)
    return result?.content
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-unverified text-sm">{error}</p>
      </div>
    )
  }

  if (isAnalyzing) {
    return <AnalysisProgress steps={analyzeSteps} />
  }

  const productContent = getContent('product')
  const cultureContent = getContent('culture')
  const marketContent = getContent('market')

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none">
        <GoldParticles count={12} />
      </div>

      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-ink mb-1 font-serif">智能分析总览</h2>
          <p className="text-xs text-gold/30 tracking-wider uppercase">AI Analysis Overview</p>
        </div>
        {currentProject && (
          <span className="text-ink/40 text-sm border border-gold/10 px-3 py-1 bg-gold/[0.03]">
            {currentProject.name}
          </span>
        )}
      </motion.div>

      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10" />
          <div className="absolute inset-[1px] bg-cream-light" />
          <div className="relative flex gap-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-1 py-3 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                    layoutId="activeTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'product' && productContent && (
          <ProductTab content={productContent} />
        )}
        {activeTab === 'culture' && cultureContent && (
          <CultureTab content={cultureContent} />
        )}
        {activeTab === 'market' && marketContent && (
          <MarketTab
            content={marketContent}
            onConfirmMarket={() => setShowModal(true)}
            marketConfirmed={marketConfirmed}
          />
        )}
      </motion.div>

      {marketConfirmed && (
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={() => navigate(`/project/${projectId}/strategy`)}
            className="group relative flex items-center gap-3 px-10 py-4 text-sm
                       font-semibold overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #b08d4f, #c9a96e, #d4bc8a, #c9a96e, #b08d4f)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s linear infinite',
              }}
            />
            <div className="absolute inset-[1px] bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
            <span className="relative z-10 text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              生成出海策略
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </motion.button>
        </motion.div>
      )}

      {showModal && marketContent && (
        <CountryConfirmModal
          candidates={marketContent.candidates}
          onConfirm={handleConfirmMarket}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
