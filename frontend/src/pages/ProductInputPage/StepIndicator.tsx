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
                  'relative w-9 h-9 flex items-center justify-center text-sm font-medium',
                  isCompleted && 'text-ink',
                  isActive && 'text-gold',
                  !isCompleted && !isActive && 'text-ink/30'
                )}
                animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className={cn(
                  'absolute inset-0 transition-all duration-500',
                  isCompleted && 'bg-gradient-to-br from-gold-dark via-gold to-gold-light',
                  isActive && 'bg-gradient-to-br from-gold/30 via-gold/20 to-gold/10 border border-gold/60',
                  !isCompleted && !isActive && 'bg-cream-dark/50 border border-ink/10'
                )} />
                <span className="relative z-10">
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </span>
              </motion.div>
              <span
                className={cn(
                  'text-sm hidden sm:inline transition-colors duration-300',
                  isActive ? 'text-gold font-medium' : isCompleted ? 'text-gold/60' : 'text-ink/30'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="relative w-10 h-px mx-1">
                <div className="absolute inset-0 bg-ink/10" />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light"
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
