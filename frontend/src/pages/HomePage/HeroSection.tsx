import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'

export default function HeroSection() {
  const navigate = useNavigate()
  const { setCurrentProject } = useProjectStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDemo = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await projectApi.initDemo()
      if (res.success && res.data) {
        setCurrentProject(res.data)
        navigate(`/project/${res.data.id}/analysis`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '初始化演示失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 overflow-hidden">
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
            国韵 Global
          </span>
        </h1>

        <p className="text-2xl font-medium text-snow/90 tracking-wide">
          让世界读懂中国品牌
        </p>

        <p className="text-base text-slate-custom tracking-wide">
          AI-Powered Global Market Entry for Chinese Heritage Brands
        </p>

        <p className="text-snow/50 text-base leading-relaxed max-w-xl">
          从产品分析到文化解码，从市场洞察到营销内容生成，
          一站式 AI 解决方案帮助中国传统品牌走向全球市场。
        </p>

        <div className="flex items-center gap-4 mt-4">
          <motion.button
            onClick={handleDemo}
            disabled={loading}
            className="relative px-8 py-3.5 bg-gold text-ink font-semibold rounded-xl text-sm
                       hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                       cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                加载中...
              </span>
            ) : (
              '体验福建老酒案例'
            )}
          </motion.button>

          <motion.button
            onClick={() => navigate('/new')}
            className="px-8 py-3.5 border border-gold/40 text-gold rounded-xl text-sm font-medium
                       hover:border-gold hover:bg-gold/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            上传自己的产品
          </motion.button>
        </div>

        {error && (
          <motion.p
            className="text-unverified text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
