import { motion } from 'framer-motion'
import {
  Star, Users, Swords, Store, DollarSign, AlertTriangle,
} from 'lucide-react'
import MarketRadar from './MarketRadar'

interface MarketContent {
  candidates: {
    country: string
    totalScore: number
    dimensionScores: Record<string, number>
    evidence: string[]
    risks: string[]
    recommended: boolean
  }[]
  consumerPersonas: {
    name: string
    age: number
    city: string
    profile: string
    needs: string
    motivations: string[]
    barriers: string[]
    scenarios: string[]
  }[]
  competitorAnalysis: {
    name: string
    country: string
    priceRange: string
    positioning: string
    channels: string[]
  }[]
  channels: {
    name: string
    priority: string
    difficulty: string
    description: string
  }[]
  pricingSuggestion: {
    entryLevel: { price: string; positioning: string }
    midRange: { price: string; positioning: string }
    premium: { price: string; positioning: string }
  }
  complianceRisks: {
    area: string
    risk: string
    detail: string
    note: string
  }[]
}

interface MarketTabProps {
  content: MarketContent
  onConfirmMarket: () => void
  marketConfirmed: boolean
}

const pricingTiers = [
  { key: 'entryLevel', label: '入门款', icon: DollarSign },
  { key: 'midRange', label: '中端款', icon: DollarSign },
  { key: 'premium', label: '高端款', icon: Star },
] as const

export default function MarketTab({ content, onConfirmMarket, marketConfirmed }: MarketTabProps) {
  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-lg font-semibold text-ink mb-4">全球机会雷达</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.candidates.map((c, i) => (
            <motion.div
              key={c.country}
              className="bg-cream-dark/40 border border-ink/8 p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-ink font-semibold text-lg">{c.country}</h5>
                {c.recommended && (
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-medium border border-gold/20">
                    推荐
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gold mb-3">{c.totalScore}</p>
              <MarketRadar scores={c.dimensionScores as any} />
              <div className="mt-3 space-y-1">
                {c.evidence.slice(0, 2).map((e, j) => (
                  <p key={j} className="text-ink/50 text-xs">- {e}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {!marketConfirmed && (
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={onConfirmMarket}
              className="px-8 py-3 bg-gold text-ink font-semibold text-sm
                         hover:bg-gold-light transition-colors cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              确认目标市场
            </motion.button>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gold" />
          <h4 className="text-lg font-semibold text-ink">消费者画像</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.consumerPersonas.map((p, i) => (
            <div key={i} className="bg-cream-dark/40 border border-ink/8 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-semibold">{p.name[0]}</span>
                </div>
                <div>
                  <p className="text-ink font-medium">{p.name}, {p.age}岁</p>
                  <p className="text-ink/40 text-xs">{p.city}</p>
                </div>
              </div>
              <p className="text-ink/60 text-sm mb-2">{p.profile}</p>
              <p className="text-ink/50 text-xs mb-3">{p.needs}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.scenarios.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-cream-dark text-ink/50 text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Swords className="w-5 h-5 text-gold" />
          <h4 className="text-lg font-semibold text-ink">竞品分析</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.competitorAnalysis.map((comp, i) => (
            <div key={i} className="bg-cream-dark/40 border border-ink/8 p-5">
              <h5 className="text-ink font-medium mb-1">{comp.name}</h5>
              <p className="text-ink/40 text-xs mb-2">{comp.country} | {comp.priceRange}</p>
              <p className="text-ink/60 text-sm mb-2">{comp.positioning}</p>
              <div className="flex flex-wrap gap-1">
                {comp.channels.map((ch) => (
                  <span key={ch} className="px-2 py-0.5 bg-cream-dark text-ink/50 text-xs">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Store className="w-5 h-5 text-gold" />
          <h4 className="text-lg font-semibold text-ink">渠道建议</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-ink/40 text-left border-b border-ink/10">
                <th className="pb-3 pr-4 font-medium">渠道</th>
                <th className="pb-3 pr-4 font-medium">优先级</th>
                <th className="pb-3 pr-4 font-medium">难度</th>
                <th className="pb-3 font-medium">描述</th>
              </tr>
            </thead>
            <tbody>
              {content.channels.map((ch, i) => (
                <tr key={i} className="border-b border-ink/5">
                  <td className="py-3 pr-4 text-ink font-medium">{ch.name}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-medium ${ch.priority === '高' ? 'text-gold' : 'text-ink/50'}`}>
                      {ch.priority}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-ink/50">{ch.difficulty}</td>
                  <td className="py-3 text-ink/60">{ch.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-gold" />
          <h4 className="text-lg font-semibold text-ink">定价建议</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingTiers.map(({ key, label }) => {
            const tier = content.pricingSuggestion[key]
            return (
              <div key={key} className="bg-cream-dark/40 border border-ink/8 p-5 text-center">
                <p className="text-ink/40 text-xs mb-1">{label}</p>
                <p className="text-2xl font-bold text-gold mb-2">{tier.price}</p>
                <p className="text-ink/60 text-sm">{tier.positioning}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-unverified" />
          <h4 className="text-lg font-semibold text-ink">合规提示</h4>
        </div>
        <div className="space-y-3">
          {content.complianceRisks.map((cr, i) => (
            <div
              key={i}
              className="bg-unverified/5 border border-unverified/20 p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-unverified font-medium text-sm">{cr.area}</span>
                <span className={`px-2 py-0.5 text-xs font-medium ${
                  cr.risk === '高' ? 'bg-unverified/20 text-unverified' : 'bg-gold/20 text-gold'
                }`}>
                  风险: {cr.risk}
                </span>
              </div>
              <p className="text-ink/60 text-sm">{cr.detail}</p>
              {cr.note && <p className="text-ink/40 text-xs mt-1">{cr.note}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
