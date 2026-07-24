import { motion } from 'framer-motion'
import { ShieldCheck, Database, Brain, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CredibilityTag {
  icon: LucideIcon
  label: string
  description: string
  color: string
  dotColor: string
}

const credibilityTags: CredibilityTag[] = [
  {
    icon: ShieldCheck,
    label: '已验证事实',
    description: '来自品牌资料或权威公开来源',
    color: 'text-verified',
    dotColor: 'bg-verified',
  },
  {
    icon: Database,
    label: '公开数据',
    description: '来自公开平台或报告',
    color: 'text-public-data',
    dotColor: 'bg-public-data',
  },
  {
    icon: Brain,
    label: 'AI 推断',
    description: '模型基于事实与数据的判断',
    color: 'text-ai-infer',
    dotColor: 'bg-ai-infer',
  },
  {
    icon: AlertTriangle,
    label: '待验证假设',
    description: '需要通过试销或专业机构确认',
    color: 'text-unverified',
    dotColor: 'bg-unverified',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function CredibilitySection() {
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
          可信度机制
        </motion.h2>
        <motion.p
          className="text-slate-custom text-center mb-16"
          variants={itemVariants}
        >
          每条数据标注来源与可信度，让决策有据可循
        </motion.p>

        <motion.div
          className="grid grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {credibilityTags.map((tag) => {
            const Icon = tag.icon
            return (
              <motion.div
                key={tag.label}
                className="bg-ink-light rounded-xl p-6 border border-ink-lighter/20 text-center"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${tag.dotColor}`} />
                  <Icon className={`w-4 h-4 ${tag.color}`} />
                </div>
                <h3 className={`text-sm font-semibold mb-2 ${tag.color}`}>
                  {tag.label}
                </h3>
                <p className="text-xs text-snow/40 leading-relaxed">
                  {tag.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
