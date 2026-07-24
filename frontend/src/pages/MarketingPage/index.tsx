import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Sparkles, Copy, Check, Film, Image, FileText, BookOpen, ArrowRight } from 'lucide-react'
import { projectApi } from '@/services/api'
import type { GeneratedAsset } from '@/types'
import GoldParticles from '@/components/shared/GoldParticles'

const channels = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'xiaohongshu', label: '小红书' },
  { key: 'amazon', label: 'Amazon' },
]

const styles = [
  { key: 'premium', label: '高端精品' },
  { key: 'storytelling', label: '文化叙事' },
  { key: 'modern', label: '现代潮流' },
  { key: 'educational', label: '知识科普' },
]

const audiences = [
  { key: 'asian-cuisine-lovers', label: '亚洲料理爱好者' },
  { key: 'wine-enthusiasts', label: '酒类探索者' },
  { key: 'cultural-explorers', label: '文化体验者' },
  { key: 'millennials', label: '千禧一代' },
]

const contentTypeIcons: Record<string, React.ReactNode> = {
  brandStory: <BookOpen className="w-4 h-4" />,
  socialPost: <FileText className="w-4 h-4" />,
  videoScript: <Film className="w-4 h-4" />,
  posterPrompt: <Image className="w-4 h-4" />,
}

const contentTypeLabels: Record<string, string> = {
  brandStory: '品牌故事',
  socialPost: '社媒帖文',
  videoScript: '视频脚本',
  posterPrompt: '海报 Prompt',
}

export default function MarketingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const projectId = Number(id)

  const [channel, setChannel] = useState('instagram')
  const [style, setStyle] = useState('premium')
  const [audience, setAudience] = useState('asian-cuisine-lovers')
  const [generating, setGenerating] = useState(false)
  const [assets, setAssets] = useState<GeneratedAsset[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const fetchAssets = useCallback(async () => {
    try {
      const res = await projectApi.getMarketing(projectId)
      if (res.success && res.data) setAssets(res.data)
    } catch { /* ignore */ }
  }, [projectId])

  useEffect(() => { fetchAssets() }, [fetchAssets])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await projectApi.generateMarketing(projectId, { channel, style, audience })
      if (res.success && res.data) {
        setAssets((prev) => [...res.data!, ...prev])
      }
    } catch { /* ignore */ }
    setGenerating(false)
  }

  const copyContent = (asset: GeneratedAsset) => {
    navigator.clipboard.writeText(asset.content)
    setCopiedId(asset.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

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

      {/* Control Panel */}
      <motion.div
        className="relative overflow-hidden mb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold/5 to-gold/8" />
        <div className="absolute inset-[1px] bg-cream-light" />
        <div className="relative p-6 space-y-5">
          {/* Channel */}
          <div>
            <label className="text-xs text-ink/40 mb-2 block">渠道</label>
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChannel(c.key)}
                  className={`px-4 py-2 text-sm cursor-pointer border transition-colors ${
                    channel === c.key
                      ? 'bg-chi/10 text-chi border-chi/20 font-medium'
                      : 'text-ink/50 border-ink/8 hover:border-gold/30'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="text-xs text-ink/40 mb-2 block">风格</label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStyle(s.key)}
                  className={`px-4 py-2 text-sm cursor-pointer border transition-colors ${
                    style === s.key
                      ? 'bg-chi/10 text-chi border-chi/20 font-medium'
                      : 'text-ink/50 border-ink/8 hover:border-gold/30'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audience */}
          <div>
            <label className="text-xs text-ink/40 mb-2 block">目标客群</label>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setAudience(a.key)}
                  className={`px-4 py-2 text-sm cursor-pointer border transition-colors ${
                    audience === a.key
                      ? 'bg-chi/10 text-chi border-chi/20 font-medium'
                      : 'text-ink/50 border-ink/8 hover:border-gold/30'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-2">
            <motion.button
              onClick={handleGenerate}
              disabled={generating}
              className="group relative flex items-center gap-2 px-8 py-3 text-sm
                         font-semibold overflow-hidden cursor-pointer disabled:opacity-50"
              whileHover={!generating ? { scale: 1.03 } : {}}
              whileTap={!generating ? { scale: 0.97 } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
              <span className="relative z-10 text-ink flex items-center gap-2">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {generating ? '生成中...' : '生成营销内容'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Generated Assets */}
      {assets.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">已生成内容</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <motion.div
                key={asset.id}
                className="relative overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-gold/3 to-gold/6" />
                <div className="absolute inset-[1px] bg-cream-light" />
                <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-chi">{contentTypeIcons[asset.contentType]}</span>
                      <span className="text-sm font-medium text-ink">
                        {contentTypeLabels[asset.contentType] || asset.contentType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink/30">{asset.channel} / {asset.style}</span>
                      <button
                        onClick={() => copyContent(asset)}
                        className="p-1.5 text-ink/30 hover:text-gold transition-colors cursor-pointer"
                      >
                        {copiedId === asset.id ? <Check className="w-4 h-4 text-verified" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-ink/70 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                    {asset.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
