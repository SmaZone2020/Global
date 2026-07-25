import { motion } from 'framer-motion'
import CredibilityBadge from '@/components/shared/CredibilityBadge'
import MarkdownReport from '@/components/shared/MarkdownReport'
import type { CredibilityLevel } from '@/types'

interface OverseasBarrier {
  term: string
  issue: string
  suggestion: string
  credibility: CredibilityLevel
}

interface SellingPointObj {
  point: string
  description: string
}

interface ProductAnalysis {
  tags?: string[]
  sellingPoints?: (string | SellingPointObj)[]
  swot?: {
    strengths?: string[]
    weaknesses?: string[]
    opportunities?: string[]
    threats?: string[]
  }
  overseasBarriers?: OverseasBarrier[]
  overseasChallenges?: string[]
}

interface ProductTabProps {
  content: ProductAnalysis
}

const swotConfig = [
  { key: 'strengths', label: '优势', color: 'border-verified/30 bg-verified/5', textColor: 'text-verified' },
  { key: 'weaknesses', label: '劣势', color: 'border-unverified/30 bg-unverified/5', textColor: 'text-unverified' },
  { key: 'opportunities', label: '机会', color: 'border-public-data/30 bg-public-data/5', textColor: 'text-public-data' },
  { key: 'threats', label: '威胁', color: 'border-gold/30 bg-gold/5', textColor: 'text-gold' },
] as const

export default function ProductTab({ content }: ProductTabProps) {
  // If content is markdown format, render with MarkdownReport
  if (content?.markdown || (typeof content === 'string')) {
    return <MarkdownReport content={content} />
  }

  const tags = content.tags ?? []
  const sellingPoints = content.sellingPoints ?? []
  const swot = content.swot ?? {}
  const overseasBarriers = content.overseasBarriers
  const overseasChallenges = content.overseasChallenges ?? []

  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-lg font-semibold text-ink mb-4">产品标签</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 bg-gold/10 text-gold border border-gold/20 text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-lg font-semibold text-ink mb-4">核心卖点</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sellingPoints.map((sp, i) => {
            const isObj = typeof sp === 'object' && sp !== null
            return (
              <motion.div
                key={i}
                className="bg-cream-dark/40 border border-ink/8 p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {isObj ? (
                  <>
                    <h5 className="text-gold font-medium mb-2">{(sp as SellingPointObj).point}</h5>
                    <p className="text-ink/60 text-sm leading-relaxed">{(sp as SellingPointObj).description}</p>
                  </>
                ) : (
                  <p className="text-ink/70 text-sm leading-relaxed">{sp as string}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      <section>
        <h4 className="text-lg font-semibold text-ink mb-4">SWOT 分析</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {swotConfig.map((item) => {
            const items: string[] = (swot as any)[item.key] ?? []
            return (
              <div key={item.key} className={`p-5 border ${item.color}`}>
                <h5 className={`font-semibold mb-3 ${item.textColor}`}>{item.label}</h5>
                <ul className="space-y-1.5">
                  {items.map((text, i) => (
                    <li key={i} className="text-ink/70 text-sm flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 shrink-0 ${item.textColor.replace('text-', 'bg-')}`} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h4 className="text-lg font-semibold text-ink mb-4">海外理解难点</h4>
        {overseasBarriers ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-ink/40 text-left border-b border-ink/10">
                  <th className="pb-3 pr-4 font-medium">中文术语</th>
                  <th className="pb-3 pr-4 font-medium">问题</th>
                  <th className="pb-3 pr-4 font-medium">英文建议</th>
                  <th className="pb-3 font-medium">可信度</th>
                </tr>
              </thead>
              <tbody>
                {overseasBarriers.map((barrier, i) => (
                  <tr key={i} className="border-b border-ink/5">
                    <td className="py-3 pr-4 text-gold font-medium">{barrier.term}</td>
                    <td className="py-3 pr-4 text-ink/60">{barrier.issue}</td>
                    <td className="py-3 pr-4 text-ink">{barrier.suggestion}</td>
                    <td className="py-3"><CredibilityBadge level={barrier.credibility} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="space-y-3">
            {overseasChallenges.map((challenge, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink/70">
                <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-gold/60" />
                {challenge}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
