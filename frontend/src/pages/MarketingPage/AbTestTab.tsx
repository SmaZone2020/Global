import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Sparkles, FlaskConical, Copy, Check } from 'lucide-react'
import { projectApi } from '@/services/api'
import MarkdownReport from '@/components/shared/MarkdownReport'

interface VersionResult {
  versionKey: string
  versionLabel: string
  content: string
}

interface Props {
  projectId: number
}

export default function AbTestTab({ projectId }: Props) {
  const [generating, setGenerating] = useState(false)
  const [versions, setVersions] = useState<VersionResult[]>([])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await projectApi.generateAbTest(projectId)
      if (res.success && res.data?.versions) {
        setVersions(res.data.versions)
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
        <div className="relative p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-ink mb-1">多版本定位测试</h3>
            <p className="text-xs text-ink/40 leading-relaxed">
              同一产品，4种不同定位方向同时生成。对比哪种定位更适合目标市场，
              从"东方餐酒"到"节庆礼赠"，找到最有转化潜力的表达方式。
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-ink/50">
            <span className="px-2 py-1 bg-chi/8 text-chi border border-chi/20">版本A：东方餐酒</span>
            <span className="px-2 py-1 bg-gold/10 text-gold border border-gold/20">版本B：文化体验酒</span>
            <span className="px-2 py-1 bg-verified/10 text-verified border border-verified/20">版本C：中餐烹饪酒</span>
            <span className="px-2 py-1 bg-public-data/10 text-public-data border border-public-data/20">版本D：节庆礼赠酒</span>
          </div>

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
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
              {generating ? '生成4个版本中（约60秒）...' : '一键生成4版本对比'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {versions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {versions.map((version, idx) => (
            <VersionCard key={version.versionKey} version={version} index={idx} />
          ))}
        </div>
      )}
    </div>
  )
}

const versionColors = [
  'border-chi/20 from-chi/5',
  'border-gold/20 from-gold/5',
  'border-verified/20 from-verified/5',
  'border-public-data/20 from-public-data/5',
]

function VersionCard({ version, index }: { version: VersionResult; index: number }) {
  const [copied, setCopied] = useState(false)
  const color = versionColors[index % 4]

  const handleCopy = () => {
    navigator.clipboard.writeText(version.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className={`relative overflow-hidden border ${color.split(' ')[0]}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color.split(' ')[1]} to-transparent`} />
      <div className="absolute inset-[1px] bg-cream-light" />
      <div className="relative p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-ink">
            版本{String.fromCharCode(65 + index)}：{version.versionLabel}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 text-xs text-ink/50
                       hover:text-ink border border-ink/8 hover:border-gold/30
                       cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-verified" /> : <Copy className="w-3 h-3" />}
            {copied ? '已复制' : '复制'}
          </button>
        </div>
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <MarkdownReport content={{ markdown: version.content }} />
        </div>
      </div>
    </motion.div>
  )
}
