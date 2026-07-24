import { motion } from 'framer-motion'

export default function FooterSection() {
  return (
    <motion.footer
      className="relative py-16 px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-chi/12 to-transparent" />
        <div className="h-px mt-[2px] bg-gradient-to-r from-transparent via-gold/8 to-transparent" />
      </div>

      <div className="relative max-w-[1280px] mx-auto flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-chi/20" />
          <div className="w-1.5 h-1.5 rotate-45 border border-chi/20" />
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-chi/20" />
        </div>

        <p className="text-sm text-ink/35">
          <span className="font-semibold font-serif text-chi/70">国韵 Global</span>
          <span className="mx-3 text-ink/15">·</span>
          <span>AI 赋能中国传统品牌出海</span>
        </p>

        <p className="text-xs text-ink/20 tracking-wider">
          Powered by AI · Made with Heritage
        </p>
      </div>
    </motion.footer>
  )
}
