import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Trash2, ChevronRight, FolderOpen } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'
import type { Project, ProjectStatus } from '@/types'

const statusMap: Record<ProjectStatus, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'text-ink/40 border-ink/15' },
  analyzing: { label: '分析中', color: 'text-public-data border-public-data/30' },
  awaitingConfirm: { label: '待确认', color: 'text-gold border-gold/30' },
  strategyReady: { label: '策略就绪', color: 'text-verified border-verified/30' },
  assetsReady: { label: '资产完成', color: 'text-verified border-verified/30' },
  exported: { label: '已导出', color: 'text-ink/50 border-ink/15' },
}

export default function RecentProjectsSection() {
  const navigate = useNavigate()
  const { setCurrentProject } = useProjectStore()
  const [projects, setProjects] = useState<Project[]>([])
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      const res = await projectApi.list()
      if (res.success && res.data) setProjects(res.data)
    } catch {
      // silently ignore
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleView = (project: Project) => {
    setCurrentProject(project)
    navigate(`/project/${project.id}/analysis`)
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      await projectApi.deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      // silently ignore
    } finally {
      setDeletingId(null)
    }
  }

  if (projects.length === 0) return null

  return (
    <section className="px-8 py-16 bg-cream-dark/30 border-t border-ink/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-px h-6 bg-chi/30" />
          <FolderOpen className="w-5 h-5 text-chi/60" />
          <h2 className="text-xl font-semibold text-ink font-serif">最近项目</h2>
          <span className="text-xs text-ink/30 ml-auto">Recent Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {projects.map((project, i) => {
              const status = statusMap[project.status] ?? statusMap.draft
              const brandName = project.brand?.name ?? '—'
              const date = new Date(project.updatedAt).toLocaleDateString('zh-CN', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className="group relative overflow-hidden bg-cream-light border border-ink/8
                             hover:border-gold/30 transition-colors duration-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0
                                  group-hover:from-gold/[0.03] group-hover:to-gold/[0.06]
                                  transition-all duration-300 pointer-events-none" />

                  <div className="relative p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs px-2 py-0.5 border ${status.color}`}>
                        {status.label}
                      </span>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="opacity-0 group-hover:opacity-100 transition-opacity
                                   p-1 text-ink/25 hover:text-unverified cursor-pointer
                                   disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-ink font-medium text-sm mb-1 leading-snug line-clamp-2">
                      {project.name}
                    </h3>
                    <p className="text-ink/40 text-xs mb-4">{brandName} · {date}</p>

                    <button
                      onClick={() => handleView(project)}
                      className="flex items-center gap-1.5 text-xs text-gold/70
                                 hover:text-gold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      查看分析
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
