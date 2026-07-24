import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, ChevronRight } from 'lucide-react'
import { projectApi } from '@/services/api'
import { useProjectStore } from '@/stores/projectStore'
import GoldParticles from '@/components/shared/GoldParticles'
import GiltButton from '@/components/shared/GiltButton'

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
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 overflow-hidden">
      {/* Cream gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-cream to-cream-dark" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,26,43,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,26,43,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-chi/15" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-chi/15" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-chi/15" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-chi/15" />

      {/* Warm radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-gold/[0.06] blur-[150px] pointer-events-none" />

      {/* Floating ornamental diamonds */}
      <motion.div
        className="absolute top-[15%] left-[12%] w-3 h-3 rotate-45 border border-chi/20"
        style={{ animation: 'float-ornament 8s ease-in-out infinite' }}
      />
      <motion.div
        className="absolute top-[20%] right-[15%] w-2 h-2 rotate-45 bg-gold/15"
        style={{ animation: 'float-ornament 10s ease-in-out infinite 2s' }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[18%] w-2.5 h-2.5 rotate-45 border border-gold/20"
        style={{ animation: 'float-ornament 9s ease-in-out infinite 1s' }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-2 h-2 rotate-45 bg-chi/10"
        style={{ animation: 'float-ornament 7s ease-in-out infinite 3s' }}
      />

      <GoldParticles count={25} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Decorative top line */}
        <motion.div
          className="flex items-center gap-4 mb-2"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-chi/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-chi/40" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-chi/30" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-7xl font-bold tracking-tight font-serif"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(100deg, #6B0F1A, #8B1A2B 30%, #C41E3A 50%, #8B1A2B 70%, #6B0F1A)',
              backgroundSize: '200% auto',
              animation: 'shimmer 6s linear infinite',
            }}
          >
            国韵 Global
          </span>
        </motion.h1>

        <motion.p
          className="text-2xl font-medium tracking-[0.15em] font-serif text-ink/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          让世界读懂中国品牌
        </motion.p>

        <motion.p
          className="text-sm text-ink/30 tracking-[0.2em] uppercase font-light font-serif italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          AI-Powered Global Market Entry for Chinese Heritage Brands
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3 my-2"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-chi/20 to-chi/30" />
          <div className="w-1 h-1 rounded-full bg-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-chi/30" />
          <div className="w-1 h-1 rounded-full bg-gold/50" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-chi/20 to-chi/30" />
        </motion.div>

        <motion.p
          className="text-ink/45 text-base leading-relaxed max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          从产品分析到文化解码，从市场洞察到营销内容生成，
          一站式 AI 解决方案帮助中国传统品牌走向全球市场。
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex items-center gap-5 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <GiltButton onClick={handleDemo} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                加载中...
              </>
            ) : (
              <>
                体验福建老酒案例
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </GiltButton>

          <GiltButton variant="outline" onClick={() => navigate('/new')}>
            上传自己的产品
            <ChevronRight className="w-4 h-4" />
          </GiltButton>
        </motion.div>

        {error && (
          <motion.p
            className="text-unverified text-sm mt-2"
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
