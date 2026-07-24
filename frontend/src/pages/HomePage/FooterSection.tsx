import { motion } from 'framer-motion'

const footerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export default function FooterSection() {
  return (
    <motion.footer
      className="border-t border-ink-lighter/20 py-12 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-3">
        <p className="text-sm text-snow/40">
          <span className="text-gold/70 font-medium">国韵 Global</span>
          <span className="mx-2 text-ink-lighter">—</span>
          AI 赋能中国传统品牌出海
        </p>
        <p className="text-xs text-snow/20">
          Powered by AI
        </p>
      </div>
    </motion.footer>
  )
}
