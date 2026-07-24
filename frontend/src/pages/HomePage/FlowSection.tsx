import { motion } from 'framer-motion'
import { Search, Landmark, BarChart3, PenTool, CheckCircle, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface FlowStep {
  icon: LucideIcon
  title: string
  description: string
}

const flowSteps: FlowStep[] = [
  {
    icon: Search,
    title: '市场发现',
    description: 'AI 自动扫描全球市场机会',
  },
  {
    icon: Landmark,
    title: '文化匹配',
    description: '将传统文化转化为海外价值',
  },
  {
    icon: BarChart3,
    title: '策略生成',
    description: '生成定位、定价、渠道方案',
  },
  {
    icon: PenTool,
    title: '内容创作',
    description: '一键生成多渠道营销内容',
  },
  {
    icon: CheckCircle,
    title: '验证计划',
    description: '90天可执行的出海路线图',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function FlowSection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        className="max-w-[1280px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-snow text-center mb-4"
          variants={itemVariants}
        >
          五步完成品牌出海
        </motion.h2>
        <motion.p
          className="text-slate-custom text-center mb-16"
          variants={itemVariants}
        >
          从市场发现到验证落地，AI 全链路赋能
        </motion.p>

        <motion.div
          className="flex items-start justify-center gap-4"
          variants={containerVariants}
        >
          {flowSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center text-center w-44">
                  <div className="w-14 h-14 rounded-xl bg-ink-light flex items-center justify-center mb-4 border border-ink-lighter/30">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="text-xs text-gold/60 font-medium mb-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold text-snow mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-snow/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < flowSteps.length - 1 && (
                  <div className="flex items-center pt-6 px-2">
                    <ArrowRight className="w-4 h-4 text-ink-lighter" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
