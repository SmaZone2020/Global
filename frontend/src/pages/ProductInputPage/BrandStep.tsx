import { motion } from 'framer-motion'

interface BrandData {
  brandName: string
  establishedYear: number | undefined
  brandOrigin: string
  brandHistory: string
  brandVoice: string
  prohibitedClaims: string
}

interface BrandStepProps {
  data: BrandData
  onChange: (field: string, value: string | number | undefined) => void
}

const inputClass =
  'w-full bg-cream-dark/40 border border-ink/8 px-4 py-3 text-ink placeholder-ink/25 ' +
  'focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow'

export default function BrandStep({ data, onChange }: BrandStepProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-ink">品牌信息</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-ink/60 mb-1.5">
            品牌名称 <span className="text-unverified">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="请输入品牌名称"
            value={data.brandName}
            onChange={(e) => onChange('brandName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">成立年份</label>
          <input
            className={inputClass}
            type="number"
            placeholder="例如 1842"
            value={data.establishedYear ?? ''}
            onChange={(e) =>
              onChange('establishedYear', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-ink/60 mb-1.5">品牌所在地</label>
          <input
            className={inputClass}
            placeholder="例如 福建省福州市"
            value={data.brandOrigin}
            onChange={(e) => onChange('brandOrigin', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-ink/60 mb-1.5">品牌介绍</label>
          <textarea
            className={`${inputClass} min-h-[100px] resize-y`}
            placeholder="品牌的历史、故事和文化背景"
            value={data.brandHistory}
            onChange={(e) => onChange('brandHistory', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">品牌语气</label>
          <input
            className={inputClass}
            placeholder="例如 温暖、传统、有文化底蕴"
            value={data.brandVoice}
            onChange={(e) => onChange('brandVoice', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-ink/60 mb-1.5">禁用表达</label>
          <input
            className={inputClass}
            placeholder="例如 不可宣称保健功效"
            value={data.prohibitedClaims}
            onChange={(e) => onChange('prohibitedClaims', e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  )
}
