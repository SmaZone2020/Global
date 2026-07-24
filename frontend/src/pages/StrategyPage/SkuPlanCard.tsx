import { Package } from 'lucide-react'
import type { SkuPlanItem } from '@/types'
import SectionCard from './SectionCard'

interface Props {
  data: { primary: SkuPlanItem; test: SkuPlanItem; premium: SkuPlanItem }
  onRegenerate: () => void
  regenerating: boolean
}

const skuLabels = [
  { key: 'primary', label: '主推款', badge: 'bg-gold/15 text-gold' },
  { key: 'test', label: '测试款', badge: 'bg-chi/10 text-chi' },
  { key: 'premium', label: '高端形象', badge: 'bg-ink/10 text-ink' },
] as const

export default function SkuPlanCard({ data, onRegenerate, regenerating }: Props) {
  return (
    <SectionCard
      title="产品组合"
      subtitle="SKU Plan"
      icon={<Package className="w-5 h-5 text-chi" />}
      onRegenerate={onRegenerate}
      regenerating={regenerating}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skuLabels.map(({ key, label, badge }) => {
          const item = data[key]
          return (
            <div key={key} className="bg-cream-dark/40 p-4 border border-ink/5">
              <span className={`inline-block px-2 py-0.5 text-xs font-medium mb-3 ${badge}`}>
                {label}
              </span>
              <p className="text-ink font-medium mb-1">{item.name}</p>
              <p className="text-xs text-ink/40 mb-2">{item.role}</p>
              <p className="text-sm text-ink/60">{item.reason}</p>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
