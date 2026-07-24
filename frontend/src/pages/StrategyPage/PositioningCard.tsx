import { Target } from 'lucide-react'
import type { StrategyPositioning } from '@/types'
import SectionCard from './SectionCard'

interface Props {
  data: StrategyPositioning
  onRegenerate: () => void
  regenerating: boolean
}

export default function PositioningCard({ data, onRegenerate, regenerating }: Props) {
  return (
    <SectionCard
      title="市场定位"
      subtitle="Positioning"
      icon={<Target className="w-5 h-5 text-chi" />}
      onRegenerate={onRegenerate}
      regenerating={regenerating}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cream-dark/40 p-4 border border-ink/5">
          <p className="text-xs text-ink/40 mb-1">目标国家</p>
          <p className="text-ink font-medium">{data.targetCountry}</p>
        </div>
        <div className="bg-cream-dark/40 p-4 border border-ink/5">
          <p className="text-xs text-ink/40 mb-1">核心客群</p>
          <p className="text-ink font-medium">{data.coreAudience}</p>
        </div>
        <div className="bg-cream-dark/40 p-4 border border-ink/5">
          <p className="text-xs text-ink/40 mb-1">品类参照</p>
          <p className="text-ink font-medium">{data.categoryReference}</p>
        </div>
        <div className="bg-cream-dark/40 p-4 border border-ink/5">
          <p className="text-xs text-ink/40 mb-1">差异化定位</p>
          <p className="text-ink font-medium">{data.differentiation}</p>
        </div>
      </div>
    </SectionCard>
  )
}
