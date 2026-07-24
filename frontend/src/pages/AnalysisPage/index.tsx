import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'
import type { AnalysisResult } from '@/types'
import AnalysisProgress from './AnalysisProgress'
import ProductTab from './ProductTab'
import CultureTab from './CultureTab'
import MarketTab from './MarketTab'
import CountryConfirmModal from './CountryConfirmModal'

const tabs = [
  { key: 'product', label: '产品分析' },
  { key: 'culture', label: '文化解码' },
  { key: 'market', label: '市场洞察' },
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-snow">智能分析总览</h2>
        {currentProject && (
          <span className="text-snow/40 text-sm">{currentProject.name}</span>
        )}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-ink-lighter rounded-xl p-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'bg-gold text-ink'
                : 'text-snow/50 hover:text-snow'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
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

      {/* Generate Strategy Button */}
      {marketConfirmed && (
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={() => navigate(`/project/${projectId}/strategy`)}
            className="flex items-center gap-2 px-8 py-3.5 bg-gold text-ink font-semibold
                       rounded-xl text-sm hover:bg-gold-light transition-colors cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            生成出海策略
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      {/* Country Confirm Modal */}
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
