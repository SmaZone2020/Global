import { motion } from 'framer-motion'
import { ArrowRight, ShieldAlert, BookOpen, MessageSquareQuote } from 'lucide-react'
import CredibilityBadge from '@/components/shared/CredibilityBadge'
import MarkdownReport from '@/components/shared/MarkdownReport'
import type { CredibilityLevel } from '@/types'

interface CulturalAsset {
  asset?: string
  evidence?: string
  sourceType?: CredibilityLevel
  chineseExpression?: string
  overseasExpression?: string
  // AI may return these field names instead
  chinese?: string
  overseas?: string
  targetAudience?: string
  consumerNeed?: string
  confidence?: number
}

interface CultureContent {
  culturalAssets?: CulturalAsset[]
  culturalElements?: CulturalAsset[]
  prohibitedTranslations?: { original: string; reason: string; alternative: string }[]
  brandStory?: string
  slogans?: string[]
  englishIntro?: string
  matchMatrix?: { dimension: string; score: number; note: string }[]
}

interface CultureTabProps {
  content: CultureContent
}

export default function CultureTab({ content }: CultureTabProps) {
  if (content?.markdown || (typeof content === 'string')) {
    return <MarkdownReport content={content} />
  }

  const assets = content.culturalAssets ?? content.culturalElements ?? []
  const prohibited = content.prohibitedTranslations ?? []
  const slogans = content.slogans ?? []
  const matchMatrix = content.matchMatrix ?? []

  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-lg font-semibold text-ink mb-4">文化资产对照</h4>
        <div className="space-y-4">
          {assets.map((asset, i) => {
            const chineseExpr = asset.chineseExpression ?? asset.chinese ?? ''
            const overseasExpr = asset.overseasExpression ?? asset.overseas ?? ''
            const title = asset.asset ?? chineseExpr
            const conf = asset.confidence ?? 0.8
            return (
              <motion.div
                key={i}
                className="bg-cream-dark/40 border border-ink/8 p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-gold font-medium">{title}</h5>
                  {asset.sourceType && <CredibilityBadge level={asset.sourceType} />}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center mb-4">
                  <div className="bg-cream-dark/60 p-3">
                    <p className="text-xs text-ink/40 mb-1">中国表达</p>
                    <p className="text-ink text-sm">{chineseExpr}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gold hidden md:block" />
                  <div className="bg-cream-dark/60 p-3">
                    <p className="text-xs text-ink/40 mb-1">海外表达</p>
                    <p className="text-ink text-sm">{overseasExpr}</p>
                  </div>
                </div>

                {asset.evidence && (
                  <p className="text-xs text-ink/40 mb-3">{asset.evidence}</p>
                )}

                {(asset.targetAudience || asset.consumerNeed) && (
                  <div className="flex flex-wrap gap-4 text-xs text-ink/50 mb-3">
                    {asset.targetAudience && <span>目标受众: {asset.targetAudience}</span>}
                    {asset.consumerNeed && <span>消费者需求: {asset.consumerNeed}</span>}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-cream-dark overflow-hidden">
                    <div className="h-full bg-gold transition-all" style={{ width: `${conf * 100}%` }} />
                  </div>
                  <span className="text-xs text-ink/40 w-10 text-right">{Math.round(conf * 100)}%</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {prohibited.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-unverified" />
            <h4 className="text-lg font-semibold text-ink">禁止翻译</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prohibited.map((item, i) => (
              <div key={i} className="p-4 border border-unverified/30 bg-unverified/5">
                <p className="text-unverified font-medium text-sm mb-1">{item.original}</p>
                <p className="text-ink/50 text-xs mb-2">{item.reason}</p>
                <p className="text-ink text-sm">建议: <span className="text-verified">{item.alternative}</span></p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.brandStory && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-gold" />
            <h4 className="text-lg font-semibold text-ink">品牌故事</h4>
          </div>
          <div className="bg-cream-dark/40 border border-ink/8 p-6">
            <p className="text-ink/80 leading-relaxed whitespace-pre-line">{content.brandStory}</p>
          </div>
        </section>
      )}

      {slogans.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareQuote className="w-5 h-5 text-gold" />
            <h4 className="text-lg font-semibold text-ink">推荐 Slogan</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slogans.map((slogan, i) => (
              <motion.div
                key={i}
                className="bg-cream-dark/40 border border-gold/15 p-5"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-gold text-lg font-medium italic leading-relaxed">"{slogan}"</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {matchMatrix.length > 0 && (
        <section>
          <h4 className="text-lg font-semibold text-ink mb-4">文化匹配矩阵</h4>
          <div className="space-y-3">
            {matchMatrix.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-cream-dark/40 border border-ink/8 px-5 py-3">
                <span className="text-sm text-ink/70 w-40 shrink-0">{item.dimension}</span>
                <div className="flex-1 h-1.5 bg-cream-dark overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${item.score}%` }} />
                </div>
                <span className="text-xs text-gold w-10 text-right">{item.score}</span>
                <span className="text-xs text-ink/40 hidden md:block max-w-xs truncate">{item.note}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
