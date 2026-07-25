import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Sparkles, Clapperboard, Clock, Copy, Check } from 'lucide-react'
import { projectApi } from '@/services/api'

const stylePresets = [
  { key: 'cinematic', label: '电影质感', description: '大气镜头·慢动作·叙事感' },
  { key: 'oriental', label: '东方美学', description: '水墨元素·古风·禅意' },
  { key: 'trendy', label: '潮流快剪', description: '快节奏·社媒原生·年轻化' },
  { key: 'product', label: '产品展示', description: '特写旋转·细节放大·商业风' },
]

interface ScriptResult {
  script: string
  style: string
  prompt: string
}

interface Props {
  projectId: number
}

export default function VideoTab({ projectId }: Props) {
  const [selectedStyle, setSelectedStyle] = useState('cinematic')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [scripts, setScripts] = useState<ScriptResult[]>([])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    try {
      const res = await projectApi.generateVideoScript(projectId, {
        prompt,
        style: selectedStyle,
      })
      if (res.success && res.data) {
        setScripts((prev) => [res.data!, ...prev])
      }
    } catch { /* ignore */ }
    setGenerating(false)
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold/5 to-gold/8" />
        <div className="absolute inset-[1px] bg-cream-light" />
        <div className="relative p-6 space-y-5">
          <label className="text-xs text-ink/40 mb-2 block">选择视频风格</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stylePresets.map((preset) => (
              <motion.button
                key={preset.key}
                onClick={() => setSelectedStyle(preset.key)}
                className={`relative p-4 text-left cursor-pointer border transition-all ${
                  selectedStyle === preset.key
                    ? 'border-chi/30 bg-chi/5'
                    : 'border-ink/8 hover:border-gold/30 bg-cream'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`text-sm font-medium mb-1 ${
                  selectedStyle === preset.key ? 'text-chi' : 'text-ink'
                }`}>
                  {preset.label}
                </div>
                <div className="text-xs text-ink/40 leading-relaxed">
                  {preset.description}
                </div>
              </motion.button>
            ))}
          </div>

          <div>
            <label className="text-xs text-ink/40 mb-2 block">视频内容描述</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述你想要的视频内容，例如：展示福建老酒的百年酿造工艺和现代饮用场景..."
              className="w-full px-4 py-3 text-sm bg-cream border border-ink/8
                         text-ink placeholder:text-ink/30 resize-none h-24
                         focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          <div className="pt-2">
            <motion.button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              className="group relative flex items-center gap-2 px-8 py-3 text-sm
                         font-semibold overflow-hidden cursor-pointer disabled:opacity-50"
              whileHover={!generating ? { scale: 1.03 } : {}}
              whileTap={!generating ? { scale: 0.97 } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
              <span className="relative z-10 text-ink flex items-center gap-2">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {generating ? '生成脚本中...' : '生成视频脚本'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {scripts.map((result, idx) => (
        <ScriptCard key={idx} result={result} index={idx} />
      ))}
    </div>
  )
}

function ScriptCard({ result, index }: { result: ScriptResult; index: number }) {
  const [copied, setCopied] = useState(false)
  const styleLabel = stylePresets.find(s => s.key === result.style)?.label ?? result.style

  const scenes = parseScenes(result.script)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-gold/3 to-gold/6" />
      <div className="absolute inset-[1px] bg-cream-light" />
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-4 h-4 text-chi" />
            <span className="text-sm font-medium text-ink">{styleLabel}</span>
            <span className="text-xs text-ink/30">|</span>
            <span className="text-xs text-ink/40 truncate max-w-xs">{result.prompt}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1 text-xs text-ink/50
                       hover:text-ink border border-ink/8 hover:border-gold/30
                       cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-verified" /> : <Copy className="w-3 h-3" />}
            {copied ? '已复制' : '复制'}
          </button>
        </div>

        <div className="space-y-0">
          {scenes.map((scene, i) => (
            <div key={i} className="flex gap-3 group">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 mt-2 bg-gold shrink-0" />
                {i < scenes.length - 1 && (
                  <div className="w-px flex-1 bg-gold/20 my-1" />
                )}
              </div>
              <div className="pb-4 flex-1">
                {scene.time && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 mb-1
                                   bg-gold/10 text-gold text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    {scene.time}
                  </span>
                )}
                <p className="text-sm text-ink/70 leading-relaxed">{scene.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function parseScenes(script: string): { time: string; description: string }[] {
  const lines = script.split('\n').filter(l => l.trim())
  return lines.map(line => {
    const match = line.match(/\[([^\]]+)\]\s*(.+)/)
    if (match) {
      return { time: match[1], description: match[2] }
    }
    return { time: '', description: line.trim() }
  })
}
