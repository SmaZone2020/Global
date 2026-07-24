import { motion } from 'framer-motion'
import { PackageSearch, Globe, TrendingUp, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CapabilityCard {
  icon: LucideIcon
  title: string
  description: string
}

const capabilities: CapabilityCard[] = [
  {
    icon: PackageSearch,
    title: '产品分析',
    description: 'AI 提取产品标签、核心卖点与 SWOT，自动识别海外市场障碍并生成解决建议。',
  },
  {
    icon: Globe,
    title: '文化解码',
    description: '将中国文化表达转化为海外消费者可感知的价值主张，避免文化误读与合规风险。',
  },
  {
    icon: TrendingUp,
    title: '市场洞察',
    description: '多维度国家评分、消费者画像生成、竞品对标分析，数据驱动选择最优出海目的地。',
  },
  {
    icon: Sparkles,
    title: '营销生成',
    description: '一键生成品牌故事、社媒文案、海报提示词、视频脚本，覆盖多渠道营销需求。',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function CapabilitySection() {
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
          variants={cardVariants}
        >
          核心能力
        </motion.h2>
        <motion.p
          className="text-slate-custom text-center mb-16"
          variants={cardVariants}
        >
          四大 AI 引擎，覆盖品牌出海全链路
        </motion.p>

        <motion.div
          className="grid grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                className="bg-ink-light rounded-xl p-8 border border-ink-lighter/20
                           transition-all duration-300 hover:border-gold/20"
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-ink flex items-center justify-center mb-5 border border-ink-lighter/30">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-snow mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-snow/50 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
