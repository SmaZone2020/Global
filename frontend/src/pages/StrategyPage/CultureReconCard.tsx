import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import MarkdownReport from '@/components/shared/MarkdownReport'

interface Props {
  content: any
}

export default function CultureReconCard({ content }: Props) {
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
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-chi/8 flex items-center justify-center">
            <Globe className="w-5 h-5 text-chi" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink">文化重构</h3>
            <p className="text-[10px] text-chi/30 tracking-wider uppercase">Cultural Reconstruction</p>
          </div>
        </div>

        <MarkdownReport content={content} />
      </div>
    </motion.div>
  )
}
