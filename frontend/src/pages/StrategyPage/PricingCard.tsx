import { DollarSign } from 'lucide-react'
import type { PricingRange } from '@/types'
import SectionCard from './SectionCard'

interface Props {
  data: { strategy: string; ranges: PricingRange[]; costAssumptions: string }
  onRegenerate: () => void
  regenerating: boolean
}

export default function PricingCard({ data, onRegenerate, regenerating }: Props) {
  return (
    <SectionCard
      title="定价建议"
      subtitle="Pricing"
      icon={<DollarSign className="w-5 h-5 text-chi" />}
      onRegenerate={onRegenerate}
      regenerating={regenerating}
    >
      <div className="bg-cream-dark/40 p-4 border border-ink/5 mb-4">
        <p className="text-xs text-ink/40 mb-1">定价策略</p>
        <p className="text-ink">{data.strategy}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {data.ranges.map((r) => (
          <div key={r.tier} className="bg-cream-dark/40 p-4 border border-ink/5 text-center">
            <p className="text-xs text-ink/40 mb-1">{r.tier}</p>
            <p className="text-xl font-bold text-gold mb-1">{r.range}</p>
            <p className="text-xs text-ink/50">{r.channel}</p>
          </div>
        ))}
      </div>

      <div className="bg-cream-dark/40 p-4 border border-ink/5">
        <p className="text-xs text-ink/40 mb-1">成本假设</p>
        <p className="text-sm text-ink/70">{data.costAssumptions}</p>
      </div>
    </SectionCard>
  )
}
