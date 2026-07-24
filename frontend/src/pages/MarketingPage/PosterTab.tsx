import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Sparkles, Download, Palette, Brush, Zap, Wine } from 'lucide-react'
import { projectApi } from '@/services/api'
import type { GeneratedPoster } from '@/types'

const presets = [
  {
    key: 'luxury',
    label: '高端礼品风',
    description: '黑金配色·极简构图·中式纹样',
    icon: <Wine className="w-5 h-5" />,
    gradient: 'from-amber-900/20 to-yellow-900/10',
  },
  {
    key: 'oriental',
    label: '东方美学风',
    description: '水墨山水·国风纹饰·传统器皿',
    icon: <Brush className="w-5 h-5" />,
    gradient: 'from-stone-800/20 to-amber-900/10',
  },
  {
    key: 'trendy',
    label: '年轻潮流风',
    description: '国潮撞色·插画风·社媒原生',
    icon: <Zap className="w-5 h-5" />,
    gradient: 'from-rose-900/20 to-violet-900/10',
  },
  {
    key: 'business',
    label: '商务宴请风',
    description: '简洁正式·暗调背景·宴席氛围',
    icon: <Palette className="w-5 h-5" />,
    gradient: 'from-slate-800/20 to-zinc-900/10',
  },
]

interface Props {
  projectId: number
}

/* PLACEHOLDER_POSTER_TAB_REST */

export default function PosterTab({ projectId }: Props) {
  const [selectedStyle, setSelectedStyle] = useState('luxury')
  const [customPrompt, setCustomPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [posters, setPosters] = useState<GeneratedPoster[]>([])

  const fetchPosters = useCallback(async () => {
    try {
      const res = await projectApi.getPosters(projectId)
      if (res.success && res.data) setPosters(res.data)
    } catch { /* ignore */ }
  }, [projectId])

  useEffect(() => { fetchPosters() }, [fetchPosters])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await projectApi.generatePoster(projectId, {
        styleKey: selectedStyle,
        customPrompt,
      })
      if (res.success && res.data) {
        setPosters((prev) => [res.data!, ...prev])
      }
    } catch { /* ignore */ }
    setGenerating(false)
  }

  return (
    <div className="space-y-8">
      {/* Style Presets */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold/5 to-gold/8" />
        <div className="absolute inset-[1px] bg-cream-light" />
        <div className="relative p-6 space-y-5">
          <label className="text-xs text-ink/40 mb-2 block">选择风格预设</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {presets.map((preset) => (
              <PresetCard
                key={preset.key}
                preset={preset}
                selected={selectedStyle === preset.key}
                onSelect={() => setSelectedStyle(preset.key)}
              />
            ))}
          </div>

          {/* Custom Prompt */}
          <div>
            <label className="text-xs text-ink/40 mb-2 block">
              附加要求（可选，用于补充描述风格细节）
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="例如：主色调偏暗红色，突出产品瓶身特写..."
              className="w-full px-4 py-3 text-sm bg-cream border border-ink/8
                         text-ink placeholder:text-ink/30 resize-none h-20
                         focus:outline-none focus:border-gold/40 transition-colors"
            />
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
                {generating ? '生成海报中（约30秒）...' : '生成产品海报'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Poster Gallery */}
      {posters.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">已生成海报</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posters.map((poster) => (
              <PosterCard key={poster.id} poster={poster} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PresetCard({ preset, selected, onSelect }: {
  preset: typeof presets[number]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      onClick={onSelect}
      className={`relative p-4 text-left cursor-pointer border transition-all ${
        selected
          ? 'border-chi/30 bg-chi/5'
          : 'border-ink/8 hover:border-gold/30 bg-cream'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${preset.gradient} opacity-50`} />
      <div className="relative">
        <div className={`mb-2 ${selected ? 'text-chi' : 'text-ink/50'}`}>
          {preset.icon}
        </div>
        <div className={`text-sm font-medium mb-1 ${selected ? 'text-chi' : 'text-ink'}`}>
          {preset.label}
        </div>
        <div className="text-xs text-ink/40 leading-relaxed">
          {preset.description}
        </div>
      </div>
    </motion.button>
  )
}

function PosterCard({ poster }: { poster: GeneratedPoster }) {
  const handleDownload = () => {
    if (!poster.imageUrl) return
    window.open(poster.imageUrl, '_blank')
  }

  return (
    <motion.div
      className="relative overflow-hidden group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-gold/3 to-gold/6" />
      <div className="absolute inset-[1px] bg-cream-light" />
      <div className="relative">
        {poster.status === 'completed' && poster.imageUrl ? (
          <div className="relative">
            <img
              src={poster.imageUrl}
              alt={poster.styleLabel}
              className="w-full aspect-square object-cover"
            />
            <button
              onClick={handleDownload}
              className="absolute top-2 right-2 p-2 bg-ink/60 text-cream
                         hover:bg-ink/80 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ) : poster.status === 'failed' ? (
          <div className="w-full aspect-square flex items-center justify-center bg-cream-dark/20">
            <span className="text-sm text-ink/40">生成失败</span>
          </div>
        ) : (
          <div className="w-full aspect-square flex items-center justify-center bg-cream-dark/20">
            <Loader2 className="w-6 h-6 text-gold animate-spin" />
          </div>
        )}
        <div className="p-3">
          <div className="text-xs font-medium text-chi">{poster.styleLabel}</div>
          <div className="text-xs text-ink/40 mt-1 line-clamp-2">{poster.finalPrompt}</div>
        </div>
      </div>
    </motion.div>
  )
}
