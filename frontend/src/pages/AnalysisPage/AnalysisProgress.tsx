import { motion } from 'framer-motion'
import { Check, Loader2, Circle } from 'lucide-react'

interface AnalysisStep {
  name: string
  label: string
  status: string
}

interface AnalysisProgressProps {
  steps: AnalysisStep[]
}

export default function AnalysisProgress({ steps }: AnalysisProgressProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <motion.h2
        className="text-2xl font-bold text-ink mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI 正在分析中
      </motion.h2>
      <p className="text-ink/50 text-sm mb-10">请稍候，分析可能需要 1-3 分钟</p>

      <div className="w-full max-w-md space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.name}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {step.status === 'completed' && (
              <div className="w-8 h-8 bg-verified/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-verified" />
              </div>
            )}
            {step.status === 'inProgress' && (
              <div className="w-8 h-8 bg-gold/20 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-gold animate-spin" />
              </div>
            )}
            {step.status === 'pending' && (
              <div className="w-8 h-8 bg-cream-dark/50 flex items-center justify-center">
                <Circle className="w-4 h-4 text-ink/30" />
              </div>
            )}
            <span
              className={`text-sm font-medium ${
                step.status === 'completed'
                  ? 'text-ink'
                  : step.status === 'inProgress'
                    ? 'text-gold'
                    : 'text-ink/30'
              }`}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-ink/30 text-xs mt-10">
        分析完成后将自动显示结果
      </p>
    </div>
  )
}
