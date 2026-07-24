import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const popularCountries = [
  '美国', '日本', '新加坡', '英国', '澳大利亚',
  '加拿大', '韩国', '德国', '法国', '泰国',
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
  const toggleCountry = (country: string) => {
    if (targetCountries.includes(country)) {
      onCountriesChange(targetCountries.filter((c) => c !== country))
    } else {
      onCountriesChange([...targetCountries, country])
    }
  }

  const removeCountry = (country: string) => {
    onCountriesChange(targetCountries.filter((c) => c !== country))
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
          目标国家（可多选，留空由 AI 推荐）
        </label>
        <div className="flex flex-wrap gap-2">
          {popularCountries.map((country) => (
            <button
              key={country}
              onClick={() => toggleCountry(country)}
              className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer border ${
                targetCountries.includes(country)
                  ? 'bg-gold text-ink border-gold'
                  : 'bg-cream-dark/40 text-ink/60 border-ink/8 hover:text-ink hover:border-gold/40'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {targetCountries.length > 0 && (
        <div>
          <label className="block text-sm text-ink/60 mb-2">已选择</label>
          <div className="flex flex-wrap gap-2">
            {targetCountries.map((country) => (
              <span
                key={country}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 text-gold
                           text-sm border border-gold/20"
              >
                {country}
                <button
                  onClick={() => removeCountry(country)}
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
