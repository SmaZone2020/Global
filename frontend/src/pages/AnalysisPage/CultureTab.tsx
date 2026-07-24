import { motion } from 'framer-motion'
import { ArrowRight, ShieldAlert, BookOpen, MessageSquareQuote } from 'lucide-react'
import CredibilityBadge from '@/components/shared/CredibilityBadge'
import type { CredibilityLevel } from '@/types'

interface CulturalAsset {
  asset: string
  evidence: string
  sourceType: CredibilityLevel
  chineseExpression: string
  overseasExpression: string
  targetAudience: string
  consumerNeed: string
  confidence: number
}

interface CultureContent {
  culturalAssets: CulturalAsset[]
  prohibitedTranslations: { original: string; reason: string; alternative: string }[]
  brandStory: string
  slogans: string[]
  englishIntro: string
}

interface CultureTabProps {
  content: CultureContent
}

export default function CultureTab({ content }: CultureTabProps) {
  return (
    <div className="space-y-8">
      {/* Cultural Assets */}
      <section>
        <h4 className="text-lg font-semibold text-snow mb-4">文化资产对照</h4>
        <div className="space-y-4">
          {content.culturalAssets.map((asset, i) => (
            <motion.div
              key={asset.asset}
              className="bg-ink-lighter rounded-xl p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-gold font-medium">{asset.asset}</h5>
                <CredibilityBadge level={asset.sourceType} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center mb-4">
                <div className="bg-ink/50 rounded-lg p-3">
                  <p className="text-xs text-snow/40 mb-1">中国表达</p>
                  <p className="text-snow text-sm">{asset.chineseExpression}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gold hidden md:block" />
                <div className="bg-ink/50 rounded-lg p-3">
                  <p className="text-xs text-snow/40 mb-1">海外表达</p>
                  <p className="text-snow text-sm">{asset.overseasExpression}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-snow/50">
                <span>目标受众: {asset.targetAudience}</span>
                <span>消费者需求: {asset.consumerNeed}</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-ink rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all"
                    style={{ width: `${asset.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-snow/40 w-10 text-right">
                  {Math.round(asset.confidence * 100)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prohibited Translations */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-unverified" />
          <h4 className="text-lg font-semibold text-snow">禁止翻译</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.prohibitedTranslations.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4 border border-unverified/30 bg-unverified/5"
            >
              <p className="text-unverified font-medium text-sm mb-1">{item.original}</p>
              <p className="text-snow/50 text-xs mb-2">{item.reason}</p>
              <p className="text-snow text-sm">
                建议: <span className="text-verified">{item.alternative}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-gold" />
          <h4 className="text-lg font-semibold text-snow">品牌故事</h4>
        </div>
        <div className="bg-ink-lighter rounded-xl p-6">
          <p className="text-snow/80 leading-relaxed whitespace-pre-line">
            {content.brandStory}
          </p>
        </div>
      </section>

      {/* Slogans */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquareQuote className="w-5 h-5 text-gold" />
          <h4 className="text-lg font-semibold text-snow">推荐 Slogan</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.slogans.map((slogan, i) => (
            <motion.div
              key={i}
              className="bg-ink-lighter rounded-xl p-5 border border-gold/10"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-gold text-lg font-medium italic leading-relaxed">
                "{slogan}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
