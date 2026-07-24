import { motion } from 'framer-motion'
import { Search, Landmark, BarChart3, PenTool, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GiltCard from '@/components/shared/GiltCard'

interface FlowStep {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
}

const flowSteps: FlowStep[] = [
  { icon: Search, title: '市场发现', subtitle: 'Market Discovery', description: 'AI 自动扫描全球市场机会，多维度评估最优出海目的地' },
  { icon: Landmark, title: '文化匹配', subtitle: 'Culture Mapping', description: '将传统文化转化为海外消费者可感知的品牌价值' },
  { icon: BarChart3, title: '策略生成', subtitle: 'Strategy Generation', description: '自动生成定位、定价、渠道与 90 天上市方案' },
  { icon: PenTool, title: '内容创作', subtitle: 'Content Creation', description: '一键生成多渠道营销内容，覆盖社媒、视频、海报' },
  { icon: CheckCircle, title: '验证计划', subtitle: 'Validation Plan', description: '可执行的出海路线图，数据驱动验证市场假设' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function FlowSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream-dark/50 via-cream to-cream" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chi/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chi/8 to-transparent" />

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
            <span className="text-chi/40 text-xs tracking-[0.3em] uppercase">Process</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-chi/25" />
          </div>
          <h2 className="text-3xl font-bold text-ink mb-4 font-serif">五步完成品牌出海</h2>
          <p className="text-ink/40">从市场发现到验证落地，AI 全链路赋能</p>
        </motion.div>

        <motion.div className="grid grid-cols-5 gap-4" variants={containerVariants}>
          {flowSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div key={step.title} variants={itemVariants}>
                <GiltCard hoverY={-8}>
                  <div className="p-7 text-center min-h-[280px] flex flex-col items-center">
                    <span className="text-[11px] text-gold/50 font-mono tracking-widest mb-5 block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative w-16 h-16 mx-auto mb-5">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-chi/15 to-chi/5" />
                      <div className="absolute inset-[1px] rounded-full bg-cream flex items-center justify-center">
                        <Icon className="w-7 h-7 text-chi group-hover:text-xuan transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-xuan mb-1">{step.title}</h3>
                    <p className="text-[10px] text-chi/30 tracking-wider uppercase mb-4">{step.subtitle}</p>
                    <p className="text-sm text-ink/40 leading-relaxed">{step.description}</p>
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
