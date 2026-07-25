import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const popularRegions = [
  '东南亚', '西欧', '东欧', '北美', '中亚',
  '中东', '日韩', '南美', '非洲', '大洋洲',
]

interface MarketStepProps {
  targetCountries: string[]
  otherNotes: string
  onCountriesChange: (countries: string[]) => void
  onNotesChange: (notes: string) => void
}

const inputClass =
  'w-full bg-cream-dark/40 border border-ink/8 px-4 py-3 text-ink placeholder-ink/25 ' +
  'focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow'

export default function MarketStep({
  targetCountries,
  otherNotes,
  onCountriesChange,
  onNotesChange,
}: MarketStepProps) {
  const [customMode, setCustomMode] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const toggleRegion = (region: string) => {
    if (region === '__custom') {
      setCustomMode(true)
      return
    }
    if (targetCountries.includes(region)) {
      onCountriesChange(targetCountries.filter((c) => c !== region))
    } else {
      onCountriesChange([...targetCountries, region])
    }
  }

  const addCustomRegion = () => {
    const val = customInput.trim()
    if (val && !targetCountries.includes(val)) {
      onCountriesChange([...targetCountries, val])
    }
    setCustomInput('')
    setCustomMode(false)
  }

  const removeRegion = (region: string) => {
    onCountriesChange(targetCountries.filter((c) => c !== region))
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-ink">市场目标</h3>

      <div>
        <label className="block text-sm text-ink/60 mb-3">
          目标地区（可多选，留空由 AI 推荐）
        </label>
        <div className="flex flex-wrap gap-2 items-center">
          {popularRegions.map((region) => (
            <button
              key={region}
              onClick={() => toggleRegion(region)}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer border ${
                targetCountries.includes(region)
                  ? 'bg-gold text-ink border-gold'
                  : 'bg-cream-dark/40 text-ink/60 border-ink/8 hover:text-ink hover:border-gold/40'
              }`}
            >
              {region}
            </button>
          ))}
          <button
            onClick={() => setCustomMode(true)}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer border ${
              customMode
                ? 'bg-gold text-ink border-gold'
                : 'bg-cream-dark/40 text-ink/60 border-ink/8 hover:text-ink hover:border-gold/40'
            }`}
          >
            其他
          </button>
          {customMode && (
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomRegion()}
              onBlur={addCustomRegion}
              placeholder="输入地区名称，回车确认"
              autoFocus
              className="px-3 py-2 text-sm bg-cream border border-gold/30
                         text-ink placeholder:text-ink/30 w-48
                         focus:outline-none focus:border-gold/50 transition-colors"
            />
          )}
        </div>
      </div>

      {targetCountries.length > 0 && (
        <div>
          <label className="block text-sm text-ink/60 mb-2">已选择</label>
          <div className="flex flex-wrap gap-2">
            {targetCountries.map((region) => (
              <span
                key={region}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 text-gold
                           text-sm border border-gold/20"
              >
                {region}
                <button
                  onClick={() => removeRegion(region)}
                  className="hover:text-gold-light cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm text-ink/60 mb-1.5">其他说明</label>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          placeholder="补充说明目标市场、竞品、预算等信息..."
          value={otherNotes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </motion.div>
  )
}
