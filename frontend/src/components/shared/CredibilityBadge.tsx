import type { CredibilityLevel } from '@/types'
import { cn } from '@/utils/cn'

const credibilityConfig: Record<CredibilityLevel, { label: string; color: string; dotColor: string }> = {
  verified: { label: '已验证', color: 'text-verified', dotColor: 'bg-verified' },
  publicData: { label: '公开数据', color: 'text-public-data', dotColor: 'bg-public-data' },
  aiInference: { label: 'AI推断', color: 'text-ai-infer', dotColor: 'bg-ai-infer' },
  unverified: { label: '待验证', color: 'text-unverified', dotColor: 'bg-unverified' },
}

interface CredibilityBadgeProps {
  level: CredibilityLevel
  className?: string
}

export default function CredibilityBadge({ level, className }: CredibilityBadgeProps) {
  const config = credibilityConfig[level]
  if (!config) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium',
        'bg-cream-dark/50 border border-ink/8',
        config.color,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5', config.dotColor)} />
      {config.label}
    </span>
  )
}
