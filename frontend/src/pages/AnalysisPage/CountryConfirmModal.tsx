import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'

interface Candidate {
  country: string
  totalScore: number
  recommended: boolean
}

interface CountryConfirmModalProps {
  candidates: Candidate[]
  onConfirm: (country: string) => Promise<void>
  onClose: () => void
}

export default function CountryConfirmModal({
  candidates,
  onConfirm,
  onClose,
}: CountryConfirmModalProps) {
  const [selected, setSelected] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (!selected) return
    setSubmitting(true)
    try {
      await onConfirm(selected)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-cream-light border border-gold/15 p-6 w-full max-w-md mx-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ink">确认目标市场</h3>
            <button
              onClick={onClose}
              className="text-ink/40 hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-ink/50 text-sm mb-4">
            请选择一个目标国家，后续策略将围绕该市场生成
          </p>

          <div className="space-y-2 mb-6">
            {candidates.map((c) => (
              <button
                key={c.country}
                onClick={() => setSelected(c.country)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left
                           transition-colors cursor-pointer ${
                  selected === c.country
                    ? 'bg-gold/15 border border-gold'
                    : 'bg-cream-dark/40 border border-ink/8 hover:border-gold/30'
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 flex items-center justify-center ${
                    selected === c.country
                      ? 'border-gold'
                      : 'border-ink/30'
                  }`}
                >
                  {selected === c.country && (
                    <div className="w-2.5 h-2.5 bg-gold" />
                  )}
                </div>
                <span className="flex-1 text-ink text-sm font-medium">{c.country}</span>
                <span className="text-gold text-sm font-semibold">{c.totalScore}分</span>
                {c.recommended && (
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs border border-gold/20">
                    推荐
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-ink/60 hover:text-ink transition-colors cursor-pointer"
            >
              取消
            </button>
            <motion.button
              onClick={handleConfirm}
              disabled={!selected || submitting}
              className="px-6 py-2 bg-gold text-ink font-semibold text-sm
                         hover:bg-gold-light transition-colors disabled:opacity-40
                         disabled:cursor-not-allowed cursor-pointer"
              whileHover={selected && !submitting ? { scale: 1.03 } : {}}
              whileTap={selected && !submitting ? { scale: 0.97 } : {}}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  确认中...
                </span>
              ) : (
                '确认'
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
