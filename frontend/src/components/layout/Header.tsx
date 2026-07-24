import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { useProjectStore } from '@/stores/projectStore'

const navItems = [
  { label: '首页', path: '/' },
  { label: '新建项目', path: '/new' },
]

const projectSteps = [
  { label: '分析', step: 'analysis' },
  { label: '策略', step: 'strategy' },
  { label: '营销', step: 'marketing' },
  { label: '报告', step: 'report' },
]

export default function Header() {
  const location = useLocation()
  const { currentProject } = useProjectStore()

  return (
    <header className="border-b border-ink/8 bg-cream/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <span className="text-chi text-xl font-bold tracking-wide font-serif">
            国韵
          </span>
          <span className="text-ink/40 text-xs font-serif italic tracking-wider">Global</span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm no-underline transition-colors',
                location.pathname === item.path
                  ? 'text-chi font-medium'
                  : 'text-ink/50 hover:text-ink'
              )}
            >
              {item.label}
            </Link>
          ))}

          {currentProject && (
            <>
              <span className="w-px h-4 bg-ink/15" />
              {projectSteps.map((step) => {
                const path = `/project/${currentProject.id}/${step.step}`
                const isActive = location.pathname === path
                return (
                  <Link
                    key={step.step}
                    to={path}
                    className={cn(
                      'text-sm no-underline transition-colors',
                      isActive
                        ? 'text-chi font-medium'
                        : 'text-ink/35 hover:text-ink/70'
                    )}
                  >
                    {step.label}
                  </Link>
                )
              })}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
