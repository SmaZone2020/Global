import { Calendar } from 'lucide-react'
import type { RoadmapPhase } from '@/types'
import SectionCard from './SectionCard'

interface Props {
  data: { phase1: RoadmapPhase; phase2: RoadmapPhase; phase3: RoadmapPhase }
  onRegenerate: () => void
  regenerating: boolean
}

const phaseColors = [
  'border-l-gold',
  'border-l-chi',
  'border-l-verified',
] as const

export default function RoadmapCard({ data, onRegenerate, regenerating }: Props) {
  const phases = [data.phase1, data.phase2, data.phase3].filter(Boolean)

  return (
    <SectionCard
      title="90天上市计划"
      subtitle="Roadmap"
      icon={<Calendar className="w-5 h-5 text-chi" />}
      onRegenerate={onRegenerate}
      regenerating={regenerating}
    >
      <div className="space-y-4">
        {phases.map((phase, i) => (
          <div
            key={i}
            className={`bg-cream-dark/40 p-5 border border-ink/5 border-l-4 ${phaseColors[i]}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-ink font-semibold">{phase.title}</h4>
                <p className="text-xs text-ink/40">{phase.period}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-ink/40 mb-2">关键行动</p>
                <ul className="space-y-1.5">
                  {(phase.actions ?? []).map((action, j) => (
                    <li key={j} className="text-sm text-ink/70 flex items-start gap-2">
                      <span className="w-1 h-1 mt-2 bg-gold shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-ink/40 mb-2">验证指标</p>
                <div className="flex flex-wrap gap-2">
                  {(phase.metrics ?? []).map((metric) => (
                    <span key={metric} className="px-2.5 py-1 text-xs bg-gold/10 text-gold border border-gold/15">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
