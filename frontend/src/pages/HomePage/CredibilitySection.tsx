import { motion } from 'framer-motion'
import { ShieldCheck, Database, Brain, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GiltCard from '@/components/shared/GiltCard'

interface CredibilityTag {
  icon: LucideIcon
  label: string
  description: string
  color: string
  glowColor: string
}

const credibilityTags: CredibilityTag[] = [
  { icon: ShieldCheck, label: '已验证事实', description: '来自品牌官方资料或权威公开来源，经过交叉验证', color: 'text-verified', glowColor: 'bg-verified/5' },
  { icon: Database, label: '公开数据', description: '来自公开平台、行业报告或政府统计数据', color: 'text-public-data', glowColor: 'bg-public-data/5' },
  { icon: Brain, label: 'AI 推断', description: '模型基于事实与数据的逻辑推断，标注置信度', color: 'text-ai-infer', glowColor: 'bg-ai-infer/5' },
  { icon: AlertTriangle, label: '待验证假设', description: '需要通过试销、专业机构或实地调研确认', color: 'text-unverified', glowColor: 'bg-unverified/5' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function CredibilitySection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-cream-dark/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chi/8 to-transparent" />

      <motion.div
        className="relative max-w-[1280px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-chi/25" />
            <span className="text-chi/40 text-xs tracking-[0.3em] uppercase">Credibility</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-chi/25" />
          </div>
          <h2 className="text-3xl font-bold text-ink mb-4 font-serif">可信度机制</h2>
          <p className="text-ink/40">每条数据标注来源与可信度，让决策有据可循</p>
        </motion.div>

        <motion.div className="grid grid-cols-4 gap-5" variants={containerVariants}>
          {credibilityTags.map((tag) => {
            const Icon = tag.icon
            return (
              <motion.div key={tag.label} variants={itemVariants}>
                <GiltCard hoverY={-4}>
                  <div className="relative z-[5] p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-chi transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-sm font-semibold mb-3 text-xuan">{tag.label}</h3>
                    <div className="w-8 h-px mx-auto mb-3 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    <p className="text-xs text-ink/35 leading-relaxed group-hover:text-ink/50 transition-colors duration-300">
                      {tag.description}
                    </p>
                  </div>
                </GiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
