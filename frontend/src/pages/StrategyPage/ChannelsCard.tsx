import { Store } from 'lucide-react'
import SectionCard from './SectionCard'

interface Props {
  data: { priority: { channel: string; cities: string[]; action: string }[] }
  onRegenerate: () => void
  regenerating: boolean
}

export default function ChannelsCard({ data, onRegenerate, regenerating }: Props) {
  return (
    <SectionCard
      title="渠道策略"
      subtitle="Channels"
      icon={<Store className="w-5 h-5 text-chi" />}
      onRegenerate={onRegenerate}
      regenerating={regenerating}
    >
      <div className="space-y-3">
        {(data.priority ?? []).map((ch, i) => (
          <div key={i} className="bg-cream-dark/40 p-4 border border-ink/5 flex flex-col md:flex-row md:items-center gap-3">
            <div className="md:w-1/4">
              <p className="text-ink font-medium">{ch.channel}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {(ch.cities ?? []).map((city) => (
                  <span key={city} className="px-2 py-0.5 text-xs bg-gold/10 text-gold border border-gold/15">
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-3/4">
              <p className="text-sm text-ink/60">{ch.action}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
