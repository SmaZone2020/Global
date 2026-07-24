import { motion } from 'framer-motion'
import { PackageSearch, Globe, TrendingUp, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GiltCard from '@/components/shared/GiltCard'

interface CapabilityCard {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
}

const capabilities: CapabilityCard[] = [
  { icon: PackageSearch, title: '产品分析', subtitle: 'Product Analysis', description: 'AI 提取产品标签、核心卖点与 SWOT，自动识别海外市场障碍并生成解决建议。' },
  { icon: Globe, title: '文化解码', subtitle: 'Culture Decode', description: '将中国文化表达转化为海外消费者可感知的价值主张，避免文化误读与合规风险。' },
  { icon: TrendingUp, title: '市场洞察', subtitle: 'Market Insight', description: '多维度国家评分、消费者画像生成、竞品对标分析，数据驱动选择最优出海目的地。' },
  { icon: Sparkles, title: '营销生成', subtitle: 'Content Generation', description: '一键生成品牌故事、社媒文案、海报提示词、视频脚本，覆盖多渠道营销需求。' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function CapabilitySection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-light/50 to-cream" />

      <motion.div
        className="relative max-w-[1280px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-20" variants={cardVariants}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-chi/25" />
            <span className="text-chi/40 text-xs tracking-[0.3em] uppercase">Capabilities</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-chi/25" />
          </div>
          <h2 className="text-3xl font-bold text-ink mb-4 font-serif">核心能力</h2>
          <p className="text-ink/40">四大 AI 引擎，覆盖品牌出海全链路</p>
        </motion.div>

        <motion.div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto" variants={containerVariants}>
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <motion.div key={cap.title} variants={cardVariants}>
                <GiltCard>
                  <div className="p-8">
                    <div className="relative w-14 h-14 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold/5 group-hover:from-gold/30 group-hover:to-gold/10 transition-all duration-500" />
                      <div className="absolute inset-[1px] bg-cream flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold-dark group-hover:text-chi transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-serif font-medium text-ink mb-1 group-hover:text-chi transition-colors duration-300">
                      {cap.title}
                    </h3>
                    <p className="text-[10px] text-chi/25 tracking-wider uppercase mb-4">{cap.subtitle}</p>
                    <p className="text-sm text-ink/40 leading-relaxed group-hover:text-ink/60 transition-colors duration-300">
                      {cap.description}
                    </p>
                    <div className="mt-6 h-px bg-gradient-to-r from-gold/10 via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
