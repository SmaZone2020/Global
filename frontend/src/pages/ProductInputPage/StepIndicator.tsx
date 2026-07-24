import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

const steps = [
  { label: '品牌信息', key: 'brand' },
  { label: '产品信息', key: 'product' },
  { label: '文化与历史', key: 'culture' },
  { label: '市场目标', key: 'market' },
]

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  isCompleted && 'bg-gold text-ink',
                  isActive && 'bg-gold/20 text-gold border border-gold',
                  !isCompleted && !isActive && 'bg-ink-lighter text-snow/40'
                )}
                animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </motion.div>
              <span
                className={cn(
                  'text-sm hidden sm:inline',
                  isActive ? 'text-gold font-medium' : 'text-snow/40'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-8 h-px mx-1',
                  index < currentStep ? 'bg-gold' : 'bg-ink-lighter'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
