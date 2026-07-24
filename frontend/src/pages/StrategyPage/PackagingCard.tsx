import { Box } from 'lucide-react'
import SectionCard from './SectionCard'

interface Props {
  data: { volume: string; labelInfo: string[]; visualDirection: string }
  onRegenerate: () => void
  regenerating: boolean
}

export default function PackagingCard({ data, onRegenerate, regenerating }: Props) {
  return (
    <SectionCard
      title="包装建议"
      subtitle="Packaging"
      icon={<Box className="w-5 h-5 text-chi" />}
      onRegenerate={onRegenerate}
      regenerating={regenerating}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cream-dark/40 p-4 border border-ink/5">
          <p className="text-xs text-ink/40 mb-1">规格</p>
          <p className="text-ink font-medium">{data.volume}</p>
        </div>
        <div className="bg-cream-dark/40 p-4 border border-ink/5 md:col-span-2">
          <p className="text-xs text-ink/40 mb-1">视觉方向</p>
          <p className="text-ink font-medium">{data.visualDirection}</p>
        </div>
      </div>
      <div className="mt-4 bg-cream-dark/40 p-4 border border-ink/5">
        <p className="text-xs text-ink/40 mb-2">标签信息</p>
        <ul className="space-y-1.5">
          {(data.labelInfo ?? []).map((info, i) => (
            <li key={i} className="text-sm text-ink/70 flex items-start gap-2">
              <span className="w-1 h-1 mt-2 bg-gold shrink-0" />
              {info}
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  )
}
