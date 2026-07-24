import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Download, FileText, Target, Package, DollarSign, Store, Calendar } from 'lucide-react'
import { projectApi } from '@/services/api'
import GoldParticles from '@/components/shared/GoldParticles'

export default function ReportPage() {
  const { id } = useParams<{ id: string }>()
  const projectId = Number(id)

  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchReport = useCallback(async () => {
    try {
      const res = await projectApi.getReport(projectId)
      if (res.success && res.data) setReport(res.data)
    } catch { /* ignore */ }
    setLoading(false)
  }, [projectId])

  useEffect(() => { fetchReport() }, [fetchReport])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <p className="text-ink/40 text-sm mt-3">加载报告...</p>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-ink/50">暂无报告数据，请先完成分析和策略生成</p>
      </div>
    )
  }

  const { project, brand, strategy, generatedAssets } = report

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="fixed inset-0 pointer-events-none">
        <GoldParticles count={6} />
      </div>

      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-ink mb-1 font-serif">出海方案报告</h2>
          <p className="text-xs text-gold/30 tracking-wider uppercase">Export Report</p>
        </div>
        <motion.button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 text-sm cursor-pointer
                     border border-gold/20 hover:border-gold/40 bg-gold/[0.05]
                     hover:bg-gold/[0.1] transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Download className="w-4 h-4 text-gold" />
          <span className="text-gold">打印 / 导出</span>
        </motion.button>
      </motion.div>

      <div className="space-y-6 print:space-y-4">
        <ReportSection icon={<FileText className="w-5 h-5 text-chi" />} title="项目概览">
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="项目名称" value={project?.name} />
            <InfoField label="品牌名称" value={brand?.name} />
            <InfoField label="品牌所在地" value={brand?.origin} />
            <InfoField label="创建时间" value={project?.createdAt?.slice(0, 10)} />
          </div>
          {brand?.history && (
            <div className="mt-4">
              <InfoField label="品牌介绍" value={brand.history} />
            </div>
          )}
        </ReportSection>

        {strategy && (
          <>
            <ReportSection icon={<Target className="w-5 h-5 text-chi" />} title="市场定位">
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="目标国家" value={strategy.positioning?.targetCountry} />
                <InfoField label="核心客群" value={strategy.positioning?.coreAudience} />
                <InfoField label="品类参照" value={strategy.positioning?.categoryReference} />
                <InfoField label="差异化" value={strategy.positioning?.differentiation} />
              </div>
            </ReportSection>

            <ReportSection icon={<Package className="w-5 h-5 text-chi" />} title="产品组合">
              <div className="grid grid-cols-3 gap-4">
                {['primary', 'test', 'premium'].map((k) => {
                  const item = strategy.skuPlan?.[k]
                  if (!item) return null
                  return (
                    <div key={k} className="bg-cream-dark/40 p-3 border border-ink/5">
                      <p className="text-ink font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-ink/40">{item.role}</p>
                    </div>
                  )
                })}
              </div>
            </ReportSection>

            <ReportSection icon={<DollarSign className="w-5 h-5 text-chi" />} title="定价策略">
              <p className="text-sm text-ink/70 mb-3">{strategy.pricing?.strategy}</p>
              <div className="grid grid-cols-3 gap-4">
                {strategy.pricing?.ranges?.map((r: any) => (
                  <div key={r.tier} className="bg-cream-dark/40 p-3 border border-ink/5 text-center">
                    <p className="text-xs text-ink/40">{r.tier}</p>
                    <p className="text-lg font-bold text-gold">{r.range}</p>
                    <p className="text-xs text-ink/40">{r.channel}</p>
                  </div>
                ))}
              </div>
            </ReportSection>

            <ReportSection icon={<Store className="w-5 h-5 text-chi" />} title="渠道策略">
              <div className="space-y-2">
                {strategy.channels?.priority?.map((ch: any, i: number) => (
                  <div key={i} className="bg-cream-dark/40 p-3 border border-ink/5">
                    <p className="text-ink font-medium text-sm">{ch.channel}</p>
                    <p className="text-xs text-ink/50">{ch.action}</p>
                  </div>
                ))}
              </div>
            </ReportSection>

            <ReportSection icon={<Calendar className="w-5 h-5 text-chi" />} title="90天路线图">
              <div className="space-y-3">
                {['phase1', 'phase2', 'phase3'].map((k) => {
                  const phase = strategy.roadmap?.[k]
                  if (!phase) return null
                  return (
                    <div key={k} className="bg-cream-dark/40 p-4 border border-ink/5 border-l-4 border-l-gold">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-ink font-semibold text-sm">{phase.title}</p>
                        <span className="text-xs text-ink/40">{phase.period}</span>
                      </div>
                      <ul className="space-y-1">
                        {phase.actions?.map((a: string, j: number) => (
                          <li key={j} className="text-xs text-ink/60 flex items-start gap-1.5">
                            <span className="w-1 h-1 mt-1.5 bg-gold shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </ReportSection>
          </>
        )}

        {generatedAssets && generatedAssets.length > 0 && (
          <ReportSection icon={<FileText className="w-5 h-5 text-chi" />} title="营销素材摘要">
            <p className="text-sm text-ink/50 mb-3">共生成 {generatedAssets.length} 项营销内容</p>
            <div className="space-y-2">
              {generatedAssets.slice(0, 4).map((asset: any) => (
                <div key={asset.id} className="bg-cream-dark/40 p-3 border border-ink/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-chi">{asset.contentType}</span>
                    <span className="text-xs text-ink/30">{asset.channel}/{asset.style}</span>
                  </div>
                  <p className="text-xs text-ink/60 line-clamp-2">{asset.content}</p>
                </div>
              ))}
            </div>
          </ReportSection>
        )}
      </div>
    </div>
  )
}

function ReportSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="relative overflow-hidden print:break-inside-avoid"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-gold/3 to-gold/6" />
      <div className="absolute inset-[1px] bg-cream-light" />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-base font-semibold text-ink">{title}</h3>
        </div>
        {children}
      </div>
    </motion.div>
  )
}

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-ink/40 mb-0.5">{label}</p>
      <p className="text-sm text-ink">{value || '-'}</p>
    </div>
  )
}
