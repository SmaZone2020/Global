import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ClipboardList, ScanSearch, Compass, Megaphone, ScrollText } from 'lucide-react'

const STEPS = [
  { key: 'input', label: '数据录入', sub: 'Input', Icon: ClipboardList },
  { key: 'analysis', label: '智能分析', sub: 'Analysis', Icon: ScanSearch },
  { key: 'strategy', label: '出海策略', sub: 'Strategy', Icon: Compass },
  { key: 'marketing', label: 'AI营销', sub: 'Marketing', Icon: Megaphone },
  { key: 'report', label: '报告输出', sub: 'Report', Icon: ScrollText },
]

function getActiveIndex(pathname: string): number {
  if (pathname === '/new') return 0
  if (pathname.includes('/analysis')) return 1
  if (pathname.includes('/strategy')) return 2
  if (pathname.includes('/marketing')) return 3
  if (pathname.includes('/report')) return 4
  return -1
}

function stepPath(key: string, id?: string): string | null {
  if (!id) return key === 'input' ? '/new' : null
  switch (key) {
    case 'input': return null
    case 'analysis': return `/project/${id}/analysis`
    case 'strategy': return `/project/${id}/strategy`
    case 'marketing': return `/project/${id}/marketing`
    case 'report': return `/project/${id}/report`
    default: return null
  }
}

export default function ProjectProgressBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()

  const activeIndex = getActiveIndex(pathname)
  if (activeIndex === -1) return null

  return (
    <div className="relative z-20 px-6 py-3 border-b border-ink/6 bg-cream/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto flex items-center">
        {STEPS.map((step, idx) => {
          const isDone = idx < activeIndex
          const isActive = idx === activeIndex
          const path = stepPath(step.key, id)
          const clickable = !!path

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => path && navigate(path)}
                disabled={!clickable}
                className={`flex flex-col items-center gap-0.5 min-w-[56px] group
                  ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <motion.div
                  className={`w-7 h-7 flex items-center justify-center transition-colors
                    ${isDone ? 'bg-gold text-ink' : isActive ? 'bg-chi text-white' : 'bg-ink/8 text-ink/25'}`}
                  whileHover={clickable ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  {isDone
                    ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    : <step.Icon className="w-3.5 h-3.5" />}
                </motion.div>
                <span className={`text-[10px] tracking-wide leading-none
                  ${isActive ? 'text-chi font-semibold' : isDone ? 'text-gold/70' : 'text-ink/25'}`}>
                  {step.label}
                </span>
              </button>

              {idx < STEPS.length - 1 && (
                <div className="flex-1 mx-1 h-px relative overflow-hidden">
                  <div className="absolute inset-0 bg-ink/8" />
                  {isDone && (
                    <motion.div
                      className="absolute inset-0 bg-gold/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
