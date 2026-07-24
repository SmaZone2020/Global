import { motion } from 'framer-motion'
import { RefreshCw, Loader2 } from 'lucide-react'

interface SectionCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  onRegenerate: () => void
  regenerating: boolean
  children: React.ReactNode
}

export default function SectionCard({ title, subtitle, icon, onRegenerate, regenerating, children }: SectionCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold/5 to-gold/8" />
      <div className="absolute inset-[1px] bg-cream-light" />

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-chi/8 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-ink">{title}</h3>
              <p className="text-[10px] text-chi/30 tracking-wider uppercase">{subtitle}</p>
            </div>
          </div>
          <motion.button
            onClick={onRegenerate}
            disabled={regenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-ink/40
                       border border-ink/10 hover:border-gold/30 hover:text-gold
                       transition-colors cursor-pointer disabled:opacity-40"
            whileHover={!regenerating ? { scale: 1.03 } : {}}
            whileTap={!regenerating ? { scale: 0.97 } : {}}
          >
            {regenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            重新生成
          </motion.button>
        </div>
        {children}
      </div>
    </motion.div>
  )
}
