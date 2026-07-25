import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Image, Clapperboard, FlaskConical, ArrowRight } from 'lucide-react'
import GoldParticles from '@/components/shared/GoldParticles'
import ContentTab from './ContentTab'
import PosterTab from './PosterTab'
import VideoTab from './VideoTab'
import AbTestTab from './AbTestTab'

const tabs = [
  { key: 'content', label: '文案生成', icon: <FileText className="w-4 h-4" /> },
  { key: 'poster', label: '海报生成', icon: <Image className="w-4 h-4" /> },
  { key: 'video', label: '视频脚本', icon: <Clapperboard className="w-4 h-4" /> },
  { key: 'abtest', label: '多版本测试', icon: <FlaskConical className="w-4 h-4" /> },
]

export default function MarketingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const projectId = Number(id)
  const [activeTab, setActiveTab] = useState('content')

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none">
        <GoldParticles count={8} />
      </div>

      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-ink mb-1 font-serif">AI 营销工作台</h2>
          <p className="text-xs text-gold/30 tracking-wider uppercase">Marketing Studio</p>
        </div>
        <motion.button
          onClick={() => navigate(`/project/${projectId}/report`)}
          className="group relative flex items-center gap-2 px-6 py-2.5 text-sm
                     font-semibold overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
          <span className="relative z-10 text-ink flex items-center gap-2">
            查看报告
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </motion.button>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex gap-1 mb-8 border-b border-ink/8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center gap-2 px-5 py-3 text-sm cursor-pointer
                       transition-colors ${
              activeTab === tab.key
                ? 'text-chi font-medium'
                : 'text-ink/40 hover:text-ink/60'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="marketing-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-chi"
              />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'content' && <ContentTab projectId={projectId} />}
      {activeTab === 'poster' && <PosterTab projectId={projectId} />}
      {activeTab === 'video' && <VideoTab projectId={projectId} />}
      {activeTab === 'abtest' && <AbTestTab projectId={projectId} />}
    </div>
  )
}
